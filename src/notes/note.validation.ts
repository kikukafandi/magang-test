import z from "zod";

export class NoteValidation {
    static readonly CREATE = z.object({
        title: z.string().min(1).max(100),
        content: z.string().min(1),
        categoryId: z.number().optional(), 
    });

    static readonly UPDATE = z.object({
        title: z.string().min(1).max(100).optional(),
        content: z.string().min(1).optional(),
        categoryId: z.number().optional(), 
    });
}