import Session from "../entities/session";

export interface SessionRepositoryInterface {
  store(session: Session): Promise<Session>
  findByFieldValue(field: string): Promise<Session>
}