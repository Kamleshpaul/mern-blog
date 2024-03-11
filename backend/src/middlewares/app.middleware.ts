import { NextFunction, Request, Response } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404)
    .send(`Not Found - ${req.originalUrl}`);
}

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {

  if (error.name === 'CastError') {
    return res.status(404)
      .send(`Not Found - ${req.originalUrl}`);

  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.APP_ENV === 'production' ? '' : error.stack,
  });

}