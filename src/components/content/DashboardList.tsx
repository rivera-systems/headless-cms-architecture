"use client";

import { useOptimistic, useTransition } from "react";
import {
  createContentTypeAction,
  deleteContentTypeAction,
} from "@/lib/actions/contentActions";
import { ContentType } from "@/lib/types/content";
import Modal, { ModalContent, ModalHeader } from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button";
import { ContentTypeForm } from "./ContentTypeForm";
import { TrashIcon } from "@/components/ui/Icons";

type OptimisticContentType = ContentType & { isOptimistic?: boolean };

export function DashboardList({
  initialContentTypes,
}: {
  initialContentTypes: ContentType[];
}) {
  const [isPending, startTransition] = useTransition();

  // Optimistic state: Initialized with server data
  const [optimisticContentTypes, setOptimistic] = useOptimistic(
    initialContentTypes as OptimisticContentType[],
    (state, action: { type: "ADD" | "DELETE"; payload: any }) => {
      if (action.type === "ADD") return [...state, action.payload];
      if (action.type === "DELETE")
        return state.filter((i) => i.id !== action.payload);
      return state;
    }
  );

  const handleCreate = async (formData: FormData) => {
    let result: any;

    startTransition(async () => {
      // 1. Instant UI Feedback
      setOptimistic({
        type: "ADD",
        payload: {
          id: Date.now().toString(),
          name: String(formData.get("name")),
          slug: String(formData.get("slug")),
          description: String(formData.get("description")),
          fieldsCount: 0,
          lastUpdated: new Date(),
          isOptimistic: true,
        },
      });

      // 2. Server execution
      result = await createContentTypeAction(formData);
    });

    return result;
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      setOptimistic({ type: "DELETE", payload: id });
      await deleteContentTypeAction(id);
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>

      <Modal
        trigger={<Button variant="primary">Create New Content Type</Button>}
      >
        <ModalHeader title="New Content Type" />
        <ModalContent>
          <ContentTypeForm action={handleCreate} />
        </ModalContent>
      </Modal>

      <div className="mt-6 overflow-hidden rounded-lg bg-white dark:bg-[#1c1c1c] border dark:border-gray-800 shadow">
        <ul className="divide-y dark:divide-gray-800">
          {optimisticContentTypes.map((type) => (
            <li
              key={type.id}
              className={`group flex items-center justify-between p-4 ${
                type.isOptimistic ? "opacity-40 animate-pulse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="font-medium dark:text-gray-100">
                  {type.name}{" "}
                  <span className="text-gray-500 text-sm">({type.slug})</span>
                </div>
                <div className="text-sm text-gray-500">{type.description}</div>
              </div>
              {!type.isOptimistic && (
                <button
                  onClick={() => handleDelete(type.id)}
                  disabled={isPending}
                  className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <TrashIcon size={20} />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
