import { test, expect } from "@playwright/test";
import {
  MainPage,
  NewArticle,
  ProfilePage,
  LogoutPage,
  PostComment,
} from "../src/pages/index";

import {
  UserBuilder,
  ArticleBuilder,
  PostBuilder,
} from "../src/helpers/builder/index";

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
    const mainPage = new MainPage(page);
    //const signupPage = new SignupPage(page);

    //Переход на страницу регистрации;
    await mainPage.open();
    //await mainPage.gotoRegister();
    await mainPage.signup(
      userBuilder.userName,
      userBuilder.userEmail,
      userBuilder.userPassword
    );
    await expect(mainPage.expectProfileUsername).toContainText(
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
    await expect(newArticle.expectArticleTitle).toContainText(
      articleBuilder.title
    );
  });

  test("Post comment", async ({ page }) => {
    const newArticle = new NewArticle(page);
    const postComment = new PostComment(page);
    //Создание статьи;
    await newArticle.createNewArticle(
      articleBuilder.title,
      articleBuilder.describe,
      articleBuilder.text
    );
    await expect(page.getByRole("heading")).toContainText(articleBuilder.title);
    await postComment.postComment(postBuilder.text);
    await expect(postComment.expectPost).toContainText(postBuilder.text);
  });

  test("Change password", async ({ page }) => {
    const profilePage = new ProfilePage(page, userBuilder.userName);
    //const loginPage = new LoginPage(page);
    //const signupPage = new SignupPage(page);
    const mainPage = new MainPage(page);
    const logoutPage = new LogoutPage(page, userBuilder.userName);
    //Действие: смена пароля;
    await profilePage.changePass(userBuilder.userNewPassword);
    //Действия: деавторизация;
    await logoutPage.logout();
    //Действия: Авторизация с новым паролем;
    await mainPage.login(userBuilder.userEmail, userBuilder.userNewPassword);
    await expect(mainPage.expectProfileUsername).toContainText(
      userBuilder.userName
    );
  });
});
