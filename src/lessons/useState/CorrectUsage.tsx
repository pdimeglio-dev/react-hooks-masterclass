import { useState } from "react";

/**
 * ✅ Correct Usage of useState
 *
 * - State is used for values that, when changed, should trigger a re-render.
 * - The updater function form is used when the new state depends on the previous state.
 * - State is kept minimal — only what's needed for rendering.
 */
export function CorrectUsage() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 16, border: "2px solid green", borderRadius: 8 }}>
      <h3>✅ Correct: useState for UI-driven state</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <button onClick={() => setCount((prev) => prev - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <p style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
        Uses the updater function <code>(prev) =&gt; prev + 1</code> to avoid
        stale state bugs. State is minimal and drives the UI.
      </p>
    </div>
  );
}
