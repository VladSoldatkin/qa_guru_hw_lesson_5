export class NewArticle {
  constructor(page) {
    this.page = page;
    this.newarticleBtn = page.getByRole("link", { name: "New Article" });
    this.articleTitle = page.getByRole("textbox", { name: "Article Title" });
    this.articleDescription = page.getByRole("textbox", {
      name: "What's this article about?",
    });
    this.articleText = page.getByRole("textbox", {
      name: "Write your article (in",
    });
    this.publishBtn = page.getByRole("button", { name: "Publish Article" });
  }

  //метод
  async createNewArticle(title, description, text) {
    await this.newarticleBtn.click();

    await this.articleTitle.click();
    await this.articleTitle.fill(title);

    await this.articleDescription.click();
    await this.articleDescription.fill(description);

    await this.articleText.click();
    await this.articleText.fill(text);

    await this.publishBtn.click();
  }
}
