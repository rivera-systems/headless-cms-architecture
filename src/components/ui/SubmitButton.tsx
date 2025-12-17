"use client";

import { useFormStatus } from "react-dom";
import Button from "./Button";

/**
 * A custom submit button that leverages the useFormStatus hook
 * to display a loading state and disable the button during Server Action execution.
 */
export function SubmitButton({ children }: { children: React.ReactNode }) {
  // React hook that provides the pending status of the form's Server Action.
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="primary"
      disabled={pending} // Disabled while the Server Action is in flight
    >
      {pending ? "Processing..." : children}
    </Button>
  );
}
