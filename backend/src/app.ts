import express, { Response, Request } from "express";

import '#/types/env.type';
import { errorHandler, notFound } from "#/middlewares/app.middleware";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"


import authRoutes from "#/routes/auth.route";
import userRoutes from "#/routes/user.route";
import categoryRoutes from "./routes/category.route";


const app = express();
app.use(cookieParser())
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.send("works");
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);


app.use(notFound);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI, {
  dbName: process.env.APP_DB
}).catch(error => {
  console.log(`Mongoose Error ${error}`);
})
app.listen(process.env.APP_PORT, () => {
  console.log(`app listening on http://localhost:${process.env.APP_PORT}`);
});
