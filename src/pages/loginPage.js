export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginLink = page.getByRole("link", { name: "Login" });
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginBtn = page.getByRole("button", { name: "Login" });
  }

  async login(email, password) {
    await this.loginLink.click();
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }
}
