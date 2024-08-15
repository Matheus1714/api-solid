import { expect, describe, it, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import bcrypt from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRespository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRespository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRespository);
  });

  it("should be able to authenticate", async () => {
    await usersRespository.create({
      name: "Lost",
      email: "lost@gmail.com",
      password_hash: await bcrypt.hash("123123", 6),
    });

    const { user } = await sut.execute({
      email: "lost@gmail.com",
      password: "123123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "lost@gmail.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRespository.create({
      name: "Lost",
      email: "lost@gmail.com",
      password_hash: await bcrypt.hash("123123", 6),
    });

    await expect(() =>
      sut.execute({
        email: "lost@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
