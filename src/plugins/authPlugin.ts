import { fastifyOauth2 } from '@fastify/oauth2';
import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { GOOGLE_API, GOOGLE_API_CALLBACK } from '../constants/paths';

const authPlugin = async (fastify: FastifyInstance) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  fastify.register(fastifyOauth2 as any, {
    name: 'googleOAuth2',
    scope: ['email', 'profile'],
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_CLIENT_SECRET,
      },
    },
    startRedirectPath: GOOGLE_API,
    callbackUri: `${process.env.HOST_URL}${GOOGLE_API_CALLBACK}`,
    discovery: {
      issuer: process.env.GOOGLE_DISCOVERY_URL,
    },
  });
};

export default fastifyPlugin(authPlugin);
