"use server";

import { revalidatePath } from "next/cache";
import { contentTypeSchema } from "../schemas/contentTypeSchema";

// Define a type for the response to keep it consistent
export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>; // Holds Zod field errors
};

export async function createContentTypeAction(
  formData: FormData
): Promise<ActionResponse> {
  const rawData = {
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
  };

  const validatedFields = contentTypeSchema.safeParse(rawData);

  if (!validatedFields.success) {
    // FIX: Access fieldErrors from the flattened error object
    return {
      success: false,
      message: "Validation failed",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate DB save
  console.log("Saving to DB:", validatedFields.data);

  revalidatePath("/");

  return {
    success: true,
    message: "Content type created successfully",
  };
}
