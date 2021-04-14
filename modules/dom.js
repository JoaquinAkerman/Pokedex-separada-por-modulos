import { cambiarPagina } from '../index.js';
import { obtenerPropiedadesPokemon } from './API.js';
import {
  mostrarTipos,
  mostrarHabilidades,
  guardarPokemonEnLocalStorage,
} from './funciones.js';

const crearPaginador = (cantidadDePaginas, paginaActiva = 1) => {
  const $paginador = document.getElementById('paginador');
  $paginador.innerHTML = '';
  for (let i = 1; i <= cantidadDePaginas; i++) {
    const pagina = document.createElement('li');
    pagina.classList.add('page-item');
    const a = document.createElement('a');
    a.classList.add('page-link');
    a.href = Number(i);
    a.innerText = i.toString();
    a.addEventListener('click', (event) => {
      event.preventDefault();
      manejarBotonesPaginador(i);
    });

    if (i == paginaActiva) {
      pagina.classList.add('active');
      mostrarPaginaActual(paginaActiva);
    }
    pagina.appendChild(a);
    $paginador.appendChild(pagina);
  }
};

const mostrarPaginaActual = (numeroDePagina) => {
  document.querySelector(
    '#pagina-actual'
  ).innerHTML = `Página ${numeroDePagina}`;
};

const mostrarPokemonSeleccionado = (infoJsonDelPokemonSeleccionado) => {
  guardarPokemonEnLocalStorage(infoJsonDelPokemonSeleccionado);
  const $nombrePokemon = document.querySelector('#nombre');
  const $IDPokemon = document.querySelector('#ID');
  let $tipoPokemon = document.querySelector('#tipo');
  const $pesoPokemon = document.querySelector('#peso');
  const $alturaPokemon = document.querySelector('#altura');
  let $habilidadesPokemon = document.querySelector('#habilidades');
  const $imagenPokemon = document.querySelector('#imagen-pokemon');
  $tipoPokemon = mostrarTipos(
    infoJsonDelPokemonSeleccionado.types,
    $tipoPokemon
  );

  if (
    infoJsonDelPokemonSeleccionado.sprites.other.dream_world.front_default ==
      null &&
    infoJsonDelPokemonSeleccionado.sprites.front_default != null
  ) {
    $imagenPokemon.src = infoJsonDelPokemonSeleccionado.sprites.front_default;
  } else if (
    infoJsonDelPokemonSeleccionado.sprites.other.dream_world.front_default !=
    null
  ) {
    $imagenPokemon.src =
      infoJsonDelPokemonSeleccionado.sprites.other.dream_world.front_default;
  } else {
    $imagenPokemon.src = 'http://tinypic.com/images/goodbye.jpg';
  }
  $nombrePokemon.innerText = `Nombre: ${infoJsonDelPokemonSeleccionado.forms[0].name}`;
  $IDPokemon.innerText = `ID: ${infoJsonDelPokemonSeleccionado.id}`;

  $pesoPokemon.innerText = `Peso: ${infoJsonDelPokemonSeleccionado.weight}`;
  $alturaPokemon.innerText = `Altura: ${infoJsonDelPokemonSeleccionado.height}`;

  $habilidadesPokemon = mostrarHabilidades(
    infoJsonDelPokemonSeleccionado.abilities,
    $habilidadesPokemon
  );
};

const armarBotonesPokemones = (infoPokemon) => {
  const $listaDePokemones = document.querySelector('#botonera-pokemon');
  $listaDePokemones.innerHTML = '';

  infoPokemon.forEach(($pokemon) => {
    const option = document.createElement('button');
    option.value = $pokemon.name;
    option.innerText = $pokemon.name;
    option.id = $pokemon.name;
    option.style = 'margin: 10px';
    option.dataset.url = $pokemon.url;
    option.classList = 'botones btn btn-dark ';
    $listaDePokemones.append(option);
    option.addEventListener('click', () => {
      const nombrePokemonSeleccionado = document.querySelector(`#${option.id}`)
        .value;
      const urlPokemonSeleccionado = document
        .querySelector(`#${nombrePokemonSeleccionado}`)
        .getAttribute('data-url');
      obtenerPropiedadesPokemon(
        urlPokemonSeleccionado,
        nombrePokemonSeleccionado
      );
    });
  });
};

const botonAnteriorYSiguiente = (respuestaJSON) => {
  const botonAnterior = document.querySelector('#boton-anterior');
  const botonSiguiente = document.querySelector('#boton-siguiente');

  if (respuestaJSON.previous === null) {
    botonAnterior.classList = 'oculto';
  } else {
    botonAnterior.classList = 'float-left btn btn-success';
  }

  botonAnterior.onclick = function (e) {
    const nuevaPaginaActiva =
      Number(document.querySelector('.active').firstChild.innerText) - 1;
    document.querySelector('#paginador').innerHTML = '';
    document.querySelector('#botonera-pokemon').innerHTML = '';
    cambiarPagina(respuestaJSON.previous, nuevaPaginaActiva);
  };
  if (respuestaJSON.next === null) {
    botonSiguiente.classList = 'oculto';
  } else {
    botonSiguiente.classList = 'float-right btn btn-success';
  }
  botonSiguiente.onclick = function (e) {
    const nuevaPaginaActiva =
      Number(document.querySelector('.active').firstChild.innerText) + 1;
    document.querySelector('#paginador').innerHTML = '';
    document.querySelector('#botonera-pokemon').innerHTML = '';
    cambiarPagina(respuestaJSON.next, nuevaPaginaActiva);

    document.querySelector('#boton-anterior').classList =
      'float-left btn btn-success';
  };
};

const manejarBotonesPaginador = (numeroDeLaPagina) => {
  let offsetSegunPagina = (numeroDeLaPagina - 1) * 20;
  let direccionApiSegunPagina = `https://pokeapi.co/api/v2/pokemon?offset=${offsetSegunPagina}&limit=20`;
  cambiarPagina(direccionApiSegunPagina, numeroDeLaPagina);
};

const mostrarYOcultarCargando = () => {
  const avisoCargando = document.querySelector('#aviso-cargando');
  avisoCargando.classList.toggle('oculto');
};

const mostrarCantidadDePokemones = (cantidadDePokemones) => {
  const $cantidadDePokemones = document.querySelector('#cantidad-de-pokemones');
  $cantidadDePokemones.innerHTML = `Hay ${cantidadDePokemones} Pokemones, selecciona uno para ver la info`;
};

export {
  mostrarCantidadDePokemones,
  mostrarYOcultarCargando,
  crearPaginador,
  armarBotonesPokemones,
  mostrarPokemonSeleccionado,
  botonAnteriorYSiguiente,
};
