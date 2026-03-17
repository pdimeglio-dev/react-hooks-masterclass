import { useState, useRef } from "react";

/**
 * ❌ Common Mistake: Using useState for values that don't affect rendering
 *
 * Anti-patterns demonstrated:
 * 1. Using state for a "render count" that doesn't need to trigger re-renders.
 * 2. Using state to store a value only read in an event handler (not in JSX).
 * 3. Deriving values that could be computed directly.
 */
export function CommonMistake() {
  // ❌ Mistake 1: Tracking render count in state causes an infinite loop risk
  // or unnecessary re-renders. A ref is the correct choice.
  const [renderCount, setRenderCount] = useState(0);

  // ❌ Mistake 2: This state is only read in the handler — it never affects rendering.
  // A ref would avoid unnecessary re-renders every time it changes.
  const [lastClickTime, setLastClickTime] = useState<number | null>(null);

  // ❌ Mistake 3: Derived state — the "doubled" value can be computed inline.
  const [count, setCount] = useState(0);
  const [doubled, setDoubled] = useState(0);

  // Used to show what useRef-based approach would look like
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    setDoubled(newCount * 2); // ❌ Synchronizing derived state manually
    setLastClickTime(Date.now()); // ❌ Triggers re-render for no visible change
    setRenderCount((prev) => prev + 1); // ❌ Unnecessary state update
  };

  return (
    <div style={{ padding: 16, border: "2px solid red", borderRadius: 8 }}>
      <h3>❌ Mistake: useState for non-rendering concerns</h3>
      <p>Count: {count}</p>
      <p>Doubled (synced state): {doubled}</p>
      <p>Render count (state): {renderCount}</p>
      <p style={{ fontSize: 11, color: "#999" }}>
        Last click:{" "}
        {lastClickTime ? new Date(lastClickTime).toISOString() : "never"}
      </p>
      <button onClick={handleIncrement}>Increment</button>

      <div
        style={{
          marginTop: 12,
          padding: 8,
          background: "#fff3f3",
          borderRadius: 4,
          fontSize: 12,
        }}
      >
        <strong>What&apos;s wrong here?</strong>
        <ul style={{ paddingLeft: 16, margin: "4px 0" }}>
          <li>
            <code>renderCount</code> in state causes extra re-renders — use a{" "}
            <code>useRef</code> instead.
          </li>
          <li>
            <code>lastClickTime</code> is only shown for debugging and
            doesn&apos;t need to be in state if it&apos;s not user-facing.
          </li>
          <li>
            <code>doubled</code> is derived from <code>count</code> — just
            compute <code>{`count * 2`}</code> inline.
          </li>
        </ul>
      </div>
    </div>
  );
}
