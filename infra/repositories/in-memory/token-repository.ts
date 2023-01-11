import Token from "../../../src/entities/token";
import { TokenRepositoryInterface } from "../../../src/repositories/token-repository-interface";

export class TokenRepository implements TokenRepositoryInterface {
  protected tokens: Token[] = [];

  public async store(token: Token): Promise<Token> {
    
    this.tokens.push(token);

    if (!this.findByFieldValue(token.getId()))
      throw new Error("Problems while storing the token.");

    return token;
  }

  public async findByFieldValue(field: string): Promise<Token> {

    const found = this.tokens.find(
      token => token.getId() === field
      ||
      Object.values(token.getProps()).indexOf(field) > -1
    );
    
    if (!found)
      throw new Error("This id doesn`t belongs to any token.");

    return found;
  }
}