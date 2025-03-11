export class LogoutPage {
  constructor(page, username) {
    this.page = page;
    this.profileButton = page.getByText(username);
    this.logoutBtn = page.getByRole("link", { name: "Logout" });
  }

  async logout() {
    await test.step("Выход из системы", async () => {
      await this.profileButton.click();
      await this.logoutBtn.click();
    });
  }
}
