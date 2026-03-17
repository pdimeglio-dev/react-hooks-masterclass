import type { Meta, StoryObj } from "@storybook/react-vite";
import { CorrectUsage } from "./CorrectUsage";
import { CommonMistake } from "./CommonMistake";
import { LessonLayout } from "../../components/LessonLayout";
import { React19Notice } from "../../components/React19Notice";
import LessonMd from "./Lesson.md?raw";
import CorrectSource from "./CorrectUsage.tsx?raw";
import MistakeSource from "./CommonMistake.tsx?raw";

const meta: Meta = {
  title: "Lessons/useCallback",
  parameters: {
    docs: {
      description: {
        component: LessonMd,
      },
    },
  },
};

export default meta;

export const Correct: StoryObj = {
  render: () => (
    <>
      <React19Notice hook="useCallback">
        The React Compiler automatically stabilizes function references during
        compilation. Manual <code>useCallback</code> calls are no longer needed
        — the compiler preserves function identity for you.
      </React19Notice>
      <LessonLayout sourceCode={CorrectSource} title="✅ Correct">
        <CorrectUsage />
      </LessonLayout>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Uses `useCallback` to provide a stable `onRemove` handler to a `React.memo()`-wrapped child. Typing in the name input does NOT re-render the list.",
      },
    },
  },
};

export const Mistake: StoryObj = {
  render: () => (
    <LessonLayout sourceCode={MistakeSource} title="❌ Mistake">
      <CommonMistake />
    </LessonLayout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Wraps every handler in `useCallback` without a memoized child to benefit. Also shows the mistake of using `useCallback` when `useMemo` (or just inline computation) is what you need.",
      },
    },
  },
};

export const SideBySide: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: 340 }}>
        <LessonLayout sourceCode={CorrectSource} title="✅ Correct">
          <CorrectUsage />
        </LessonLayout>
      </div>
      <div style={{ flex: 1, minWidth: 340 }}>
        <LessonLayout sourceCode={MistakeSource} title="❌ Mistake">
          <CommonMistake />
        </LessonLayout>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Side-by-side: useCallback with a memoized child (correct) vs. useCallback on plain elements (anti-pattern).",
      },
    },
  },
};
