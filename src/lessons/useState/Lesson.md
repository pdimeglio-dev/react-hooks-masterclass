# useState

## What is `useState`?

`useState` is React's most fundamental hook. It lets a function component **hold a piece of state** that persists between renders. When you call the setter function, React schedules a re-render so the UI reflects the new value.

```tsx
const [count, setCount] = useState(0);
```

- **`count`** — the current value (starts at `0` on the first render).
- **`setCount`** — a function to update the value. You can pass the next value directly (`setCount(5)`) or an **updater function** (`setCount(prev => prev + 1)`) when the new value depends on the previous one.

React batches state updates for performance. If you call `setCount` multiple times in the same event handler, React only re-renders once with the final value.

### When to reach for `useState`

- You need a value that **the user can see or interact with** (form inputs, toggles, counters).
- The value **changes over time** in response to user actions, network responses, or timers.
- When the value changes, **the UI should update** to reflect it.

---

## When NOT to Use It

> **Only use `useState` for values that, when they change, should cause a re-render.**

## Common Mistakes

### 1. Storing values that don't affect the UI

If a value is only read inside event handlers or effects — and never rendered — it shouldn't live in state. Every `setState` call triggers a re-render, which is wasted work if nothing visible changes.

**Fix:** Use `useRef` for mutable values that don't drive rendering (timers, previous values, instance counters).

### 2. Storing derived / computed values

If a value can be calculated from existing state or props, **don't** put it in a separate `useState`. This creates a synchronization problem — you have to remember to update both values together, and if you forget, your UI is inconsistent.

**Fix:** Compute derived values inline during render: `const doubled = count * 2`.

### 3. Tracking render counts or internal metrics

Putting a "render count" in state creates a feedback loop: every render increments the count, which triggers another render, which increments the count…

**Fix:** Use `useRef` — mutating `.current` does not trigger a re-render.

## Key Takeaway

`useState` is for **user-facing, rendering-relevant data**. If the value doesn't appear in your JSX or influence what appears in your JSX, it probably doesn't belong in state.
