import { Schema } from "mongoose";


export interface IUser {
  _id: Schema.Types.ObjectId
  name: string;
  email: string;
  password: string;
}


