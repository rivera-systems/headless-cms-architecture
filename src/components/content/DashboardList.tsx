"use client";

import { useOptimistic } from "react";
import { createContentTypeAction } from "@/lib/actions/contentActions"; // Check path
import { ContentType } from "@/lib/types/content";
import Modal, { ModalContent, ModalHeader } from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button";
import { ContentTypeForm } from "./ContentTypeForm";

// Type for the optimistic element (includes the temporary flag)
type OptimisticContentType = ContentType & { isOptimistic?: boolean };

interface DashboardListProps {
  initialContentTypes: ContentType[];
}

export function DashboardList({ initialContentTypes }: DashboardListProps) {
  const [optimisticContentTypes, addOptimisticContentType] = useOptimistic(
    initialContentTypes as OptimisticContentType[],
    (
      currentState: OptimisticContentType[],
      newOptimisticItem: OptimisticContentType
    ) => {
      return [...currentState, newOptimisticItem];
    }
  );

  // Wrapper function for the Server Action (handles Validation and Optimistic UI flow)
  const handleCreate = async (formData: FormData) => {
    // 1. Invoke the Server Action and get the Zod validation result
    const result = await createContentTypeAction(formData);

    // 2. If validation failed, return the result to ContentTypeForm to show errors
    // and STOP the optimistic update.
    if (result && !result.success) {
      return result;
    }

    // 3. If validation passed, trigger the Optimistic Action
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description =
      (formData.get("description") as string) || "New Content Type (Pending)";

    addOptimisticContentType({
      id: `temp-${Date.now()}`,
      name: name,
      slug: slug,
      description: description,
      fieldsCount: 0,
      lastUpdated: new Date(),
      isOptimistic: true,
    });

    return result;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Content Types Dashboard
      </h1>

      <Modal
        initialOpen={false}
        trigger={<Button variant="primary">Create New Content Type</Button>}
      >
        <ModalHeader title="Create New Content Type" />
        <ModalContent>
          <ContentTypeForm action={handleCreate} />
        </ModalContent>
      </Modal>

      <div className="mt-6 overflow-hidden rounded-lg bg-white shadow-md dark:bg-[#1c1c1c] border dark:border-gray-800">
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {optimisticContentTypes.map((type) => (
            <li
              key={type.id}
              className={`p-4 ${type.isOptimistic ? "opacity-50" : ""}`}
            >
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {type.name}{" "}
                <span className="text-gray-500 text-sm">({type.slug})</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {type.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
