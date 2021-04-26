/// <reference types="Cypress" />

/*
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });
});
*/

describe('Visita pokedex y clickea bulbasaur', () => {
  it('carga la página y click en bulbasaur', () => {
    cy.visit('http://localhost:8001/');
    cy.get('#bulbasaur').click();
    cy.get('#nombre').should('have.text', 'Nombre: bulbasaur');
  });
});

describe('Hace click en el boton siguiente, chequea que se carguen 20 pokemones correctamente y controla el número de página', () => {
  it('Click al botón siguiente y control de cantidad de pokemones', () => {
    cy.get('#boton-siguiente').click();
    cy.get('.botones').should('have.length', 20);
  });
  it('Controla que el número de pagina en el paginador y en el encabezado sean correctos', () => {
    cy.get('#pagina-activa').should('contain.text', '2');
    ///console.log(document.querySelector('#pagina-actual'));
    cy.get('#pagina-actual').should('contain.text', 'Página 2');
  });
});
