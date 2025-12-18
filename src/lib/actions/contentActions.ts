"use server";

import { revalidatePath } from "next/cache";
import {
  createContentType,
  deleteContentType,
} from "@/services/contentService";
import { contentTypeSchema } from "../schemas/contentTypeSchema";

// Explicitly export the type so it can be imported in the DashboardList
export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

/**
 * Server action to create a content type with server-side validation.
 */
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
    return {
      success: false,
      message: "Validation failed",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Persist the data in the service before revalidating
  await createContentType(validatedFields.data);

  revalidatePath("/");
  return { success: true, message: "Created successfully" };
}

/**
 * Server action to delete a content type.
 */
export async function deleteContentTypeAction(
  id: string
): Promise<ActionResponse> {
  await deleteContentType(id);

  revalidatePath("/");
  return { success: true, message: "Deleted successfully" };
}
