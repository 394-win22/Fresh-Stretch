/* globals cy */

describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

  it ('shows sign in button', () => {
      cy.visit ('/login');
      cy.get('[data-cy=email]').type('test@a.com')
      cy.get('[data-cy=password]').type('123456')
      cy.get('[data-cy=signinbutton]').click();
    });


    // it ('triggers wrong email', () => {
    //     cy.visit ('/');
    //     cy.get('[data-cy=email]').type('Hello')
    //     cy.get('[data-cy=emailwarn]').should('contain', 'Please enter a valid email address.');
    //   });

  });
