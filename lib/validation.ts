import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title can't be more than 100 characters"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description can't be more than 500 characters"),

  category: z
    .string()
    .min(3, "Category must be at least 3 characters")
    .max(20, "Category can't be more than 20 characters"),

  link: z
    .string()
    .url("Link must be a valid URL....")
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");
        return contentType?.startsWith("image/");
      } catch {
        return false;
      }
    }),

  pitch: z.string().min(10, "Pitch must be at least 10 characters"),
});
