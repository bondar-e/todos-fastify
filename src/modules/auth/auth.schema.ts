import { Type } from '@fastify/type-provider-typebox';

const UserSchema = Type.Object({
  id: Type.String(),
  role: Type.Optional(Type.String()),
  first_name: Type.String(),
  last_name: Type.Optional(Type.String()),
  email: Type.String(),
  password: Type.Optional(Type.String()),
  auth_type: Type.Enum({ EMAIL: 'EMAIL', GOOGLE: 'GOOGLE' }),
});

export const AuthSignupSchema = {
  body: Type.Object({
    email: Type.String(),
    first_name: Type.String(),
    last_name: Type.String(),
    password: Type.String(),
  }),
  response: Type.Object({
    200: Type.Object({
      user: UserSchema,
    }),
    401: Type.Object({
      message: Type.String(),
    }),
  }),
};

export const AuthSignInSchema = {
  body: Type.Object({
    email: Type.String(),
    password: Type.String(),
  }),
  response: Type.Object({
    200: Type.Object({
      user: UserSchema,
    }),
    401: Type.Object({
      message: Type.String(),
    }),
  }),
};
