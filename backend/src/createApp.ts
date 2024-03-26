import express, { Response, Request } from "express";

import '#/types/env.type';
import { errorHandler, notFound } from "#/middlewares/app.middleware";
import cookieParser from "cookie-parser"
import cors from 'cors'


import authRoutes from "#/routes/auth.route";
import userRoutes from "#/routes/user.route";
import categoryRoutes from "#/routes/category.route";
import blogRoutes from "#/routes/blog.route";
import helmet from "helmet";


const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cookieParser())
  app.use(express.json());
  app.use(cors({
    origin: [
      process.env.APP_ENV === "local" ? /^http:\/\/localhost(:\d+)?$/ : '', // all localhost
    ],
    credentials: true
  }))


  app.get("/", (req: Request, res: Response) => {
    res.send("works");
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/blogs', blogRoutes);


  app.use(notFound);
  app.use(errorHandler);

  return app;
}

export default createApp;