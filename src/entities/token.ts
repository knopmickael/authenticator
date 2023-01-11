import { Entity } from "./_entity";

type TokenProps = {
  user_id: string,
  token: string,
}

export default class Token extends Entity<TokenProps> {
  constructor(props: TokenProps, id?: string) {
    super(props, id);
  }

  public static build(props: TokenProps, id?: string) {
    return new Token(props, id);
  }
}