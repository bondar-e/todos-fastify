import type { FastifyInstance } from 'fastify';
import { GOOGLE_API_CALLBACK } from '../constants/paths';

const auth = async (fastify: FastifyInstance) => {
  fastify.get(GOOGLE_API_CALLBACK, async (request, reply) => {
    try {
      const { token } = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
      const user = await fastify.googleOAuth2.userinfo(token);

      // TODO: save user to database
      reply.send({ accessToken: token.access_token, refreshToken: token.refresh_token, user });
    } catch (error) {
      console.log(error);
    }
  });
};

export default auth;
