/* globals cy */

describe ('Add all items to fridge', () => {
  
    it ('login test user', () => {
        cy.visit ('/login');
        cy.get('[data-cy=email]').type('test@a.com')
        cy.get('[data-cy=password]').type('123456')
        cy.get('[data-cy=signinbutton]').click();
        // our auth token should be present
        cy.window()
            .its("sessionStorage")
            .invoke("getItem", "Auth Token")
            .should("exist");

        // UI should reflect this user being logged in
        cy.url().should('eq', 'http://localhost:3000/')
      });

      it ('adds three items', () => {
        cy.get('[data-cy=addfood]').click({force: true});
        cy.get('label').click({ multiple: true });
        cy.get('button[type=button]').click();
        cy.get('.swipeable-list-item').should('have.length.least', 51);
      });
  
    });
