import bcrypt from 'bcrypt';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CustomError } from '../../helpers/CustomError/CustomError.js';
import type { FastifyReplyTypebox, FastifyRequestTypebox } from 'types.js';
import type { AuthSignInSchema, AuthSignupSchema } from './auth.schema.js';

const signup =
  (fastify: FastifyInstance) =>
  async (
    request: FastifyRequestTypebox<typeof AuthSignupSchema>,
    reply: FastifyReplyTypebox<typeof AuthSignupSchema>,
  ) => {
    const { email, first_name, last_name, password } = request.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const dbUser = await fastify.prisma.users.findUnique({ where: { email } });

    if (dbUser) {
      throw new CustomError(409, 'User with that email already exists');
    }

    const user = await fastify.prisma.users.create({
      data: {
        email,
        first_name,
        last_name,
        password: hashPassword,
        auth_type: 'EMAIL',
      },
    });

    reply.code(201).send({ user });
  };

const signIn =
  (fastify: FastifyInstance) =>
  async (
    request: FastifyRequestTypebox<typeof AuthSignInSchema>,
    reply: FastifyReplyTypebox<typeof AuthSignInSchema>,
  ) => {
    const { email, password } = request.body;

    const user = await fastify.prisma.users.findUnique({ where: { email: email } });
    const isMatch = user && (await bcrypt.compare(password, user.password || ''));

    if (!user || !isMatch) {
      throw new CustomError(401, 'Invalid email or password');
    }

    const { password: userPassword, auth_type, ...userData } = user;

    reply.code(200).send({ user: userData });
  };

const googleAuth = (fastify: FastifyInstance) => async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    if (!request.user) {
      throw new Error('User not found');
    }

    const { profile, accessToken, refreshToken } = request.user;
    const dbUser = await fastify.prisma.users.findFirst({ where: { email: profile.email } });

    if (dbUser) {
      return reply.code(200).send({ user: dbUser, accessToken, refreshToken });
    }

    const newUser = await fastify.prisma.users.create({
      data: {
        email: profile.email,
        first_name: profile.given_name || profile.displayName,
        last_name: profile.family_name,
        auth_type: 'GOOGLE',
      },
    });

    reply.code(201).send({ user: newUser, accessToken, refreshToken });
  } catch (error) {
    reply.code(500).send(error);
  }
};

export default { signup, signIn, googleAuth };
