/* eslint-disable no-undef */
describe('login logout flow', () => {
  it('given valid credentials: should let the user log in and then log out again', () => {
    cy.intercept('/api/login', request => {
      request.reply({
        statusCode: 200,
        body: {
          json: {
            token: 'token',
          },
        },
      });
    });

    cy.visit('/');
    cy.get('input[type="email"]').type('test+success@magic.link');
    cy.get('button', { name: 'Sign up' }).click();
  });
});
