import User from "../entities/user";

export interface UserRepositoryInterface {
  store(user: User): Promise<object | boolean>
  findByField(field: string): Promise<User | object | boolean>
}