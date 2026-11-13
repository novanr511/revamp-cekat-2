import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { TableOfContents } from "./table-of-contents";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("article table of contents", () => {
  it("tracks the last heading above the reading line, not the next nearby heading", () => {
    const positions = { faq: 103, answer: 175 };
    const faq = document.createElement("h2");
    const answer = document.createElement("h3");
    faq.id = "faq";
    answer.id = "answer";
    document.body.append(faq, answer);
    vi.spyOn(faq, "getBoundingClientRect").mockImplementation(
      () => ({ top: positions.faq }) as DOMRect,
    );
    vi.spyOn(answer, "getBoundingClientRect").mockImplementation(
      () => ({ top: positions.answer }) as DOMRect,
    );
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callback(0);
      return 1;
    });

    render(
      <TableOfContents
        label="On this page"
        items={[
          { id: "faq", text: "FAQ", level: 2 },
          { id: "answer", text: "Answer", level: 3 },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    positions.faq = -50;
    positions.answer = 103;
    fireEvent.scroll(window);
    expect(screen.getByRole("link", { name: "Answer" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    faq.remove();
    answer.remove();
  });
});
