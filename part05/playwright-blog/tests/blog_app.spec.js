const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: { name: "Nate Se", username: "nate", password: "DomeZa" },
    });
    await request.post("/api/users", {
      data: { name: "User Test", username: "test", password: "test" },
    });
    await page.goto("/");
  });

  test("login succeeds with correct credentials", async ({ page }) => {
    await loginWith(page, "nate", "DomeZa");
    await expect(page.getByText("Nate Se logged in")).toBeVisible();
  });

  test("login fails with wrong credentials", async ({ page }) => {
    await loginWith(page, "nate", "wrong");
    await expect(page.getByText("wrong username or password")).toBeVisible();
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "nate", "DomeZa");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "Test title", "Test author", "Test url");
      await expect(page.getByText("Test title")).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      await createBlog(page, "Test title", "Test author", "Test url");
      await page.getByText("Test title").click();
      await expect(page.getByText(/likes 0/i)).toBeVisible();
      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByText(/likes 1/i)).toBeVisible();
    });

    test("a blog can be deleted", async ({ page }) => {
      await createBlog(page, "Test title", "Test author", "Test url");
      await page.getByText("Test title").click();
      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "remove" }).click();
      await expect(page.getByText("Test title")).not.toBeVisible();
    });
  });
});
