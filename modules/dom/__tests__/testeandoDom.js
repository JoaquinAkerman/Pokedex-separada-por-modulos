/// <reference types="Jest" />
import { crearPaginador } from '../dom.js';

beforeEach(() => {
  global.fetch = jest.fn();
});

test('prueba el paginador', () => {
  global.fetch.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r({});
        });
        resolve({ json: () => jsonPromise });
      })
  );

  crearPaginador(1);
  expect(a).toBe(1);

  /// acá puedo escribir las pruebas, está mockeada la promesa
});
