import z from "zod";

export class NoteValidation {
    static CREATE = z.object({
        title: z.string().min(1, "Title is required"),
        content: z.string().min(1, "Content is required"),
    })
}