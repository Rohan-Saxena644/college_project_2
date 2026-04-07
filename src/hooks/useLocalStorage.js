// ─── HOOKS: CUSTOM HOOK ──────────────────────────────────────────
//
//  A Custom Hook is a regular JavaScript function whose name starts
//  with "use". It can call other hooks (like useState, useEffect)
//  inside it. Custom hooks let you REUSE stateful logic across
//  multiple components without repeating code.
//
//  useLocalStorage works exactly like useState, but it also
//  saves the value to localStorage so it survives page refreshes.
//
// ─────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {

  // useState with a lazy initialiser function –
  // reads from localStorage once when the component first mounts.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // useEffect – runs every time "storedValue" changes.
  // Keeps localStorage in sync with the current state value.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.error('useLocalStorage: could not save', err);
    }
  }, [key, storedValue]);

  // Returns the same [value, setter] tuple as useState,
  // so callers can use it exactly the same way.
  return [storedValue, setStoredValue];
}

export default useLocalStorage;
