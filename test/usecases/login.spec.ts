import { SessionRepository } from "../../infra/repositories/in-memory/session-repository";
import { TokenRepository } from "../../infra/repositories/in-memory/token-repository";
import { UserRepository } from "../../infra/repositories/in-memory/user-repository";
import Session from "../../src/entities/session";
import Token from "../../src/entities/token";
import User from "../../src/entities/user";
import { Login as SUT } from "../../src/usecases/login";

describe('Name of the group', () => {
  it('should login', async () => {
    
    const userInMemoryRepo = new UserRepository();
    const tokenInMemoryRepo = new TokenRepository();
    const sessionInMemoryRepo = new SessionRepository();

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
  });
});