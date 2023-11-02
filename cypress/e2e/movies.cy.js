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

  it("test to check admin login happy path", () => {
    cy.login(admin.email, admin.password);
    cy.contains("Администраторррская").should("be.visible");
  });

  it("test to check admin login sad path", () => {
    cy.login(admin.email, admin.passwordSad);
    cy.contains("Ошибка авторизации!").should("be.visible");
  });
});

describe.only("booking a movie", () => {
  let session;
  it("receiving a film from an available theater", () => {
    cy.visit(admin.url);
    cy.login(admin.email, admin.password);

    // Не могу сообразить как мне выбрать доступный зал и по этому названию выбрать название фильма
    // и сохранить это название в переменную для дальнейшего использования в тестах?

    cy.get(".conf-step__seances-movie .conf-step__seances-movie-start")
      .eq(4)
      .invoke("text")
      .then((text) => {
        let film = text;
        cy.wrap(film).as("film");
      });

    cy.get("@film").then((film) => {
      expect(film).to.contain("10:00");
      session = film;
    });
  });
  // Еще момент, предположим я сохранила название фильма,
  // но по названию фильм не кликается, надо кликнуть на время сеанса? А как имея название фильмас кликнуть на время?
  it("booking a movie in an available room", () => {
    cy.visit(application.url);
    cy.get(application.day).eq(1).click();

    cy.contains(session).click(); // Как тут пробросить переменную, значение которой находим в предыдущем тесте?

    cy.get(application.buyingTitle).should("have.text", "Терминатор-заржавел");

    cy.get(application.place).click();
    cy.get(application.button).should("not.have.attr", "disabled");
  });
});
