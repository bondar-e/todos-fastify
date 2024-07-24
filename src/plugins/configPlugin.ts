import * as dotenv from 'dotenv';
import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

const configPlugin = async (fastify: FastifyInstance) => {
  const envConfig = dotenv.config();

  fastify.decorate('config', envConfig.parsed);
};

export default fastifyPlugin(configPlugin);
