export class LoginPage{
    constructor(page) {
    this.page = page;
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#submit-login');
    this.displayedText = page.locator('#flash b');
  }

  async goto() {
    await this.page.goto('https://practice.expandtesting.com/login');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}