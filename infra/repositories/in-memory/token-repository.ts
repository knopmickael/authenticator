import Token from "../../../src/entities/token";
import { TokenRepositoryInterface } from "../../../src/repositories/token-repository-interface";

export class TokenRepository implements TokenRepositoryInterface {
  protected tokens: Token[] = [];

  public async store(token: Token): Promise<object | boolean> {
    
    // model validation goes here

    this.tokens.push(token);

    if (!this.findByField(token.getId())) {
      throw new Error("Problems while storing the token.");
    }

    return token;
  }

  public async findByField(field: string): Promise<Token | object | boolean> {

    const found = this.tokens.find(token => token.getId() === field);
    
    if (!found) {
      throw new Error("This id doesn`t belongs to any token.");
    }

    return found;
  }
}