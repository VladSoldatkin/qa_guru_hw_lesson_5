import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const URL_UI = "https://realworld.qa.guru/#/";

// Автоизация + создание статьи.
test("Регистарция и создание новой статьи", async ({ page }) => {
  await page.goto("https://realworld.qa.guru/#");
  await page.getByRole("link", { name: "Sign up" }).click();
  await page.getByRole("textbox", { name: "Your Name" }).click();
  await page.getByRole("textbox", { name: "Your Name" }).fill("ertyui");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("ewtererte");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page
    .getByRole("textbox", { name: "Password" })
    .fill("dsfdsfsdf@dsfsdf.sdfsdf");
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("ewtererte@sdsdfsdds.dsfdsfsdf");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page.getByRole("navigation")).toContainText("ertyui");
  await expect(page.getByRole("navigation")).toContainText("New Article");
  await page.getByRole("link", { name: "New Article" }).click();
  await expect(page.getByRole("button")).toContainText("Publish Article");
  await page.getByRole("textbox", { name: "Article Title" }).click();
  await page
    .getByRole("textbox", { name: "Article Title" })
    .fill("sthgfhfghfghfgh");
  await page
    .getByRole("textbox", { name: "What's this article about?" })
    .click();
  await page
    .getByRole("textbox", { name: "What's this article about?" })
    .fill("sghfghgfhsghgsh");
  await page.getByRole("textbox", { name: "Write your article (in" }).click();
  await page
    .getByRole("textbox", { name: "Write your article (in" })
    .fill("sghsghsghsghshf");
  await page.getByRole("button", { name: "Publish Article" }).click();
  await expect(
    page.getByRole("heading", { name: "sthgfhfghfghfgh" })
  ).toBeVisible();
  await expect(page.getByRole("heading")).toContainText("sthgfhfghfghfgh");
  await expect(page.getByRole("paragraph")).toContainText("sghsghsghsghshf");
  await expect(
    page.getByRole("button", { name: "Post Comment" })
  ).toBeVisible();
});
