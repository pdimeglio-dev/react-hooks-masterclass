import type { Meta, StoryObj } from "@storybook/react-vite";
import { CorrectUsage } from "./CorrectUsage";
import { CommonMistake } from "./CommonMistake";
import { AsyncExample } from "./AsyncExample";
import { LessonLayout } from "../../components/LessonLayout";
import { React19EnhancedNotice } from "../../components/React19EnhancedNotice";
import LessonMd from "./Lesson.md?raw";
import CorrectSource from "./CorrectUsage.tsx?raw";
import MistakeSource from "./CommonMistake.tsx?raw";
import AsyncSource from "./AsyncExample.tsx?raw";

const meta: Meta = {
  title: "Lessons/useTransition",
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
      <React19EnhancedNotice hook="useTransition">
        React 19 enhances <code>useTransition</code> with support for{" "}
        <strong>async functions</strong> inside <code>startTransition</code>.
        You can now{" "}
        <code>
          startTransition(async () =&gt; {"{"} await fetch(…); setState(…) {"}"}
          )
        </code>{" "}
        and <code>isPending</code> stays <code>true</code> until the async work
        completes.
      </React19EnhancedNotice>
      <LessonLayout sourceCode={CorrectSource} title="✅ Correct">
        <CorrectUsage />
      </LessonLayout>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Uses `useTransition` to keep the search input responsive while an expensive list filter runs in the background. The `isPending` flag dims the list and shows a loading indicator.",
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
          "Filters a large list without `useTransition`. Every keystroke directly triggers the expensive re-render, making the input feel laggy with no pending feedback.",
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
          "Side-by-side: responsive input with useTransition (correct) vs. blocking input without it (anti-pattern). Try typing quickly in both to feel the difference.",
      },
    },
  },
};

export const AsyncTransition: StoryObj = {
  render: () => (
    <>
      <React19EnhancedNotice hook="useTransition">
        This example demonstrates the <strong>async form</strong> of{" "}
        <code>startTransition</code> added in React 19. <code>isPending</code>{" "}
        stays <code>true</code> throughout the entire async operation — no
        manual loading state needed.
      </React19EnhancedNotice>
      <LessonLayout sourceCode={AsyncSource} title="🚀 Async (React 19)">
        <AsyncExample />
      </LessonLayout>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "React 19 feature: `startTransition(async () => { … })`. The mock API fetch runs inside the transition, and `isPending` automatically tracks the async operation — replacing the manual `setLoading(true/false)` pattern.",
      },
    },
  },
};
