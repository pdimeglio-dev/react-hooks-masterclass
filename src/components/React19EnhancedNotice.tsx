/**
 * A green banner that highlights a hook that has been enhanced
 * or gained new capabilities in React 19.
 */
export function React19EnhancedNotice({
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
        background: "#f0fdf4",
        border: "2px solid #16a34a",
        borderRadius: 8,
        color: "#166534",
      }}
    >
      <strong style={{ fontSize: 16 }}>
        🚀 React 19 Update: <code>{hook}</code> is enhanced
      </strong>
      <div style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}
