import { Category } from "#/models/category.model";
import { z } from "zod";


const categoryValidator = z.object({
  name: z
    .string()
    .min(1)
    .max(30)
    .transform(v => v.toLowerCase())
    .refine(async (name) => {
      const userCount = await Category.find({ name }).countDocuments();
      return userCount <= 0;
    }, "already exist!"),
})

export default categoryValidator;