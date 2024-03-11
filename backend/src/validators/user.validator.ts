import { User } from "#/models/user.model";
import { z } from "zod";


const userValidator = z.object({
  name: z
    .string()
    .min(1)
    .max(30),

  email: z
    .string()
    .email()
    .transform(v => v.toLowerCase())
    .refine(async (email) => {
      const userCount = await User.find({ email }).countDocuments();
      return userCount <= 0;
    }, "already exist!"),

  password: z
    .string()
    .min(6)
    .max(30)
})

export default userValidator;