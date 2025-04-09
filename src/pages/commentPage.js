export class CommentPage {
  constructor(page) {
    this.addCommment = page.getByPlaceholder("Write a comment...");
    this.postBtn = page.getByRole("button", { name: "Post Comment" });
    this.expectPost = page.getByRole("main");
    this.deleteCommentBtn = page.getByRole("button", {
      name: "",
      exact: true,
    });
    this.expectAfterDelete = page.getByRole("main");
  }

  async postComment(text) {
    await this.addCommment.click();
    await this.addCommment.fill(text);
    await this.postBtn.click();
  }

  async deleteComment() {
    await this.deleteCommentBtn.click();
  }
}
