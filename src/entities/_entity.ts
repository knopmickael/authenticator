import crypto from 'crypto';

export abstract class Entity<UnknowParameter> {
  protected id: string;
  public props: UnknowParameter;

  constructor(props: UnknowParameter, id?: string) {
    this.id = id || crypto.randomUUID();
    this.props = props;
  }

  public getId() {
    return this.id;
  }

  public getProps() {
    return this.props;
  }
}