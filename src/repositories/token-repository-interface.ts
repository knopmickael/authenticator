import Token from "../entities/token";

export interface TokenRepositoryInterface {
  store(token: Token): Promise<object | boolean>
  findByField(field: string): Promise<Token | object | boolean>
}