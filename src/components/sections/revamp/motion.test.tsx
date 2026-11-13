import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";
import { RevampMotion } from "./motion";

const gsap = vi.hoisted(() => ({
  from: vi.fn(),
  fromTo: vi.fn(),
  context: vi.fn(),
}));
vi.mock("gsap", () => ({ gsap }));
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("progressive secondary-page motion", () => {
  it("keeps reduced-motion content visible without initializing GSAP", async () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
    } as MediaQueryList);
    const { container } = render(
      <RevampMotion>
        <h1 data-r-hero>Title</h1>
        <section data-r-reveal>Body</section>
      </RevampMotion>,
    );
    await Promise.resolve();
    expect(gsap.context).not.toHaveBeenCalled();
    expect(container.querySelector("h1")).not.toHaveAttribute("style");
    expect(container.querySelector("section")).toBeVisible();
  });

  it("registers deferred reveals in the context and reverts them on route teardown", async () => {
    let intersect: IntersectionObserverCallback;
    const disconnect = vi.fn();
    const unobserve = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: IntersectionObserverCallback) {
          intersect = callback;
        }
        observe = vi.fn();
        unobserve = unobserve;
        disconnect = disconnect;
      },
    );
    const remove = vi.fn();
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: remove,
    } as unknown as MediaQueryList);
    const context = {
      add: vi.fn((callback: () => void) => callback()),
      revert: vi.fn(),
    };
    gsap.context.mockImplementation((callback: () => void) => {
      callback();
      return context;
    });
    const { container, unmount } = render(
      <RevampMotion>
        <h1 data-r-hero>Title</h1>
        <section data-r-reveal>Body</section>
      </RevampMotion>,
    );
    await waitFor(() => expect(gsap.from).toHaveBeenCalledOnce());
    const target = container.querySelector("section")!;
    const entry: IntersectionObserverEntry = {
      isIntersecting: true,
      target,
      boundingClientRect: target.getBoundingClientRect(),
      intersectionRect: target.getBoundingClientRect(),
      intersectionRatio: 1,
      rootBounds: null,
      time: 0,
    };
    intersect!([entry], {} as IntersectionObserver);
    expect(context.add).toHaveBeenCalledOnce();
    expect(gsap.fromTo).toHaveBeenCalledOnce();
    expect(unobserve).toHaveBeenCalledWith(target);
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(context.revert).toHaveBeenCalledOnce();
    expect(remove).toHaveBeenCalledWith("change", expect.any(Function));
    intersect!([entry], {} as IntersectionObserver);
    expect(gsap.fromTo).toHaveBeenCalledOnce();
  });

  it("cancels current animation when reduced motion changes mid-session", async () => {
    let change: () => void;
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      addEventListener: (_event: string, callback: () => void) => {
        change = callback;
      },
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList);
    const context = { revert: vi.fn() };
    gsap.context.mockImplementation((callback: () => void) => {
      callback();
      return context;
    });
    render(
      <RevampMotion>
        <h1 data-r-hero>Title</h1>
      </RevampMotion>,
    );
    await waitFor(() => expect(gsap.context).toHaveBeenCalledOnce());
    change!();
    expect(context.revert).toHaveBeenCalledOnce();
  });
});
