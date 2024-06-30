
import { z } from "zod"
const todoSchema = z.object({
    content: z.string().min(6, "Minimum six character")
})

