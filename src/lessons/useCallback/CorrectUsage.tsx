import { useState, useCallback, memo } from "react";

/**
 * ✅ Correct Usage of useCallback
 *
 * useCallback is used here to provide a STABLE function reference
 * to a React.memo()-wrapped child component. Without useCallback,
 * the child would re-render on every parent render because the
 * function identity changes each time.
 */

// A "heavy" child component wrapped in React.memo.
// It only re-renders when its props actually change.
const ExpensiveList = memo(function ExpensiveList({
  items,
  onRemove,
}: {
  items: string[];
  onRemove: (item: string) => void;
}) {
  console.log("🔄 ExpensiveList rendered");
  return (
    <ul style={{ paddingLeft: 16, fontSize: 14 }}>
      {items.map((item) => (
        <li key={item} style={{ marginBottom: 4 }}>
          {item}{" "}
          <button onClick={() => onRemove(item)} style={{ fontSize: 12 }}>
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
});

export function CorrectUsage() {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry", "Date"]);
  const [name, setName] = useState("");

  // ✅ useCallback keeps the same function reference between renders,
  // so ExpensiveList (wrapped in React.memo) doesn't re-render
  // when we type in the unrelated "name" input.
  const handleRemove = useCallback((item: string) => {
    setItems((prev) => prev.filter((i) => i !== item));
  }, []);

  return (
    <div style={{ padding: 16, border: "2px solid green", borderRadius: 8 }}>
      <h3>✅ Correct: useCallback for memoized children</h3>
      <div style={{ marginBottom: 8 }}>
        <label>
          Your name:{" "}
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        {name && <span style={{ marginLeft: 8 }}>Hello, {name}!</span>}
      </div>
      <p style={{ fontSize: 13 }}>
        Fruit list (typing above does NOT re-render this list):
      </p>
      <ExpensiveList items={items} onRemove={handleRemove} />
      <p style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
        Open the console — <code>ExpensiveList rendered</code> only logs when
        items actually change, not when you type in the name field.
      </p>
    </div>
  );
}
