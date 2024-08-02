import type { FastifyInstance } from 'fastify';
import type { FastifyReplyTypebox, FastifyRequestTypebox } from 'types.js';
import type { CreateTaskSchema, GetTasksSchema, UpdateTaskSchema } from './tasks.schema.js';

const DEFAULT_LIMIT = 10;

const getTasks =
  (fastify: FastifyInstance) =>
  async (request: FastifyRequestTypebox<typeof GetTasksSchema>, reply: FastifyReplyTypebox<typeof GetTasksSchema>) => {
    const { offset, limit } = request.query;

    const tasks = await fastify.prisma.tasks.findMany({ take: limit ?? DEFAULT_LIMIT, skip: offset });

    reply.code(200).send({ tasks });
  };

const createTask =
  (fastify: FastifyInstance) =>
  async (
    request: FastifyRequestTypebox<typeof CreateTaskSchema>,
    reply: FastifyReplyTypebox<typeof CreateTaskSchema>,
  ) => {
    const { name, assignee, description, reporter } = request.body;

    const task = await fastify.prisma.tasks.create({
      data: {
        name,
        assignee,
        description,
        // TODO: get user from request
        reporter: reporter ?? 'anonymous',
      },
    });

    reply.code(201).send({ taskId: task.id });
  };

const updateTask =
  (fastify: FastifyInstance) =>
  async (
    request: FastifyRequestTypebox<typeof UpdateTaskSchema>,
    reply: FastifyReplyTypebox<typeof UpdateTaskSchema>,
  ) => {
    const { id } = request.params;
    const { name, assignee, description, reporter } = request.body;

    const task = await fastify.prisma.tasks.update({
      where: { id },
      data: {
        name,
        assignee,
        description,
        reporter,
      },
    });

    reply.code(200).send({ task });
  };

const deleteTask =
  (fastify: FastifyInstance) =>
  async (
    request: FastifyRequestTypebox<typeof UpdateTaskSchema>,
    reply: FastifyReplyTypebox<typeof UpdateTaskSchema>,
  ) => {
    const { id } = request.params;

    await fastify.prisma.tasks.delete({ where: { id } });

    reply.code(204).send();
  };

export default { getTasks, createTask, updateTask, deleteTask };
