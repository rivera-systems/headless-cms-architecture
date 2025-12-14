/**
 * Global interface for common component props.
 * Used for form elements where an optional label is often required.
 */
export interface ComponentBaseProps {
  // A descriptive label for accessibility and display.
  label?: string;
  // An optional helper text for user guidance.
  helperText?: string;
  // Custom class for styling the container element.
  containerClassName?: string;
}
