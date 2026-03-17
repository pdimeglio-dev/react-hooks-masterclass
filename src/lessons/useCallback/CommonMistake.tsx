import { useState, useCallback } from "react";

/**
 * ❌ Common Mistake: Wrapping every handler in useCallback
 *
 * Anti-patterns demonstrated:
 * 1. useCallback on handlers passed to plain HTML elements (not memoized children).
 * 2. useCallback with dependencies that change every render, defeating the purpose.
 * 3. Using useCallback when useMemo is what you actually need.
 */
export function CommonMistake() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // ❌ Mistake 1: useCallback on a handler for a plain <button>.
  // <button> is NOT wrapped in React.memo — it re-renders with its parent
  // regardless of whether the function reference is stable.
  const handleIncrement = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  // ❌ Mistake 2: useCallback with `text` as a dependency.
  // `text` changes on every keystroke, so the function is recreated every
  // render anyway — making useCallback pure overhead.
  const handleLog = useCallback(() => {
    console.log("Current text:", text);
  }, [text]);

  // ❌ Mistake 3: Using useCallback to "cache" a computed value.
  // This caches the FUNCTION, not the result. Every time you call it,
  // it recomputes. You wanted useMemo here.
  const getDoubled = useCallback(() => {
    return count * 2;
  }, [count]);

  return (
    <div style={{ padding: 16, border: "2px solid red", borderRadius: 8 }}>
      <h3>❌ Mistake: useCallback everywhere</h3>
      <p>Count: {count}</p>
      <p>Doubled (via function call): {getDoubled()}</p>
      <button onClick={handleIncrement}>Increment</button>

      <div style={{ marginTop: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        />
        <button onClick={handleLog} style={{ marginLeft: 8 }}>
          Log text
        </button>
      </div>

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
            <code>handleIncrement</code> is passed to a plain{" "}
            <code>&lt;button&gt;</code> — no memoized child benefits from the
            stable reference. Remove <code>useCallback</code>.
          </li>
          <li>
            <code>handleLog</code> depends on <code>[text]</code>, which changes
            every keystroke — the function is recreated every render. The{" "}
            <code>useCallback</code> is pure overhead.
          </li>
          <li>
            <code>getDoubled</code> caches a <em>function</em>, not a{" "}
            <em>value</em>. You call <code>getDoubled()</code> every render
            anyway. Use <code>useMemo</code> if you want to cache the result, or
            just write <code>count * 2</code> inline.
          </li>
        </ul>
      </div>
    </div>
  );
}
