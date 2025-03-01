export class ArticlePage {
  constructor(page) {
    this.page = page;
    //create new article
    this.newarticleBtn = page.getByRole("link", { name: "New Article" });
    this.articleTitle = page.getByRole("textbox", { name: "Article Title" });
    this.articleDescription = page.getByRole("textbox", {
      name: "What's this article about?",
    });
    this.articleText = page.getByRole("textbox", {
      name: "Write your article (in",
    });
    this.publishBtn = page.getByRole("button", { name: "Publish Article" });
    this.expectArticleTitle = page.getByRole("heading");
    //edit article
    this.editArticleBtn = page.getByRole("link", { name: "Edit Article" });
    this.editArticleTitle = page.getByRole("textbox", {
      name: "Article Title",
    });
    this.editArticleDescription = page.getByRole("textbox", {
      name: "What's this article about?",
    });
    this.editArticleText = page.getByRole("textbox", {
      name: "Write your article (in",
    });
    this.updateArticleBtn = page.getByRole("button", {
      name: "Update Article",
    });
    this.expectNewArticleTitle = page.getByRole("heading");
    //delete article
    this.deleteArticleBtn = page.getByRole("button", {
      name: "Delete Article",
    });
    this.gotobaseurl = page.goto("https://realworld.qa.guru/#/");

    this.expectYourFeed = page.getByRole("button", { name: "Your Feed" });
    this.expectNoArticles = page.getByText("Articles not available.");
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

  async editArticle(newtitle, newdescription, newtext) {
    await this.editArticleBtn.nth(1).click();
    await this.editArticleTitle.click();
    await this.editArticleTitle.fill(newtitle);
    await this.editArticleDescription.click();
    await this.editArticleDescription.fill(newdescription);
    await this.editArticleText.click();
    await this.editArticleText.fill(newtext);
    await this.updateArticleBtn.click();
  }

  async deleteArticle() {
    await this.deleteArticleBtn.first().click();
    await this.gotobaseurl;
  }
}
