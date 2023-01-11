import User from "../entities/user";

export interface UserRepositoryInterface {
  store(user: User): Promise<User>
  findByFieldValue(field: string): Promise<User>
}