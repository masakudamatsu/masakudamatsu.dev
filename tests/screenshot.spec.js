import { test, expect } from "@playwright/test";

const config = (page) => ({
  fullPage: true,
  mask: [page.locator(".video")],
  maskColor: "#000",
  maxDiffPixelRatio: 0.00025, // otherwise Firefox with JS disabled returns an erro
  timeout: 10000, // overriding the default of 5000; otherwise Safari returns an error with JS enabled
});

test.describe("With JavaScript enabled", () => {
  test("no UI is changed unintentionally for non-Japanese speakers", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveScreenshot("wholepage.png", config(page));
  });
  test("no UI is changed unintentionally for Japanese speakers", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      // reference: https://stackoverflow.com/a/64570156
      Object.defineProperty(navigator, "language", {
        value: "ja",
        configurable: true,
      });
    });
    await page.goto("/");
    await expect(page).toHaveScreenshot("wholepageJapanese.png", config(page));
  });
  test("no UI is changed unintentionally for Japanese speakers in Japan", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      // reference: https://stackoverflow.com/a/64570156
      Object.defineProperty(navigator, "language", {
        value: "ja-JP",
        configurable: true,
      });
    });
    await page.goto("/");
    await expect(page).toHaveScreenshot(
      "wholepageJapaneseJapan.png",
      config(page)
    );
  });
});
test.describe("With JavaScript disabled", () => {
  test.use({
    javaScriptEnabled: false,
  });
  test("no UI is changed unintentionally", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveScreenshot(
      "wholepageJavaScriptDisabled.png",
      config(page)
    );
  });
});
