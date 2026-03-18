# useTransition

## What is `useTransition`?

`useTransition` is a React hook that lets you mark state updates as **non-urgent transitions**, keeping the UI responsive while expensive re-renders happen in the background.

```tsx
const [isPending, startTransition] = useTransition();
```

- **`isPending`** — a boolean that is `true` while the transition is still rendering.
- **`startTransition`** — a function that wraps state updates to mark them as low-priority. React can interrupt these updates to handle more urgent work (like user input).

When you wrap a `setState` call inside `startTransition`, React continues showing the current UI while it prepares the new one in the background. If a more urgent update arrives (like a keystroke), React pauses the transition, handles the urgent update first, then resumes.

### React 19 Enhancement

In React 19, `startTransition` supports **async functions**:

```tsx
startTransition(async () => {
  const data = await fetchData();
  setResults(data);
});
```

This makes it easy to combine async operations with transition-based loading states.

### When to reach for `useTransition`

- You have a state update that triggers an **expensive re-render** (filtering thousands of items, switching between heavy tab content).
- You want to show a **pending indicator** while the transition is in progress.
- You need the UI to stay **responsive to user input** even while a heavy update is processing.

---

## When NOT to Use It

> **Don't use `useTransition` for cheap state updates.** If the re-render is already fast (< a few milliseconds), wrapping it in a transition adds complexity for no benefit.

## Common Mistakes

### 1. Not using transitions for expensive updates

If a state update causes an expensive re-render (filtering a huge list, computing heavy layouts), calling `setState` directly blocks the main thread. The user's input feels laggy because React can't process keystrokes until the render completes.

**Fix:** Wrap the expensive state update in `startTransition` so React can interrupt it for urgent updates.

### 2. Updating the urgent value inside the transition

A common mistake is putting the input's state update inside `startTransition` along with the expensive update. This makes the input itself feel laggy because React treats it as low-priority too.

**Fix:** Keep the input state update **outside** the transition. Only wrap the expensive/derived state update inside `startTransition`.

### 3. Ignoring the `isPending` flag

When a transition is in progress, the old UI remains visible. Without a pending indicator, users have no feedback that something is happening — the app appears broken or unresponsive.

**Fix:** Use `isPending` to show a spinner, reduce opacity, or display a "Loading…" message.

## Key Takeaway

`useTransition` is for **keeping the UI responsive during expensive state updates**. It splits your updates into two priorities: urgent (user input stays snappy) and non-urgent (heavy rendering happens in the background). Always show a pending state so users know something is happening.
