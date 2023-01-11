import { Entity } from "./entity";

type TokenProps = {
  token: string,
  expires_in: Date
}

export default class Token extends Entity<TokenProps> {
  constructor(props: TokenProps, id?: string) {
    super(props, id);
  }

  public static build(props: TokenProps, id?: string) {
    return new Token(props, id);
  }
}