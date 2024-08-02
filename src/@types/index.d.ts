import type { PrismaClient } from '@prisma/client';

export type UnifiedUser = {
  profile: {
    displayName: string;
    given_name?: string;
    family_name?: string;
    email: string;
  };
  accessToken: string;
  refreshToken?: string;
};

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
    googleAuth: any;
    authenticate: any;
  }

  interface PassportUser extends UnifiedUser {}

  interface FastifyRequest {
    user?: UnifiedUser;
  }
}
