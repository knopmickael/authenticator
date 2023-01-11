import { Entity } from "./entity";

type UserProps = {
  name: string,
  email: string,
  username: string,
  password: string
}

export default class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  public static build(props: UserProps, id?: string) {
    return new User(props, id);
  }
}