import { faker } from "@faker-js/faker";

export class ArticleBuilder {
  addTitle() {
    this.title = faker.lorem.words(2);
    return this;
  }
  addDescribe() {
    this.describe = faker.lorem.words(5);
    return this;
  }
  addText() {
    this.text = faker.lorem.sentence(10);
    return this;
  }
  generate() {
    return {
      title: this.title,
      describe: this.describe,
      text: this.text,
    };
  }
}
