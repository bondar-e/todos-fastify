import fastifyCookie from '@fastify/cookie';
import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

const cookies = async (fastify: FastifyInstance) => {
  fastify.register(fastifyCookie);
};

export default fastifyPlugin(cookies);
