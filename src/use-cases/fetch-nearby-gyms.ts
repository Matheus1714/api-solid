import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gym-repository";

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitute: number;
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitute,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitute,
    });

    return {
      gyms,
    };
  }
}
