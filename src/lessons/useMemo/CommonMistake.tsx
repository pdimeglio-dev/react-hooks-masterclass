import { useMemo, useState } from "react";

/**
 * ❌ Common Mistake: Memoizing cheap operations
 *
 * Anti-pattern: wrapping a trivial string concatenation in useMemo.
 * String concatenation is so fast that the overhead of useMemo
 * (storing the previous result, comparing deps) is likely MORE
 * expensive than just re-computing the string.
 */
export function CommonMistake() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [age, setAge] = useState(30);

  // ❌ Memoizing a trivial string concatenation — this is SLOWER than just computing it
  const fullName = useMemo(() => {
    console.log("🐌 useMemo: computing fullName (unnecessary!)");
    return `${firstName} ${lastName}`;
  }, [firstName, lastName]);

  // ❌ Memoizing a simple template literal
  const greeting = useMemo(() => {
    console.log("🐌 useMemo: computing greeting (unnecessary!)");
    return `Hello, ${fullName}! You are ${age} years old.`;
  }, [fullName, age]);

  // ❌ Memoizing a simple arithmetic operation
  const birthYear = useMemo(() => {
    console.log("🐌 useMemo: computing birthYear (unnecessary!)");
    return new Date().getFullYear() - age;
  }, [age]);

  return (
    <div style={{ padding: 16, border: "2px solid red", borderRadius: 8 }}>
      <h3>❌ Mistake: useMemo for cheap operations</h3>
      <div style={{ marginBottom: 8 }}>
        <label>
          First name:{" "}
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: 12 }}>
          Last name:{" "}
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: 12 }}>
          Age:{" "}
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </label>
      </div>
      <p>{greeting}</p>
      <p>Estimated birth year: {birthYear}</p>

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
            <code>fullName</code> is just string concatenation — costs
            nanoseconds. <code>useMemo</code> adds overhead for zero benefit.
          </li>
          <li>
            <code>greeting</code> is a template literal — trivially cheap.
          </li>
          <li>
            <code>birthYear</code> is simple subtraction — no memoization
            needed.
          </li>
          <li>
            <strong>Rule of thumb:</strong> Only memoize when the computation
            takes &gt;1ms or the result is passed as a prop to a memoized child.
          </li>
        </ul>
        <p style={{ marginTop: 4 }}>
          ✅ <strong>Just write:</strong>{" "}
          <code>{`const fullName = \`\${firstName} \${lastName}\``}</code>
        </p>
      </div>
    </div>
  );
}
