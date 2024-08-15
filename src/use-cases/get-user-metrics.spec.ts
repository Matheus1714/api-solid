import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetrics } from "./get-user-metrics";

let checkInsRespository: InMemoryCheckInsRepository;
let sut: GetUserMetrics;

describe("Get User Metrics Use Case", () => {
  beforeEach(async () => {
    checkInsRespository = new InMemoryCheckInsRepository();
    sut = new GetUserMetrics(checkInsRespository);
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
