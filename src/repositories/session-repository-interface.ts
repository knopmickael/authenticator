import Session from "../entities/session";

export interface SessionRepositoryInterface {
  store(session: Session): Promise<object | boolean>
  findByFieldValue(field: string): Promise<Session | object | boolean>
}