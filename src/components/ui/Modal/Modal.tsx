"use client";

import React, {
  FC,
  createContext,
  isValidElement,
  ReactNode,
  useContext,
  useMemo,
  memo,
  ReactElement,
  ButtonHTMLAttributes,
  Children,
} from "react";
import { useToggle } from "@/lib/hooks/useToggle";
import Button from "../Button";

// --- 1. CONTEXT DEFINITION ---

interface ModalContextType {
  // State from our custom hook
  isOpen: boolean;
  // Controls from our custom hook (memorized via useCallback in useToggle)
  closeModal: () => void;
  openModal: () => void;
  toggleModal: () => void;
}

// Create the context instance. We use 'null' initially and throw an error
// if used outside the provider (advanced TS safety).
const ModalContext = createContext<ModalContextType | null>(null);
const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a <Modal>");
  }
  return context;
};

// --- 2. THE COMPOUND SUB-COMPONENTS (Modified for simplicity) ---

// A. Modal.Trigger - Handles the click and cloning
export const ModalTrigger: FC<{ children: ReactNode }> = ({ children }) => {
  const { toggleModal } = useModal();

  // Find the single valid element (the button) ignoring whitespace
  const childrenArray = Children.toArray(children);
  const buttonElement = childrenArray.find((child) => isValidElement(child));

  if (buttonElement) {
    // Corrected TS casting for safe cloning
    const elementToClone = buttonElement as ReactElement<
      ButtonHTMLAttributes<HTMLButtonElement>
    >;

    // Clone and inject the handler.
    return React.cloneElement(elementToClone, {
      onClick: toggleModal,
    });
  }

  // Renders a basic div if no valid child is found (for debugging visibility)
  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        style={{ backgroundColor: "orange", color: "white", padding: "5px" }}
      >
        [TRIGGER MISSING CHILD]
      </div>
    );
  }

  return null;
};

// B. Modal.Header - Displays the title and the close button
export const ModalHeader: FC<{ title: string }> = memo(({ title }) => {
  const { closeModal } = useModal();
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <Button variant="ghost" onClick={closeModal} className="p-1">
        X
      </Button>
    </div>
  );
});

ModalHeader.displayName = "ModalHeader";

// C. Modal.Content - The main content area
export const ModalContent: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="p-6">{children}</div>;
};

// --- 3. THE MAIN COMPOUND COMPONENT (Provider) ---

interface ModalProps {
  // 💡 Simplified: The children are only the content parts (Header, Content).
  children: ReactNode;
  initialOpen?: boolean;

  // 💡 NEW PROP: Explicitly receive the Trigger element.
  trigger: ReactNode;
}

/**
 * The main Modal Provider component.
 * It manages state and renders the explicit 'trigger' prop OUTSIDE the modal body.
 * NOTE: This version uses explicit props for Trigger/Content to bypass Next.js RSC complexities.
 */
const ModalComponent: FC<ModalProps> = ({
  children,
  initialOpen = false,
  trigger,
}) => {
  const [isOpen, toggleModal, openModal, closeModal] = useToggle(initialOpen);

  const contextValue = useMemo(
    () => ({ isOpen, closeModal, openModal, toggleModal }),
    [isOpen, closeModal, openModal, toggleModal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {/* 💡 RENDER THE EXPLICIT TRIGGER PROP HERE */}
      {trigger}

      {/* RENDER THE MODAL CONTENT */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center transition-opacity"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full m-4">
            {/* All remaining content (Header/Content) is passed as children */}
            {children}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

// --- 4. ASSEMBLE AND EXPORT THE COMPOUND COMPONENT ---

type ModalCompound = FC<ModalProps> & {
  Trigger: typeof ModalTrigger;
  Header: typeof ModalHeader;
  Content: typeof ModalContent;
};

// Assemble the compound component object
const Modal = Object.assign(ModalComponent, {
  Trigger: ModalTrigger,
  Header: ModalHeader,
  Content: ModalContent,
}) as ModalCompound;

export default Modal;
