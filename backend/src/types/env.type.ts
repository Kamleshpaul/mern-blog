import "dotenv/config";
import { z } from "zod";



const envVariables = z.object({
  APP_ENV: z.string(),
  APP_DB: z.string(),
  TOKEN_KEY: z.string(),
  APP_PORT: z.string(),
  MONGO_URI: z.string(),
  JWT_KEY: z.string(),
});


const parseResults = envVariables.safeParse(process.env);

if (!parseResults.success) {
  console.log(parseResults.error.flatten().fieldErrors);

}


declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> { }
  }
}