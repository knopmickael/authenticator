import { SessionRepository } from "../../infra/repositories/in-memory/session-repository";
import { TokenRepository } from "../../infra/repositories/in-memory/token-repository";
import { UserRepository } from "../../infra/repositories/in-memory/user-repository";

export class Whoami {
  constructor(
    protected userRepo: UserRepository,
    protected tokenRepo: TokenRepository,
    protected sessionRepo: SessionRepository
  ) {}

  public async exec(token: string): Promise<object> {

    let foundToken;
    try {
      foundToken = await this.tokenRepo.findByFieldValue(token);
    } catch (error) {
      throw new Error("Error while searching the user token.");
    }

    let foundUser;
    try {
      foundUser = await this.userRepo.findByFieldValue(foundToken?.getProps()?.user_id);
    } catch (error) {
      throw new Error("Error while searching the user data.");
    }

    let foundSession;
    try {
      foundSession = await this.sessionRepo.findByFieldValue(foundUser?.getId());
    } catch (error) {
      throw new Error("Error while searching the user session.");
    }
    
    return {
      name: foundUser?.getProps()?.name,
      email: foundUser?.getProps()?.email,
      token: foundToken?.getProps()?.token,
      session: {
        id: foundSession?.getId(),
        expires_in: foundSession?.getProps()?.expires_in // should format to MM-DD-YYYY
      }
    };
  }
}