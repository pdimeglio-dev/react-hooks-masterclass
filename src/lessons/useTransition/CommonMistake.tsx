import { useState, useMemo } from "react";

// Same large dataset as CorrectUsage
const ITEMS = Array.from({ length: 20_000 }, (_, i) => ({
  id: i,
  label: `Item ${i} — ${["alpha", "beta", "gamma", "delta", "epsilon"][i % 5]}`,
}));

/**
 * A deliberately slow list component that simulates an expensive render.
 */
function SlowList({ items }: { items: typeof ITEMS }) {
  return (
    <ul
      style={{
        maxHeight: 180,
        overflow: "auto",
        fontSize: 12,
        paddingLeft: 16,
      }}
    >
      {items.map((item) => (
        <SlowItem key={item.id} label={item.label} />
      ))}
    </ul>
  );
}

function SlowItem({ label }: { label: string }) {
  const start = performance.now();
  while (performance.now() - start < 0.05) {
    // Block for ~0.05ms per item
  }
  return <li>{label}</li>;
}

/**
 * ❌ Common Mistake: Expensive updates without useTransition
 *
 * Anti-patterns demonstrated:
 * 1. No transition — the expensive filter runs synchronously, blocking the input.
 * 2. Only one state variable — the input and filter are coupled, so every
 *    keystroke triggers the expensive re-render immediately.
 * 3. No pending indicator — users get no feedback while the list re-renders.
 */
export function CommonMistake() {
  // ❌ Single state for both input display AND expensive filtering
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!query) return ITEMS.slice(0, 1000);
    return ITEMS.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 1000);
  }, [query]);

  // ❌ Every keystroke directly triggers the expensive re-render
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div style={{ padding: 16, border: "2px solid red", borderRadius: 8 }}>
      <h3>❌ Mistake: No transition for expensive updates</h3>
      <div style={{ marginBottom: 8 }}>
        <label>
          Search:{" "}
          <input
            value={query}
            onChange={handleChange}
            placeholder="Type to filter 20,000 items…"
            style={{ width: 260 }}
          />
        </label>
        {/* ❌ No pending indicator — users get no feedback */}
      </div>
      <p style={{ fontSize: 13, margin: "4px 0" }}>
        Showing {filteredItems.length} items
        {filteredItems.length === 1000 ? " (capped at 1,000)" : ""}
      </p>
      <SlowList items={filteredItems} />

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
            Every keystroke triggers the expensive filter{" "}
            <strong>synchronously</strong>. The input feels laggy because React
            can&apos;t process the next keystroke until the full list re-render
            completes.
          </li>
          <li>
            There&apos;s no <code>isPending</code> indicator — the user gets no
            visual feedback that the list is updating.
          </li>
          <li>
            <strong>Fix:</strong> Split state into <code>query</code> (urgent,
            for the input) and <code>filterQuery</code> (non-urgent, for the
            list). Wrap <code>setFilterQuery</code> in{" "}
            <code>startTransition</code> and use <code>isPending</code> to show
            a loading indicator.
          </li>
        </ul>
      </div>
    </div>
  );
}
