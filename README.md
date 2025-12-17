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

## ⭐ Core Feature Showcase

### 1. Data Fetching and Content Types Dashboard (RSC)

The main dashboard (`app/page.tsx`) functions as an **asynchronous Server Component** responsible for fetching initial data.

- **Data Loading:** Data for the "Content Types" list is fetched using a mock service (`getContentViews`) which simulates database latency.
- **Cache Control:** The service uses `unstable_noStore()` to opt-out of Next.js's data caching, ensuring the data is always fresh, which is critical for mutable CMS dashboards.

### 2. Client-Side Interactivity and State

The process of creating new content types is handled entirely on the client side to manage form state and user input.

- **Compound Component Fix:** The `Modal` component's internal rendering logic was corrected to ensure it **unconditionally renders its children**, resolving critical rendering errors where the dashboard table (RSC) disappeared when the modal was present.
- **Form Integration:** The form logic is isolated in a Client Component (`ContentTypeForm.tsx`) using `useState` for controlled inputs and dynamic slug generation, and it uses `useModal()` to close the dialog.

### [Next] Data Mutation and Optimistic UI

This upcoming module will implement the data persistence flow: simulating a server-side POST request from the Client Component Form and using Next.js's native cache invalidation (`revalidatePath`) to update the dashboard without a full page reload, leveraging the App Router's data fetching capabilities.

---

## 🧩 Usage Example & Server/Client Boundary Strategy

To guarantee **serialization integrity across the Next.js Server/Client boundary**, all Modal sub-components are imported as **explicit named exports** when used inside a Server Component (`app/page.tsx`).

```tsx
// app/page.tsx (Async React Server Component)

import Modal, {
  ModalTrigger,
  ModalHeader,
  ModalContent,
} from "@/components/ui/Modal/Modal";
import { ContentTypeForm } from "@/components/content/ContentTypeForm"; // RCC with useState
import { getContentViews } from "@/services/contentService"; // RSC Data Fetching

export default async function Home() {
  // 1. Fetching data on the server (RSC capability)
  const contentTypes = await getContentViews();

  return (
    // 2. The Modal component provides context to all children
    <Modal initialOpen={false}>
      {/* The main dashboard section (RSC) includes the trigger */}
      <section>
        <div className="flex justify-end p-4">
          <ModalTrigger>
            <Button variant="primary">Create New Content Type</Button>
          </ModalTrigger>
        </div>
        {/* Table renders the fetched RSC data (contentTypes) */}
        {/* ... (Table component mapping data) ... */}
      </section>

      {/* The modal window content (RCC) */}
      <ModalHeader title="Create New Content Type" />
      <ModalContent>
        {/* The form handles all client state and interaction */}
        <ContentTypeForm />
      </ModalContent>
    </Modal>
  );
}
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
