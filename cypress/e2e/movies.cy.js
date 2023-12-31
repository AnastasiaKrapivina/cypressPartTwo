import admin from "../fixtures/admindata.json";
import application from "../fixtures/application.json";

beforeEach(() => {
  cy.visit(application.url);
});

describe("correct display of the main page", () => {
  it("correct display of the title", () => {
    cy.contains("Идёмвкино").should("be.visible");
  });

  it("correct week display", () => {
    cy.get(application.day).should("have.length", 7);
  });

  it("correct display of the movies", () => {
    cy.get(application.movieTitle).eq(0).should("have.text", "Зверополис");
    cy.get(application.movieTitle)
      .eq(1)
      .should("have.text", "Терминатор-заржавел");
    cy.get(application.movieTitle)
      .eq(2)
      .should("have.text", "Унесенные ветром");
  });
});

describe("booking a movie", () => {
  it("booking a movie in an available room", () => {
    cy.get(application.day).eq(1).click();

    cy.get(`[${admin.filmData}=${admin.filmId}]`).click();

    cy.get(application.buyingTitle).should("have.text", "Унесенные ветром");

    cy.get(application.place).click();
    cy.get(application.button).not("[disabled]");
  });
});
