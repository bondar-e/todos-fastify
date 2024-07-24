import fastifyCors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

const cors = async (fastify: FastifyInstance) => {
  fastify.register(fastifyCors, {
    origin: '*',
  });
};

export default fastifyPlugin(cors);
