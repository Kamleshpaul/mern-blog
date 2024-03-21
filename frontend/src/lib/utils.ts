import { ServerError, ServerValidationErrors } from "@/types/errors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function isServerValidationError(error: unknown): error is FetchBaseQueryError {
  return (error as ServerValidationErrors)?.data !== undefined && (error as ServerValidationErrors)?.status === 422;
}
export function isServerError(error: unknown): error is FetchBaseQueryError {
  return (error as ServerError)?.status !== undefined && (error as ServerValidationErrors)?.status === 400;
}