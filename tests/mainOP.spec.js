import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { MainPage } from "../src/pages/mainPage";
import { RegisterPage } from "../src/pages/registerPage";
import { NewArticle } from "../src/pages/newArticle";
const URL_UI = "https://realworld.qa.guru/#";
const NEW_ARTICLE_URL = "https://realworld.qa.guru/#/editor";

//test suit
test.describe("3 test", () => {
  //Добавил beforeEach
  test.beforeEach(async ({ page }) => {
    await page.goto(URL_UI);
  });
  // Автоизация + создание статьи.
  test("Регистарция и создание новой статьи", async ({ page }) => {
    // данные пользователя;
    const USER = {
      username: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
    };
    // данные по статье;
    const article = {
      title: faker.lorem.words(2),
      describe: faker.lorem.words(5),
      text: faker.lorem.sentence(10),
    };

    // объекты
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    const newArticle = new NewArticle(page);

    //Переход на страницу регистрации;
    await mainPage.open(URL_UI);
    await mainPage.gotoRegister();

    //Тест_1 : Регистрация пользователя;
    await registerPage.register(USER.username, USER.email, USER.password);
    await expect(page.getByRole("navigation")).toContainText(USER.username);
    await expect(page.getByRole("navigation")).toContainText("New Article");

    //Тест_2 : Создание статьи;
    //await page.goto(NEW_ARTICLE_URL); // сделать по клику
    //await page.getByRole("link", { name: "New Article" }).click(); -> вынес этот метод в newArticle
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
});
