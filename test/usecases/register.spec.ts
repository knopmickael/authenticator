import { SessionRepository } from "../../infra/repositories/in-memory/session-repository";
import { TokenRepository } from "../../infra/repositories/in-memory/token-repository";
import { UserRepository } from "../../infra/repositories/in-memory/user-repository";
import Session from "../../src/entities/session";
import Token from "../../src/entities/token";
import User from "../../src/entities/user";
import { Register } from "../../src/usecases/register";

describe("Register service test suite", () => {
  it("should create the user", () => {

    const register = new Register(
      new UserRepository(),
      new TokenRepository(),
      new SessionRepository()
    );

    let res;
    try {
      res = register.exec({
        name: "Test name",
        email: "test@mail.com",
        username: "test-username",
        password: "test-password",
      });
    } catch (error) {
      throw new Error("Error while creating the user.");
    }

    // console.log(res);
    // expect(res).toBeInstanceOf(User);
    // expect(res).toBeInstanceOf(Token);
    // expect(res).toBeInstanceOf(Session);

    expect(res).toHaveProperty('name');
    expect(res).toHaveProperty('email');
    expect(res).toHaveProperty('username');
    expect(res).toHaveProperty('token');
    expect(res).toHaveProperty('session');
  });
});
