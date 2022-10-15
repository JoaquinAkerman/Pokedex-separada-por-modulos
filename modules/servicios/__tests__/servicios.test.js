/** * @jest-environment jsdom */
/// <reference types="Jest"/>

import buscarPagina from '../servicios';
import bulbasaur from './fixtures/bulbasaur.json';

test('buscarPagina con undefined da error', () => {
  expect(buscarPagina(undefined)).rejects.toEqual(
    new Error('Se necesita una direccion para cargar la pagina'),
  );
});

test('Prueba buscar una pagina de localStorage', () => {
  class LocalStorageMock {
    constructor() {
      this.store = {};
    }

    clear() {
      this.store = {};
    }

    getItem(key) {
      return this.store[key] || null;
    }

    setItem(key, value) {
      this.store[key] = String(value);
    }

    removeItem(key) {
      delete this.store[key];
    }
  }

  global.localStorage = new LocalStorageMock();
  localStorage.setItem('paginaBulbasaur', JSON.stringify(bulbasaur));
  expect(buscarPagina('paginaBulbasaur')).resolves.toEqual(bulbasaur);
});

beforeEach(() => {
  global.fetch = jest.fn();
});

test('prueba que se busque la pagina 1 desde la api', () => {
  global.fetch.mockImplementationOnce(() => {
    return new Promise((resolve) => {
      const jsonPromise = new Promise((r) => {
        r([]);
      });
      resolve({
        json: () => {
          return jsonPromise;
        },
      });
    });
  });

  buscarPagina(1);

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
});
