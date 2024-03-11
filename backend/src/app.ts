import express, { Response, Request } from "express";

import "dotenv/config";
import { APP_DB, MONGO_URI, PORT } from "#/config";
import { errorHandler, notFound } from "#/middlewares/app.middleware";
import userRoutes from "./routes/user.route";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("works");
});

app.use('/api/users', userRoutes);


app.use(notFound);
app.use(errorHandler);

mongoose.connect(MONGO_URI, {
  dbName: APP_DB
}).catch(error => {
  console.log(`Mongoose Error ${error}`);
})
app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
