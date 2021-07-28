/// <reference types="Jest" />
import { crearPaginador } from '../dom.js';

beforeEach(() => {
  global.fetch = jest.fn();
});

test('prueba el paginador', () => {
  <body id="imagen-de-fondo">
    <h1 style="text-align: center">
      <img src="https://i.ibb.co/4RVZMTD/pokedex.png" alt="Pokedex" />
    </h1>
    <br />
    <h2
      id="cantidad-de-pokemones"
      style="
        color: black;
        background-color: whitesmoke;
        height: fit-content;
        width: fit-content;
      "
    >
      Cargando...
    </h2>

    <div id="botones-anterior-siguiente">
      <button id="boton-anterior" style="margin: 20px" class=" " type="button">
        anterior
      </button>
      <button
        id="boton-siguiente"
        style="margin: 20px"
        class="float-right btn btn-success"
        type="button"
      >
        siguiente
      </button>
    </div>
    <nav aria-label="...">
      <ul id="paginador" class="pagination flex-wrap"></ul>
      <h2
        style="
          color: black;
          background-color: whitesmoke;
          height: fit-content;
          width: fit-content;
        "
        id="pagina-actual"
      >
        Cargando...
      </h2>
    </nav>

    <br />
    <br />

    <div id="botonera-pokemon" class="btn-group-vertical"></div>

    <div id="pokedex" class="card" style="width: 18rem">
      <div id="aviso-cargando" class="oculto">
        Cargando..
      </div>
      <img
        id="imagen-pokemon"
        width="500"
        height="300"
        class="card-img-top"
        src="https://i.ibb.co/ZGX6Tm2/pokemon.png"
        alt="Imagen de pokemon"
      />

      <div id="informacion-del-pokemon" class="card-body">
        <p id="nombre">Nombre</p>
        <p id="ID">ID</p>
        <p id="tipo">Tipo</p>
        <p id="peso">Peso</p>
        <p id="altura">Altura</p>
        <p id="habilidades">Habilidades</p>
      </div>
    </div>
  </body>;

  global.fetch.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r({});
        });
        resolve({ json: () => jsonPromise });
      })
  );
  const paginaActual = document.querySelector('#pagina-actual');
  const $cantidadDePokemones = document.querySelector('#cantidad-de-pokemones');

  crearPaginador(1, 1);

  expect(paginaActual).toBe(1);
  expect($cantidadDePokemones).toBe(
    'Hay 1 Pokemones, selecciona uno para ver la info'
  );

  /// acá puedo escribir las pruebas, está mockeada la promesa
});
