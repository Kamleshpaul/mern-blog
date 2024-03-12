import { Request } from "express";
import { Schema } from "mongoose";

export interface DecodedToken {
  _id: string;
  iat: number;
}


export interface IParamsWithId {
  id?: Schema.Types.ObjectId
}

export interface IRequest extends Request {
  userId?: String
}