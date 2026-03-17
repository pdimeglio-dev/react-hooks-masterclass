import type { Meta, StoryObj } from "@storybook/react-vite";
import { CorrectUsage } from "./CorrectUsage";
import { CommonMistake } from "./CommonMistake";
import { LessonLayout } from "../../components/LessonLayout";
import LessonMd from "./Lesson.md?raw";
import CorrectSource from "./CorrectUsage.tsx?raw";
import MistakeSource from "./CommonMistake.tsx?raw";

const meta: Meta = {
  title: "Lessons/useState",
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
    <LessonLayout sourceCode={CorrectSource} title="✅ Correct">
      <CorrectUsage />
    </LessonLayout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Uses `useState` correctly: state is minimal, the updater function prevents stale closures, and only rendering-relevant values live in state.",
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
          "Demonstrates common anti-patterns: storing derived state, tracking render counts in state, and using state for values that don't affect the UI.",
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
        story: "Both versions side-by-side for comparison.",
      },
    },
  },
};
