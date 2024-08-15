import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Register Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to register a gym", async () => {
    const { gym } = await sut.execute({
      title: "teste",
      description: null,
      latitude: 27.0,
      longitude: 43.3,
      phone: null,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
