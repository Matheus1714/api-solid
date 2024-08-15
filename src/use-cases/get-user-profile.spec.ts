import bcrypt from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";

import { GetUserProfileUseCase } from "./get-user-profile";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRespository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRespository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRespository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRespository.create({
      name: "Lost",
      email: "lost@gmail.com",
      password_hash: await bcrypt.hash("123123", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("Lost");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
