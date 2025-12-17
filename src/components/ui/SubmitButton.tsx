"use client";

import { useFormStatus } from "react-dom";
import Button from "./Button";

/**
 * A custom submit button that leverages the useFormStatus hook
 * to display a loading state and disable the button during Server Action execution.
 */
export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="primary" disabled={pending}>
      {/* If pending, show 'Processing...', otherwise show the children prop (e.g., 'Create Type') */}
      {pending ? "Processing..." : children}
    </Button>
  );
}
