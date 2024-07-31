import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Authenticator, Strategy } from '@fastify/passport';
import fastifySecureSession from '@fastify/secure-session';
import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Strategy as GoogleStrategy, type VerifyCallback } from 'passport-google-oauth2';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authPlugin = async (fastify: FastifyInstance) => {
  const fastifyPassport = new Authenticator();

  fastify.register(fastifySecureSession, {
    key: fs.readFileSync(path.join(__dirname, 'secret-key')).toString(),
    cookie: {
      path: '/',
      httpOnly: true,
    },
  });

  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

  fastifyPassport.registerUserSerializer<{ id: string; displayName: string }, { id: string; displayName: string }>(
    async (user) => {
      const { id, displayName } = user;

      return { id, displayName };
    },
  );

  fastifyPassport.registerUserDeserializer(async (userFromSession) => {
    return userFromSession;
  });

  const clientID = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const hostURL = process.env.HOST_URL;

  if (!clientID || !clientSecret || !hostURL) {
    throw new Error('Missing environment variables for Google OAuth');
  }

  fastifyPassport.use(
    'google',
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL: `${process.env.HOST_URL}/auth/google/callback`,
        passReqToCallback: true,
      },
      (_req: any, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
        return done(null, { profile, accessToken, refreshToken });
      },
    ),
  );

  fastifyPassport.use('local', new Strategy('local'));

  fastify.decorate('googleAuth', fastifyPassport.authenticate('google', { scope: ['profile', 'email'] }));
  fastify.decorate('authenticate', fastifyPassport.authenticate('local', { successRedirect: '/', authInfo: false }));
};

export default fastifyPlugin(authPlugin);
