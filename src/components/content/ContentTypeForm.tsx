"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import Button from "@/components/ui/Button";
import { useModal } from "@/components/ui/Modal/Modal";

interface FormState {
  name: string;
  slug: string;
  description: string;
}

const initialFormState: FormState = {
  name: "",
  slug: "",
  description: "",
};

interface ContentTypeFormProps {
  action: (formData: FormData) => Promise<void>;
}

export const ContentTypeForm: React.FC<ContentTypeFormProps> = ({ action }) => {
  const [formData, setFormData] = useState<FormState>(initialFormState); // RESTORED
  const { closeModal } = useModal();

  // RESTORED: Client-side logic for generating the slug
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    let newSlug = formData.slug;
    if (id === "name") {
      newSlug = value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [id]: value,
      ...(id === "name" && { slug: newSlug }),
    }));
  };

  // Wrapper function to execute the Server Action and immediately close the modal.
  const handleAction = (formData: FormData) => {
    // 1. Execute the Server Action/Optimistic wrapper logic
    action(formData);

    // 2. Close modal immediately for a fast UX
    closeModal();
    setFormData(initialFormState); // Reset form state after submission
  };

  const labelClasses =
    "block text-sm font-medium text-gray-700 dark:text-gray-200";

  const placeholderClasses =
    "placeholder:text-gray-400 dark:placeholder:text-gray-500";

  return (
    // Pass the handleAction wrapper to the native 'action' attribute
    <form
      action={handleAction}
      className="space-y-4 p-6 bg-white dark:bg-[#1c1c1c] rounded-b-lg"
    >
      <label className={`${labelClasses}`}>Name</label>
      <Input
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="e.g., Blog Post"
        required
        className={`dark:bg-[#2a2a2a] dark:text-white dark:border-gray-700 ${placeholderClasses}`}
      />
      <label className={`${labelClasses}`}>Slug</label>
      <Input
        id="slug"
        name="slug"
        value={formData.slug}
        onChange={handleChange}
        placeholder="e.g., blog-post"
        className={`dark:bg-[#2a2a2a] dark:text-white dark:border-gray-700 ${placeholderClasses}`}
        required
      />
      <div className="space-y-1">
        <label htmlFor="description" className={`${labelClasses}`}>
          Description (Optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white p-2 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none ${placeholderClasses}`}
          placeholder="A brief description of this content type."
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t mt-4">
        <Button variant="secondary" onClick={closeModal} type="button">
          Cancel
        </Button>

        <SubmitButton>Save Content Type</SubmitButton>
      </div>
    </form>
  );
};
