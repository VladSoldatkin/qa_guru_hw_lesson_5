import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { MainPage } from "../src/pages/mainPage";
import { RegisterPage } from "../src/pages/registerPage";
import { NewArticle } from "../src/pages/newArticle";
import { ProfilePage } from "../src/pages/profilePage";

const URL_UI = "https://realworld.qa.guru/#";
const NEW_ARTICLE_URL = "https://realworld.qa.guru/#/editor";

//test suit
test.describe("3 Testui", () => {
  //Добавил beforeEach
  test.beforeEach(async ({ page }) => {
    await page.goto(URL_UI);
  });
  // Автоизация + создание статьи.
  test("New Article, Post comment, Change password", async ({ page }) => {
    // данные пользователя;
    const USER = {
      username: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
    };
    // данные по статье (Тест_1);
    const article = {
      title: faker.lorem.words(2),
      describe: faker.lorem.words(5),
      text: faker.lorem.sentence(10),
    };

    // текст коментария (Тест_2)
    const post = {
      text: faker.lorem.sentence(15),
    };

    // новый пароль;
    const NEWPASSWORD = {
      value: faker.internet.password({ length: 10 }),
    };

    // объекты
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    const newArticle = new NewArticle(page);
    const profilePage = new ProfilePage(page);

    //Переход на страницу регистрации;
    await mainPage.open(URL_UI);
    await mainPage.gotoRegister();

    //Тест_1 : Регистрация пользователя;
    await registerPage.register(USER.username, USER.email, USER.password);
    await expect(page.getByRole("navigation")).toContainText(USER.username);
    await expect(page.getByRole("navigation")).toContainText("New Article");

    //Тест_2 : Создание статьи;

    await newArticle.createNewArticle(
      article.title,
      article.describe,
      article.text
    );

    await expect(page.getByRole("heading")).toContainText(article.title);
    await expect(
      page.getByRole("button", { name: "Post Comment" })
    ).toBeVisible();

    //Тест_2 : написать коментарий к статье Тест_1;
    await page.getByPlaceholder("Write a comment...").click();
    await page.getByPlaceholder("Write a comment...").fill(post.text);
    await page.getByRole("button", { name: "Post Comment" }).click();
    await expect(page.getByRole("main")).toContainText(post.text);

    //Тест_3 : смена пароля + проверка входа с новым паролем;
    await page.getByRole("navigation").getByAltText(USER.username).click();

    //Действие: смена пароля;
    await profilePage.changePass(NEWPASSWORD.value);

    //Действия: деавторизация;
    await page.getByText(USER.username).click();
    await page.getByRole("link", { name: "Logout" }).click();
    await expect(page.getByRole("link", { name: "Login" })).toBeVisible();

    //Действия: Авторизация с новым паролем;
    await page.getByRole("link", { name: "Login" }).click();
    await page.getByRole("textbox", { name: "Email" }).click();
    await page.getByRole("textbox", { name: "Email" }).fill(USER.email);
    await page.getByRole("textbox", { name: "Password" }).click();
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(NEWPASSWORD.value);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByRole("navigation")).toContainText(USER.username);
  });
});
