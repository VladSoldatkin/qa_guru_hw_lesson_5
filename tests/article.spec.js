import { test, expect } from "@playwright/test";
import { MainPage, ArticlePage, LogoutPage } from "../src/pages/index";

import { UserBuilder, ArticleBuilder } from "../src/helpers/builder/index";

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
  .editTitle()
  .editDescribe()
  .editText()
  .generate();

test.describe("Create, edit, delete article", () => {
  //Добавил beforeEach
  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    //Переход на страницу регистрации;
    await mainPage.open();
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
    const articlePage = new ArticlePage(page);
    //Создание статьи;
    await articlePage.createNewArticle(
      articleBuilder.title,
      articleBuilder.describe,
      articleBuilder.text
    );
    await expect(articlePage.expectArticleTitle).toContainText(
      articleBuilder.title
    );
  });

  test("Edit Article", async ({ page }) => {
    const articlePage = new ArticlePage(page);
    //Precondition: Create new article;
    await articlePage.createNewArticle(
      articleBuilder.title,
      articleBuilder.describe,
      articleBuilder.text
    );
    //Редактирвоание статьи;
    await articlePage.editArticle(
      articleBuilder.newtitle,
      articleBuilder.newdescribe,
      articleBuilder.newtext
    );
    await expect(articlePage.expectNewArticleTitle).toContainText(
      articleBuilder.newtitle
    );
  });
  test("Delete Article", async ({ page }) => {
    const articlePage = new ArticlePage(page);
    //Precondition: Create new article;
    await articlePage.createNewArticle(
      articleBuilder.title,
      articleBuilder.describe,
      articleBuilder.text
    );
    //Delete article;
    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch((e) => {
        console.log(">>>e", e);
      });
    });
    await articlePage.deleteArticle();
    await expect(articlePage.expectYourFeed).toBeVisible();
  });
});
