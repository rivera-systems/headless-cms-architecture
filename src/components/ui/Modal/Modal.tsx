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
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { useToggle } from "@/lib/hooks/useToggle";
import Button from "../Button";

// --- 1. CONTEXT DEFINITION ---

interface ModalContextType {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  toggleModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a <Modal>");
  }
  return context;
};

// --- 2. THE COMPOUND SUB-COMPONENTS---

// A. Modal.Trigger - Handles the click and cloning
export const ModalTrigger: FC<{ children: ReactNode }> = ({ children }) => {
  const { toggleModal } = useModal();

  const childrenArray = Children.toArray(children);
  const buttonElement = childrenArray.find((child) => isValidElement(child));

  if (buttonElement) {
    const elementToClone = buttonElement as ReactElement<
      ButtonHTMLAttributes<HTMLButtonElement>
    >;

    return React.cloneElement(elementToClone, {
      onClick: toggleModal,
    });
  }

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

// B. Modal.Header
export const ModalHeader: FC<{ title: string }> = ({ title }) => {
  const { closeModal } = useModal();

  return (
    <div className="flex items-center justify-between p-4 border-b dark:border-gray-800 bg-white dark:bg-[#1c1c1c] rounded-t-lg">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>

      <button
        onClick={closeModal}
        className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white transition-colors"
        aria-label="Close modal"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

ModalHeader.displayName = "ModalHeader";

// C. Modal.Content
export const ModalContent: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 rounded-b-lg">
      {children}
    </div>
  );
};

// --- 3. THE MAIN COMPOUND COMPONENT (Provider) ---

interface ModalProps {
  children: ReactNode;
  initialOpen?: boolean;
  trigger?: ReactNode;
}

/**
 * The main Modal Provider component.
 * It now renders all its children (including the dashboard section and internal ModalTrigger)
 * directly in the page flow, while rendering the modal window itself via a portal.
 */
const ModalComponent: FC<ModalProps> = ({
  children,
  initialOpen = false,
  trigger,
}) => {
  const [isOpen, toggleModalBase, openModal, closeModal] =
    useToggle(initialOpen);

  const toggleModal = useCallback(() => toggleModalBase(), [toggleModalBase]);

  const contextValue = useMemo(
    () => ({ isOpen, closeModal, openModal, toggleModal }),
    [isOpen, closeModal, openModal, toggleModal]
  );

  const modalPortal = useMemo(() => {
    if (!isOpen) return null;

    if (typeof document === "undefined") return null;

    return createPortal(
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center transition-opacity"
        aria-modal="true"
        role="dialog"
      >
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full m-4 relative">
          {children}
        </div>
      </div>,
      document.body
    );
  }, [isOpen, children]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}

      {trigger && <ModalTrigger>{trigger}</ModalTrigger>}

      {modalPortal}
    </ModalContext.Provider>
  );
};

// --- 4. ASSEMBLE AND EXPORT THE COMPOUND COMPONENT ---

type ModalCompound = FC<ModalProps> & {
  Trigger: typeof ModalTrigger;
  Header: typeof ModalHeader;
  Content: typeof ModalContent;
};

const Modal = Object.assign(ModalComponent, {
  Trigger: ModalTrigger,
  Header: ModalHeader,
  Content: ModalContent,
}) as ModalCompound;

export default Modal;
