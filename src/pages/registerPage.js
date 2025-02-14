export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.getByRole("textbox", { name: "Your Name" });
    this.emailField = page.getByRole("textbox", { name: "Email" });
    this.passwordField = page.getByRole("textbox", { name: "Password" });
    this.sighnupBtn = page.getByRole("button", { name: "Sign up" });
    this.expectProfileUsername = page.getByRole("navigation");
  }

  //метод
  async register(username, email, password) {
    await this.usernameField.click();
    await this.usernameField.fill(username);
    await this.emailField.click();
    await this.emailField.fill(email);
    await this.passwordField.click();
    await this.passwordField.fill(password);
    await this.sighnupBtn.click();
  }
}
