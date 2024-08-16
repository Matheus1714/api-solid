import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRespository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(async () => {
    checkInsRespository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRespository);
  });

  it("should be able to check-ins count from metrics", async () => {
    await checkInsRespository.create({
      gym_id: "gym-1",
      user_id: "user-1",
    });

    await checkInsRespository.create({
      gym_id: "gym-2",
      user_id: "user-1",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-1",
    });

    expect(checkInsCount).toBe(2);
  });
});
