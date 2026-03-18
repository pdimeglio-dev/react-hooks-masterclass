import { useState, useTransition } from "react";

// Simulates a network request with artificial delay
async function fakeFetchUsers(query: string): Promise<string[]> {
  await new Promise((resolve) =>
    setTimeout(resolve, 800 + Math.random() * 400)
  );

  const allUsers = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "Diana Prince",
    "Edward Norton",
    "Fiona Apple",
    "George Lucas",
    "Hannah Montana",
    "Ivan Drago",
    "Julia Roberts",
    "Kevin Hart",
    "Luna Lovegood",
    "Mario Rossi",
    "Nina Simone",
    "Oscar Wilde",
  ];

  if (!query) return allUsers;
  return allUsers.filter((u) => u.toLowerCase().includes(query.toLowerCase()));
}

/**
 * 🚀 React 19: Async startTransition
 *
 * Demonstrates the new async form of startTransition added in React 19.
 * The async function runs inside the transition, and isPending stays true
 * throughout the entire async operation (including the await).
 *
 * This replaces the old pattern of:
 *   setLoading(true);
 *   const data = await fetch(...);
 *   setResults(data);
 *   setLoading(false);
 *
 * With the simpler:
 *   startTransition(async () => {
 *     const data = await fetch(...);
 *     setResults(data);
 *   });
 *   // isPending is automatically true until the transition completes!
 */
export function AsyncExample() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    // 🚀 Async startTransition (React 19)
    //
    // The callback is marked `async` because it uses `await` inside —
    // you can't use `await` without `async` (JavaScript requirement).
    //
    // Every `async` function implicitly returns a Promise (here, Promise<void>).
    // React 19's startTransition uses that returned Promise to track when the
    // async work is done:
    //
    //   1. startTransition calls the async callback
    //   2. The callback hits `await` and returns a *pending* Promise to startTransition
    //   3. React keeps isPending = true while that Promise is pending
    //   4. When fakeFetchUsers resolves, execution resumes — setUsers & setHasSearched run
    //   5. The Promise resolves → React finishes rendering → isPending becomes false
    //
    // In React 18, startTransition ignored the returned Promise (signature was
    // `(callback: () => void) => void`). React 19 changed it to:
    // `(callback: () => void | Promise<void>) => void`
    startTransition(async () => {
      const results = await fakeFetchUsers(query);
      setUsers(results);
      setHasSearched(true);
    });
  };

  return (
    <div style={{ padding: 16, border: "2px solid #2563eb", borderRadius: 8 }}>
      <h3>🚀 React 19: Async startTransition</h3>
      <div style={{ marginBottom: 8 }}>
        <label>
          Search users:{" "}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Alice, Bob…"
            style={{ width: 200 }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </label>
        <button
          onClick={handleSearch}
          disabled={isPending}
          style={{ marginLeft: 8 }}
        >
          {isPending ? "Searching…" : "Search"}
        </button>
      </div>

      <div style={{ opacity: isPending ? 0.5 : 1, transition: "opacity 0.2s" }}>
        {isPending && (
          <p style={{ color: "#b45309", fontSize: 13 }}>
            ⏳ Fetching results… (<code>isPending</code> is <code>true</code>{" "}
            throughout the async operation)
          </p>
        )}

        {!isPending && hasSearched && (
          <div>
            <p style={{ fontSize: 13, margin: "4px 0" }}>
              Found {users.length} user{users.length !== 1 ? "s" : ""}:
            </p>
            <ul style={{ paddingLeft: 16, fontSize: 13 }}>
              {users.map((user) => (
                <li key={user}>{user}</li>
              ))}
              {users.length === 0 && (
                <li style={{ color: "#999" }}>No results found</li>
              )}
            </ul>
          </div>
        )}

        {!isPending && !hasSearched && (
          <p style={{ fontSize: 13, color: "#666" }}>
            Click &quot;Search&quot; to fetch users from the mock API.
          </p>
        )}
      </div>

      <div
        style={{
          marginTop: 12,
          padding: 8,
          background: "#eff6ff",
          borderRadius: 4,
          fontSize: 12,
          color: "#1e40af",
        }}
      >
        <strong>How this works:</strong>
        <ul style={{ paddingLeft: 16, margin: "4px 0" }}>
          <li>
            <code>
              startTransition(async () =&gt; {"{"} … {"}"})
            </code>{" "}
            — the async function runs inside the transition.
          </li>
          <li>
            <code>isPending</code> stays <code>true</code> throughout the entire{" "}
            <code>await</code>, not just until the state update is scheduled.
          </li>
          <li>
            No manual <code>setLoading(true/false)</code> — React manages the
            pending state automatically.
          </li>
          <li>
            This pattern is new in <strong>React 19</strong>. In React 18,{" "}
            <code>startTransition</code> only accepted synchronous functions.
          </li>
        </ul>
      </div>
    </div>
  );
}
