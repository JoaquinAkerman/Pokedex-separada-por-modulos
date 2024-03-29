/** * @jest-environment jsdom */
/// <reference types="Jest"/>

import { armarListaPokemones, crearPaginador } from '../ui.js';
import lista1Pokemon from './fixtures/lista1Pokemon.js';
import lista5Pokemones from './fixtures/lista5Pokemons';
import fixture from './fixtures/fixture';

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

test('Prueba el paginador con 2 paginas, 40 pokemons, que la pagina activa sea la 1 por default, y que boton anterior se oculte', () => {
  document.body.innerHTML = fixture;
  crearPaginador(2, 40);
  expect(document.querySelector('#paginador').innerHTML).toContain('pagina-activa');
  expect(document.querySelector('#pagina-activa').innerText).toBe(1);
  expect(document.querySelector('#pagina-activa').classList).toContain('page-link');
  expect(document.querySelector('#pagina-actual').innerText).toBe('Página 1');
  expect(document.querySelectorAll('.page-item')).toHaveLength(2);
  expect(document.querySelector('#boton-anterior').classList).toContain('oculto');
  expect(document.querySelector('#cantidad-de-pokemones').innerHTML).toBe(
    'Hay 40 Pokemones, selecciona uno para ver la info',
  );
});

test('Prueba paginador con 3 paginas, 60 pokemons, que la pagina activa sea 3, y que boton siguiente se oculte', () => {
  document.body.innerHTML = fixture;
  crearPaginador(3, 60, 3);
  expect(document.querySelector('#paginador').innerHTML).toContain('pagina-activa');
  expect(document.querySelector('#pagina-activa').innerText).toBe(3);
  expect(document.querySelector('#pagina-activa').classList).toContain('page-link');
  expect(document.querySelector('#pagina-actual').innerText).toBe('Página 3');
  expect(document.querySelectorAll('.page-item')).toHaveLength(3);
  expect(document.querySelector('#boton-siguiente').classList).toContain('oculto');
  expect(document.querySelector('#cantidad-de-pokemones').innerHTML).toBe(
    'Hay 60 Pokemones, selecciona uno para ver la info',
  );
});
