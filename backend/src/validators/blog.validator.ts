import { Blog } from "#/models/blog.model";
import { Category } from "#/models/category.model";
import { User } from "#/models/user.model";
import { z } from "zod";


const blogValidator = z.object({
  title: z
    .string()
    .min(1)
    .max(300),

  image: z
    .string()
    .min(1),

  slug: z
    .string()
    .min(1)
    .refine(async (slug) => await Blog.find({ slug }).countDocuments() <= 0, "Already exits!"),

  body: z
    .string()
    .min(1),

  category: z
    .string()
    .min(1)
    .refine(async (id) => await Category.findById(id).countDocuments() >= 0, "Invalid Category!"),

  author: z
    .string()
    .min(1)
    .refine(async (id) => await User.findById(id).countDocuments() >= 0, "Invalid User!"),

})

export default blogValidator;