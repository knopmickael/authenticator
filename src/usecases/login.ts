import { SessionRepository } from "../../infra/repositories/in-memory/session-repository";
import { TokenRepository } from "../../infra/repositories/in-memory/token-repository";
import { UserRepository } from "../../infra/repositories/in-memory/user-repository";
import Session from "../entities/session";
import Token from "../entities/token";
import User from "../entities/user";

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

  protected async generateNewToken(user_id: string): Promise<Token> {

    // should delete the old token here...

    let token: Token;
    try {
      token = Token.build({
        user_id: user_id,
        token: "foobar2", // use jwt token instead...
      });
    } catch (error) {
      throw new Error("Error while creating the token.");
    }

    if (token.getId() != undefined) {
      try {
        await this.tokenRepo.store(token);
      } catch (error) {
        throw new Error("Error while storing the token to database.");
      }
    }

    return token;
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

    let foundSession;
    try {
      foundSession = await this.sessionRepo.findByFieldValue(foundUser?.getId());
    } catch (error) {
      throw new Error("Error while searching the user session.");
    }

    let sessionExpiration: any = foundSession?.getProps()?.expires_in;
    let isSessionExpired: boolean = sessionExpiration.getTime() < new Date().getTime();
    // more than 24h have passed since the last generated token

    let token;
    if (isSessionExpired) {
      token = await this.generateNewToken(foundUser?.getId());
      if (token) {
        foundSession?.refreshExpirationDate();
        try {
          foundSession = await this.sessionRepo.update(foundSession);
        } catch (error) {
          throw new Error("Error while updating the user session.");
        }
      }
    } else {
      try {
        token = await this.tokenRepo.findByFieldValue(foundUser?.getId());
      } catch (error) {
        throw new Error("Error while searching this user token.");
      }
    }

    return {
      token: token?.getProps()?.token,
      session: {
        id: foundSession?.getId(),
        expires_in: foundSession?.getProps()?.expires_in // should format to MM-DD-YYYY
      }
    }
  }
}