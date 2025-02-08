import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { MainPage } from "../src/pages/mainPage";
import { RegisterPage } from "../src/pages/registerPage";
import { NewArticle } from "../src/pages/newArticle";
//данные
const BASIC_URL = "https://realworld.qa.guru/#";
const USER = {
  username: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password({ length: 10 }),
};
const article = {
  title: faker.lorem.words(2),
  describe: faker.lorem.words(5),
  text: faker.lorem.sentence(10),
};
const post = {
  text: faker.lorem.sentence(15),
};

test.describe("Post comment", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASIC_URL);
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    const newArticle = new NewArticle(page);
    //Переход на страницу регистрации;
    await mainPage.open(BASIC_URL);
    await mainPage.gotoRegister();
    await registerPage.register(USER.username, USER.email, USER.password);
    await expect(page.getByRole("navigation")).toContainText(USER.username);
    //Создание статьи
    await newArticle.createNewArticle(
      article.title,
      article.describe,
      article.text
    );
    await expect(page.getByRole("heading")).toContainText(article.title);
    await expect(
      page.getByRole("button", { name: "Post Comment" })
    ).toBeVisible();
  });

  test("Post comment", async ({ page }) => {
    await page.getByPlaceholder("Write a comment...").click();
    await page.getByPlaceholder("Write a comment...").fill(post.text);
    await page.getByRole("button", { name: "Post Comment" }).click();
    await expect(page.getByRole("main")).toContainText(post.text);
  });
});
