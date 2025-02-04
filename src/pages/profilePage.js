export class ProfilePage {
  constructor(page) {
    this.page = page;

    this.chooseSettings = page.getByRole("link", { name: "Settings" });
    this.passFiled = page.getByRole("textbox", { name: "Password" });
    this.updateBtn = page.getByRole("button", { name: "Update Settings" });
  }

  //метод
  async changePass(newPassword) {
    await this.chooseSettings.click();

    await this.passFiled.click();
    await this.passFiled.fill(newPassword);

    await this.updateBtn.click();
  }
}
