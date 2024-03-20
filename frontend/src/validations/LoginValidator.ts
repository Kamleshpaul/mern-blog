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

export type ILoginPayload = z.infer<typeof loginValidator>;
export default loginValidator;