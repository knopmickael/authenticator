import { SessionRepository } from "../../infra/repositories/in-memory/session-repository";
import { TokenRepository } from "../../infra/repositories/in-memory/token-repository";
import { UserRepository } from "../../infra/repositories/in-memory/user-repository";
import Session from "../entities/session";
import Token from "../entities/token";
import User from "../entities/user";

type ExpectedBody = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export class Register {
  constructor(
    protected userRepo: UserRepository,
    protected tokenRepo: TokenRepository,
    protected sessionRepo: SessionRepository
  ) {}

  protected async validateBody(body: ExpectedBody): Promise<any | boolean> {
    // validation goes here...
    return body;
  }

  protected generateModels(body: any): any | boolean {

    let user: User;
    try {
      user = User.build(body);
    } catch (error) {
      throw new Error("Error while creating the user.");
    }
    if (!user) throw new Error("User not created.");

    let token: Token;
    try {
      token = Token.build({
        user_id: user.getId(),
        token: "foobar", // use jwt token instead...
      });
    } catch (error) {
      throw new Error("Error while creating the token.");
    }
    if (!token) throw new Error("Token not created.");

    let session: Session;
    try {
      session = Session.build({
        user_id: user.getId(),
        token_id: token.getId(),
      });
    } catch (error) {
      throw new Error("Error while creating the session.");
    }
    if (!session) throw new Error("Session not created.");

    return {
      user: user,
      token: token,
      session: session,
    };
  }

  protected async persistModels({ user, token, session }: any): Promise<boolean> {

    let storedUser;
    try {
      storedUser = await this.userRepo.store(user);
    } catch (error) {
      throw new Error("Error while storing the user to database.");
    }
    if (!storedUser) throw new Error("User not stored.");

    let storedToken;
    try {
      storedToken = await this.tokenRepo.store(token);
    } catch (error) {
      throw new Error("Error while storing the token to database.");
    }
    if (!storedToken) throw new Error("Token not stored.");

    let storedSession;
    try {
      storedSession = await this.sessionRepo.store(session);
    } catch (error) {
      throw new Error("Error while storing the session to database.");
    }
    if (!storedSession) throw new Error("Session not stored.");

    return true;
  }

  public async exec(body: ExpectedBody): Promise<any | boolean> {

    const validatedBody = await this.validateBody(body);
    if (!validatedBody) return false;

    const models = this.generateModels(validatedBody);
    if (!models) return false;

    const res = await this.persistModels(models);
    if (!res) return false;

    return {
      name: models.user.getProps().name,
      email: models.user.getProps().email,
      username: models.user.getProps().username,
      token: models.token.getProps().token,
      session: models.session.getId(),
    };
  }
}
