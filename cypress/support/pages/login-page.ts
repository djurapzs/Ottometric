class LoginPage {
  private readonly emailInputField = '[data-testid="email-input-field"]';
  private readonly passwordInputField = '[data-testid="password-input-field"]';
  private readonly loginButton = '[data-testid="otto-login-btn"]';

  visit(): void {
    cy.visit("/");
  }

  fillEmail(email: string): void {
    cy.get(this.emailInputField).clear().type(email);
  }

  fillPassword(password: string): void {
    cy.get(this.passwordInputField).clear().type(password);
  }

  submit(): void {
    cy.get(this.loginButton).click();
  }
}

export default new LoginPage();
