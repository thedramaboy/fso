import { expect } from "@playwright/test";
import test from "@playwright/test";

const BASE_URL = "http://localhost:5173";
const API_URL = "http://localhost:3003";

test.beforeEach(async ({ page, request }) => {
  await request.post(`${API_URL}/api/testing/reset`);
  await request.post(`${API_URL}/api/users`, {
    data: {
      name: "Test User",
      username: "testuser",
      password: "testpassword",
    },
  });

  await page.goto(BASE_URL);
});

test("login succeeds with correct credentials", async ({ page }) => {
  await page.getByLabel("username").fill("testuser");
  await page.getByLabel("password").fill("testpassword");
  await page.getByRole("button", { name: "login" }).click();

  await expect(page.getByText("Test User logged in")).toBeVisible();
});

test("login fails with wrong credentials", async ({ page }) => {
  await page.getByLabel("username").fill("testuser");
  await page.getByLabel("password").fill("wrongpassword");
  await page.getByRole("button", { name: "login" }).click();

  await expect(
    page.getByText("wrong username or password", { exact: false }),
  ).toBeVisible();
});

test.describe("when logged in", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByLabel("username").fill("testuser");
    await page.getByLabel("password").fill("testpassword");
    await page.getByRole("button", { name: "login" }).click();
    await expect(page.getByText("Test User logged in")).toBeVisible();
  });

  test("a logged-in user can create a blog", async ({ page }) => {
    await page.getByRole("button", { name: "new blog" }).click();
    await page.getByPlaceholder("titleInput").fill("My Playwright Blog");
    await page.getByPlaceholder("authorInput").fill("Playwright Author");
    await page.getByPlaceholder("urlInput").fill("http://playwright.dev");
    await page.getByRole("button", { name: "create" }).click();
    await expect(page.getByText("My Playwright Blog")).toBeVisible();
  });

  test("a logged-in user can like a blog", async ({ page }) => {
    await page.getByRole("button", { name: "new blog" }).click();
    await page.getByPlaceholder("titleInput").fill("Blog to Like");
    await page.getByPlaceholder("authorInput").fill("Author");
    await page.getByPlaceholder("urlInput").fill("http://example.com");
    await page.getByRole("button", { name: "create" }).click();
    await page.getByText("Blog to Like").click();
    const likesText = await page.getByText(/likes \d+/i).textContent();
    const likesBefore = parseInt(likesText.match(/\d+/)[0]);
    await page.getByRole("button", { name: "like" }).click();
    await expect(page.getByText(`likes ${likesBefore + 1}`)).toBeVisible();
  });

  test("a logged-in user can delete their own blog", async ({ page }) => {
    await page.getByRole("button", { name: "new blog" }).click();
    await page.getByPlaceholder("titleInput").fill("Blog to Delete");
    await page.getByPlaceholder("authorInput").fill("Author");
    await page.getByPlaceholder("urlInput").fill("http://example.com");
    await page.getByRole("button", { name: "create" }).click();

    await page.getByText("Blog to Delete").click();

    page.on("dialog", (dialog) => dialog.accept());

    await page.getByRole("button", { name: "remove" }).click();

    await expect(page.getByText("Blog to Delete")).not.toBeVisible();
  });
});
