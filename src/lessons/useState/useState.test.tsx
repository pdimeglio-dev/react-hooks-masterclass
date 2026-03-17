import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { CorrectUsage } from "./CorrectUsage";

describe("useState — CorrectUsage", () => {
  it("renders the initial count of 0", () => {
    render(<CorrectUsage />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("increments the count when Increment is clicked", async () => {
    const user = userEvent.setup();
    render(<CorrectUsage />);

    await user.click(screen.getByText("Increment"));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  it("decrements the count when Decrement is clicked", async () => {
    const user = userEvent.setup();
    render(<CorrectUsage />);

    await user.click(screen.getByText("Increment"));
    await user.click(screen.getByText("Increment"));
    await user.click(screen.getByText("Decrement"));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  it("resets the count to 0", async () => {
    const user = userEvent.setup();
    render(<CorrectUsage />);

    await user.click(screen.getByText("Increment"));
    await user.click(screen.getByText("Increment"));
    await user.click(screen.getByText("Reset"));
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("handles rapid sequential clicks correctly (updater function)", async () => {
    const user = userEvent.setup();
    render(<CorrectUsage />);

    // Click increment 5 times rapidly
    for (let i = 0; i < 5; i++) {
      await user.click(screen.getByText("Increment"));
    }

    expect(screen.getByText("Count: 5")).toBeInTheDocument();
  });
});
