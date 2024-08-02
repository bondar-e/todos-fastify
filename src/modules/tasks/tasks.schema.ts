import { Type } from '@fastify/type-provider-typebox';

const TaskSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  assignee: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  reporter: Type.String(),
});

export const GetTasksSchema = {
  querystring: Type.Object({
    offset: Type.Optional(Type.Number()),
    limit: Type.Optional(Type.Number()),
  }),
  response: Type.Object({
    200: Type.Object({
      tasks: Type.Array(TaskSchema),
    }),
  }),
};

export const CreateTaskSchema = {
  body: Type.Object({
    name: Type.String(),
    assignee: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    reporter: Type.Optional(Type.String()),
  }),
  response: Type.Object({
    201: Type.Object({
      taskId: Type.String(),
    }),
  }),
};

export const UpdateTaskSchema = {
  params: Type.Object({
    id: Type.String(),
  }),
  body: Type.Object({
    name: Type.String(),
    assignee: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    reporter: Type.Optional(Type.String()),
  }),
  response: Type.Object({
    200: Type.Object({
      task: TaskSchema,
    }),
  }),
};

export const DeleteTaskSchema = {
  params: Type.Object({
    id: Type.String(),
  }),
  response: Type.Object({
    204: Type.Null(),
  }),
}