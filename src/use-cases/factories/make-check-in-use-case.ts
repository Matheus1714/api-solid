import { CheckInUseCase } from "../check-in";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeCheckInUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const prismaCheckInRepository = new PrismaCheckInsRepository();
  const useCase = new CheckInUseCase(
    prismaCheckInRepository,
    prismaGymsRepository
  );

  return useCase;
}
