/** * @jest-environment jsdom */
/* eslint-disable object-curly-newline */
/// <reference types="Jest"/>

import { mostrarPokemonSeleccionado } from '../ui.js';
import fixture from './fixtures/fixture';
import bulbasaur from './fixtures/bulbasaur.json';

test('prueba que se arme correctamente la tarjeta con bulbasaur', () => {
  document.body.innerHTML = fixture;
  mostrarPokemonSeleccionado(bulbasaur);
  const { nombre, id, foto1, peso, altura, tipos, habilidades, movimientos } = bulbasaur;
  const $nombrePokemon = document.querySelector('#nombre');
  const $IDPokemon = document.querySelector('#ID');
  const $imagenPokemon = document.querySelector('#imagen-pokemon');
  const $pesoPokemon = document.querySelector('#peso');
  const $alturaPokemon = document.querySelector('#altura');
  const $tipoPokemon = document.querySelector('#tipo');
  const $habilidadesPokemon = document.querySelector('#habilidades');
  const $movimientosPokemon = document.querySelector('#movimientos');
  expect($nombrePokemon.innerText).toContain(nombre);
  expect($IDPokemon.innerText).toContain(`ID: ${id}`);
  expect($imagenPokemon.src).toContain(foto1);
  expect($pesoPokemon.innerText).toContain(`Peso: ${peso}`);
  expect($alturaPokemon.innerText).toContain(`Altura: ${altura}`);
  expect($tipoPokemon.innerText).toContain(`Tipos:${tipos}`);
  expect($habilidadesPokemon.innerText).toContain(`Habilidades:${habilidades}`);
  expect($movimientosPokemon.innerText).toContain(`Movimientos:${movimientos}`);
});
