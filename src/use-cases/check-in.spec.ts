import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUsecase } from "./register";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";

let checkInsRespository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRespository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRespository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-id",
      gymId: "gym-id",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
