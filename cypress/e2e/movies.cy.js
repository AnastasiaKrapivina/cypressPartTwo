import admin from "../fixtures/admindata.json";
import application from "../fixtures/application.json";

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

describe("test to check admin login", () => {
  beforeEach(() => {
    cy.visit(admin.url);
  });

  it.only("test to check admin login happy path", () => {
    cy.login(admin.email, admin.password);
    cy.contains("Идёмвкино").should("be.visible");
    cy.contains("Администраторская").should("be.visible");
  });

  it("test to check admin login sad path", () => {
    cy.login(admin.email, admin.passwordSad);
    cy.contains("Ошибка авторизации!").should("be.visible");
  });
});

describe("booking a movie", () => {
  // let session;
  it("receiving a film from an available theater", () => {
    cy.visit(admin.url);
    cy.login(admin.email, admin.password);

    cy.get(admin.seancesMovie)
      .eq(5)
      .should("have.attr", admin.filmData, admin.filmId);
  });

  it("booking a movie in an available room", () => {
    cy.visit(application.url);
    cy.get(application.day).eq(1).click();

    cy.get(`[${admin.filmData}=${admin.filmId}]`).click();

    cy.get(application.buyingTitle).should("have.text", "Унесенные ветром");

    cy.get(application.place).click();
    cy.get(application.button).not("[disabled]");
  });
});
