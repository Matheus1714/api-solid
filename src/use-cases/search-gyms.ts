import bcrypt from "bcryptjs";
import { UserAlreadyExistError } from "./errors/user-already-exist-error";
import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gym-repository";

interface SearchGymUseCaseCaseRequest {
  query: string;
  page: number;
}

interface SearchGymUseCaseCaseResponse {
  gyms: Gym[];
}

export class SearchGymUseCaseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymUseCaseCaseRequest): Promise<SearchGymUseCaseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(query, page);

    return {
      gyms,
    };
  }
}
