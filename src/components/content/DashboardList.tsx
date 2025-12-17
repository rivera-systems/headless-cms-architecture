"use client";

import { useOptimistic } from "react";
import { createContentTypeAction } from "@/actions";
import { ContentType } from "@/lib/types/content";
import Modal, {
  ModalTrigger,
  ModalContent,
  ModalHeader,
} from "@/components/ui/Modal/Modal";
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

  // Wrapper function for the Server Action (handles Optimistic UI flow)
  const handleCreate = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;

    if (!name || !slug) return;

    // A. Optimistic Action: Update UI BEFORE server response
    addOptimisticContentType({
      id: `temp-${Date.now()}`,
      name: name,
      slug: slug,
      description: "New Content Type (Pending)",
      fieldsCount: 0,
      lastUpdated: new Date(),
      isOptimistic: true,
    });

    // B. Real Mutation: Invoke the Server Action
    try {
      await createContentTypeAction(formData);
    } catch (error) {
      console.error("Mutation failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Content Types Dashboard</h1>

      {/* Modal Integration: The trigger button for the creation flow */}
      <Modal
        initialOpen={false}
        trigger={<Button variant="primary">Create New Content Type</Button>}
      >
        <ModalHeader title="Create New Content Type" />
        <ModalContent>
          {/* Pass the handleCreate function (Server Action wrapper) to the form */}
          <ContentTypeForm action={handleCreate} />
        </ModalContent>
      </Modal>

      {/* List/Table Rendering: Displays the optimistic list */}
      <ul className="divide-y divide-gray-200 mt-6">
        {optimisticContentTypes.map((type) => (
          <li
            key={type.id}
            className={`p-4 ${
              type.isOptimistic ? "opacity-50 text-gray-500 italic" : "bg-white"
            }`}
          >
            <div className="font-medium">
              {type.name} ({type.slug})
            </div>
            <div className="text-sm">{type.description}</div>
            {type.isOptimistic && (
              <span className="text-xs text-blue-500"> (Pending...)</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
