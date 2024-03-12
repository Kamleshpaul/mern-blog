import { z } from "zod";


const categoryValidator = z.object({
  name: z
    .string()
    .min(1)
    .max(30),
})

export default categoryValidator;