import { guardarPaginaEnLocalStorage, buscarEnLocalStorage } from '../storage';
import bulbasaur from './fixtures/bulbasaur.json';

/** * @jest-environment jsdom */
/// <reference types="Jest"/>
test('Prueba buscar un pokemon de localStorage', () => {
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
  guardarPaginaEnLocalStorage('bulbasaurID', bulbasaur);
  expect(buscarEnLocalStorage('bulbasaurID')).toMatchObject(bulbasaur);
});
