/** * @jest-environment jsdom */
/* eslint-disable no-undef */
/// <reference types="Jest"/>

import { mostrarCantidadDePokemones, armarListaPokemones } from '../ui.js';
import lista1Pokemon from './fixtures/lista1Pokemon.js';
import lista10Pokemones from './fixtures/lista10Pokemons';

test('prueba que muestre correctamente la cantidad de pokemones', () => {
  document.body.innerHTML = '<div id="cantidad-de-pokemones"></div>';
  mostrarCantidadDePokemones(10);
  expect(document.querySelector('#cantidad-de-pokemones').textContent).toContain('10');
});

test('prueba que la lista de pokemons se arme con solo 1 pokemon', () => {
  document.body.innerHTML = '<div id="botonera-pokemon"></div>';
  armarListaPokemones(lista1Pokemon);
  console.log(bulbasaur);
  expect(document.querySelectorAll('button')).toContain(bulbasaur);
  expect(document.querySelectorAll('button')).toHaveLength(1);
});

test('prueba que la lista de pokemons se arme con 10 pokemons', () => {
  document.body.innerHTML = '<div id="botonera-pokemon"></div>';
  armarListaPokemones(lista10Pokemones);
  expect(document.querySelectorAll('button')).toContain(
    bulbasaur,
    ivysaur,
    venusaur,
    charmander,
    charmeleon,
    charizard,
    squirtle,
    wartortle,
    blastoise,
    caterpie,
  );
  expect(document.querySelectorAll('button')).toHaveLength(10);
});
