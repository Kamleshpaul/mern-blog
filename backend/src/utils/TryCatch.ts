import { NextFunction, Request, Response } from "express";

export const TryCatch = (func: Function) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(func(req, res, next)).catch(next);
}