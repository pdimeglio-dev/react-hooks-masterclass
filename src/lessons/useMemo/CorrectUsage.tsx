import { useMemo, useState } from "react";

// Simulate a large dataset
const ITEMS = Array.from({ length: 10_000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
  category: i % 3 === 0 ? "electronics" : i % 3 === 1 ? "books" : "clothing",
  price: Math.round(Math.random() * 1000) / 10,
}));

/**
 * ✅ Correct Usage of useMemo
 *
 * useMemo is used here to cache an EXPENSIVE filter + sort operation
 * over 10,000 items. Without memoization, this computation would run
 * on every keystroke in the unrelated "name" input field.
 */
export function CorrectUsage() {
  const [category, setCategory] = useState("all");
  const [name, setName] = useState("");

  // ✅ Expensive: filtering and sorting 10k items
  const filteredItems = useMemo(() => {
    console.log("🔄 Filtering 10,000 items…");
    const result =
      category === "all"
        ? [...ITEMS]
        : ITEMS.filter((item) => item.category === category);
    return result.sort((a, b) => a.price - b.price);
  }, [category]);

  // ✅ Cheap derived value — no useMemo needed, just computed inline
  const totalPrice = filteredItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: 16, border: "2px solid green", borderRadius: 8 }}>
      <h3>✅ Correct: useMemo for expensive computation</h3>
      <div style={{ marginBottom: 8 }}>
        <label>
          Category:{" "}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
            <option value="clothing">Clothing</option>
          </select>
        </label>
        <label style={{ marginLeft: 12 }}>
          Your name:{" "}
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <p>
        Showing {filteredItems.length} items — Total: ${totalPrice.toFixed(2)}
      </p>
      {name && <p>Hello, {name}!</p>}
      <ul
        style={{
          maxHeight: 150,
          overflow: "auto",
          fontSize: 12,
          paddingLeft: 16,
        }}
      >
        {filteredItems.slice(0, 20).map((item) => (
          <li key={item.id}>
            {item.name} ({item.category}) — ${item.price.toFixed(2)}
          </li>
        ))}
        {filteredItems.length > 20 && (
          <li>…and {filteredItems.length - 20} more</li>
        )}
      </ul>
      <p style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
        Typing in &quot;Your name&quot; does NOT re-run the expensive filter
        because <code>useMemo</code> depends only on <code>[category]</code>.
      </p>
    </div>
  );
}
