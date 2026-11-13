"""Browser geometry regression. Requires Python Playwright and a running build.

python3 scripts/check-metric-layout.py --base http://localhost:4174
"""

import argparse
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--base", default="http://localhost:4174")
args = parser.parse_args()
routes = [
    "/en/features/ai-chatbot", "/fitur/chatbot", "/cn/features/ai-chatbot",
    "/jp/features/ai-chatbot", "/kr/features/ai-chatbot",
    "/en/industries/dental-clinics", "/industri/kesehatan",
]
widths = [320, 390, 600, 601, 768, 1024, 1050, 1051, 1212, 1280, 1440]
checks = 0

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(reduced_motion="reduce")
    for route in routes:
        response = page.goto(args.base + route, wait_until="domcontentloaded")
        assert response.status == 200, (route, response.status)
        rail = page.locator(".r-metric-rail")
        rail.wait_for()
        page.wait_for_function("getComputedStyle(document.querySelector('.r-metric-rail')).display === 'grid'")
        page.evaluate("document.fonts.ready")
        assert rail.count() == 1, (route, "Missing metric rail")
        count = rail.locator(":scope > div").count()
        columns = 3 if count > 4 else count
        assert rail.get_attribute("data-metric-columns") == str(columns)
        for width in widths:
            page.set_viewport_size({"width": width, "height": 1000})
            rail.scroll_into_view_if_needed()
            page.evaluate("new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))")
            metrics = rail.locator(":scope > div").evaluate_all("""els=>els.map(e=>{
                const value=e.querySelector('strong'),label=e.querySelector('p');
                const rects=el=>{
                    const range=document.createRange();range.selectNodeContents(el);
                    return [...range.getClientRects()].map(r=>r.toJSON());
                };
                return {
                    value:value.textContent,font:parseFloat(getComputedStyle(value).fontSize),
                    column:e.getBoundingClientRect().toJSON(),
                    valueBox:value.getBoundingClientRect().toJSON(),
                    labelBox:label.getBoundingClientRect().toJSON(),
                    valueRects:rects(value),labelRects:rects(label),
                    divider:getComputedStyle(e,'::before').display
                };
            })""")
            for index, metric in enumerate(metrics):
                for rect in metric["valueRects"] + metric["labelRects"]:
                    assert rect["left"] >= metric["column"]["left"] - 1, (route, width, metric)
                    assert rect["right"] <= metric["column"]["right"] + 1, (route, width, metric)
                if "1,000,000" in metric["value"] or "1.000.000" in metric["value"]:
                    assert len(metric["valueRects"]) == 1, (route, width, "Split number")
                assert metric["labelBox"]["top"] - metric["valueBox"]["bottom"] >= 12
                if index and abs(metric["column"]["left"] - metrics[0]["column"]["left"]) < 1:
                    assert metric["divider"] == "none", (route, width, "Divider at row start")
            for left, right in zip(metrics, metrics[1:]):
                if abs(left["column"]["top"] - right["column"]["top"]) < 2:
                    assert max(r["right"] for r in left["valueRects"]) + 12 <= min(
                        r["left"] for r in right["valueRects"]
                    ), (route, width, "Insufficient metric spacing")
                else:
                    assert right["column"]["top"] - left["column"]["bottom"] >= 24
            fonts = [metric["font"] for metric in metrics]
            assert max(fonts) - min(fonts) < 1, (route, width, "Inconsistent sizing")
            assert page.evaluate("document.documentElement.scrollWidth") == width, (route, width, "Overflow")
            checks += 1
        print(route, "PASS", flush=True)
    browser.close()
print(f"{checks} metric layouts passed")
