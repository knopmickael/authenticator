import User from "../../../src/entities/user";
import { UserRepositoryInterface } from "../../../src/repositories/user-repository-interface";

export class UserRepository implements UserRepositoryInterface {
  protected users: User[] = [];

  public async store(user: User): Promise<object | boolean> {
    
    // model validation goes here

    this.users.push(user);

    if (!this.findByField(user.getId())) {
      throw new Error("Problems while storing the user.");
    }

    return user;
  }

  public async findByField(field: string): Promise<User | object | boolean> {

    const found = this.users.find(user => user.getId() === field);
    
    if (!found) {
      throw new Error("This id doesn`t belongs to any user.");
    }

    return found;
  }
}