import { MS_IN_DAY, MS_IN_HOUR, MS_IN_MINUTE } from "@/lib/constants/time";
import { ContentType } from "@/lib/types/content";

let mockContentTypes: ContentType[] = [
  {
    id: "ct-1",
    name: "Post",
    slug: "post",
    description: "Blog articles and news.",
    fieldsCount: 5,
    lastUpdated: new Date(Date.now() - MS_IN_HOUR),
  },
  {
    id: "ct-2",
    name: "Product",
    slug: "product",
    description: "Product sheets for the e-commerce store.",
    fieldsCount: 12,
    lastUpdated: new Date(Date.now() - MS_IN_DAY),
  },
  {
    id: "ct-3",
    name: "Author",
    slug: "author",
    description: "Profiles of content authors.",
    fieldsCount: 4,
    lastUpdated: new Date(Date.now() - MS_IN_MINUTE * 10),
  },
];

/**
 * Retrieves all content types from the memory store.
 */
export async function getContentViews(): Promise<ContentType[]> {
  return [...mockContentTypes];
}

/**
 * Persists a new content type to the memory store.
 */
export async function createContentType(data: {
  name: string;
  slug: string;
  description?: string;
}) {
  const newType: ContentType = {
    id: Math.random().toString(36).substr(2, 9),
    name: data.name,
    slug: data.slug,
    description: data.description || "",
    fieldsCount: 0,
    lastUpdated: new Date(),
  };

  mockContentTypes.push(newType);
  return newType;
}

/**
 * Removes a content type by ID from the memory store.
 */
export async function deleteContentType(id: string) {
  // Re-assigning the filtered array to the let variable
  mockContentTypes = mockContentTypes.filter((item) => item.id !== id);
  return { success: true };
}
