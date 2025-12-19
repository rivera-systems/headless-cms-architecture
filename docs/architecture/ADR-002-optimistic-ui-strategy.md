# ADR 002: Atomic Optimistic UI for Real-Time Mutations

## Status

Accepted

## Context

In a Headless CMS environment, user feedback must be instantaneous. Relying solely on server response times for UI updates creates a perceived lag that diminishes the "app-like" experience.

## Decision

We adopted an **Atomic Optimistic Update** strategy using React 19’s `useOptimistic` hook in conjunction with Next.js Server Actions.

## Architectural Refinements

- **Atomic Transitions**: Both the optimistic state dispatch and the server-side execution are wrapped within a single `startTransition`. This guarantees that the UI projection remains active until the server revalidates the cache, preventing state flickering.
- **Persistence-Linked Consistency**: To maintain a "Single Source of Truth," the server-side service implements a shared memory state. This ensures that when `revalidatePath` is triggered, the fresh data fetched by Server Components matches the user's optimistic expectation.
- **Graceful Rollbacks**: The system is designed to automatically revert the UI to the last known "server truth" if the Server Action fails validation (Zod) or persistence, ensuring data integrity.

## Technical Stack

- **React 19 Hooks**: `useOptimistic`, `useTransition`.
- **Validation**: Zod (Schema-based server-side enforcement).
- **Persistence**: Server-side In-memory store (Service layer).
