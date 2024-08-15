import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRespository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Fetch User Check-ins History Use Case", () => {
  beforeEach(async () => {
    checkInsRespository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRespository);
  });

  it("should be able to fetch check-in history", async () => {
    await checkInsRespository.create({
      gym_id: "gym-1",
      user_id: "user-1",
    });

    await checkInsRespository.create({
      gym_id: "gym-2",
      user_id: "user-1",
    });

    const { checkIns } = await sut.execute({
      userId: "user-1",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-1" }),
      expect.objectContaining({ gym_id: "gym-2" }),
    ]);
  });

  it("should be able to fetch paginated check-in history", async () => {
    await Promise.all(
      Array.from({ length: 22 }).map((_, index) =>
        checkInsRespository.create({
          gym_id: `gym-${index + 1}`,
          user_id: "user-1",
        })
      )
    );

    const { checkIns } = await sut.execute({
      userId: "user-1",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
