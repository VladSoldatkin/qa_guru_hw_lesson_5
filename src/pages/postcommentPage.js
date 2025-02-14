export class PostComment {
  constructor(page) {
    this.writeCommment = page.getByPlaceholder("Write a comment...");
    this.postBtn = page.getByRole("button", { name: "Post Comment" });
    this.expectPost = page.getByRole("main");
  }

  async postComment(text) {
    await this.writeCommment.click();
    await this.writeCommment.fill(text);
    await this.postBtn.click();
  }
}
