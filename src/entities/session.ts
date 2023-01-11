import { Entity } from "./_entity";

type SessionProps = {
  user_id: string,
  token_id: string
}

export default class Session extends Entity<SessionProps> {
  constructor(props: SessionProps, id?: string) {
    super(props, id);
  }

  public static build(props: SessionProps, id?: string) {
    return new Session(props, id);
  }
}