import admin from "/cypress/fixtures/admindata.json";
import application from "/cypress/fixtures/application.json";
describe("booking a movie", () => {
  it("booking a movie in an available room", () => {
    cy.visit(application.url);
    cy.get(application.day).eq(1).click();

    cy.get(`[${admin.filmData}=${admin.filmId}]`).click();

    cy.get(application.buyingTitle).should("have.text", "Унесенные ветром");

    cy.get(application.place).click();
    cy.get(application.button).not("[disabled]");
  });
});
