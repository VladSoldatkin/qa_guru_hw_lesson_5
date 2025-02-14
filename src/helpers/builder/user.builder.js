import { faker } from "@faker-js/faker";

export class UserBuilder {
  addUsername() {
    this.userName = faker.person.firstName();
    return this;
  }
  addEmail() {
    this.userEmail = faker.internet.email();
    return this;
  }
  addPassword(symbol = 10) {
    this.userPassword = faker.internet.password({ length: symbol });
    return this;
  }
  addNewPassword() {
    this.userNewPassword = faker.internet.password({ length: 10 });
    return this;
  }
  generate() {
    return {
      userName: this.userName,
      userEmail: this.userEmail,
      userPassword: this.userPassword,
      userNewPassword: this.userNewPassword,
    };
  }
}
