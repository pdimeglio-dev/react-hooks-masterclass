# React 19 Hook Compatibility Reference

When adding a new hook lesson, **always check this list** to determine if the hook is obsolete, partially obsolete, or still essential in React 19. If a hook is affected, add the `React19Notice` banner to the Lesson.md and stories.

## Hook Status in React 19

| Hook                   | Status                      | Why                                                                                                                                  |
| ---------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `useState`             | ✅ **Essential**            | State management is fundamental. The React Compiler doesn't replace it.                                                              |
| `useReducer`           | ✅ **Essential**            | Complex state logic still requires explicit reducers. Not affected by the compiler.                                                  |
| `useContext`           | ✅ **Essential**            | Context consumption is unchanged. (React 19 adds `use(context)` as an alternative syntax, but `useContext` still works.)             |
| `useRef`               | ✅ **Essential**            | Mutable refs for DOM access and non-rendering values. Not affected by the compiler.                                                  |
| `useEffect`            | ✅ **Essential**            | Side effects (data fetching, subscriptions, DOM mutations) still need explicit effect management.                                    |
| `useLayoutEffect`      | ✅ **Essential**            | Synchronous DOM measurements before paint. Not affected by the compiler.                                                             |
| `useImperativeHandle`  | ✅ **Essential**            | Customizing refs exposed to parent components. Not affected.                                                                         |
| `useId`                | ✅ **Essential**            | Generating unique IDs for accessibility. Not affected.                                                                               |
| `useSyncExternalStore` | ✅ **Essential**            | Subscribing to external stores. Not affected.                                                                                        |
| `useDebugValue`        | ✅ **Essential**            | Dev-only debug labels. Not affected.                                                                                                 |
| `useMemo`              | 🔴 **Largely Obsolete**     | The React Compiler automatically memoizes computed values during compilation. Manual `useMemo` is redundant when using the compiler. |
| `useCallback`          | 🔴 **Largely Obsolete**     | The React Compiler automatically stabilizes function references. Manual `useCallback` is redundant when using the compiler.          |
| `useTransition`        | ✅ **Essential (Enhanced)** | Still essential for concurrent features. React 19 enhances it with async function support.                                           |
| `useDeferredValue`     | ✅ **Essential**            | Deferring non-urgent updates. Not replaced by the compiler.                                                                          |
| `useActionState`       | 🆕 **New in React 19**      | Replaces the old `useFormState`. Manages form action state with pending status.                                                      |
| `useFormStatus`        | 🆕 **New in React 19**      | Access the status of a parent `<form>` action.                                                                                       |
| `useOptimistic`        | 🆕 **New in React 19**      | Optimistic UI updates while an async action is in progress.                                                                          |
| `use`                  | 🆕 **New in React 19**      | Read resources (promises, context) during render. Can be called conditionally.                                                       |

## How to Apply

When creating a new lesson:

1. Check this table for the hook's status.
2. If **🔴 Largely Obsolete**: Add the `React19Notice` banner at the top of `Lesson.md` and in the Correct story render.
3. If **🆕 New in React 19**: Note this in the "What is..." section of `Lesson.md`.
4. If **✅ Essential**: No special notice needed — the hook is still the standard approach.

## React Compiler Note

The React Compiler (previously "React Forget") is opt-in and requires a build plugin. Projects NOT using the compiler still benefit from `useMemo` and `useCallback`. The lessons should still teach these hooks for:

- Understanding legacy codebases
- Projects that haven't adopted the compiler yet
- Understanding the underlying concepts (memoization, referential equality)
