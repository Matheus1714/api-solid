import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterUsecase } from "@/use-cases/register";
import { UserAlreadyExistError } from "@/use-cases/errors/user-already-exist-error";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUsecase(prismaUsersRepository);

    await registerUseCase.execute({ name, email, password });
  } catch (err) {
    if (err instanceof UserAlreadyExistError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
