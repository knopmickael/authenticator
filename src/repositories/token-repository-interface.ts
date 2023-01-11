import Token from "../entities/user";

export interface TokenRepositoryInterface {
  store(user: Token): Promise<object | boolean>
  findByField(field: string): Promise<Token | object | boolean>
}