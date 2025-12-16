# 🚀 Headless CMS Mockup — Enterprise UI Layer

This project establishes the foundational **UI layer and architectural patterns** for a modern **Headless CMS** application, designed with enterprise-grade concerns in mind.  
It leverages the **Next.js App Router** and **React Server Components (RSC)** to achieve high performance, strong type safety, and clean separation of responsibilities between server and client boundaries.

---

## 🧱 Architecture & Technical Stack

| Category           | Technology           | Rationale                                                                                         |
| :----------------- | :------------------- | :------------------------------------------------------------------------------------------------ |
| **Framework**      | Next.js (App Router) | Enables high-performance Server-Side Rendering (SSR) through React Server Components (RSC).       |
| **Language**       | TypeScript           | Enforces strict type safety and predictability, essential for scalable enterprise applications.   |
| **Styling**        | Tailwind CSS         | Utility-first styling for rapid development, consistency, and responsive design.                  |
| **Design Pattern** | Compound Components  | Provides flexible, highly composable component APIs with clean separation of state and structure. |

---

## ⭐ Core Feature Showcase

### Modal Compound Component

The primary architectural achievement of this project is the implementation of a **Modal Compound Component**.

This pattern **decouples internal state management** (handled via React Context in a Client Component) from **structural composition**, allowing consumers to declaratively define:

- Trigger
- Header
- Content
- Layout

directly in JSX, without leaking implementation details.

This approach scales particularly well for **enterprise UI systems**, where components must be flexible yet consistent.

---

## 🧩 Usage Example & Server/Client Boundary Strategy

To guarantee **serialization integrity across the Next.js Server/Client boundary**, all Modal sub-components are imported as **explicit named exports** when used inside a Server Component (`app/page.tsx`).

```tsx
// app/page.tsx (React Server Component)
import Modal, {
  ModalTrigger,
  ModalHeader,
  ModalContent,
} from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button";

// Define the trigger element separately
const modalTriggerElement = (
  <ModalTrigger>
    <Button variant="primary">Open CMS Configuration</Button>
  </ModalTrigger>
);

// Render the Modal
<Modal initialOpen={false} trigger={modalTriggerElement}>
  <ModalHeader title="CMS Settings Management" />
  <ModalContent>{/* ... Modal Body Content ... */}</ModalContent>
</Modal>;
```

This pattern ensures:

- Predictable component resolution
- Correct RSC serialization
- Clear ownership between Server and Client logic

## ⚙️ Critical Technical Challenges Overcome

Implementing this architecture required solving several **non-trivial issues inherent to the Next.js App Router and RSC model**.

---

### 1️⃣ RSC / RCC Boundary Integrity

A persistent runtime error:

```text
Runtime Error: got undefined
```

was resolved by enforcing Explicit Named Imports:

```tsx
import { ModalTrigger, ModalHeader, ModalContent } from "...";
```

This prevents Next.js from failing to resolve static properties attached to a Client Component’s default export during Server Component serialization.

### 2️⃣ Robust Component Filtering

IDE formatters can introduce invisible whitespace nodes, breaking assumptions about children.

To reliably isolate the intended trigger element (`<Button />`), `ModalTrigger.tsx` uses:

- `React.Children.toArray()`
- `React.isValidElement()`

This guarantees:

- Stable behavior regardless of formatting
- Safe extraction of the target child element
- Reliable function injection

### 3️⃣ Type Safety in Function Injection

When injecting behavior via React.cloneElement, TypeScript raised errors related to unknown props such as `onClick`.
This was resolved by explicitly typing the cloned element:

```ts
ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;
```

Ensuring:

- Full type safety
- Proper inference of injected handlers
- Zero runtime ambiguity

## 🏁 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Start the Development Server

```bash
npm run dev
```

The application will be accessible at:

```
http://localhost:3000
```

## 📌 Project Goals & Scope

This repository serves as:

- A reference architecture for enterprise-grade UI layers
- A playground for RSC-safe component patterns
- A foundation for future Headless CMS expansion

## Key Takeaways

- Designed explicitly for Next.js App Router constraints
- Demonstrates production-ready Compound Component patterns
- Prioritizes type safety, composability, and scalability
- Avoids common pitfalls in Server / Client component interoperability
