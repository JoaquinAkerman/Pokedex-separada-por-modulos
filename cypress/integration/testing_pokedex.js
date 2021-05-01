/// <reference types="Cypress" />

describe('Visita pokedex y clickea bulbasaur', () => {
  it('carga la página, click en bulbasaur y controla que el boton anterior esté oculto', () => {
    cy.intercept('https://pokeapi.co/api/v2/pokemon', {
      fixture: 'pagina_1.json',
    });
    cy.intercept('https://pokeapi.co/api/v2/pokemon/1/', {
      fixture: 'bulbasaur.json',
    });
    cy.visit('http://localhost:8001/');
    cy.get('.botones').should('have.length', 20);
    cy.get('#bulbasaur').click();
    cy.get('#nombre').should('have.text', 'Nombre: bulbasaur_interceptado');
    cy.get('#boton-anterior').should('have.class', 'oculto');
  });
});

describe('Hace click en el boton siguiente, chequea que se carguen 20 pokemones correctamente, clickea ekans, control de info en pokedex y controla el número de página', () => {
  it('Click al botón siguiente y control de cantidad de pokemones', () => {
    cy.intercept('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20', {
      fixture: 'pagina_2.json',
    });
    cy.intercept('https://pokeapi.co/api/v2/pokemon/23/', {
      fixture: 'ekans.json',
    });
    cy.get('#boton-siguiente').click();
    cy.get('.botones').should('have.length', 20);
    cy.get('#ekans').click();
    cy.get('#nombre').should('have.text', 'Nombre: ekans_interceptado');
  });
  it('Controla que el número de pagina en el paginador y en el encabezado sean correctos, controla que se muestre el botón anterior', () => {
    cy.get('#boton-anterior').should('have.class', 'float-left');
    cy.get('#pagina-activa').should('contain.text', '2');
    cy.get('#pagina-actual').should('contain.text', 'Página 2');
  });
});

describe('Hace click en el botón anterior y se asegura que al estar en la página 1 se oculte. Control de indicador de página en H2 y en paginador', () => {
  it('click al boton anterior, control de cantidad de pokemones y paginador', () => {
    cy.intercept('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20', {
      fixture: 'pagina_1',
    });
    cy.get('#boton-anterior').click().should('have.class', 'oculto');
    cy.get('.botones').should('have.length', 20);
  });
  it('Controla que el número de pagina en el paginador y en el encabezado sean correctos', () => {
    cy.get('#pagina-activa').should('contain.text', '1');
    cy.get('#pagina-actual').should('contain.text', 'Página 1');
    cy.get;
  });
});

describe('prueba botones del paginador, y que el botón siguiente se oculte cuando no hay páginas posteriores a la actual', () => {
  it('prueba el boton 3 y 56 del paginador', () => {
    cy.intercept('https://pokeapi.co/api/v2/pokemon?offset=40&limit=20', {
      fixture: 'pagina_3.json',
    });
    cy.intercept('https://pokeapi.co/api/v2/pokemon?offset=1100&limit=20', {
      fixture: 'pagina_56.json',
    });
    cy.get('#3').click();
    cy.get('#pagina-activa').should('contain.text', '3');
    cy.get('#pagina-actual').should('contain.text', 'Página 3');
    cy.get('.botones').should('have.length', 20);
    cy.get('#56').click();
    cy.get('#pagina-activa').should('contain.text', '56');
    cy.get('#pagina-actual').should('contain.text', 'Página 56');
    cy.get('.botones').should('have.length', 18);
    cy.get('#boton-siguiente').should('have.class', 'oculto');
  });
});
