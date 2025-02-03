import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { MainPage } from "../src/pages/mainPage";
import { RegisterPage } from "../src/pages/registerPage";
const URL_UI = "https://realworld.qa.guru/#";

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
    // объекты
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);

    //действия с основной страницей (переход на форму Регистарции);
    await mainPage.open(URL_UI);
    await mainPage.gotoRegister();

    //действяи с формой регистрации (создание пользователя);
    await registerPage.register(USER.username, USER.email, USER.password);
    await expect(page.getByRole("navigation")).toContainText(USER.username);
    await expect(page.getByRole("navigation")).toContainText("New Article");
  });
});
