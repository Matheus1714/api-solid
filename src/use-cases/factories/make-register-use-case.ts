import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUsecase } from "../register";

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUsecase(prismaUsersRepository);

  return registerUseCase;
}
