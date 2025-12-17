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

### 1. Data Fetching and Content Types Dashboard (RSC)

The main dashboard (`app/page.tsx`) functions as an **asynchronous Server Component** responsible for fetching initial data.

- **Data Loading:** Data for the "Content Types" list is fetched using a mock service (`getContentViews`) which simulates database latency.
- **Cache Control:** The service uses `unstable_noStore()` to opt-out of Next.js's data caching, ensuring the data is always fresh, which is critical for mutable CMS dashboards.

### 2. Client-Side Interactivity and State

The process of creating new content types is handled entirely on the client side to manage form state and user input.

- **Compound Component Fix:** The `Modal` component's internal rendering logic was corrected to ensure it **unconditionally renders its children**, resolving critical rendering errors where the dashboard table (RSC) disappeared when the modal was present.
- **Form Integration:** The form logic is isolated in a Client Component (`ContentTypeForm.tsx`) using `useState` for controlled inputs and dynamic slug generation, and it uses `useModal()` to close the dialog.

### 3. [Next] Data Mutation and Optimistic UI

This upcoming module will implement the data persistence flow: simulating a server-side POST request from the Client Component Form and using Next.js's native cache invalidation (`revalidatePath`) to update the dashboard without a full page reload, leveraging the App Router's data fetching capabilities.

### 4. Data Mutation & Optimistic UI (Server Actions)

The system implements a full-stack data mutation flow using Next.js **Server Actions**, providing a seamless "zero-latency" feel.

- **Optimistic Updates:** Using the `useOptimistic` hook, the UI reflects changes instantly (with a "pending" state) before the server confirms the operation.
- **Server Actions:** Data is processed securely on the server via `createContentTypeAction`, which handles validation and persistence logic.
- **Automatic Revalidation:** Uses `revalidatePath('/')` to purge the client cache and fetch fresh data without a full page reload, maintaining the SPA-like experience within RSC.

### 5. Advanced Dark Mode & UI Hierarchy

A custom-engineered dark mode that prioritizes visual ergonomics and depth.

- **Color Palettes:** Balanced contrast using deep grays (`#121212`) for the base and elevated surfaces (`#1c1c1c`) for cards and modals.
- **CSS Variable Overrides:** Strategic use of Tailwind utility classes to override global CSS variables, ensuring high-contrast labels and readable placeholders in all themes.

---

## 🧩 Usage Example & Server/Client Boundary Strategy

The project follows a "High-Level Client Entry" pattern. The Home page (RSC) fetches the data and passes it to DashboardList (RCC), which manages the interactive state and optimistic updates.

```tsx
// src/components/content/DashboardList.tsx (Refined RCC Pattern)

export function DashboardList({ initialContentTypes }: DashboardListProps) {
  // 1. Optimistic UI State
  const [optimisticTypes, addOptimistic] = useOptimistic(
    initialContentTypes,
    (state, newType) => [...state, { ...newType, isOptimistic: true }]
  );

  // 2. Integration with Server Actions
  const handleCreate = async (formData: FormData) => {
    // Add temporary UI feedback
    addOptimistic({ name: formData.get("name"), ... });

    // Execute server-side persistence
    await createContentTypeAction(formData);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>

      {/* Compound Component Pattern for Modals */}
      <Modal trigger={<Button>Create New Content Type</Button>}>
        <ModalHeader title="Create New Content Type" />
        <ModalContent>
          <ContentTypeForm action={handleCreate} />
        </ModalContent>
      </Modal>

      {/* Table renders the optimistic state */}
      <div className="bg-white dark:bg-[#1c1c1c] rounded-lg shadow">
        {optimisticTypes.map(type => (
          <div key={type.id} className={type.isOptimistic ? "opacity-50" : ""}>
            {type.name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

This pattern ensures:

- **Instant Responsiveness**: Users see their changes immediately.
- **Server-Side Security**: Data is validated and persisted via Server Actions.
- **Visual Hierarchy**: Components use specific dark-mode backgrounds (#1c1c1c) to stand out from the main page.

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

### 4️⃣ Dark Mode Specificity and CSS Variables

A conflict arose where native CSS variables in `globals.css` were overriding Tailwind's dark mode utility classes.

- **Challenge:** The `body { background: var(--background) }` rule was too specific, preventing components from having distinct dark backgrounds.
- **Resolution:** Moved background logic to Tailwind utility classes directly in `layout.tsx` (`dark:bg-[#121212]`). This allowed for a granular visual hierarchy where modals and tables can have elevated background colors (`#1c1c1c`) distinct from the main page.

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
