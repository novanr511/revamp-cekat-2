import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BlogSearch } from "./blog-search";

const push = vi.hoisted(() => vi.fn());
vi.mock("@/i18n/navigation", () => ({
  getPathname: () => "/blog",
  useRouter: () => ({ push }),
}));
vi.mock("next-intl", () => ({ useLocale: () => "id" }));
afterEach(() => {
  cleanup();
  push.mockClear();
});

const mount = (initialQuery = "") =>
  render(
    <BlogSearch
      initialQuery={initialQuery}
      label="Cari artikel"
      placeholder="Cari kata kunci"
      clearLabel="Hapus pencarian"
    />,
  );

describe("blog search", () => {
  it("associates a visible label and retains the no-JS GET form", () => {
    mount();
    expect(screen.getByText("Cari artikel")).toBeVisible();
    expect(screen.getByLabelText("Cari artikel")).toHaveAttribute("name", "q");
    expect(screen.getByRole("search")).toHaveAttribute("action", "/blog");
    expect(screen.getByRole("search")).toHaveAttribute("method", "get");
  });

  it("submits a trimmed query and clears back to the complete listing", () => {
    mount();
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "  CRM  " },
    });
    fireEvent.submit(screen.getByRole("search"));
    expect(push).toHaveBeenLastCalledWith({
      pathname: "/blog",
      query: { q: "CRM" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Hapus pencarian" }));
    expect(push).toHaveBeenLastCalledWith("/blog");
    expect(screen.getByRole("searchbox")).toHaveValue("");
  });

  it("opens the compact mobile control and focuses the search field", async () => {
    mount();
    fireEvent.click(screen.getByRole("button", { name: "Open search" }));
    expect(
      screen.getByRole("button", { name: "Close search" }),
    ).toHaveAttribute("aria-expanded", "true");
    await waitFor(() => expect(screen.getByRole("searchbox")).toHaveFocus());
    fireEvent.click(screen.getByRole("button", { name: "Close search" }));
    expect(screen.getByRole("button", { name: "Open search" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("keeps keyboard opens instant, but allows pointer entry feedback", () => {
    mount();
    fireEvent.click(screen.getByRole("button", { name: "Open search" }), {
      detail: 0,
    });
    expect(screen.getByRole("search")).toHaveAttribute(
      "data-motion",
      "instant",
    );
    fireEvent.click(screen.getByRole("button", { name: "Close search" }));
    expect(screen.getByRole("button", { name: "Open search" })).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Open search" }), {
      detail: 1,
    });
    expect(screen.getByRole("search")).toHaveAttribute(
      "data-motion",
      "pointer",
    );
  });

  it("Escape closes mobile search without navigation and returns focus", async () => {
    const media = vi
      .spyOn(window, "matchMedia")
      .mockReturnValue({ matches: true } as MediaQueryList);
    mount("CRM");
    fireEvent.keyDown(screen.getByRole("searchbox"), { key: "Escape" });
    expect(screen.getByRole("button", { name: "Open search" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getByRole("button", { name: "Open search" })).toHaveFocus();
    expect(screen.getByRole("searchbox")).toHaveValue("CRM");
    expect(screen.getByRole("search")).toHaveAttribute(
      "data-motion",
      "instant",
    );
    expect(push).not.toHaveBeenCalled();
    media.mockRestore();
  });

  it("cancels queued focus on rapid open/close and on unmount", () => {
    const request = vi
      .spyOn(window, "requestAnimationFrame")
      .mockReturnValue(123);
    const cancel = vi.spyOn(window, "cancelAnimationFrame");
    const { unmount } = mount();
    fireEvent.click(screen.getByRole("button", { name: "Open search" }));
    fireEvent.click(screen.getByRole("button", { name: "Close search" }));
    expect(cancel).toHaveBeenCalledWith(123);
    expect(screen.getByRole("button", { name: "Open search" })).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Open search" }));
    unmount();
    expect(cancel).toHaveBeenCalledTimes(2);
    request.mockRestore();
    cancel.mockRestore();
  });
});
