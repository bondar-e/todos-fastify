-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('GOOGLE', 'EMAIL');

-- CreateTable
CREATE TABLE "Roles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" CHAR(255) NOT NULL,
    "assignee" UUID,
    "description" TEXT,
    "reporter" UUID NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "role" UUID,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "auth_type" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "assignee_id" FOREIGN KEY ("assignee") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "reporter_id" FOREIGN KEY ("reporter") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "role_id" FOREIGN KEY ("role") REFERENCES "Roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
