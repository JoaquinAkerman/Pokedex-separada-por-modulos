/** * @jest-environment jsdom */
/// <reference types="Jest"/>
import constructorPokemon from '../pokemon';
import bulbasaur from './fixtrures/bulbasaur.json';

test('prueba que construir pokemon funcione correctamente', () => {
  expect(constructorPokemon(bulbasaur)).toMatchObject({
    id: 1,
    nombre: 'bulbasaur',
    peso: 69,
    altura: 7,
    habilidades: bulbasaur.abilities,
    tipos: bulbasaur.types,
    movimientos: bulbasaur.moves,
  });
});
