/// <reference types="cypress" />
describe ("Test app", () => {
    beforeEach(()=>{
        cy.visit("http://localhost:3000");
    });

    const nameInput = () => cy.get('input[name="name"]');
    const emailInput = () => cy.get('input[name="email"]');
    const passwordInput = () => cy.get('input[name="password"]');
    const roleSelect = () => cy.get('select[name="role"]');
    const tosCheckBox = () => cy.get('input[name="tos"]');
    const submitButton = () => cy.get("#submitButton");
    const friendsDiv = () => cy.get(".friends");

    it("test work", ()=>{
        expect(1+1).to.equal(2);
    });

    it("elements exist", ()=>{
        nameInput().should("exist");
        submitButton().should("exist");
        cy.contains(/submit/i);
    });

    it("submit button disabled until inputs filled", () => {
        submitButton().should("be.disabled");
        nameInput().type("name text");
        submitButton().should("be.disabled");
        nameInput().clear();
        emailInput().type("email.test.com");
        submitButton().should("be.disabled");
        emailInput().clear();
        passwordInput().type("8letterpass");
        submitButton().should("be.disabled");
        passwordInput().clear();
        roleSelect().select("user");
        submitButton().should("be.disabled");
        roleSelect().select("");
        tosCheckBox().check();
        submitButton().should("be.disabled");
        tosCheckBox().uncheck();
    });

    it("can submit a new user", () => {
        friendsDiv().contains("test@email.com").should("not.exist");
        friendsDiv().contains("test").should("not.exist");
        friendsDiv().contains("8letterpass").should("not.exist");
        friendsDiv().contains("user").should("not.exist");
        friendsDiv().contains("accepted").should("not.exist");

        nameInput().type("name text");
        emailInput().type("test@email.com");
        passwordInput().type("8letterpass");
        roleSelect().select("user");
        tosCheckBox().check();
        submitButton().click();

        friendsDiv().contains("test@email.com").should("exist");
        friendsDiv().contains("test").should("exist");
        friendsDiv().contains("8letterpass").should("exist");
        friendsDiv().contains("user").should("exist");
        friendsDiv().contains("accepted").should("exist");
    });

    it("can empty form after submit", () => {
        nameInput().type("name");
        emailInput().type("test@test.com");
        passwordInput().type("8letterpassword");
        roleSelect().select("admin");
        tosCheckBox().check();
        submitButton().click();

        ( nameInput() && emailInput() && passwordInput() && roleSelect()).should("have.value", "");
        tosCheckBox().should("not.be.checked")

    });

});


