import { z } from "zod";

// Define the schema for a Content Type
export const contentTypeSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name is too long"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters long")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  description: z
    .string()
    .max(200, "Description cannot exceed 200 characters")
    .optional()
    .or(z.literal("")), // Allows empty string as valid optional
});

// Infer the TypeScript type from the schema
export type ContentTypeInput = z.infer<typeof contentTypeSchema>;
