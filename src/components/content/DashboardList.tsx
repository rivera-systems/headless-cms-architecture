"use client";

import { useOptimistic } from "react";
import { createContentTypeAction } from "@/actions";
import { ContentType } from "@/lib/types/content";
import { SubmitButton } from "@/components/ui/SubmitButton";

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
      // Logic to temporarily add the new item to the array
      return [...currentState, newOptimisticItem];
    }
  );

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
      isOptimistic: true, // Optimistic flag for styling (e.g., greyed out)
    });

    // B. Real Mutation: Invoke the Server Action
    try {
      await createContentTypeAction(formData);
      // On success, revalidatePath() inside the action forces the RSC fetch
    } catch (error) {
      // In a real scenario, you might add logic here to manually revert the state
      console.error("Mutation failed:", error);
      // For now, useOptimistic handles the automatic reversion on error
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Content Types Dashboard</h1>

      {/* Form for creating new items, using the Server Action wrapper */}
      <form action={handleCreate} className="p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-3">Create New Type</h2>
        {/* Simplified form structure for illustration */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="p-2 border rounded mr-2"
          required
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          className="p-2 border rounded mr-2"
          required
        />
        <SubmitButton>Create Type</SubmitButton>
      </form>

      {/* List/Table Rendering */}
      <ul className="divide-y divide-gray-200">
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
