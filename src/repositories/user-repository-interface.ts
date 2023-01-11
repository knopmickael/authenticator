import User from "../entities/user";

export interface UserRepositoryInterface {
  store(user: User): Promise<object | boolean>
  findByFieldValue(field: string): Promise<User | object | boolean>
}