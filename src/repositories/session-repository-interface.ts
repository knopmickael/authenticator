import Session from "../entities/session";

export interface SessionRepositoryInterface {
  store(session: Session): Promise<object | boolean>
  findByField(field: string): Promise<Session | object | boolean>
}