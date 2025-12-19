# Design Pattern: Server-Client Composition Strategy

## Problem Statement

A common pitfall in Next.js App Router is the "Client-Client Nesting," where developers inadvertently turn the entire tree into Client Components, losing the benefits of Server Components (RSC).

## Our Solution: The "Slot" & "Children" Pattern

We implement a high-level Client Entry point pattern. The layout remains a Server Component, while interactivity is isolated into specific leaf or wrapper components.

### Pattern: RCC as a Data Orchestrator

In the `DashboardList` implementation, we use a Client Component as an orchestrator that:

1. Receives **Initial Data** from a Server Component (RSC).
2. Manages **Optimistic State** for immediate feedback.
3. Injects **Server Actions** into interactive children.

### Pattern: Composition via Children

To keep components like `Modal` or `Table` flexible, we avoid passing data as complex props. Instead, we use `children` composition. This allows:

- **RSC Injection**: We can pass a Server Component as a child of a Client Component wrapper.
- **Static Analysis**: Next.js can optimize the parts of the tree that don't require interactivity.

## Visual Hierarchy & Theme Consistency

We leverage Tailwind's utility-first approach to override global CSS variables at the component level. This ensures that even when a Client Component (like a Modal) is deep in the tree, it maintains the **Enterprise Dark Mode** specification (#1c1c1c elevation) regardless of its parent's styling context.
