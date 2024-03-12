import { z } from "zod";


const blogCommentValidator = z.object({
  comment: z
    .string()
    .min(1)
    .max(300),
})

export type IBlogComment = z.infer<typeof blogCommentValidator>;
export default blogCommentValidator;