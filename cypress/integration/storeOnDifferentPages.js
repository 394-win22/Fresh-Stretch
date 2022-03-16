/* globals cy */

describe ('Adding food to different storage locations', () => {
  
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

    it ('stores on fridge page without affecting others', () => {
        //pantry page is empty
        cy.get('[data-cy=pantry]').click();
        cy.get('[data-cy=empty-message]').contains('pantry');
        cy.url().should("eq", "http://localhost:3000/pantry");
        //freezer page is empty
        cy.get('[data-cy=freezer]').click();
        cy.get('[data-cy=empty-message]').contains('freezer');
        cy.url().should("eq", "http://localhost:3000/freezer");
        //fridge page is empty
        cy.get('[data-cy=fridge]').click();
        cy.get('[data-cy=empty-message]').contains('fridge');
        cy.url().should("eq", "http://localhost:3000/");

        //add to fridge
        addItem();

        //freezer and pantry still empty
        //pantry page is empty
        cy.get('[data-cy=pantry]').click();
        cy.get('[data-cy=empty-message]').contains('pantry');
        //freezer page is empty
        cy.get('[data-cy=freezer]').click();
        cy.get('[data-cy=empty-message]').contains('freezer');

        //delete fridge item
        cy.get('[data-cy=fridge]').click();
        cy.url().should("eq", "http://localhost:3000/");
		deleteItems();
    });

    it ('stores on freezer page without affecting others', () => {
        //pantry page is empty
        cy.get('[data-cy=pantry]').click();
        cy.get('[data-cy=empty-message]').contains('pantry');
        cy.url().should("eq", "http://localhost:3000/pantry");
        //fridge page is empty
        cy.get('[data-cy=fridge]').click();
        cy.get('[data-cy=empty-message]').contains('fridge');
        cy.url().should("eq", "http://localhost:3000/");
        //freezer page is empty
        cy.get('[data-cy=freezer]').click();
        cy.get('[data-cy=empty-message]').contains('freezer');
        cy.url().should("eq", "http://localhost:3000/freezer");

        //add to freezer
        addItem();

        //fridge and pantry still empty
        //pantry page is empty
        cy.get('[data-cy=pantry]').click();
        cy.get('[data-cy=empty-message]').contains('pantry');
        //fridge page is empty
        cy.get('[data-cy=fridge]').click();
        cy.get('[data-cy=empty-message]').contains('fridge');

        //delete fridge item
        cy.get('[data-cy=freezer]').click();
        cy.url().should("eq", "http://localhost:3000/freezer");
		deleteItems();
    });

    it ('stores on pantry page without affecting others', () => {
        //freezer page is empty
        cy.get('[data-cy=freezer]').click();
        cy.get('[data-cy=empty-message]').contains('freezer');
        cy.url().should("eq", "http://localhost:3000/freezer");
        //fridge page is empty
        cy.get('[data-cy=fridge]').click();
        cy.get('[data-cy=empty-message]').contains('fridge');
        cy.url().should("eq", "http://localhost:3000/");
        //pantry page is empty
        cy.get('[data-cy=pantry]').click();
        cy.get('[data-cy=empty-message]').contains('pantry');
        cy.url().should("eq", "http://localhost:3000/pantry");

        //add to pantry
        addItem();

        //freezer and fridge still empty
        //fridge page is empty
        cy.get('[data-cy=fridge]').click();
        cy.get('[data-cy=empty-message]').contains('fridge');
        //freezer page is empty
        cy.get('[data-cy=freezer]').click();
        cy.get('[data-cy=empty-message]').contains('freezer');

        //delete fridge item
        cy.get('[data-cy=pantry]').click();
        cy.url().should("eq", "http://localhost:3000/pantry");
		deleteItems();
    });

    const addItem = () => {
        cy.get('[data-cy=addfood]').click({force: true});
        cy.get('label').first().click({ multiple: false });
        cy.get('button[type=button]').click();
        cy.get('.swipeable-list-item').should('have.length.least', 1);
    }

	const deleteItems = () => {
		cy.get("[data-cy=foodlist]").first().click({ force: true });
		cy.get("[data-cy=delete]").click();
		cy.get("body").then(($body) => {
			if ($body.find(".swipeable-list-item").length > 0) {
				deleteItems();
			}
		});
	};
  
    });
