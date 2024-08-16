import { prisma } from "@/lib/prisma";
import { CheckInsRepository } from "../check-ins-repository";
import { Prisma, CheckIn } from "@prisma/client";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async countByUserId(userId: string) {
    return await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return await prisma.checkIn.create({
      data,
    });
  }

  async findById(id: string) {
    return await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });
  }

  async findManyByUserId(userId: string, page: number) {
    return await prisma.checkIn.findMany({
      skip: (page - 1) * 20,
      take: 20,
      where: {
        user_id: userId,
      },
    });
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    return await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          lte: endOfTheDay.toDate(),
          gte: startOfTheDay.toDate(),
        },
      },
    });
  }

  async save(data: CheckIn) {
    return await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
