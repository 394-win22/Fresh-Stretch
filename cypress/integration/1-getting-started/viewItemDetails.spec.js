describe ('View item details', () => {
  
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

      it ('view item details', () => {
        cy.get('[data-cy=foodlist]').click();
        cy.get(".modal").should("exist")
      });
  
    });