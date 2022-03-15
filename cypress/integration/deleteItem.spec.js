describe("Delete Item", () => {
	it("sign in", () => {
		cy.visit("/login");
		cy.get("[data-cy=email]").type("test@a.com");
		cy.get("[data-cy=password]").type("123456");
		cy.get("[data-cy=signinbutton]").click();
		// our auth token should be present
		cy.window()
			.its("sessionStorage")
			.invoke("getItem", "Auth Token")
			.should("exist");

		// UI should reflect this user being logged in
		cy.url().should("eq", "http://localhost:3000/");
	});

	it("add an item", () => {
		cy.get("[data-cy=addfood]").click({ force: true });
		cy.get("[data-cy=food-0").click();
		cy.get("button[type=button]").click();
	});

	it("delete item", () => {
		deleteItems();
		cy.get(".swipeable-list-item").should("not.exist");
	});

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
