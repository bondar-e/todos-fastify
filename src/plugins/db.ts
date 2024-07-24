import fastifyPostgres from '@fastify/postgres';
import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

const db = async (fastify: FastifyInstance) => {
  fastify.register(fastifyPostgres, {
    connectionString: process.env.DATABASE_URL,
  });
};

export default fastifyPlugin(db);
