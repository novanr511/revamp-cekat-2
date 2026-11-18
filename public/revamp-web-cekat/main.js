(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // Hero rotating word: start with the icon, type each localized word, then
  // erase it back to the icon before switching colour and starting the next.
  const rot = $(".rot");
  if (rot && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const word = $(".rot__word", rot);
    const measure = $(".rot__measure", rot);
    const WORDS = rot.dataset.words
      ? JSON.parse(rot.dataset.words)
      : ["revenue", "leads", "traffic"];
    const ROTATION_KEYS = ["revenue", "leads", "traffic"];
    const fit = () => {
      measure.textContent = word.textContent;
      word.style.width = word.textContent
        ? `${measure.getBoundingClientRect().width}px`
        : "0px";
      rot.classList.toggle("is-empty", !word.textContent);
    };
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    let n = 0;
    const type = async () => {
      rot.classList.remove("is-swap");
      rot.classList.add("is-typing");
      for (const ch of WORDS[n]) {
        word.textContent += ch;
        fit();
        await wait(75);
      }
      rot.classList.remove("is-typing");
    };
    const erase = async () => {
      rot.classList.add("is-typing");
      while (word.textContent.length) {
        word.textContent = word.textContent.slice(0, -1);
        fit();
        await wait(45);
      }
      rot.classList.remove("is-typing");
    };
    word.textContent = "";
    fit();
    const cycle = async () => {
      await wait(700);
      for (;;) {
        await type();
        await wait(2000);
        while (document.hidden) await wait(500);
        await erase();
        await wait(250);
        n = (n + 1) % WORDS.length;
        rot.className = `rot rot--${ROTATION_KEYS[n]} is-empty is-swap`;
        await wait(400);
      }
    };
    document.fonts?.ready.then(fit);
    cycle();
  }

  // Hero loop: the CSS starts the desktop sequence on load. On stacked layouts,
  // pause each card until it scrolls into view, then play that card once.
  const loop = $(".loop");
  if (loop && typeof IntersectionObserver !== "undefined") {
    const loopIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          loopIO.unobserve(entry.target);
        });
      },
      { threshold: 0.3 },
    );
    $$(".loop__card, .loop__back", loop).forEach((element) =>
      loopIO.observe(element),
    );
    loop.classList.add("is-ready");
  }

  // The React site chrome owns navigation on the Next.js homepage. The static
  // artifact still initializes its own header when opened on its own.
  const pageLocale = $(".reference-home")?.dataset.locale || "en";
  if (!document.querySelector(".revamp-site-header")) {
    // Nav: border once the page scrolls, mobile menu toggle
    const nav = $(".nav");
    const onScroll = () =>
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = $(".nav__toggle");
    const links = $("#nav-links");
    const MENU_LABELS = {
      en: { open: "Open menu", close: "Close menu" },
      id: { open: "Buka menu", close: "Tutup menu" },
      cn: { open: "打开菜单", close: "关闭菜单" },
      jp: { open: "メニューを開く", close: "メニューを閉じる" },
      kr: { open: "메뉴 열기", close: "메뉴 닫기" },
    };
    const menuLabels = MENU_LABELS[pageLocale] || MENU_LABELS.en;
    const setMenu = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute(
        "aria-label",
        open ? menuLabels.close : menuLabels.open,
      );
      links.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", () =>
      setMenu(toggle.getAttribute("aria-expanded") !== "true"),
    );
    links.addEventListener("click", (e) => {
      if (e.target.closest("a, [data-demo]")) setMenu(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && links.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Mega menu (x.ai pattern): one shared white box (.mpop-bg) slides and resizes to fit whichever menu is
    // open, and the menus crossfade sideways in the direction the pointer moved. Hover opens it on desktop
    // (with a short delay so passing over doesn't flicker); click, Enter and arrow keys work everywhere.
    const row = $(".nav__row");
    const popBg = $(".mpop-bg");
    const mTriggers = $$(".mnav__trigger");
    const wide = window.matchMedia("(min-width: 1101px)");
    let openIdx = -1;
    let openT;
    let closeT;
    const menuOf = (t) =>
      document.getElementById(t.getAttribute("aria-controls"));
    const placeMenu = (menu, trig) => {
      const r = row.getBoundingClientRect();
      const left = Math.max(
        0,
        Math.min(
          trig.getBoundingClientRect().left - r.left - 10,
          r.width - menu.offsetWidth,
        ),
      );
      menu.style.left = `${left}px`;
      return { left, w: menu.offsetWidth, h: menu.offsetHeight };
    };
    const openMenu = (i, focusFirst) => {
      clearTimeout(closeT);
      if (i === openIdx) {
        if (focusFirst) $("a", menuOf(mTriggers[i]))?.focus();
        return;
      }
      const prev = openIdx;
      const dir = prev < 0 ? 0 : i > prev ? 1 : -1;
      const menu = menuOf(mTriggers[i]);
      mTriggers.forEach((t, n) =>
        t.setAttribute("aria-expanded", String(n === i)),
      );
      if (prev >= 0) {
        const old = menuOf(mTriggers[prev]);
        old.style.setProperty("--from", `${-dir * 28}px`);
        old.classList.remove("is-open");
      }
      if (wide.matches) {
        const box = placeMenu(menu, mTriggers[i]);
        menu.style.setProperty("--from", `${dir * 28}px`);
        void menu.offsetWidth;
        if (prev < 0) popBg.classList.add("no-size-anim");
        Object.assign(popBg.style, {
          left: `${box.left}px`,
          width: `${box.w}px`,
          height: `${box.h}px`,
        });
        void popBg.offsetWidth;
        popBg.classList.remove("no-size-anim");
        popBg.classList.add("is-open");
      }
      menu.classList.add("is-open");
      openIdx = i;
      if (focusFirst) $("a", menu)?.focus();
    };
    const closeMenu = (focusTrigger) => {
      clearTimeout(openT);
      if (openIdx < 0) return;
      const t = mTriggers[openIdx];
      const menu = menuOf(t);
      menu.style.setProperty("--from", "0px");
      menu.classList.remove("is-open");
      t.setAttribute("aria-expanded", "false");
      popBg.classList.remove("is-open");
      openIdx = -1;
      if (focusTrigger) t.focus();
    };
    mTriggers.forEach((t, i) => {
      t.addEventListener("click", () =>
        openIdx === i ? closeMenu() : openMenu(i),
      );
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          openMenu(i, true);
        }
      });
      t.addEventListener("mouseenter", () => {
        if (!wide.matches) return;
        clearTimeout(openT);
        clearTimeout(closeT);
        if (openIdx >= 0) openMenu(i);
        else openT = setTimeout(() => openMenu(i), 90);
      });
    });
    // Moving onto Pricing, the logo or the buttons closes the menu, as on x.ai
    $$(".mnav__link, .nav__logo, .nav__actions").forEach((el) =>
      el.addEventListener("mouseenter", () => {
        if (wide.matches) {
          clearTimeout(openT);
          closeT = setTimeout(closeMenu, 120);
        }
      }),
    );
    row.addEventListener("mouseleave", () => {
      if (wide.matches) {
        clearTimeout(openT);
        closeT = setTimeout(closeMenu, 220);
      }
    });
    row.addEventListener("mouseenter", () => clearTimeout(closeT));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && openIdx >= 0) closeMenu(true);
    });
    document.addEventListener("click", (e) => {
      if (openIdx >= 0 && !row.contains(e.target)) closeMenu();
    });
    row.addEventListener("focusout", (e) => {
      if (wide.matches && openIdx >= 0 && !row.contains(e.relatedTarget))
        closeMenu();
    });
    $$(".mmenu a").forEach((a) =>
      a.addEventListener("click", () => closeMenu()),
    );
    window.addEventListener("resize", () => closeMenu());

    // Language picker: a click can intentionally open the native <details>, but
    // it must not remain visible after the pointer leaves the control. Focused
    // keyboard users retain it until focus moves away.
    const languagePicker = $(".nav__languages");
    if (languagePicker) {
      const openLanguagePicker = () => languagePicker.setAttribute("open", "");
      languagePicker.addEventListener("mouseenter", openLanguagePicker);
      languagePicker.addEventListener("mouseleave", () => {
        if (!languagePicker.matches(":focus-within"))
          languagePicker.removeAttribute("open");
      });
      languagePicker.addEventListener("focusout", (e) => {
        if (!languagePicker.contains(e.relatedTarget))
          languagePicker.removeAttribute("open");
      });
      document.addEventListener("click", (e) => {
        if (!languagePicker.contains(e.target))
          languagePicker.removeAttribute("open");
      });
    }
    // Products: the preview follows the hovered or focused product; links open that product's journey stage
    const mItems = $$(".mitem");
    const showPrev = (key) => {
      mItems.forEach((it) =>
        it.classList.toggle("is-on", it.dataset.prev === key),
      );
      $$(".mp").forEach((p) =>
        p.classList.toggle("is-on", p.dataset.prev === key),
      );
    };
    mItems.forEach((it) => {
      it.addEventListener("mouseenter", () => showPrev(it.dataset.prev));
      it.addEventListener("focus", () => showPrev(it.dataset.prev));
      it.addEventListener("click", () =>
        setTimeout(
          () => document.getElementById(`tab-${it.dataset.stage}`)?.click(),
          0,
        ),
      );
    });
    showPrev("marketing");
  }

  // Trust marquee (Salesforce pattern): copy the logo list until the row overflows twice,
  // then slide by one copy at a steady ~40px/s. Copies are hidden from screen readers.
  const trust = $(".trust");
  const track = $(".marquee__track", trust);
  const firstList = $(".wordmarks", track);
  const fillMarquee = () => {
    $$(".wordmarks[aria-hidden]", track).forEach((l) => l.remove());
    const one = firstList.getBoundingClientRect().width;
    const copies = Math.max(
      1,
      Math.ceil((track.parentElement.clientWidth * 2) / one),
    );
    for (let i = 0; i < copies; i++) {
      const copy = firstList.cloneNode(true);
      copy.removeAttribute("aria-label");
      copy.setAttribute("aria-hidden", "true");
      track.append(copy);
    }
    track.style.setProperty("--shift", `${one}px`);
    track.style.setProperty("--dur", `${Math.round(one / 40)}s`);
  };
  fillMarquee();
  document.fonts?.ready.then(fillMarquee); // widths change once Google Sans Flex loads
  window.addEventListener("load", fillMarquee); // and once the logo images have their real widths
  let marqueeT;
  window.addEventListener("resize", () => {
    clearTimeout(marqueeT);
    marqueeT = setTimeout(fillMarquee, 200);
  });

  // Pain cards (Calendly pattern): hover, focus or click widens a card; stacked on small screens
  const gaps = $$(".gap");
  const stacked = window.matchMedia("(max-width: 1080px)");
  const canHover = window.matchMedia("(hover: hover)");
  const open = (card) => {
    if (stacked.matches || card.classList.contains("is-active")) return;
    gaps.forEach((g) => {
      const on = g === card;
      g.classList.toggle("is-active", on);
      $(".gap__btn", g).setAttribute("aria-expanded", String(on));
    });
  };
  let hoverT;
  gaps.forEach((g) => {
    $(".gap__btn", g).addEventListener("click", () => open(g));
    $(".gap__btn", g).addEventListener("focus", () => open(g));
    g.addEventListener("mouseenter", () => {
      if (canHover.matches) hoverT = setTimeout(() => open(g), 120);
    });
    g.addEventListener("mouseleave", () => clearTimeout(hoverT));
  });
  // Stacked: all cards are open; each one's rows build as it scrolls into view
  const gapIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) en.target.classList.add("is-active");
      });
    },
    { threshold: 0.35 },
  );
  const syncStacked = () => {
    if (stacked.matches) {
      gaps.forEach((g) => {
        $(".gap__btn", g).setAttribute("aria-expanded", "true");
        gapIO.observe(g);
      });
    } else {
      gapIO.disconnect();
      gaps.forEach((g, i) => {
        g.classList.toggle("is-active", i === 0);
        $(".gap__btn", g).setAttribute("aria-expanded", String(i === 0));
      });
    }
  };
  syncStacked();
  stacked.addEventListener("change", syncStacked);

  // Continuous card art: line each card's slice up with the row, so the shapes run across cards.
  // A ResizeObserver keeps it aligned while cards widen and narrow.
  const gapsRow = $(".gaps");
  const placeArt = () => {
    if (stacked.matches) return;
    const row = gapsRow.getBoundingClientRect();
    gaps.forEach((g) => {
      const art = $(".gap__art", g);
      const svg = $("svg", art);
      svg.style.left = `${row.left - art.getBoundingClientRect().left}px`;
      svg.style.width = `${row.width}px`;
    });
  };
  const artRO = new ResizeObserver(placeArt);
  gaps.forEach((g) => artRO.observe(g));
  artRO.observe(gapsRow);

  // App glimpses inside the pain cards: one small tab set per card
  $$(".app").forEach((app) => {
    const appTabs = $$(".app__tab", app);
    const pick = (tab, focus) => {
      appTabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
    };
    appTabs.forEach((tab, i) => {
      tab.addEventListener("click", () => pick(tab));
      tab.addEventListener("keydown", (e) => {
        const map = {
          ArrowRight: i + 1,
          ArrowLeft: i - 1,
          Home: 0,
          End: appTabs.length - 1,
        };
        if (!(e.key in map)) return;
        e.preventDefault();
        pick(appTabs[(map[e.key] + appTabs.length) % appTabs.length], true);
      });
    });
  });

  // Keep the five stages in reach, with explicit selection feedback. Selecting
  // the current stage is a no-op so it never interrupts someone's reading.
  const journey = $("#journey");
  const tabs = $$(".rail__tab", journey);
  const railEl = $(".rail", journey);
  const journeyNextSection = journey.nextElementSibling;
  const railNarrow = window.matchMedia("(max-width: 900px)");
  const journeyReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const journeyNav = $(".journey__nav", journey) || railEl;
  // Reset the page's smooth-scroll target as well as the native position.
  // Native scrollTo alone leaves Lenis easing toward the previous stage's end.
  const scrollJourneyTo = (top, instant = true) => {
    if (window.__cekatLenis) {
      window.__cekatLenis.scrollTo(top, {
        immediate: instant,
        force: true,
        duration: 0.48,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      window.scrollTo({ top, behavior: instant ? "instant" : "smooth" });
    }
  };
  const journeyContentOffset = () => {
    const stickyTop = parseFloat(getComputedStyle(journeyNav).top) || 96;
    return railNarrow.matches
      ? stickyTop + journeyNav.getBoundingClientRect().height + 24
      : stickyTop;
  };
  const minimumStageProgress = Math.min(
    440,
    Math.max(260, window.innerHeight * 0.35),
  );
  const initialPanel = $(".panel:not([hidden])", journey);
  let journeyStageStartY = Math.max(
    0,
    window.scrollY +
      initialPanel.getBoundingClientRect().top -
      journeyContentOffset(),
  );
  let journeyStageReady = true;
  // One stage-aware product dock stays directly below the active illustration
  // at every breakpoint; the feature layout moves the stage on mobile.
  const journeyProducts = $(".products", journey);
  $$(".product", journeyProducts).forEach((product) => {
    product.title = $(".product__name", product).textContent;
  });
  const highlightJourneyProducts = (stageKey) => {
    let slot = 0;
    $$(".product", journeyProducts).forEach((product) => {
      const active = product.dataset.stages.split(" ").includes(stageKey);
      product.classList.toggle("is-on", active);
      if (active) product.dataset.floatingSlot = String(++slot);
      else delete product.dataset.floatingSlot;
    });
    journeyProducts.dataset.activeCount = String(slot);
  };
  const placeJourneyProducts = () => {
    const stage = $(".panel:not([hidden]) .feat__stage", journey);
    $(".feat__frame", stage).after(journeyProducts);
  };
  placeJourneyProducts();
  railNarrow.addEventListener("change", placeJourneyProducts);
  let panelTransition;
  const select = (
    tab,
    focus,
    { forceAlignment = false, instantScroll = false } = {},
  ) => {
    if (focus) tab.focus({ preventScroll: true });
    if (tab.getAttribute("aria-selected") === "true") return;

    const panelTop = $(".panel:not([hidden])", journey).getBoundingClientRect()
      .top;
    const contentOffset = journeyContentOffset();
    const stageStartY = Math.max(0, window.scrollY + panelTop - contentOffset);
    const needsStageAlignment = forceAlignment || panelTop < contentOffset - 8;
    journeyStageStartY = stageStartY;
    // Auto-scroll back to the stage heading after a switch. Don't count the
    // previous stage's still-current scroll position as progress in this one.
    journeyStageReady =
      !needsStageAlignment || Math.abs(window.scrollY - stageStartY) <= 16;
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    panelTransition?.cancel();
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute("aria-controls"));
      panel.hidden = !on;
    });
    placeJourneyProducts();
    // Lift the products this stage uses in the lineup above
    const stageKey = tab.getAttribute("aria-controls").replace("panel-", "");
    highlightJourneyProducts(stageKey);
    panel.dispatchEvent(new Event("journey:select"));
    // A shorter incoming panel can move Clara above the current viewport edge.
    // Correct only that edge before starting the heading animation, so the
    // scroll guard never cancels the animation and strands us at the boundary.
    if (
      needsStageAlignment &&
      tab !== tabs[tabs.length - 1] &&
      journeyNextSection
    ) {
      const safeY =
        journeyNextSection.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight -
        2;
      if (window.scrollY > safeY) scrollJourneyTo(safeY);
    }
    // Only return to the heading when it has scrolled behind the sticky nav.
    // Near the top, preserve the visitor's position and the product context.
    if (needsStageAlignment)
      scrollJourneyTo(
        stageStartY,
        instantScroll || journeyReducedMotion.matches,
      );
    if (!journeyReducedMotion.matches && panel.animate) {
      panelTransition = panel.animate(
        [
          { opacity: 0, transform: "translateY(8px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 360, easing: "cubic-bezier(.23, 1, .32, 1)" },
      );
    }
  };
  // When a visitor reaches the end of the selected stage, continue to the
  // next one. Ignore upward scrolling and hidden stages; manual tab clicks
  // remain available at all times.
  const journeyEndMarkers = tabs.map((tab) => {
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    const marker = document.createElement("span");
    marker.className = "journey__end";
    marker.setAttribute("aria-hidden", "true");
    $(".feat__copy", panel).append(marker);
    return marker;
  });
  let previousJourneyScrollY = window.scrollY;
  // Throttle stage changes, not scrolling. Renewing this timer on every wheel
  // event traps continuous trackpad input until the visitor stops or moves away.
  let journeyAutoAdvanceLocked = false;
  let journeyGestureIdleTimer;
  const advanceJourney = (tab) => {
    journeyAutoAdvanceLocked = true;
    clearTimeout(journeyGestureIdleTimer);
    journeyGestureIdleTimer = setTimeout(() => {
      journeyAutoAdvanceLocked = false;
    }, 240);
    select(tab, false, {
      forceAlignment: true,
      instantScroll: journeyReducedMotion.matches,
    });
  };
  // Keep the next section out of view until the final stage. The wheel guard
  // prevents the browser from painting past the boundary; the scroll guard
  // covers scrollbar, keyboard, touch, and programmatic scrolls.
  window.addEventListener(
    "wheel",
    (event) => {
      if (!journeyStageReady) {
        if (event.deltaY > 0) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
        return;
      }

      const activeIndex = tabs.findIndex(
        (tab) => tab.getAttribute("aria-selected") === "true",
      );
      const nextTab = tabs[activeIndex + 1];
      if (event.deltaY <= 0 || !nextTab || !journeyNextSection) return;

      const deltaY =
        event.deltaY *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? window.innerHeight
            : 1);
      const nextSectionTop =
        journeyNextSection.getBoundingClientRect().top + window.scrollY;
      const lastSafeScrollY = nextSectionTop - window.innerHeight;
      if (window.scrollY + deltaY <= lastSafeScrollY) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      if (!journeyAutoAdvanceLocked) advanceJourney(nextTab);
    },
    { passive: false, capture: true },
  );
  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;
      const journeyScrollingDown = currentScrollY > previousJourneyScrollY;
      previousJourneyScrollY = currentScrollY;

      // Re-arm only once the transition's scroll-to-start has completed. This
      // prevents the old stage's scroll position from cascading into new tabs.
      if (
        !journeyStageReady &&
        Math.abs(currentScrollY - journeyStageStartY) <= 24
      ) {
        journeyStageReady = true;
        journeyStageStartY = currentScrollY;
      }

      const activeIndex = tabs.findIndex(
        (tab) => tab.getAttribute("aria-selected") === "true",
      );
      const nextTab = tabs[activeIndex + 1];
      const nextSectionTop = journeyNextSection
        ? journeyNextSection.getBoundingClientRect().top + currentScrollY
        : Infinity;
      if (journeyAutoAdvanceLocked || !journeyStageReady) {
        // The new panel remains scrollable. Only its exit to Clara is gated.
        if (
          journeyScrollingDown &&
          nextTab &&
          currentScrollY > nextSectionTop - window.innerHeight
        ) {
          scrollJourneyTo(nextSectionTop - window.innerHeight - 2);
          if (!journeyStageReady)
            scrollJourneyTo(journeyStageStartY, journeyReducedMotion.matches);
        }
        return;
      }
      if (
        journeyScrollingDown &&
        nextTab &&
        journeyNextSection &&
        currentScrollY > nextSectionTop - window.innerHeight
      ) {
        advanceJourney(nextTab);
        return;
      }
      if (!journeyScrollingDown || !journeyStageReady) return;

      if (
        !nextTab ||
        currentScrollY - journeyStageStartY < minimumStageProgress
      )
        return;

      // Check the active stage on every downward scroll event so a large
      // trackpad/wheel step cannot jump over the one-pixel end marker.
      const markerTop =
        journeyEndMarkers[activeIndex].getBoundingClientRect().top;
      if (markerTop <= window.innerHeight * 0.85) advanceJourney(nextTab);
    },
    { passive: true },
  );
  // The rail is vertical beside the panels and horizontal on small screens
  const syncRail = () =>
    railEl.setAttribute(
      "aria-orientation",
      railNarrow.matches ? "horizontal" : "vertical",
    );
  syncRail();
  railNarrow.addEventListener("change", syncRail);
  highlightJourneyProducts("acquire");
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (e) => {
      const map = {
        ...(railNarrow.matches
          ? { ArrowRight: i + 1, ArrowLeft: i - 1 }
          : { ArrowDown: i + 1, ArrowUp: i - 1 }),
        Home: 0,
        End: tabs.length - 1,
      };
      if (!(e.key in map)) return;
      e.preventDefault();
      select(tabs[(map[e.key] + tabs.length) % tabs.length], true);
    });
  });

  // Journey feature lists (Calendly pattern): the capability crossing the middle of the screen, or the one
  // clicked, becomes active and its illustrative window builds itself. On small screens the window opens
  // right under the tapped capability instead.
  const narrow = window.matchMedia("(max-width: 900px)");
  $$(".feat").forEach((feat) => {
    const items = $$(".feat__item", feat);
    const stage = $(".feat__stage", feat);
    const views = $$(".vis", feat);
    let current = 0;
    const place = () => {
      if (narrow.matches) items[current].append(stage);
      else if (stage.parentElement !== feat) feat.append(stage);
    };
    const activate = (i) => {
      if (i === current && views[i].classList.contains("is-on")) {
        place();
        return;
      }
      current = i;
      items.forEach((it, n) => {
        it.classList.toggle("is-active", n === i);
        const btn = $(".feat__btn", it);
        if (n === i) btn.setAttribute("aria-current", "true");
        else btn.removeAttribute("aria-current");
      });
      views.forEach((v) => v.classList.remove("is-on"));
      void views[i].offsetWidth; // restart the build animation
      views[i].classList.add("is-on");
      place();
    };
    feat
      .closest('[role="tabpanel"]')
      .addEventListener("journey:select", () => activate(0));
    items.forEach((it, n) =>
      $(".feat__btn", it).addEventListener("click", () => activate(n)),
    );
    const featIO = new IntersectionObserver(
      (entries) => {
        if (narrow.matches || feat.closest('[role="tabpanel"]').hidden) return;
        entries.forEach((en) => {
          if (en.isIntersecting) activate(items.indexOf(en.target));
        });
      },
      { rootMargin: "-48% 0px -52% 0px" },
    );
    items.forEach((it) => featIO.observe(it));
    narrow.addEventListener("change", place);
    place();
  });

  // Clara: hide the setup sequence until the section is in view, then play it once
  const clara = $(".clara");
  clara.classList.add("is-ready");
  const claraIO = new IntersectionObserver(
    ([en]) => {
      if (en.isIntersecting) {
        clara.classList.add("is-playing");
        claraIO.disconnect();
      }
    },
    { threshold: 0.35 },
  );
  claraIO.observe(clara);

  // Cekat MCP connection graphic: same pattern, plays once
  const mcp = $(".mcp");
  mcp.classList.add("is-ready");
  const mcpIO = new IntersectionObserver(
    ([en]) => {
      if (en.isIntersecting) {
        mcp.classList.add("is-playing");
        mcpIO.disconnect();
      }
    },
    { threshold: 0.4 },
  );
  mcpIO.observe(mcp);

  // On narrow screens the nodes stack and wrap, so redraw only the wire paths
  // to meet their new positions without changing the mobile layout.
  const mcpFlow = $(".mcp__flow", mcp);
  const mcpWires = $(".mcp__wires", mcp);
  const mcpClients = $$(".mcp__clients li", mcp);
  const mcpHubImage = $(".mcp__hub img", mcp);
  const mcpProducts = $$(".mcp__products li", mcp);
  const mcpInPaths = $$(".mcp__in path", mcp);
  const mcpOutPaths = $$(".mcp__out path", mcp);
  const desktopMcpPaths = [...mcpInPaths, ...mcpOutPaths].map((path) =>
    path.getAttribute("d"),
  );
  const mcpMobileQuery = window.matchMedia("(max-width: 960px)");
  const updateMcpWires = () => {
    if (!mcpMobileQuery.matches) {
      [...mcpInPaths, ...mcpOutPaths].forEach((path, index) => {
        path.setAttribute("d", desktopMcpPaths[index]);
      });
      mcpWires.setAttribute("viewBox", "0 0 600 240");
      return;
    }

    const flowRect = mcpFlow.getBoundingClientRect();
    if (!flowRect.width || !flowRect.height) return;

    mcpWires.setAttribute(
      "viewBox",
      `0 0 ${flowRect.width} ${flowRect.height}`,
    );
    const centerX = (rect) => rect.left - flowRect.left + rect.width / 2;
    const topY = (rect) => rect.top - flowRect.top;
    const bottomY = (rect) => rect.bottom - flowRect.top;
    const hubRect = mcpHubImage.getBoundingClientRect();
    const hubX = centerX(hubRect);

    mcpClients.forEach((client, index) => {
      const rect = client.getBoundingClientRect();
      const startX = centerX(rect);
      const startY = bottomY(rect);
      const endY = topY(hubRect);
      const gap = Math.max(0, endY - startY);
      mcpInPaths[index]?.setAttribute(
        "d",
        `M ${startX} ${startY} C ${startX} ${startY + gap * 0.55}, ${hubX} ${endY - gap * 0.35}, ${hubX} ${endY}`,
      );
    });

    const hubBottom = bottomY(hubRect);
    mcpProducts.forEach((product, index) => {
      const rect = product.getBoundingClientRect();
      const endX = centerX(rect);
      const endY = topY(rect);
      const gap = Math.max(0, endY - hubBottom);
      mcpOutPaths[index]?.setAttribute(
        "d",
        `M ${hubX} ${hubBottom} C ${hubX} ${hubBottom + gap * 0.65}, ${endX} ${endY - gap * 0.35}, ${endX} ${endY}`,
      );
    });
  };
  updateMcpWires();
  window.addEventListener("resize", updateMcpWires);
  mcpMobileQuery.addEventListener("change", updateMcpWires);
  if ("ResizeObserver" in window) {
    const mcpResizeObserver = new ResizeObserver(updateMcpWires);
    [mcpFlow, ...mcpClients, mcpHubImage, ...mcpProducts].forEach((node) =>
      mcpResizeObserver.observe(node),
    );
  }

  // Customer stories carousel: the open story sits in the middle, two neighbours on each side as slivers
  const reel = $(".reel");
  const tales = $$(".tale", reel);
  const dots = $$(".reel__dot", reel);
  const live = $("[data-reel-live]", reel);
  let openTale = 0;
  const showTale = (i) => {
    openTale = (i + tales.length) % tales.length;
    tales.forEach((t, n) => {
      let d = n - openTale;
      if (d > tales.length / 2) d -= tales.length;
      if (d < -tales.length / 2) d += tales.length;
      t.style.order = String(d + 3);
      t.classList.toggle("is-active", d === 0);
      t.classList.toggle("is-near", Math.abs(d) === 1);
      t.classList.toggle("is-far", Math.abs(d) === 2);
      t.setAttribute("aria-hidden", String(Math.abs(d) > 2));
    });
    dots.forEach((dot, n) => {
      dot.classList.toggle("is-on", n === openTale);
      dot.setAttribute("aria-current", String(n === openTale));
    });
    live.textContent = `${$(".tale__brand", tales[openTale]).textContent}: ${$(".tale__head", tales[openTale]).textContent}`;
  };
  tales.forEach((t, n) =>
    $(".tale__pick", t).addEventListener("click", () => showTale(n)),
  );
  dots.forEach((dot, n) => dot.addEventListener("click", () => showTale(n)));
  $$(".reel__arrow", reel).forEach((b) =>
    b.addEventListener("click", () =>
      showTale(openTale + Number(b.dataset.step)),
    ),
  );
  reel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      showTale(openTale + 1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      showTale(openTale - 1);
    }
  });
  showTale(0);
  live.textContent = "";

  // Integrations wall: tiles rise in once when it scrolls into view
  const iwall = $(".iwall");
  iwall.classList.add("is-ready");
  const iwallIO = new IntersectionObserver(
    ([en]) => {
      if (en.isIntersecting) {
        iwall.classList.add("is-in");
        iwallIO.disconnect();
      }
    },
    { threshold: 0.25 },
  );
  iwallIO.observe(iwall);

  // Final CTA: start the sparkles and product tiles when the band comes into view
  const finalPanel = $(".final__panel");
  const finalIO = new IntersectionObserver(
    ([en]) => {
      finalPanel.classList.toggle("is-in", en.isIntersecting);
    },
    { threshold: 0.1 },
  );
  finalIO.observe(finalPanel);

  // Mobile sticky trial bar: only while the hero buttons are off screen and the final CTA isn't showing,
  // so two trial buttons are never visible together
  const sticky = $(".sticky-cta");
  const stickyLink = $("a", sticky);
  const seen = { hero: true, final: false };
  const syncSticky = () => {
    const show = !seen.hero && !seen.final;
    sticky.classList.toggle("is-shown", show);
    document.body.classList.toggle("sticky-on", show);
    sticky.setAttribute("aria-hidden", String(!show));
    stickyLink.tabIndex = show ? 0 : -1;
  };
  const stickyIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      seen[en.target === finalPanel ? "final" : "hero"] = en.isIntersecting;
    });
    syncSticky();
  });
  stickyIO.observe($("#hero-ctas"));
  stickyIO.observe(finalPanel);

  // Demo dialog
  const dlg = $("#demo");
  const form = $(".demo__form", dlg);
  const done = $(".demo__done", dlg);
  const err = $(".demo__err", dlg);
  let opener = null;
  const DEMO_COPY = {
    en: {
      name: "your name",
      email: "a valid work email",
      company: "your company",
      missing: (fields) => `Please add ${fields.join(", ")}.`,
      sending: "Sending…",
    },
    id: {
      name: "nama Anda",
      email: "alamat email kerja yang valid",
      company: "nama perusahaan Anda",
      missing: (fields) => `Mohon lengkapi ${fields.join(", ")}.`,
      sending: "Mengirim…",
    },
    cn: {
      name: "姓名",
      email: "有效的工作邮箱",
      company: "公司名称",
      missing: (fields) => `请补充${fields.join("、")}。`,
      sending: "正在发送…",
    },
    jp: {
      name: "お名前",
      email: "有効な勤務先メールアドレス",
      company: "会社名",
      missing: (fields) => `次の項目を入力してください：${fields.join("、")}。`,
      sending: "送信中…",
    },
    kr: {
      name: "이름",
      email: "유효한 업무용 이메일 주소",
      company: "회사명",
      missing: (fields) => `다음 항목을 입력해 주세요: ${fields.join(", ")}.`,
      sending: "전송 중…",
    },
  };
  const demoCopy = DEMO_COPY[pageLocale] || DEMO_COPY.en;

  const openDemo = (btn) => {
    opener = btn;
    form.hidden = false;
    done.hidden = true;
    err.hidden = true;
    const interest = btn.dataset.interest;
    const industry = btn.dataset.industry;
    if (interest) form.interest.value = interest;
    if (industry) form.industry.value = industry;
    dlg.showModal();
    form.name.focus();
  };
  $$("[data-demo]").forEach((b) =>
    b.addEventListener("click", () => openDemo(b)),
  );
  $$("[data-close]", dlg).forEach((b) =>
    b.addEventListener("click", () => dlg.close()),
  );
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg) dlg.close();
  });
  dlg.addEventListener("close", () => {
    if (opener) opener.focus();
  });

  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = [
      [form.name, form.name.value.trim().length > 1, demoCopy.name],
      [form.email, emailOk(form.email.value.trim()), demoCopy.email],
      [form.company, form.company.value.trim().length > 1, demoCopy.company],
    ];
    const bad = fields.filter(([el, ok]) => {
      el.setAttribute("aria-invalid", String(!ok));
      return !ok;
    });
    if (bad.length) {
      err.textContent = demoCopy.missing(bad.map((b) => b[2]));
      err.hidden = false;
      bad[0][0].focus();
      return;
    }
    err.hidden = true;
    const send = $(".demo__send", form);
    const sendLabel = send.textContent;
    send.disabled = true;
    send.textContent = demoCopy.sending;
    // TODO: POST to the sales CRM endpoint. Until then, confirm locally after a short delay.
    setTimeout(() => {
      send.disabled = false;
      send.textContent = sendLabel;
      $('[data-out="name"]', done).textContent = form.name.value
        .trim()
        .split(" ")[0];
      $('[data-out="interest"]', done).textContent = form.interest.value;
      form.hidden = true;
      done.hidden = false;
      $("button", done).focus();
      form.reset();
      $$("[aria-invalid]", form).forEach((el) =>
        el.removeAttribute("aria-invalid"),
      );
    }, 600);
  });
})();
