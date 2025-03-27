//Объекты

export class MainPage {
  constructor(page, userName) {
    this.page = page;
    //SignUp
    this.signupLink = page.getByRole("link", { name: "Sign up" });
    this.usernameField = page.getByRole("textbox", { name: "Your Name" });
    this.emailField = page.getByRole("textbox", { name: "Email" });
    this.passwordField = page.getByRole("textbox", { name: "Password" });
    this.sighnupBtn = page.getByRole("button", { name: "Sign up" });
    this.expectProfileUsername = page.getByRole("navigation");
    //Login
    this.loginLink = page.getByRole("link", { name: "Login" });
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginBtn = page.getByRole("button", { name: "Login" });
  }

  async signup(username, email, password) {
    await this.signupLink.click();
    await this.usernameField.click();
    await this.usernameField.fill(username);
    await this.emailField.click();
    await this.emailField.fill(email);
    await this.passwordField.click();
    await this.passwordField.fill(password);
    await this.sighnupBtn.click();
  }

  async login(email, password) {
    await this.loginLink.click();
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }
  //method "Logout"
  /*async logout() {
    await this.profileButton.click();
    await this.logoutBtn.click();
  }*/

  async open() {
    await this.page.goto("https://realworld.qa.guru/#");
  }
}
