import mongoose from "mongoose";
import createApp from "#/createApp";


const app = createApp();

mongoose.connect(process.env.MONGO_URI, {
  dbName: process.env.APP_DB
}).catch(error => {
  console.log(`Mongoose Error ${error}`);
})
app.listen(process.env.APP_PORT, () => {
  console.log(`app listening on http://localhost:${process.env.APP_PORT}`);
});