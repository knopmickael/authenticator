import Session from "../../../src/entities/session";
import { SessionRepositoryInterface } from "../../../src/repositories/session-repository-interface";

export class SessionRepository implements SessionRepositoryInterface {
  protected sessions: Session[] = [];

  public async store(session: Session): Promise<object | boolean> {
    
    this.sessions.push(session);

    if (!this.findByField(session.getId())) {
      throw new Error("Problems while storing the session.");
    }

    return session;
  }

  public async findByField(field: string): Promise<Session | object | boolean> {

    const found = this.sessions.find(session => session.getId() === field);
    
    if (!found) {
      throw new Error("This id doesn`t belongs to any session.");
    }

    return found;
  }
}