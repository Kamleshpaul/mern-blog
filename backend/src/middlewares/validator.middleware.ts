import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from 'zod';

export default interface RequestValidators {
  params?: AnyZodObject,
  body?: AnyZodObject,
  query?: AnyZodObject,
}


export const reqValidate = (validators: RequestValidators) => {

  return async (req: Request, res: Response, next: NextFunction) => {

    try {

      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }
      next();

    } catch (error) {

      if (error instanceof ZodError) {
        return res.status(422).json({
          status: false,
          errors: error.errors
        });
      }

      next(error);
    }
  }

}