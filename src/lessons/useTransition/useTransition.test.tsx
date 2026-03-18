import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { CorrectUsage } from "./CorrectUsage";
import { AsyncExample } from "./AsyncExample";

describe("useTransition — CorrectUsage", () => {
  it("renders the initial list with capped items", () => {
    render(<CorrectUsage />);
    expect(screen.getByText(/Showing 1000 items/)).toBeInTheDocument();
    expect(screen.getByText(/capped at 1,000/)).toBeInTheDocument();
  });

  it("renders the search input", () => {
    render(<CorrectUsage />);
    expect(
      screen.getByPlaceholderText("Type to filter 20,000 items…")
    ).toBeInTheDocument();
  });

  it("updates the input value when typing", async () => {
    const user = userEvent.setup();
    render(<CorrectUsage />);

    const input = screen.getByPlaceholderText("Type to filter 20,000 items…");
    await user.type(input, "alpha");

    expect(input).toHaveValue("alpha");
  });

  it("filters the list based on search query", async () => {
    const user = userEvent.setup();
    render(<CorrectUsage />);

    const input = screen.getByPlaceholderText("Type to filter 20,000 items…");
    await user.type(input, "alpha");

    // Wait for the transition to complete — the filtered count should change
    // "alpha" items = indices where i % 5 === 0, so 4000 items, capped at 1000
    await screen.findByText(/Showing 1000 items/);
  });

  it("shows fewer results for a more specific query", async () => {
    const user = userEvent.setup();
    render(<CorrectUsage />);

    const input = screen.getByPlaceholderText("Type to filter 20,000 items…");
    // "Item 999 " is very specific — should match only a few items
    await user.type(input, "Item 999 ");

    await screen.findByText(/Showing \d+ items/);
    // Should show significantly fewer than 1000
    const text = screen.getByText(/Showing \d+ items/).textContent!;
    const count = parseInt(text.match(/Showing (\d+)/)?.[1] ?? "0");
    expect(count).toBeLessThan(1000);
  });
});

describe("useTransition — AsyncExample", () => {
  it("renders the initial state with search prompt", () => {
    render(<AsyncExample />);
    expect(
      screen.getByText(/Click "Search" to fetch users/)
    ).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("renders the search input", () => {
    render(<AsyncExample />);
    expect(screen.getByPlaceholderText("e.g. Alice, Bob…")).toBeInTheDocument();
  });

  it("fetches and displays all users when searching with empty query", async () => {
    const user = userEvent.setup();
    render(<AsyncExample />);

    await user.click(screen.getByText("Search"));

    // Wait for async fetch to complete (800-1200ms mock delay)
    await screen.findByText(/Found 15 users/, {}, { timeout: 3000 });
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Oscar Wilde")).toBeInTheDocument();
  });

  it("filters users based on search query", async () => {
    const user = userEvent.setup();
    render(<AsyncExample />);

    const input = screen.getByPlaceholderText("e.g. Alice, Bob…");
    await user.type(input, "alice");
    await user.click(screen.getByText("Search"));

    await screen.findByText(/Found 1 user/, {}, { timeout: 3000 });
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
  });

  it("shows no results for non-matching query", async () => {
    const user = userEvent.setup();
    render(<AsyncExample />);

    const input = screen.getByPlaceholderText("e.g. Alice, Bob…");
    await user.type(input, "zzzzz");
    await user.click(screen.getByText("Search"));

    await screen.findByText(/Found 0 users/, {}, { timeout: 3000 });
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });
});
