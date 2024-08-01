import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fastifyAutoload from '@fastify/autoload';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import * as dotenv from 'dotenv';
import fastify from 'fastify';

dotenv.config();

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// plugins
server.register(fastifyAutoload, {
  dir: join(__dirname, 'plugins'),
});

// routes
server.register(fastifyAutoload, {
  dir: join(__dirname, 'modules/auth'),
  ignorePattern: /.*(controller|schema)\.*/,
});

server.get('/', async (request, reply) => {
  return { page: 'home' };
});

server.setErrorHandler((error, _request, reply) => {
  reply.code(error.statusCode ?? 500).send(error);
});

server.listen(
  {
    port: 3000,
    host: process.env.HOST || 'localhost',
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  },
);
