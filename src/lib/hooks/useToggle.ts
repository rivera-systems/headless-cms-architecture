import { useState, useCallback } from "react";

/**
 * Type definition for the return array of the useToggle hook.
 * It returns the current state (boolean) and three functions (toggle, setTrue, setFalse).
 */
type UseToggleReturn = [boolean, () => void, () => void, () => void];

/**
 * A custom hook to manage boolean state (e.g., for modals, visibility).
 * Provides the current state, a toggle function, and explicit setTrue/setFalse functions.
 * * @param {boolean} [initialState=false] - The initial state of the boolean flag.
 * @returns {UseToggleReturn} - [currentState, toggle, setTrue, setFalse]
 */
export const useToggle = (initialState: boolean = false): UseToggleReturn => {
  const [state, setState] = useState<boolean>(initialState);

  // 1. `toggle`: Reverses the current state. Memoized using useCallback.
  const toggle = useCallback(() => setState((prev) => !prev), []);

  // 2. `setTrue`: Sets the state explicitly to true. Memoized using useCallback.
  const setTrue = useCallback(() => setState(true), []);

  // 3. `setFalse`: Sets the state explicitly to false. Memoized using useCallback.
  const setFalse = useCallback(() => setState(false), []);

  // Returns the state and the three memoized action functions.
  return [state, toggle, setTrue, setFalse];
};
