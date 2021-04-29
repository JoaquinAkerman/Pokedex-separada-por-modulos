/// <reference types="Cypress" />

import { pagina_1 } from '../fixtures/pagina_1.json';

describe('Visita pokedex y clickea bulbasaur', () => {
  it('carga la página y click en bulbasaur', () => {
    cy.intercept('https://pokeapi.co/api/v2/pokemon', pagina_1);
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
    cy.get('#pagina-actual').should('contain.text', 'Página 2');
  });
});
