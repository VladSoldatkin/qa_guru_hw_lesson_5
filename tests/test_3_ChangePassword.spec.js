import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { MainPage } from "../src/pages/mainPage";
import { RegisterPage } from "../src/pages/registerPage";
import { ProfilePage } from "../src/pages/profilePage";
//данные
const BASIC_URL = "https://realworld.qa.guru/#";
const USER = {
  username: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password({ length: 10 }),
};
const NEWPASSWORD = {
  value: faker.internet.password({ length: 10 }),
};

test.describe("Change password and make new Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASIC_URL);
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    //Регистрация;
    await mainPage.open(BASIC_URL);
    await mainPage.gotoRegister();
    await registerPage.register(USER.username, USER.email, USER.password);
    await expect(page.getByRole("navigation")).toContainText(USER.username);
  });

  test("Change password", async ({ page }) => {
    const profilePage = new ProfilePage(page);
    //Переход в профиль
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
    await expect(page.getByRole("button", { name: "Your Feed" })).toBeVisible();
  });
});
