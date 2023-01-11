import Token from "../entities/token";

export interface TokenRepositoryInterface {
  store(token: Token): Promise<Token>
  findByFieldValue(field: string): Promise<Token>
}