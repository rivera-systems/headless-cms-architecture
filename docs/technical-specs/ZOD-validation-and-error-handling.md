# Technical Spec: Schema Validation & Error Propagation

## Overview

This specification defines the multi-layer validation strategy using **Zod** to ensure data integrity across the RSC (Server) and RCC (Client) boundaries.

## Validation Architecture

### 1. Single Source of Truth

All domain entities are governed by centralized Zod schemas located in `@/lib/schemas`. This prevents logic duplication and ensures that client-side form validation and server-side enforcement are always in sync.

### 2. Server-Side Enforcement

Unlike client-only validation, our Server Actions re-validate the incoming `FormData`. This acts as a security firewall against bypassed client checks.

- **Method**: `safeParse` is used to prevent throwing unnecessary exceptions, allowing for graceful error object construction.
- **Error Mapping**: Validation errors are flattened and mapped to an `ActionResponse` type, which is then consumed by the UI to highlight specific fields.

## Error Handling Flow

1. **Extraction**: `formData` is parsed against the schema.
2. **Analysis**: If validation fails, a `400 Bad Request` equivalent logic is triggered within the Action.
3. **Propagation**: Errors are returned as a serialized object: `{ success: false, errors: { field: ["error message"] } }`.
4. **Presentation**: The `ContentTypeForm` component maps these errors to high-contrast UI indicators (Icons) to ensure accessibility.
