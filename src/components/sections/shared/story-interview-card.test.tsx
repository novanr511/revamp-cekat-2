import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { StoryInterviewCard } from "./story-interview-card";

const props = {
  videoId: "ePdVgW7X01s",
  image: "/images/home/testimonial-silica-brenda.jpg",
  company: "Moir Salon",
  name: "Silcia Brenda",
  role: "CEO & Pendiri - Moir Salon",
  watchLabel: "Tonton wawancaranya",
  closeLabel: "Tutup",
  fallbackLabel: "Video tidak terbuka? Tonton di YouTube",
  loadingLabel: "Memuat wawancara…",
};

describe("editorial story interviews", () => {
  // jsdom does not implement the native dialog API; actual focus/Escape are
  // verified in Chromium rather than simulated by this unit test.
  const originalShowModal = Object.getOwnPropertyDescriptor(
    HTMLDialogElement.prototype,
    "showModal",
  );
  const originalClose = Object.getOwnPropertyDescriptor(
    HTMLDialogElement.prototype,
    "close",
  );
  beforeAll(() => {
    Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
      configurable: true,
      writable: true,
      value() {},
    });
    Object.defineProperty(HTMLDialogElement.prototype, "close", {
      configurable: true,
      writable: true,
      value() {},
    });
  });
  afterAll(() => {
    if (originalShowModal)
      Object.defineProperty(
        HTMLDialogElement.prototype,
        "showModal",
        originalShowModal,
      );
    else Reflect.deleteProperty(HTMLDialogElement.prototype, "showModal");
    if (originalClose)
      Object.defineProperty(
        HTMLDialogElement.prototype,
        "close",
        originalClose,
      );
    else Reflect.deleteProperty(HTMLDialogElement.prototype, "close");
  });

  it("renders a company label followed by a story headline on regular cards too", () => {
    const { container } = render(
      <StoryInterviewCard
        {...props}
        headline="Transformasi layanan pelanggan bersama Cekat.AI."
      />,
    );
    const copy = container.querySelector(".story-interview__copy")!;
    expect(copy.firstElementChild).toHaveClass("story-interview__company");
    expect(copy.firstElementChild).toHaveTextContent("Moir Salon");
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Transformasi layanan pelanggan bersama Cekat.AI.",
    );
    expect(
      screen.getByRole("button", { name: "Tonton wawancaranya" }),
    ).toBeInTheDocument();
  });
  it("keeps customer identity visible and defers the embed until requested", () => {
    const { container } = render(<StoryInterviewCard {...props} />);
    expect(
      screen.getByRole("heading", { name: "Moir Salon" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Silcia Brenda")).toBeInTheDocument();
    expect(container.querySelector("iframe")).toBeNull();
    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      "Silcia Brenda, Moir Salon",
    );
  });

  it("opens the interview, shows loading and fallback, and removes the embed on close", async () => {
    const showModal = vi
      .spyOn(HTMLDialogElement.prototype, "showModal")
      .mockImplementation(function (this: HTMLDialogElement) {
        this.setAttribute("open", "");
      });
    const close = vi
      .spyOn(HTMLDialogElement.prototype, "close")
      .mockImplementation(function (this: HTMLDialogElement) {
        this.removeAttribute("open");
        this.dispatchEvent(new Event("close"));
      });
    const user = userEvent.setup();
    const { container } = render(<StoryInterviewCard {...props} />);
    await user.click(
      screen.getByRole("button", { name: "Tonton wawancaranya" }),
    );
    expect(showModal).toHaveBeenCalledOnce();
    expect(screen.getByRole("dialog")).toHaveAccessibleName(
      "Tonton wawancaranya: Moir Salon",
    );
    expect(screen.getByRole("status")).toHaveTextContent(props.loadingLabel);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=ePdVgW7X01s",
    );
    fireEvent.load(container.querySelector("iframe")!);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Tutup" }));
    expect(container.querySelector("iframe")).toBeNull();
    showModal.mockRestore();
    close.mockRestore();
  });

  it("uses the real customer photo for the featured interview and survives image failure", () => {
    const { container } = render(
      <StoryInterviewCard
        {...props}
        featured
        headline="Respon pelanggan menjadi lebih cepat"
      />,
    );
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Respon pelanggan menjadi lebih cepat",
    );
    expect(screen.getByRole("img")).toHaveAttribute("fetchpriority", "high");
    fireEvent.error(screen.getByRole("img"));
    expect(
      container.querySelector(".story-interview__image-fallback"),
    ).toHaveTextContent("Moir Salon");
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});
