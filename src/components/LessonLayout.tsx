import { useState, type ReactNode } from "react";

interface LessonLayoutProps {
  /** The rendered component */
  children: ReactNode;
  /** The raw source code string (imported with ?raw) */
  sourceCode: string;
  /** Label for the tab / header */
  title?: string;
}

/**
 * Wraps a lesson component and displays its annotated source code below.
 * The source code panel is collapsible so visitors can focus on the demo
 * or dive into the implementation.
 */
export function LessonLayout({
  children,
  sourceCode,
  title,
}: LessonLayoutProps) {
  const [showCode, setShowCode] = useState(true);

  return (
    <div style={{ marginBottom: 32 }}>
      {/* Rendered component */}
      {children}

      {/* Source code toggle */}
      <div style={{ marginTop: 12 }}>
        <button
          onClick={() => setShowCode((prev) => !prev)}
          style={{
            background: "none",
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: "4px 12px",
            cursor: "pointer",
            fontSize: 13,
            color: "#555",
          }}
        >
          {showCode ? "▼" : "▶"}{" "}
          {title ? `${title} — Source Code` : "Source Code"}
        </button>
      </div>

      {/* Source code block */}
      {showCode && (
        <pre
          style={{
            marginTop: 8,
            padding: 16,
            background: "#1e1e2e",
            color: "#cdd6f4",
            borderRadius: 8,
            overflow: "auto",
            fontSize: 13,
            lineHeight: 1.5,
            maxHeight: 500,
          }}
        >
          <code>{sourceCode}</code>
        </pre>
      )}
    </div>
  );
}
