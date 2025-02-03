//Объекты

export class MainPage {
  constructor(page) {
    this.page = page;
    this.signupBtn = page.getByRole("link", { name: "Sign up" });
  }

  //метод
  async gotoRegister() {
    await this.signupBtn.click();
  }
  async open(basic_url) {
    await this.page.goto(basic_url);
  }
}
