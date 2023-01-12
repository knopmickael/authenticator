import { SessionRepository } from "../../infra/repositories/in-memory/session-repository";
import { TokenRepository } from "../../infra/repositories/in-memory/token-repository";
import { UserRepository } from "../../infra/repositories/in-memory/user-repository";
import Session from "../../src/entities/session";
import Token from "../../src/entities/token";
import User from "../../src/entities/user";
import { Register } from "../../src/usecases/register";
import { Login as SUT } from "../../src/usecases/login";

describe('Name of the group', () => {
    
  const userInMemoryRepo = new UserRepository();
  const tokenInMemoryRepo = new TokenRepository();
  const sessionInMemoryRepo = new SessionRepository();

  beforeEach(async () => {

    const register = new Register(
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

    await register.exec({
      name: "Test name2",
      email: "test@mail2.com",
      username: "test-username2",
      password: "test-password2",
    });

    expect(res).toBeTruthy();
  });

  it('should authenticate the user and retrieve his token and current session', async () => {

    const login = new SUT(
      userInMemoryRepo,
      tokenInMemoryRepo,
      sessionInMemoryRepo
    );

    const res = await login.exec({
      username: "test-username",
      password: "test-password"
    });

    expect(res).toHaveProperty('token');
    expect(res).toHaveProperty('session');

    console.log(res);
  });
});