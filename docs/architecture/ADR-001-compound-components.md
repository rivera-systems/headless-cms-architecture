# ADR 001: Component Composition via Compound Pattern

## Status

Accepted

## Context

The application required a highly flexible and reusable Modal system capable of handling various content types and forms. Traditional prop-drilling for state management (open/close) and layout was deemed unscalable and restrictive for enterprise-grade UI components.

## Decision

We implemented the **Compound Component Pattern** leveraging React Context API. This approach decouples the trigger logic, the header configuration, and the body content.

## Key Technical Implementation

- **Implicit State Management**: The `ModalContext` encapsulates the visibility state, exposing only necessary toggles to sub-components.
- **RSC/RCC Boundary Handling**: To ensure compatibility with Next.js App Router, we utilized explicit named exports for sub-components, preventing serialization overhead and runtime resolution errors.
- **Dynamic Injection**: Used `React.cloneElement` for the `ModalTrigger` to inject behavioral logic into arbitrary children elements without requiring extra DOM wrappers.

## Consequences

- **Pros**: Enhanced readability and developer experience (DX). High composability allows for distinct modal layouts using the same underlying logic.
- **Cons**: Slightly higher initial boilerplate compared to simple prop-based modals.
