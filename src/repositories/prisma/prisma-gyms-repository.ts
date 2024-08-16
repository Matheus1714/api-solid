import { Prisma, Gym } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../gym-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    return await prisma.gym.create({
      data: { ...data },
    });
  }

  async findById(id: string) {
    return await prisma.gym.findUnique({
      where: {
        id,
      },
    });
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return await prisma.gym.findMany({
      skip: (page - 1) * 20,
      take: 30,
      where: {
        title: {
          contains: query,
        },
      },
    });
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return [];
  }
}
