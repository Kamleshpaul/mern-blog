import { z } from "zod";


const registerValidator = z.object({
  name: z
    .string()
    .min(1),

  email: z
    .string()
    .email()
    .transform(v => v.toLowerCase()),

  password: z
    .string()
    .min(6)
    .max(30)
})

export type IRegisterPayload = z.infer<typeof registerValidator>;
export default registerValidator;