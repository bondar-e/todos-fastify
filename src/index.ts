import fastify from 'fastify';
import authPlugin from './plugins/authPlugin';
import configPlugin from './plugins/configPlugin';
import cookies from './plugins/cookies';
import cors from './plugins/cors';
import db from './plugins/db';
import auth from './routers/auth';

const server = fastify();

// plugins
server.register(configPlugin);
server.register(cookies);
server.register(cors);
server.register(db);
server.register(authPlugin);

// routes
server.register(auth);

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
