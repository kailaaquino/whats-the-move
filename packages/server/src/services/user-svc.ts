import { Schema, model } from "mongoose";
import { User } from "../models/user";

const UserSchema = new Schema<User>(
  {
    id: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
  },
  { collection: "users" }
);

const UserModel = model<User>("Profile", UserSchema);

function index(): Promise<User[]> {
  return UserModel.find();
}

function get(id: String): Promise<User> {
  return UserModel.find({ id })
    .then((list) => list[0])
    .catch((err) => {
      throw `${id} Not Found`;
    });
}

export default {index, get};
