import "dotenv/config";

export const PORT = process.env.PORT || 4000;

export const APP_DB = process.env.APP_DB || 'test';


export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/example";
