import { test, expect } from "@playwright/test";
import {
  MainPage,
  RegisterPage,
  NewArticle,
  ProfilePage,
} from "../src/pages/index";

import {
  UserBuilder,
  ArticleBuilder,
  PostBuilder,
} from "../src/helpers/builder/index";

//to do
const BASIC_URL = "https://realworld.qa.guru/#";

//builder
const userBuilder = new UserBuilder()
  .addUsername()
  .addEmail()
  .addPassword(10)
  .addNewPassword()
  .generate();
const articleBuilder = new ArticleBuilder()
  .addTitle()
  .addDescribe()
  .addText()
  .generate();
const postBuilder = new PostBuilder().addText().generate();

test.describe("Create a new article, Post comment, Change password", () => {
  //Добавил beforeEach
  test.beforeEach(async ({ page }) => {
    await page.goto(BASIC_URL);
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);

    //Переход на страницу регистрации;
    await mainPage.open(BASIC_URL);
    await mainPage.gotoRegister();
    await registerPage.register(
      userBuilder.userName,
      userBuilder.userEmail,
      userBuilder.userPassword
    );
    await expect(page.getByRole("navigation")).toContainText(
      userBuilder.userName
    );
  });

  test("New Article", async ({ page }) => {
    const newArticle = new NewArticle(page);
    //Создание статьи;
    await newArticle.createNewArticle(
      articleBuilder.title,
      articleBuilder.describe,
      articleBuilder.text
    );
    await expect(page.getByRole("heading")).toContainText(articleBuilder.title);
    await expect(
      page.getByRole("button", { name: "Post Comment" })
    ).toBeVisible();
  });

  test("Post comment", async ({ page }) => {
    const newArticle = new NewArticle(page);
    //Создание статьи;
    await newArticle.createNewArticle(
      articleBuilder.title,
      articleBuilder.describe,
      articleBuilder.text
    );

    //to do - обернуть в PO
    await expect(page.getByRole("heading")).toContainText(articleBuilder.title);
    await expect(
      page.getByRole("button", { name: "Post Comment" })
    ).toBeVisible();
    await page.getByPlaceholder("Write a comment...").click();
    await page.getByPlaceholder("Write a comment...").fill(postBuilder.text);
    await page.getByRole("button", { name: "Post Comment" }).click();
    await expect(page.getByRole("main")).toContainText(postBuilder.text);
  });

  test("Change password", async ({ page }) => {
    const profilePage = new ProfilePage(page);
    //to do - обернуть в PO
    //Переход в профиль
    await page
      .getByRole("navigation")
      .getByAltText(userBuilder.userName)
      .click();
    //Действие: смена пароля;
    await profilePage.changePass(userBuilder.userNewPassword);
    //Действия: деавторизация;
    await page.getByText(userBuilder.userName).click();
    await page.getByRole("link", { name: "Logout" }).click();
    await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
    //Действия: Авторизация с новым паролем;
    await page.getByRole("link", { name: "Login" }).click();
    await page.getByRole("textbox", { name: "Email" }).click();
    await page
      .getByRole("textbox", { name: "Email" })
      .fill(userBuilder.userEmail);
    await page.getByRole("textbox", { name: "Password" }).click();
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(userBuilder.userNewPassword);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByRole("navigation")).toContainText(
      userBuilder.userName
    );
    await expect(page.getByRole("button", { name: "Your Feed" })).toBeVisible();
  });
});
