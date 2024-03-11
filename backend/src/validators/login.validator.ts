import { z } from "zod";


const loginValidator = z.object({
  email: z
    .string()
    .email()
    .transform(v => v.toLowerCase()),

  password: z
    .string()
    .min(6)
    .max(30)
})

export default loginValidator;