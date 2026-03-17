import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CorrectUsage } from "./CorrectUsage";

describe("useMemo — CorrectUsage", () => {
  it("renders the initial list with all items", () => {
    render(<CorrectUsage />);
    expect(screen.getByText(/Showing 10000 items/)).toBeInTheDocument();
  });

  it("filters items when category is changed", async () => {
    const user = userEvent.setup();
    render(<CorrectUsage />);

    await user.selectOptions(screen.getByRole("combobox"), "electronics");

    // Electronics = items where i % 3 === 0, so ~3334 items
    expect(screen.getByText(/Showing 3334 items/)).toBeInTheDocument();
  });

  it("does not re-filter when typing in the name input", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<CorrectUsage />);

    // Clear initial render log
    consoleSpy.mockClear();

    // Type in the name field — should NOT trigger filtering
    await user.type(screen.getByRole("textbox"), "Alice");

    // The filter log should NOT have been called
    const filterCalls = consoleSpy.mock.calls.filter((call) =>
      String(call[0]).includes("Filtering 10,000 items")
    );
    expect(filterCalls).toHaveLength(0);

    consoleSpy.mockRestore();
  });

  it("displays greeting when name is entered", async () => {
    const user = userEvent.setup();
    render(<CorrectUsage />);

    await user.type(screen.getByRole("textbox"), "Alice");
    expect(screen.getByText("Hello, Alice!")).toBeInTheDocument();
  });
});
