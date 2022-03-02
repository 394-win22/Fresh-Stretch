/* globals cy */
    
describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    it ('triggers wrong email', () => {
        cy.visit ('/');
        cy.get('[data-cy=email]').type('Hello') 
        cy.get('[data-cy=emailwarn]').should('contain', 'Please enter a valid email address.');
      });
  
  });