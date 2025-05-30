// src/services/user-svc.ts
import { Schema, model } from "mongoose";
import { User } from "../models/user";

const UserSchema = new Schema<User>(
  {
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

function get(id: string): Promise<User | null> {
  return UserModel.findById(id).exec();
}

// Insert new user 
function create(json: User): Promise<User> {
  const u = new UserModel(json);
  return u.save();
}

export default {index, get, create};
