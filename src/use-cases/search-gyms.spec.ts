import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymUseCaseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymUseCaseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCaseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Lost Gym",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    await gymsRepository.create({
      title: "Lenhador Gym",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    const { gyms } = await sut.execute({ query: "Lost Gym", page: 1 });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Lost Gym" })]);
  });

  it("should be able to fetch paginated gym search", async () => {
    await Promise.all(
      Array.from({ length: 22 }).map((_, index) =>
        gymsRepository.create({
          title: `Lost Gym-${index + 1}`,
          description: null,
          phone: null,
          latitude: 0,
          longitude: 0,
        })
      )
    );

    const { gyms } = await sut.execute({ query: "Lost", page: 2 });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Lost Gym-21" }),
      expect.objectContaining({ title: "Lost Gym-22" }),
    ]);
  });
});
