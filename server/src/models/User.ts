import { Model } from "objection";

class User extends Model {
  id!: number;
  username!: string;
  password_hash!: string;

  static get tableName() {
    return "users";
  }
}

export default User;
