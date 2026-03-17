/**
 * A red banner that warns visitors a hook is partially or fully
 * obsolete in React 19 due to the React Compiler.
 */
export function React19Notice({
  hook,
  children,
}: {
  hook: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        margin: "16px 0",
        padding: 16,
        background: "#fef2f2",
        border: "2px solid #dc2626",
        borderRadius: 8,
        color: "#991b1b",
      }}
    >
      <strong style={{ fontSize: 16 }}>
        ⚠️ React 19 Update: <code>{hook}</code> is largely obsolete
      </strong>
      <div style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}
