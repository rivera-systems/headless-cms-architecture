"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import Button from "@/components/ui/Button";
import { useModal } from "@/components/ui/Modal/Modal";
import { ActionResponse } from "@/lib/actions/contentActions";
import { WarningIcon } from "../ui/Icons";

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
  action: (formData: FormData) => Promise<ActionResponse | void>;
}

export const ContentTypeForm: React.FC<ContentTypeFormProps> = ({ action }) => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { closeModal } = useModal();

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

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleAction = async (formData: FormData) => {
    const result = await action(formData);

    if (result && !result.success && result.errors) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    closeModal();
    setFormData(initialFormState);
  };

  const labelClasses =
    "block text-sm font-medium text-gray-700 dark:text-gray-200";
  const placeholderClasses =
    "placeholder:text-gray-400 dark:placeholder:text-gray-500";
  const errorContainerClasses =
    "flex items-center gap-3 mt-1.5 py-1.5 px-3 rounded bg-red-50/50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30";
  const errorTextClasses =
    "text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-wider";

  return (
    <form
      action={handleAction}
      className="space-y-4 p-6 bg-white dark:bg-[#1c1c1c] rounded-b-lg"
    >
      {/* NAME FIELD */}
      <div>
        <label htmlFor="name" className={labelClasses}>
          Name
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Blog Post"
          className={`dark:bg-[#2a2a2a] dark:text-white ${placeholderClasses} ${
            errors.name
              ? "border-red-500 ring-2 ring-red-500"
              : "border-gray-300 dark:border-gray-700"
          }`}
        />
        {errors.name && (
          <div className={errorContainerClasses}>
            <WarningIcon />
            <span className={errorTextClasses}>{errors.name[0]}</span>
          </div>
        )}
      </div>

      {/* SLUG FIELD */}
      <div>
        <label htmlFor="slug" className={labelClasses}>
          Slug
        </label>
        <Input
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="e.g., blog-post"
          className={`dark:bg-[#2a2a2a] dark:text-white ${placeholderClasses} ${
            errors.slug
              ? "border-red-500 ring-2 ring-red-500"
              : "border-gray-300 dark:border-gray-700"
          }`}
        />
        {errors.slug && (
          <div className={errorContainerClasses}>
            <WarningIcon />
            <span className={errorTextClasses}>{errors.slug[0]}</span>
          </div>
        )}
      </div>

      {/* DESCRIPTION FIELD */}
      <div className="space-y-1">
        <label htmlFor="description" className={labelClasses}>
          Description (Optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          placeholder="A brief description of this content type."
          className={`mt-1 block w-full rounded-md border bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white p-2 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all ${placeholderClasses} ${
            errors.description
              ? "border-red-500 ring-2 ring-red-500"
              : "border-gray-300 dark:border-gray-700"
          }`}
        />
        {errors.description && (
          <div className={errorContainerClasses}>
            <WarningIcon />
            <span className={errorTextClasses}>{errors.description[0]}</span>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t mt-4 border-gray-100 dark:border-gray-800">
        <Button variant="secondary" onClick={closeModal} type="button">
          Cancel
        </Button>
        <SubmitButton>Save Content Type</SubmitButton>
      </div>
    </form>
  );
};
