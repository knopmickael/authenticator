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

  protected generateModels(body: ExpectedBody) {

    let user: User;
    try {
      user = User.build(body);
    } catch (error) {
      throw new Error("Error while creating the user.");
    }
    if (!user)
      throw new Error("User not created.");

    let token: Token;
    try {
      token = Token.build({
        user_id: user.getId(),
        token: "foobar", // use jwt token instead...
      });
    } catch (error) {
      throw new Error("Error while creating the token.");
    }
    if (!token)
      throw new Error("Token not created.");

    let session: Session;
    try {
      session = Session.build({
        user_id: user.getId(),
        token_id: token.getId()
      });
    } catch (error) {
      throw new Error("Error while creating the session.");
    }
    if (!session)
      throw new Error("Session not created.");

    return {
      user: user,
      token: token,
      session: session
    };
  }
  
  protected persistModels() {
    return true;
  }

  public exec(body: ExpectedBody): object | boolean {

    // validate body here...

    const {user, token, session} = this.generateModels(body);

    if (1!=1) return false;

    return {
      name: user.getProps().name,
      email: user.getProps().email,
      username: user.getProps().username,
      token: token.getProps().token,
      session: session.getId()
    };
  }
}
