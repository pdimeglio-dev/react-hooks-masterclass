import type { Meta, StoryObj } from "@storybook/react-vite";
import { CorrectUsage } from "./CorrectUsage";
import { CommonMistake } from "./CommonMistake";
import { LessonLayout } from "../../components/LessonLayout";
import { React19Notice } from "../../components/React19Notice";
import LessonMd from "./Lesson.md?raw";
import CorrectSource from "./CorrectUsage.tsx?raw";
import MistakeSource from "./CommonMistake.tsx?raw";

const meta: Meta = {
  title: "Lessons/useMemo",
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
      <React19Notice hook="useMemo">
        The React Compiler automatically memoizes values during compilation.
        Manual <code>useMemo</code> calls are no longer needed in most cases —
        the compiler handles it for you.
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
          "Uses `useMemo` to cache an expensive filter + sort operation on 10,000 items. The memoization correctly prevents re-computation when unrelated state (the name input) changes.",
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
          "Wraps trivial string concatenation and arithmetic in `useMemo`. The overhead of memoization exceeds the cost of re-computing these values, making the code slower and harder to read.",
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
          "Side-by-side comparison: expensive filter (correct) vs. cheap string concat (anti-pattern).",
      },
    },
  },
};
