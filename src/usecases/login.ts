import { SessionRepository } from "../../infra/repositories/in-memory/session-repository";
import { TokenRepository } from "../../infra/repositories/in-memory/token-repository";
import { UserRepository } from "../../infra/repositories/in-memory/user-repository";

type ExpectedBody = {
  username: string,
  password: string
};

export class Login {
  constructor(
    protected userRepo: UserRepository,
    protected tokenRepo: TokenRepository,
    protected sessionRepo: SessionRepository
  ) {}

  protected async validateBody(body: ExpectedBody): Promise<any | boolean> {
    // validation goes here...
    return body;
  }

  public async exec(body: ExpectedBody): Promise<any | boolean> {

    const validatedBody = await this.validateBody(body);
    if (!validatedBody) return false;

    let foundUser;
    try {
      foundUser = await this.userRepo.findByFieldValue(validatedBody.username);
    } catch (error) {
      throw new Error("Error while searching the user.");
    }

    let foundToken;
    try {
      foundToken = await this.tokenRepo.findByFieldValue(foundUser.getId());
    } catch (error) {
      throw new Error("Error while searching this user token.");
    }

    let foundSession;
    try {
      foundSession = await this.sessionRepo.findByFieldValue(foundToken.getId());
    } catch (error) {
      throw new Error("Error while searching this user session.");
    }

    return {
      token: foundToken.getId(),
      session: foundSession.getId()
    }
  }
}