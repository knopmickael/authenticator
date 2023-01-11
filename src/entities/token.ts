import { Entity } from "./_entity";

type TokenProps = {
  user_id: string,
  token: string,
  expires_in?: Date
}

export default class Token extends Entity<TokenProps> {
  constructor(props: TokenProps, id?: string) {
    super(props, id);
  }

  public static build(props: TokenProps, id?: string) {
    
    let date = new Date();
    date.setDate(date.getDate() + 1);

    return new Token({
      ...props,
      expires_in: props.expires_in || date // 24 hours
    }, id);
  }
}