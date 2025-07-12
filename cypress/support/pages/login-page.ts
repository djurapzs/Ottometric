class LoginPage {
  visit(): void {
    cy.visit("/");
  }

  fillEmail(email: string): void {
    cy.get('[data-testid="email-input-field"]').clear().type(email);
  }

  fillPassword(password: string): void {
    cy.get('[data-testid="password-input-field"]').clear().type(password);
  }

  submit(): void {
    cy.get('[data-testid="otto-login-btn"]').click();
  }
}

export default new LoginPage();
