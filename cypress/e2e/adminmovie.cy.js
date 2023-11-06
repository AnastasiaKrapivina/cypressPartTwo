import admin from "../fixtures/admindata.json";

describe("test to check admin login", () => {
  beforeEach(() => {
    cy.visit(admin.url);
  });

  it("test to check admin login happy path", () => {
    cy.login(admin.email, admin.password);
    cy.contains("Идёмвкино").should("be.visible");
    cy.contains("Администраторррская").should("be.visible");
  });

  it("test to check admin login sad path", () => {
    cy.login(admin.email, admin.passwordSad);
    cy.contains("Ошибка авторизации!").should("be.visible");
  });
});

describe("booking a movie in admin", () => {
  it("receiving a film from an available theater", () => {
    cy.visit(admin.url);
    cy.login(admin.email, admin.password);

    cy.get(admin.seancesMovie)
      .eq(5)
      .should("have.attr", admin.filmData, admin.filmId);
  });
});
