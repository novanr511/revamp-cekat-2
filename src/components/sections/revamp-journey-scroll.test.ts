import { readFileSync } from "node:fs";
import { afterEach, expect, it, vi } from "vitest";

let removeListeners = () => {};

afterEach(() => {
  removeListeners();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  document.body.innerHTML = "";
  delete window.__cekatLenis;
});

it.each([
  [true, false],
  [false, false],
  [false, true],
])(
  "gates all five stages without leaking to Clara (Lenis: %s, reduced motion: %s)",
  (smooth, reducedMotion) => {
    vi.useFakeTimers();
    const keys = ["acquire", "engage", "convert", "retain", "measure"];
    document.body.innerHTML = `<section id="journey"><aside class="journey__nav"><div class="rail">${keys.map((key, i) => `<button class="rail__tab" aria-controls="panel-${key}" aria-selected="${i === 0}"></button>`).join("")}</div></aside>${keys.map((key, i) => `<div id="panel-${key}" class="panel" ${i ? "hidden" : ""}><div class="feat__copy"></div><div class="feat__stage"><div class="feat__frame"></div></div></div>`).join("")}<div class="products">${keys.map((key) => `<div class="product" data-stages="${key}"><span class="product__name">${key}</span></div>`).join("")}</div></section><section id="trial"></section>`;
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)" && reducedMotion,
      addEventListener() {},
    }));
    vi.spyOn(window, "scrollY", "get").mockReturnValue(1000);
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(900);
    let nextSectionTop = 910;
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
      function (this: Element) {
        return {
          top: this.id === "trial" ? nextSectionTop : 96,
          height: 0,
        } as DOMRect;
      },
    );
    const scrollTo = vi.fn();
    if (smooth)
      window.__cekatLenis = { scrollTo } as unknown as NonNullable<
        Window["__cekatLenis"]
      >;
    const nativeScrollTo = vi
      .spyOn(window, "scrollTo")
      .mockImplementation(() => {});
    const registrations = vi.spyOn(window, "addEventListener");
    removeListeners = () => {
      registrations.mock.calls.forEach(([type, listener, options]) =>
        window.removeEventListener(type, listener, options),
      );
    };
    const script = readFileSync("public/revamp-web-cekat/main.js", "utf8");
    const block = script.slice(
      script.indexOf("  const journey ="),
      script.indexOf("  // Journey feature lists"),
    );
    const dispose = new Function(
      "$",
      "$$",
      `${block};return () => { clearTimeout(journeyGestureIdleTimer); };`,
    )(
      (selector: string, root = document) => root.querySelector(selector),
      (selector: string, root = document) => [
        ...root.querySelectorAll(selector),
      ],
    );
    const downstream = vi.fn();
    window.addEventListener("wheel", downstream);
    const wheel = () =>
      window.dispatchEvent(
        new WheelEvent("wheel", { deltaY: 200, cancelable: true }),
      );
    wheel();
    expect(
      document
        .querySelector('[aria-selected="true"]')
        ?.getAttribute("aria-controls"),
    ).toBe("panel-engage");
    if (smooth)
      expect(scrollTo).toHaveBeenCalledWith(
        1000,
        expect.objectContaining({
          immediate: false,
          force: true,
          duration: 0.48,
        }),
      );
    else
      expect(nativeScrollTo).toHaveBeenCalledWith({
        top: 1000,
        behavior: reducedMotion ? "instant" : "smooth",
      });
    expect(downstream).not.toHaveBeenCalled();
    // Continuing over the same element must reach the scroll engine once
    // the next panel is aligned, even while stage advancement is throttled.
    nextSectionTop = 3000;
    wheel();
    expect(downstream).toHaveBeenCalledOnce();
    downstream.mockClear();
    nextSectionTop = 910;
    wheel();
    expect(
      document
        .querySelector('[aria-selected="true"]')
        ?.getAttribute("aria-controls"),
    ).toBe("panel-engage");
    for (const key of keys.slice(2)) {
      if (key === "convert") {
        for (let i = 0; i < 4; i++) {
          vi.advanceTimersByTime(50);
          wheel();
          expect(
            document
              .querySelector('[aria-selected="true"]')
              ?.getAttribute("aria-controls"),
          ).toBe("panel-engage");
        }
        vi.advanceTimersByTime(50);
      } else vi.advanceTimersByTime(250);
      wheel();
      expect(
        document
          .querySelector('[aria-selected="true"]')
          ?.getAttribute("aria-controls"),
      ).toBe(`panel-${key}`);
      expect(downstream).not.toHaveBeenCalled();
    }
    vi.advanceTimersByTime(250);
    const upward = new WheelEvent("wheel", { deltaY: -200, cancelable: true });
    window.dispatchEvent(upward);
    expect(
      document
        .querySelector('[aria-selected="true"]')
        ?.getAttribute("aria-controls"),
    ).toBe("panel-measure");
    expect(upward.defaultPrevented).toBe(false);
    downstream.mockClear();
    wheel();
    expect(downstream).toHaveBeenCalledOnce();
    window.removeEventListener("wheel", downstream);
    dispose();
  },
);
