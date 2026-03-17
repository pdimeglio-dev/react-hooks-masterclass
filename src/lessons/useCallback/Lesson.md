# useCallback

> **🔴 React 19 Notice:** The React Compiler (previously "React Forget") **automatically stabilizes function references** during compilation, making manual `useCallback` calls unnecessary in most cases. The compiler detects which functions are passed to memoized children or used in dependency arrays and preserves their identity automatically. The hook still works, but it's redundant if you're using the React Compiler. [Learn more →](https://react.dev/blog/2024/10/21/react-compiler-beta-release)

## What is `useCallback`?

`useCallback` is a React hook that **caches a function definition** between renders. It's the function-specific sibling of `useMemo` — where `useMemo` caches a _computed value_, `useCallback` caches the _function itself_.

```tsx
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);
```

- The **first argument** is the function you want to cache.
- The **second argument** is a dependency array. React returns the same function reference as long as the dependencies haven't changed.

### `useCallback` vs `useMemo` — what's the difference?

They're almost identical under the hood. In fact:

```tsx
// These two are equivalent:
const fn = useCallback(() => doSomething(a, b), [a, b]);
const fn = useMemo(() => () => doSomething(a, b), [a, b]);
```

|              | `useMemo`                            | `useCallback`              |
| ------------ | ------------------------------------ | -------------------------- |
| **Caches**   | The _result_ of calling the function | The _function itself_      |
| **Returns**  | Any value                            | A function                 |
| **Use case** | Expensive computations               | Stable function references |

### ⚠️ Don't confuse `useMemo` with `React.memo()`!

These have similar names but do completely different things:

|                             | What it is                                       | What it does                                                                                 |
| --------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| **`useMemo(fn, deps)`**     | A **hook** (caches a value)                      | Skips re-computing a value if `deps` haven't changed                                         |
| **`React.memo(Component)`** | A **higher-order component** (wraps a component) | Skips re-rendering a component if its **props** haven't changed (shallow `===` on each prop) |

`React.memo()` is the one that "inspects props" to decide if a child should re-render. `useMemo` only looks at its own dependency array — it knows nothing about components or props.

**How they work together with `useCallback`:**

```
Parent re-renders (e.g., user types in an input)
  → useCallback keeps handleRemove as the SAME reference
  → Parent passes items + handleRemove to <ExpensiveList>
  → React.memo() on ExpensiveList checks each prop:
      items === prevItems?          ✅ same ref
      handleRemove === prevRef?     ✅ same thanks to useCallback
  → All props match → skip re-render ✅
```

Without `React.memo()` on the child, none of this matters — the child re-renders with its parent regardless, and `useCallback` is wasted effort.

### When to reach for `useCallback`

- You pass a callback to a **`React.memo()`-wrapped child** component and want to prevent unnecessary re-renders.
- You include a function in the **dependency array of `useEffect`** or another hook, and need a stable reference.
- You're building a **custom hook** that returns functions consumers will use as dependencies.

### Why does a "stable function reference" matter?

Every time a component re-renders, any function defined inside it is **re-created as a brand new object** in memory. Even if the code is identical, JavaScript treats them as different:

```tsx
function Parent() {
  // On render 1: handleRemove → object at 0xA1
  // On render 2: handleRemove → object at 0xB2 (NEW object!)
  // 0xA1 !== 0xB2, even though the code is the same
  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return <ExpensiveList onRemove={handleRemove} items={items} />;
}
```

Now imagine `ExpensiveList` is wrapped in `React.memo()`:

```tsx
const ExpensiveList = memo(({ items, onRemove }) => {
  console.log("🔄 I re-rendered!"); // When does this fire?
  return items.map((item) => (
    <button onClick={() => onRemove(item.id)}>{item.name}</button>
  ));
});
```

**Without `useCallback`:**

```
Parent renders (user types in an unrelated input)
  → handleRemove is a NEW function (0xB2 ≠ 0xA1)
  → React.memo compares props: onRemove changed!
  → ExpensiveList re-renders ❌ (wasted work)
```

**With `useCallback`:**

```tsx
const handleRemove = useCallback((id: string) => {
  setItems((prev) => prev.filter((i) => i.id !== id));
}, []); // same function reference every render
```

```
Parent renders (user types in an unrelated input)
  → handleRemove is the SAME function (0xA1 === 0xA1)
  → React.memo compares props: nothing changed!
  → ExpensiveList skips re-render ✅
```

**The key insight:** `React.memo()` uses `===` to compare props. A new function object on every render tricks it into thinking "the prop changed!" — even though the function does the exact same thing. `useCallback` preserves the same object identity so `React.memo()` can correctly skip the re-render.

> **If nothing downstream compares the reference** (no `React.memo`, no dependency array), a stable reference provides zero benefit — that's when `useCallback` is wasted overhead.

---

## When NOT to Use It

> **Only use `useCallback` when you need a stable function reference for performance or correctness — not as a default for every function.**

## Common Mistakes

### 1. Wrapping every handler "just in case"

The most widespread anti-pattern: wrapping every inline event handler in `useCallback` without a `React.memo()` child to benefit from the stable reference.

```tsx
// ❌ Pointless — this button re-renders with its parent anyway
const handleClick = useCallback(() => {
  setCount((c) => c + 1);
}, []);

return <button onClick={handleClick}>+1</button>;
```

A plain `<button>` is not memoized — it re-renders whenever its parent does regardless. The `useCallback` just adds overhead.

### 2. Dependencies that change every render

If your dependency array includes values that change on every render, the function is re-created on every render anyway — making `useCallback` pure overhead.

### 3. Using `useCallback` when `useMemo` is what you need

If you're trying to cache the _result_ of a computation (not a function reference), use `useMemo` instead.

## Key Takeaway

`useCallback` exists to give a **stable identity** to a function — useful only when something downstream (a memoized child, a dependency array) compares function references. If nothing checks the reference, `useCallback` is wasted work.
