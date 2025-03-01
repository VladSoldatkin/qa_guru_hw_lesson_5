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
  editTitle() {
    this.newtitle = faker.lorem.words(3);
    return this;
  }
  editDescribe() {
    this.newdescribe = faker.lorem.words(10);
    return this;
  }
  editText() {
    this.newtext = faker.lorem.sentence(20);
    return this;
  }
  generate() {
    return {
      title: this.title,
      describe: this.describe,
      text: this.text,
      newtitle: this.newtitle,
      newdescribe: this.newdescribe,
      newtext: this.newtext,
    };
  }
}
