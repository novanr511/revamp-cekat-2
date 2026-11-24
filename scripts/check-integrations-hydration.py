"""Run against a running Next server with Python Playwright installed."""

import sys
from playwright.sync_api import sync_playwright


def check(browser, url, width):
    mobile = width < 768
    page = browser.new_page(viewport={"width": width, "height": 850},
                            is_mobile=mobile, has_touch=mobile, reduced_motion="reduce")
    errors = []
    # External analytics may fail to load; this check targets React and runtime errors.
    page.on("console", lambda msg: errors.append(msg.text) if "hydrat" in msg.text.lower() else None)
    page.on("pageerror", lambda exc: errors.append(str(exc)))
    page.goto(url, wait_until="networkidle")
    gradients = page.locator("#channels svg defs [id], #ads svg defs [id]")
    ids = gradients.evaluate_all("els => els.map(el => el.id)")
    page.reload(wait_until="networkidle")
    assert ids and len(ids) == len(set(ids)), ids
    assert ids == gradients.evaluate_all("els => els.map(el => el.id)"), "Unstable SVG IDs"
    assert page.evaluate("document.documentElement.scrollWidth === innerWidth"), width
    for selector in ['a[href="#catalog"]', '#catalog a[href="#systems"]', 'main details summary']:
        element = page.locator(selector)
        element.tap() if mobile else element.click()
    assert page.url.endswith("#systems") and page.locator("main details[open]").count() == 1
    assert not errors, errors
    print(f"{width}px: stable SVG IDs, hydration and navigation OK")
    page.close()


if __name__ == "__main__":
    url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4173/integrasi"
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        for width in (320, 390, 768, 1440):
            check(browser, url, width)
        browser.close()
