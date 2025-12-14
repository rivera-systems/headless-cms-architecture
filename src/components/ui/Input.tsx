import React, { FC, InputHTMLAttributes } from "react";
import { ComponentBaseProps } from "@/lib/types";

// Extend native Input props and our custom base props
interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    ComponentBaseProps {
  // Specific prop to easily handle error states
  error?: boolean;
}

/**
 * Reusable Input Component.
 * Supports native HTML input props, explicit error state, and label/helperText.
 * @param {InputProps} props - The component properties.
 */
const Input: FC<InputProps> = ({
  label,
  helperText,
  containerClassName = "",
  className = "",
  error = false,
  ...rest
}) => {
  // Base styling logic for the input field
  const baseClasses =
    "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm";

  // Dynamic styling based on error state
  const errorClasses = error
    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className={containerClassName}>
      {/* Label rendering if provided */}
      {label && (
        <label
          htmlFor={rest.id || rest.name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        // Combined classes for a clean style structure
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...rest}
      />

      {/* Helper or Error text */}
      {(helperText || error) && (
        <p
          className={`mt-1 text-xs ${error ? "text-red-600" : "text-gray-500"}`}
        >
          {error && "Error: "}
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
