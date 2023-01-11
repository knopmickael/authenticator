import { SessionRepository } from "../../infra/repositories/in-memory/session-repository";
import { TokenRepository } from "../../infra/repositories/in-memory/token-repository";
import { UserRepository } from "../../infra/repositories/in-memory/user-repository";
import Session from "../../src/entities/session";
import Token from "../../src/entities/token";
import User from "../../src/entities/user";
import { Register as SUT } from "../../src/usecases/register";

describe("Register service test suite", () => {
  it("should create the credentials, store it into in-memory repo and retrieve it successfully", async () => {

    const userInMemoryRepo = new UserRepository();
    const tokenInMemoryRepo = new TokenRepository();
    const sessionInMemoryRepo = new SessionRepository();

    const register = new SUT(
      userInMemoryRepo,
      tokenInMemoryRepo,
      sessionInMemoryRepo
    );

    const res = await register.exec({
      name: "Test name",
      email: "test@mail.com",
      username: "test-username",
      password: "test-password",
    });

    expect(res).toHaveProperty('name');
    expect(res).toHaveProperty('email');
    expect(res).toHaveProperty('username');
    expect(res).toHaveProperty('token');
    expect(res).toHaveProperty('session');

    const isUserStored = await userInMemoryRepo.findByFieldValue(res.name);
    expect(isUserStored).toBeInstanceOf(User);

    const isTokenStored = await tokenInMemoryRepo.findByFieldValue(res.token);
    expect(isTokenStored).toBeInstanceOf(Token);

    const isSessionStored = await sessionInMemoryRepo.findByFieldValue(res.session);
    expect(isSessionStored).toBeInstanceOf(Session);
  });
});
