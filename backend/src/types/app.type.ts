import { Request } from "express";

export interface DecodedToken {
  _id: string;
  iat: number;
}

export interface IRequest extends Request {
  userId?: String
}