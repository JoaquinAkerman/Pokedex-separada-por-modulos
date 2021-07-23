/// <reference types="Jest" />


import { listarPokemones, obtenerPropiedadesPokemon } from '../API';

describe('Prueba listar pokemones con un string vacío', () => {
  it('deberia devolver un alerta de error', () => {
    expect(listarPokemones('')).toReturn(
      console.error(
        'falló cargar la lista de pokemones, intente nuevamente',
        error
      )
    );
  });
});
