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

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    return await prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;
  }
}
