/** * @jest-environment jsdom */
/// <reference types="Jest"/>

import { mostrarCantidadDePokemones, armarListaPokemones } from '../ui.js';
import lista1Pokemon from './fixtures/lista1Pokemon.js';
import lista5Pokemones from './fixtures/lista5Pokemons';

test('prueba que muestre correctamente la cantidad de pokemones', () => {
  document.body.innerHTML = '<div id="cantidad-de-pokemones"></div>';
  mostrarCantidadDePokemones(10);
  expect(document.querySelector('#cantidad-de-pokemones').textContent).toContain('10');
});

test('prueba que la lista de pokemons se arme con solo 1 pokemon', () => {
  document.body.innerHTML = '<div id="botonera-pokemon"></div>';
  armarListaPokemones(lista1Pokemon);
  expect(document.querySelectorAll('button')[0].innerText).toContain(lista1Pokemon[0].name);
  expect(document.querySelectorAll('button')).toHaveLength(1);
});

test('prueba que la lista de pokemons se arme con 5 pokemons', () => {
  document.body.innerHTML = '<div id="botonera-pokemon"></div>';
  armarListaPokemones(lista5Pokemones);
  expect(document.querySelectorAll('button')[0].innerText).toContain(lista5Pokemones[0].name);
  expect(document.querySelectorAll('button')[1].innerText).toContain(lista5Pokemones[1].name);
  expect(document.querySelectorAll('button')[2].innerText).toContain(lista5Pokemones[2].name);
  expect(document.querySelectorAll('button')[3].innerText).toContain(lista5Pokemones[3].name);
  expect(document.querySelectorAll('button')[4].innerText).toContain(lista5Pokemones[4].name);
  expect(document.querySelectorAll('button')).toHaveLength(5);
});
