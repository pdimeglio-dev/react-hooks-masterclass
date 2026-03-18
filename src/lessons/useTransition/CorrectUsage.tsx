import { useState, useTransition, useMemo } from "react";

// Generate a large dataset to make filtering expensive
const ITEMS = Array.from({ length: 20_000 }, (_, i) => ({
  id: i,
  label: `Item ${i} — ${["alpha", "beta", "gamma", "delta", "epsilon"][i % 5]}`,
}));

/**
 * A deliberately slow list component that simulates an expensive render.
 * Each item does a small artificial delay to make the render visibly heavy.
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
  // Artificial slowdown — simulate expensive rendering per item
  const start = performance.now();
  while (performance.now() - start < 0.05) {
    // Block for ~0.05ms per item → ~50ms total for 1000 items shown
  }
  return <li>{label}</li>;
}

/**
 * ✅ Correct Usage of useTransition
 *
 * The search input stays responsive because the expensive list
 * filtering is wrapped in startTransition. React prioritizes
 * the text input update and renders the filtered list in the background.
 * The isPending flag drives a visual loading indicator.
 */
export function CorrectUsage() {
  const [query, setQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const filteredItems = useMemo(() => {
    if (!filterQuery) return ITEMS.slice(0, 1000);
    return ITEMS.filter((item) =>
      item.label.toLowerCase().includes(filterQuery.toLowerCase())
    ).slice(0, 1000);
  }, [filterQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // ✅ Urgent update — keeps the input responsive
    setQuery(value);

    // ✅ Non-urgent update — wrapped in transition so it doesn't block typing
    startTransition(() => {
      setFilterQuery(value);
    });
  };

  return (
    <div style={{ padding: 16, border: "2px solid green", borderRadius: 8 }}>
      <h3>✅ Correct: useTransition for expensive updates</h3>
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
        {isPending && (
          <span
            style={{ marginLeft: 12, color: "#b45309", fontSize: 13 }}
            data-testid="pending-indicator"
          >
            ⏳ Updating list…
          </span>
        )}
      </div>
      <p style={{ fontSize: 13, margin: "4px 0" }}>
        Showing {filteredItems.length} items
        {filteredItems.length === 1000 ? " (capped at 1,000)" : ""}
      </p>
      <div style={{ opacity: isPending ? 0.6 : 1, transition: "opacity 0.2s" }}>
        <SlowList items={filteredItems} />
      </div>
      <p style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
        The input stays snappy because <code>setFilterQuery</code> is wrapped in{" "}
        <code>startTransition</code>. The list re-renders in the background
        while typing continues unblocked. The <code>isPending</code> flag dims
        the list to show that an update is in progress.
      </p>
    </div>
  );
}
