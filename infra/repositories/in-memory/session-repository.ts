import Session from "../../../src/entities/session";
import { SessionRepositoryInterface } from "../../../src/repositories/session-repository-interface";

export class SessionRepository implements SessionRepositoryInterface {
  protected sessions: Session[] = [];

  public async store(session: Session): Promise<Session> {
    
    this.sessions.push(session);

    if (!this.findByFieldValue(session.getId()))
      throw new Error("Problems while storing the session.");

    return session;
  }

  public async update(session: Session): Promise<Session> {

    let foundIndex = this.sessions.findIndex(session => session.getId() === session.getId());

    if (foundIndex === -1)
      throw new Error("This user never had a session on the application.");

    this.sessions[foundIndex] = session;

    return this.sessions[foundIndex];
  }

  public async findByFieldValue(field: string): Promise<Session> {

    const found = this.sessions.find(
      session => session.getId() === field
      ||
      Object.values(session.getProps()).indexOf(field) > -1
    );
    
    if (!found)
      throw new Error("This id doesn`t belongs to any session.");

    return found;
  }
}