import application from "/cypress/fixtures/application.json";

describe("correct display of the main page", () => {
  beforeEach(() => {
    cy.visit(application.url);
  });

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
