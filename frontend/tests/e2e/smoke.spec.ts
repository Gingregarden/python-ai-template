import { expect, test } from "@playwright/test";

test("トップページに挨拶メッセージが表示される", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Hello from ai-template!");
});
