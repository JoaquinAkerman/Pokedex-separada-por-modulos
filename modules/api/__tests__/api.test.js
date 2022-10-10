/** * @jest-environment jsdom */

/// <reference types="Jest"/>

import fetchPagina from '../api';
// import pagina1 from './fixtures/pagina1.json';

beforeEach(() => {
  global.fetch = jest.fn();
});

test('prueba fetchPagina con un numero', () => {
  global.fetch.mockImplementationOnce(() => {
    return new Promise((resolve) => {
      const jsonPromise = new Promise((r) => {
        r({});
      });
      resolve({
        json: () => {
          return jsonPromise;
        },
      });
    });
  });

  fetchPagina(5);
  expect(global.fetch).toHaveBeenCalledTimes(1);

  expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=80&limit=20');
});

test('prueba fetchPagina con una pagina de pokemon', () => {
  global.fetch.mockImplementationOnce(() => {
    return new Promise((resolve) => {
      const jsonPromise = new Promise((r) => {
        r({});
      });
      resolve({
        json: () => {
          return jsonPromise;
        },
      });
    });
  });

  fetchPagina('https://pokeapi.co/api/v2/pokemon/1/');
  expect(global.fetch).toHaveBeenCalledTimes(1);

  expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1/');
});
