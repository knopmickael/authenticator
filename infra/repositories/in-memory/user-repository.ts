import User from "../../../src/entities/user";
import { UserRepositoryInterface } from "../../../src/repositories/user-repository-interface";

export class UserRepository implements UserRepositoryInterface {
  protected users: User[] = [];

  public async store(user: User): Promise<object | boolean> {
    
    this.users.push(user);

    if (!this.findByFieldValue(user.getId())) {
      throw new Error("Problems while storing the user.");
    }

    return user;
  }

  public async findByFieldValue(field: string): Promise<User | object | boolean> {

    const found = this.users.find(
      user => user.getId() === field
      ||
      Object.values(user.getProps()).indexOf(field) > -1
    );

    if (!found) {
      throw new Error("This id doesn`t belongs to any user.");
    }

    return found;
  }
}