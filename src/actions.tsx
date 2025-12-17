"use server";

import { revalidatePath } from "next/cache";
import { createContentType } from "@/services/contentService";

/**
 * Processes the creation of a new Content Type.
 * This function is invoked directly from the Client Component Form.
 * @param formData Data sent from the native HTML form.
 */
export async function createContentTypeAction(formData: FormData) {
  // 1. Data extraction and validation (Executed on the server)
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  if (!name || !slug) {
    throw new Error("Missing required fields.");
  }

  // 2. Simulation of business logic and persistence
  console.log(`[SERVER ACTION] Creating Content Type: ${name} (${slug})`);
  const newId = await createContentType({ name, slug }); // Simulates the DB call

  // 3. Cache Invalidation (Revalidation)
  // Forces Next.js to re-execute the dashboard fetching (Module 3)
  // The path '/' is the dashboard containing the list.
  revalidatePath("/");

  // 4. Return: The component that invoked the action can use this ID.
  return newId;
}
