(() => {
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".site-nav__toggle");
  const links = document.querySelector("#site-nav-links");

  if (nav) {
    const updateScrollState = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
  }

  if (toggle && links) {
    const setMenu = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      links.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", () => {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    links.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && links.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 861px)").matches) setMenu(false);
    });
  }

  const pricingTabs = [...document.querySelectorAll("[data-pricing-tab]")];
  if (pricingTabs.length) {
    const activatePricingTab = (index, moveFocus = false) => {
      const activeIndex = (index + pricingTabs.length) % pricingTabs.length;
      pricingTabs.forEach((tab, tabIndex) => {
        const active = tabIndex === activeIndex;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute("aria-controls"));
        if (panel) panel.hidden = !active;
      });
      if (moveFocus) pricingTabs[activeIndex].focus();
    };

    pricingTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activatePricingTab(index));
      tab.addEventListener("keydown", (event) => {
        const keys = {
          ArrowRight: index + 1,
          ArrowDown: index + 1,
          ArrowLeft: index - 1,
          ArrowUp: index - 1,
          Home: 0,
          End: pricingTabs.length - 1,
        };
        if (!(event.key in keys)) return;
        event.preventDefault();
        activatePricingTab(keys[event.key], true);
      });
    });
  }

  const stepButtons = [...document.querySelectorAll("[data-feature-step]")];
  const featureImage = document.querySelector("[data-feature-image]");
  const featureCaption = document.querySelector("[data-feature-caption]");
  const featureCaptionIndex = document.querySelector("[data-feature-caption-index]");
  const featureCount = document.querySelector("[data-feature-count]");

  if (!stepButtons.length || !featureImage || !featureCaption) return;

  const activate = (index) => {
    const button = stepButtons[index];
    if (!button) return;

    stepButtons.forEach((item, itemIndex) => {
      const active = itemIndex === index;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    const path = featureImage.getAttribute("src");
    const nextPath = path.replace(/[^/]+$/, button.dataset.image);
    const nextTitle = button.dataset.title;
    const number = String(index + 1).padStart(2, "0");
    featureImage.classList.add("is-swapping");

    const image = new Image();
    image.onload = () => {
      featureImage.src = nextPath;
      featureImage.alt = nextTitle;
      featureCaption.textContent = nextTitle;
      if (featureCaptionIndex) featureCaptionIndex.textContent = number;
      if (featureCount) featureCount.textContent = `${number} / ${String(stepButtons.length).padStart(2, "0")}`;
      requestAnimationFrame(() => featureImage.classList.remove("is-swapping"));
    };
    image.onerror = () => featureImage.classList.remove("is-swapping");
    image.src = nextPath;
  };

  stepButtons.forEach((button, index) => {
    button.addEventListener("click", () => activate(index));
    button.addEventListener("keydown", (event) => {
      const keyToIndex = {
        ArrowDown: index + 1,
        ArrowRight: index + 1,
        ArrowUp: index - 1,
        ArrowLeft: index - 1,
        Home: 0,
        End: stepButtons.length - 1,
      };
      if (!(event.key in keyToIndex)) return;
      event.preventDefault();
      const next = (keyToIndex[event.key] + stepButtons.length) % stepButtons.length;
      stepButtons[next].focus();
    });
  });
})();
