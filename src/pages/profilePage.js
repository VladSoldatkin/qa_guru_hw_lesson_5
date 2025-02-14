export class ProfilePage {
  constructor(page, username) {
    this.page = page;
    this.profileButton = page.getByText(username);
    this.chooseSettings = page.getByRole("link", { name: "Settings" });
    this.passFiled = page.getByRole("textbox", { name: "Password" });
    this.updateBtn = page.getByRole("button", { name: "Update Settings" });
  }

  //метод
  async changePass(newPassword) {
    await this.profileButton.click();
    await this.chooseSettings.click();

    await this.passFiled.click();
    await this.passFiled.fill(newPassword);

    await this.updateBtn.click();
  }
}
