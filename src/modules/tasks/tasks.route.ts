import type { FastifyInstance } from 'fastify';
import tasksController from './tasks.controller.js';

const tasks = async (fastify: FastifyInstance) => {
  fastify.get('/tasks', tasksController.getTasks(fastify));

  fastify.post('/tasks', tasksController.createTask(fastify));

  fastify.patch('/tasks/:id', tasksController.updateTask(fastify));

  fastify.delete('/tasks/:id', tasksController.deleteTask(fastify));
};

export default tasks;
