import { faker } from "@faker-js/faker";

export class PostBuilder {
  addText() {
    this.text = faker.lorem.sentence(15);
    return this;
  }
  generate() {
    return {
      text: this.text,
    };
  }
}
