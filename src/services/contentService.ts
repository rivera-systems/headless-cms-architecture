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
