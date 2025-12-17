import {
  MS_IN_DAY,
  MS_IN_HOUR,
  MS_IN_MINUTE,
  MS_IN_SECOND,
} from "@/lib/constants/time";
import { ContentType } from "@/lib/types/content";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockContentTypes: ContentType[] = [
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
 * Service that simulates fetching the list of Content Types.
 * This function is designed to be called only from a React Server Component (RSC).
 * @returns Promise that resolves to an array of ContentType.
 */
export async function getContentViews(): Promise<ContentType[]> {
  // Simulate an async fetch and network/DB latency
  await delay(MS_IN_SECOND);

  // In a real environment, this would be a fetch(db_url) or db.query()
  return mockContentTypes;
}

/**
 * Simulates saving a new Content Type to the database.
 * @param newType Object containing the name and slug of the new type.
 * @returns Promise that resolves to the ID of the new Content Type.
 */
export async function createContentType(newType: {
  name: string;
  slug: string;
}): Promise<string> {
  await delay(MS_IN_SECOND * 0.5); // Simulate DB latency

  const newId = `ct-${mockContentTypes.length + 1}`;

  const newContentType: ContentType = {
    id: newId,
    name: newType.name,
    slug: newType.slug,
    description: "New Content Type created by user.",
    fieldsCount: 0,
    lastUpdated: new Date(),
  };

  mockContentTypes.push(newContentType); // Añadir al mock (en memoria)

  return newId;
}
