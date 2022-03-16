/* globals cy */

describe ('Add other item to fridge', () => {
  
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

      it ('adds other item without clicking check', () => {
        cy.get("[data-cy=addfood]").click({ force: true });
        cy.get("[data-cy=other]").type('Test')
		cy.get("button[type=button]").click();
        cy.get("[data-cy=addfood]").click({ force: true });
        cy.get("[data-cy=other]").clear()
        cy.get("button[type=button]").click();

        cy.get('[data-cy=foodname]').should('not.exist');

        
      });

      it ('adds other item', () => {
        cy.get("[data-cy=addfood]").click({ force: true });
        cy.get("[data-cy=other]").type('Flowers')
        cy.get("[data-cy=otherfood]").click({ force: true });
		cy.get("button[type=button]").click();

        cy.get('[data-cy=foodname]').should(
            "have.text",
            "Flowers"
          );
      });
  
    });