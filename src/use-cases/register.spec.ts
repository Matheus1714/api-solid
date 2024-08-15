import { expect, describe, it } from "vitest";
import { RegisterUsecase } from "./register";
import bcrypt from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistError } from "./errors/user-already-exist-error";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const usersRespository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUsecase(usersRespository);

    const { user } = await registerUseCase.execute({
      name: "Lost",
      email: "lost@gmail.com",
      password: "123123",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should hash user password upon registration", async () => {
    const usersRespository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUsecase(usersRespository);

    const { user } = await registerUseCase.execute({
      name: "Lost",
      email: "lost@gmail.com",
      password: "123123",
    });

    const isPasswordCorrectlyHashed = await bcrypt.compare(
      "123123",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
  it("should not be able to register with same email twice", async () => {
    const usersRespository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUsecase(usersRespository);

    const email = "lost@gmail.com";

    await registerUseCase.execute({
      name: "Lost",
      email,
      password: "123123",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "Dilma",
        email,
        password: "123123",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistError);
  });
});
