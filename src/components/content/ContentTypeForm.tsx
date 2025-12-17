"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useModal } from "@/components/ui/Modal/Modal";

// Define the shape of the form data
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

export const ContentTypeForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const { closeModal } = useModal(); // Hook to access modal context

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    // Simple logic to automatically generate slug from name
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
      ...(id === "name" && { slug: newSlug }), // Update slug only if name changes
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitting new Content Type:", formData);

    // Simulate API success: close modal and reset form
    alert(`Content Type "${formData.name}" created successfully!`);

    setFormData(initialFormState); // Reset form
    closeModal(); // Close the modal via context
  };

  const isFormValid =
    formData.name.trim() !== "" && formData.slug.trim() !== "";

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <Input
        label="Name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="e.g., Blog Post"
        required
      />

      <Input
        label="Slug"
        id="slug"
        value={formData.slug}
        onChange={handleChange}
        placeholder="e.g., blog-post"
        required
      />

      <div className="space-y-1">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description (Optional)
        </label>
        <textarea
          id="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          placeholder="A brief description of this content type."
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        {/* Button to cancel/close the modal */}
        <Button
          variant="secondary"
          onClick={closeModal}
          type="button" // Important to prevent form submission
        >
          Cancel
        </Button>

        {/* Submit button */}
        <Button variant="primary" type="submit" disabled={!isFormValid}>
          Create Type
        </Button>
      </div>
    </form>
  );
};
