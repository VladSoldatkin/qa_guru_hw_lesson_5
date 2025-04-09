import { test, expect } from "@playwright/test";
import {
  MainPage,
  ArticlePage,
  CommentPage,
  LogoutPage,
} from "../../src/pages/index";

import {
  UserBuilder,
  ArticleBuilder,
  PostBuilder,
} from "../../src/helpers/builder/index";

//builder
const userBuilder = new UserBuilder()
  .addUsername()
  .addEmail()
  .addPassword(10)
  .generate();
const articleBuilder = new ArticleBuilder()
  .addTitle()
  .addDescribe()
  .addText()
  .generate();
const postBuilder = new PostBuilder().addText().generate();

test.describe("Create, delete post", () => {
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
  test("New Post", async ({ page }) => {
    const articlePage = new ArticlePage(page);
    const commentPage = new CommentPage(page);
    //Создание статьи;
    await articlePage.createNewArticle(
      articleBuilder.title,
      articleBuilder.describe,
      articleBuilder.text
    );
    await expect(page.getByRole("heading")).toContainText(articleBuilder.title);
    await commentPage.postComment(postBuilder.text);
    await expect(commentPage.expectPost).toContainText(postBuilder.text);
  });
  test("Delete Post", async ({ page }) => {
    const articlePage = new ArticlePage(page);
    const commentPage = new CommentPage(page);
    //Создание статьи;
    await articlePage.createNewArticle(
      articleBuilder.title,
      articleBuilder.describe,
      articleBuilder.text
    );
    await expect(page.getByRole("heading")).toContainText(articleBuilder.title);
    await commentPage.postComment(postBuilder.text);
    await expect(commentPage.expectPost).toContainText(postBuilder.text);
    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(() => {});
    });
    await commentPage.deleteComment();
    await expect(commentPage.expectAfterDelete).toContainText(
      "There are no comments yet..."
    );
  });
});
