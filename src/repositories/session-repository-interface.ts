import Session from "../entities/user";

export interface SessionRepositoryInterface {
  store(user: Session): Promise<object | boolean>
  findByField(field: string): Promise<Session | object | boolean>
}