import { Entity } from "./_entity";

type SessionProps = {
  user_id: string,
  token_id: string
  expires_in?: Date
}

export default class Session extends Entity<SessionProps> {
  constructor(props: SessionProps, id?: string) {
    super(props, id);
  }

  public static build(props: SessionProps, id?: string) {
    
    let date = new Date();
    date.setDate(date.getDate() + 1);

    return new Session({
      ...props,
      expires_in: props.expires_in || date // 24 hours
    }, id);
  }

  public refreshExpirationDate() {
    
    let date = new Date();
    date.setDate(date.getDate() + 2);
    this.props.expires_in = date;
  }
}