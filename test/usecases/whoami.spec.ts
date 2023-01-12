import { SessionRepository } from "../../infra/repositories/in-memory/session-repository";
import { TokenRepository } from "../../infra/repositories/in-memory/token-repository";
import { UserRepository } from "../../infra/repositories/in-memory/user-repository";
import Session from "../../src/entities/session";
import Token from "../../src/entities/token";
import User from "../../src/entities/user";
import { Register } from "../../src/usecases/register";
import { Whoami as SUT } from "../../src/usecases/whoami";

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

    expect(res).toBeTruthy();
  });

  it('should retrieve the userdata successfully', async () => {

    const whoami = new SUT(
      userInMemoryRepo,
      tokenInMemoryRepo,
      sessionInMemoryRepo
    );

    const token = 'foobar';
    const res = await whoami.exec(token);

    expect(res).toHaveProperty('name');
    expect(res).toHaveProperty('email');
    expect(res).toHaveProperty('token');
    expect(res).toHaveProperty('session');
  });
});