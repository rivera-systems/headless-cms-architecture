import React, { FC, ButtonHTMLAttributes } from "react";

/**
 * Interface extending native HTML Button attributes.
 * This ensures the component is fully accessible and inherits standard button props (e.g., disabled, type).
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Variants are a good practice for documenting and managing styling options.
  variant?: "primary" | "secondary" | "danger" | "ghost";
  // Explicitly typing children when using FC (Functional Component)
  children: React.ReactNode;
}

/**
 * Reusable Button Component with Advanced TypeScript Typing.
 * Adheres to the principle of Pure Components (only props).
 * Maintains accessibility by extending all native button properties.
 */
const Button: FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...rest
}) => {
  // Simple logic for classes based on the variant
  // (in a real project, you would typically use Tailwind variants or CSS Modules)
  const baseClasses =
    "px-4 py-2 font-semibold rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  let variantClasses = "";

  switch (variant) {
    case "primary":
      variantClasses =
        "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500";
      break;
    case "secondary":
      variantClasses =
        "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400";
      break;
    case "danger":
      variantClasses =
        "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500";
      break;
    case "ghost":
      variantClasses =
        "bg-transparent hover:bg-gray-100 text-gray-800 focus:ring-gray-400 border border-gray-300";
      break;
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
