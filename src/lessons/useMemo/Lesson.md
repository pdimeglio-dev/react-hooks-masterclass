# useMemo

> **🔴 React 19 Notice:** The React Compiler (previously "React Forget") can **automatically memoize** values and JSX during compilation, making manual `useMemo` calls unnecessary in most cases. If your project uses the React Compiler, you no longer need to write `useMemo` — the compiler inserts the equivalent optimization for you. The hook still works, but it's redundant. [Learn more →](https://react.dev/blog/2024/10/21/react-compiler-beta-release)

## What is `useMemo`?

`useMemo` is a React hook that **caches the result of a computation** between renders. It takes a function and a dependency array — React calls the function on the first render, stores the result, and only re-computes it when one of the dependencies changes.

```tsx
const filtered = useMemo(() => {
  return items.filter((item) => item.active);
}, [items]);
```

- The **first argument** is a "create" function that returns the computed value.
- The **second argument** is a dependency array (`[items]`). React uses `Object.is` to compare each dependency with its previous value. If nothing changed, the cached result is returned without calling the function.

Think of `useMemo` as telling React: _"I already computed this. Don't redo it unless these specific inputs change."_

### When to reach for `useMemo`

- **Expensive computations** — filtering, sorting, or transforming large datasets (1,000+ items).
- **Preserving referential equality** — when passing an object or array as a prop to a `React.memo()` child, wrapping it in `useMemo` prevents unnecessary re-renders of that child.
- **Heavy serialization** — `JSON.stringify` on large objects, complex formatting, etc.

---

## When NOT to Use It

> **Only use `useMemo` when the computation is genuinely expensive AND skipping it provides a measurable performance gain.**

## The Anti-Pattern: Memoizing Cheap Operations

The most common misuse of `useMemo` is wrapping trivial computations — string concatenation, simple arithmetic, template literals, or accessing object properties.

```tsx
// ❌ DON'T — string concatenation is nanoseconds
const fullName = useMemo(() => `${first} ${last}`, [first, last]);

// ✅ DO — just compute it
const fullName = `${first} ${last}`;
```

### Why is this bad?

1. **`useMemo` has overhead.** React must store the previous result, compare dependency arrays (using `Object.is` on each dep), and decide whether to return the cached value. For cheap operations, this bookkeeping costs MORE than just re-computing the value.

2. **It obscures intent.** When a reader sees `useMemo`, they assume "this is expensive." If it wraps a string concat, it's a misleading signal that wastes their time investigating a non-issue.

3. **It creates dependency chains.** Once you memoize `fullName`, now `greeting` depends on the memoized `fullName`, creating an unnecessary cascade of memoized values.

## When TO Use useMemo

- **Filtering/sorting large arrays** (1,000+ items)
- **Complex calculations** that take >1ms (measure with `console.time`)
- **Creating objects/arrays** passed as props to `React.memo()` children (to preserve referential equality)
- **Expensive serialization** (JSON.stringify on large objects)

## Rule of Thumb

> If you can't measure the performance difference with `React Profiler` or `console.time`, you don't need `useMemo`.
