import { ZodError } from "zod";

export interface ServerValidationErrors {
  status: number;
  data: ZodError;
}


export interface ServerError {
  status: boolean;
  message: string;
} 