import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fastifyAutoload from '@fastify/autoload';
import * as dotenv from 'dotenv';
import fastify from 'fastify';

dotenv.config();

const server = fastify();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// plugins
server.register(fastifyAutoload, {
  dir: join(__dirname, 'plugins'),
});

// routes
server.register(fastifyAutoload, {
  dir: join(__dirname, 'routes'),
});

server.get('/', async (request, reply) => {
  return { page: 'home' };
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
