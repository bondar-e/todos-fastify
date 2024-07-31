import type { FastifyInstance } from 'fastify';

import authController from './auth.controller.js';

const auth = async (fastify: FastifyInstance) => {
  fastify.post('/auth/signup', authController.signup(fastify));

  fastify.post('/auth/sign-in', authController.signIn(fastify));

  fastify.get('/auth/google', { preValidation: fastify.googleAuth }, async () => {});

  fastify.get('/auth/google/callback', { preValidation: fastify.googleAuth }, authController.googleAuth(fastify));
};

export default auth;
