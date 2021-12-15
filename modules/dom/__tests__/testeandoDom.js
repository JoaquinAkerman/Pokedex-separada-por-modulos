/// <reference types="Jest" />
import { crearPaginador } from "../dom.js";

beforeEach(() => {
  global.fetch = jest.fn();
});

test("prueba el paginador", () => {
  <h2 id="pagina-actual">Cargando...</h2>;

  <h2 id="cantidad-de-pokemones">Cargando...</h2>;
  global.fetch.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r({});
        });
        resolve({ json: () => jsonPromise });
      })
  );
  const paginaActual = document.querySelector("#pagina-actual");
  const $cantidadDePokemones = document.querySelector("#cantidad-de-pokemones");

  crearPaginador(1, 1);

  expect(paginaActual).toBe(1);
  expect($cantidadDePokemones).toBe(
    "Hay 1 Pokemones, selecciona uno para ver la info"
  );

  /// acá puedo escribir las pruebas, está mockeada la promesa
});
