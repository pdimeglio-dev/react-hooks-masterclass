import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CorrectUsage } from "./CorrectUsage";

describe("useCallback — CorrectUsage", () => {
  it("renders the initial list of items", () => {
    render(<CorrectUsage />);
    expect(screen.getByText(/Apple/)).toBeInTheDocument();
    expect(screen.getByText(/Banana/)).toBeInTheDocument();
    expect(screen.getByText(/Cherry/)).toBeInTheDocument();
    expect(screen.getByText(/Date/)).toBeInTheDocument();
  });

  it("removes an item when the remove button is clicked", async () => {
    const user = userEvent.setup();
    render(<CorrectUsage />);

    // Click the remove button for "Banana"
    const removeButtons = screen.getAllByText("✕");
    await user.click(removeButtons[1]); // Banana is the second item

    expect(screen.queryByText(/Banana/)).not.toBeInTheDocument();
    expect(screen.getByText(/Apple/)).toBeInTheDocument();
    expect(screen.getByText(/Cherry/)).toBeInTheDocument();
  });

  it("does not re-render ExpensiveList when typing in the name input", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<CorrectUsage />);

    // Clear initial render log
    consoleSpy.mockClear();

    // Type in the name field
    await user.type(screen.getByRole("textbox"), "Alice");

    // ExpensiveList should NOT have been re-rendered
    const listRenders = consoleSpy.mock.calls.filter((call) =>
      String(call[0]).includes("ExpensiveList rendered")
    );
    expect(listRenders).toHaveLength(0);

    consoleSpy.mockRestore();
  });

  it("displays the greeting when name is entered", async () => {
    const user = userEvent.setup();
    render(<CorrectUsage />);

    await user.type(screen.getByRole("textbox"), "Bob");
    expect(screen.getByText("Hello, Bob!")).toBeInTheDocument();
  });
});
