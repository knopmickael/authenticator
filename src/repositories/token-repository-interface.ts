import Token from "../entities/token";

export interface TokenRepositoryInterface {
  store(token: Token): Promise<object | boolean>
  findByFieldValue(field: string): Promise<Token | object | boolean>
}