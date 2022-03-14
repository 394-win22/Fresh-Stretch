/* globals cy */

describe ('Edit expiration days', () => {
  
    it ('shows sign in button', () => {
        cy.visit ('/login');
        cy.get('[data-cy=email]').type('test@a.com')
        cy.get('[data-cy=password]').type('123456')
        cy.get('[data-cy=signinbutton]').click();
        cy.get('[data-cy=expiration]').invoke('text')
        .then((text1) => {
            cy.get('[data-cy=foodlist]').click();
            cy.get('[data-cy=minusdays]').click();
            cy.get('[data-cy=save]').click();

            // grab the div again and compare its previous text
            // to the current text
            cy.get('[data-cy=expiration]')
                .invoke('text')
                .should((text2) => {
                    expect(text1).not.to.eq(text2)
            })
        })
        // cy.get('[data-cy=foodlist]').click();
        // cy.get('[data-cy=minusdays]').click();
        // cy.get('[data-cy=save]').click();
        //expect(cy.get('[data-cy=expiration]')).to.not.equal(expdays)
  
      });
  
  
      // it ('triggers wrong email', () => {
      //     cy.visit ('/');
      //     cy.get('[data-cy=email]').type('Hello')
      //     cy.get('[data-cy=emailwarn]').should('contain', 'Please enter a valid email address.');
      //   });
  
    });
