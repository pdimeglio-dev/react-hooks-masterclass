# React Hooks Masterclass

An interactive, Storybook-powered guide to React hooks — showing **correct usage** and **common mistakes** side-by-side with explanations.

## 🚀 Getting Started

```bash
npm install
npm run storybook    # Open Storybook at http://localhost:6006
npm test             # Run unit tests
npm run test:watch   # Run tests in watch mode
```

## 📁 Project Structure

```
src/lessons/
├── useState/
│   ├── CorrectUsage.tsx       # ✅ Best-practice implementation
│   ├── CommonMistake.tsx      # ❌ Anti-pattern version
│   ├── Lesson.md              # 📖 Explanation of WHY the mistake is wrong
│   ├── useState.test.tsx      # 🧪 Vitest tests for correct behavior
│   └── useState.stories.tsx   # 📚 Storybook stories (side-by-side)
├── useMemo/
│   ├── CorrectUsage.tsx
│   ├── CommonMistake.tsx
│   ├── Lesson.md
│   ├── useMemo.test.tsx
│   └── useMemo.stories.tsx
└── [hookName]/                # Add more hooks here!
    ├── CorrectUsage.tsx
    ├── CommonMistake.tsx
    ├── Lesson.md
    ├── [hookName].test.tsx
    └── [hookName].stories.tsx
```

## 📖 Current Lessons

| Hook          | Correct Usage                                                 | Common Mistake                                                   |
| ------------- | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| `useState`    | State for UI-driven values with updater functions             | Storing derived state, non-rendering values, render counters     |
| `useMemo`     | Memoizing expensive filter/sort of 10k items                  | Memoizing trivial string concatenation & arithmetic              |
| `useCallback` | Stable handler ref for a `React.memo()` child (vs. `useMemo`) | Wrapping every handler "just in case" without memoized consumers |

## ➕ Adding a New Hook Lesson

Create a new folder under `src/lessons/` with these 5 files:

```bash
mkdir src/lessons/useEffect
```

Then create:

1. `CorrectUsage.tsx` — Clean, best-practice implementation
2. `CommonMistake.tsx` — Anti-pattern showing how it's commonly misused
3. `Lesson.md` — Must follow this structure:
   - **"What is `useEffect`?"** — Brief explanation of what the hook does, its API signature, and when to reach for it
   - **"When NOT to Use It"** — The DOs and DON'Ts with concrete code examples
   - **"Key Takeaway"** — One-sentence summary
4. `useEffect.test.tsx` — Vitest tests for the correct behavior
5. `useEffect.stories.tsx` — Storybook stories rendering both versions (uses `LessonLayout` to show source code)

### 🔴 React 19 Compatibility Check (Required)

Before finishing any lesson, **always consult [`src/lessons/REACT19_COMPAT.md`](src/lessons/REACT19_COMPAT.md)** to check if the hook is obsolete, enhanced, or new in React 19:

- If **🔴 Largely Obsolete** (e.g., `useMemo`, `useCallback`): Add a `React19Notice` banner to both `Lesson.md` and the story renders
- If **🆕 New in React 19** (e.g., `useActionState`, `use`): Note this in the "What is..." section
- If **✅ Essential**: No special notice needed

**Or just ask me!** Say: _"Add a useEffect lesson"_ and I'll scaffold everything with the React 19 check included automatically.

## 🚢 Deployment

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. Runs all tests via `npm test`
2. Builds the Storybook
3. Deploys the static site to GitHub Pages

Pushes to `main` automatically trigger deployment.

## 🛠 Tech Stack

- **React 19** + **TypeScript**
- **Vite** — Build tooling
- **Storybook 10** — Interactive component explorer with autodocs
- **Vitest** — Unit testing with jsdom
- **Testing Library** — Component testing utilities
