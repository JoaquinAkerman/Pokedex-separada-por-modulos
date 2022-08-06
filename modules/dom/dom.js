import { cambiarPagina } from '../../index.js';
import { obtenerPropiedadesPokemon } from '../API/API.js';
import {
  mostrarTipos,
  mostrarHabilidades,
  guardarPokemonEnLocalStorage,
  mostrarFoto,
} from '../funciones/funciones.js';
import Pokemon from '../clases/pokemon.js';

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
    a.id = i;
    a.addEventListener('click', (event) => {
      event.preventDefault();
      manejarBotonesPaginador(i);
    });

    if (i == paginaActiva) {
      a.id = 'pagina-activa';
      a.value = i;
      pagina.classList.add('active');
      mostrarPaginaActual(paginaActiva);
    }
    pagina.appendChild(a);
    $paginador.appendChild(pagina);
  }
};
const mostrarPaginaActual = (numeroDePagina) => {
  document.querySelector(
    '#pagina-actual',
  ).innerHTML = `Página ${numeroDePagina}`;
};
const mostrarPokemonSeleccionado = (infoJsonDelPokemonSeleccionado) => {
  guardarPokemonEnLocalStorage(infoJsonDelPokemonSeleccionado);
  const pokemonSeleccionado = new Pokemon(
    infoJsonDelPokemonSeleccionado.id,
    infoJsonDelPokemonSeleccionado.name,
    infoJsonDelPokemonSeleccionado.sprites.other.dream_world.front_default,
    infoJsonDelPokemonSeleccionado.sprites.front_default,
    infoJsonDelPokemonSeleccionado.abilities,
    infoJsonDelPokemonSeleccionado.types,
    infoJsonDelPokemonSeleccionado.weight,
    infoJsonDelPokemonSeleccionado.height,
  );
  const { id, nombre, foto1, foto2, habilidades, tipos, peso, altura } =
    pokemonSeleccionado;
  const $nombrePokemon = document.querySelector('#nombre');
  const $IDPokemon = document.querySelector('#ID');
  let $tipoPokemon = document.querySelector('#tipo');
  const $pesoPokemon = document.querySelector('#peso');
  const $alturaPokemon = document.querySelector('#altura');
  let $habilidadesPokemon = document.querySelector('#habilidades');
  const $imagenPokemon = document.querySelector('#imagen-pokemon');
  mostrarTipos(tipos, $tipoPokemon);
  $imagenPokemon.src = mostrarFoto(foto1, foto2);
  $nombrePokemon.innerText = `Nombre: ${nombre}`;
  $IDPokemon.innerText = `ID: ${id}`;
  $pesoPokemon.innerText = `Peso: ${peso}`;
  $alturaPokemon.innerText = `Altura: ${altura}`;
  mostrarHabilidades(habilidades, $habilidadesPokemon);
};

const armarBotonesPokemones = (infoPokemon) => {
  const $listaDePokemones = document.querySelector('#botonera-pokemon');
  $listaDePokemones.innerHTML = '';

  infoPokemon.forEach(($pokemon) => {
    const { name, url } = $pokemon;
    const option = document.createElement('button');
    option.value = name;
    option.innerText = name;
    option.id = name;
    option.style = 'margin: 10px';
    option.dataset.url = url;
    option.classList = 'botones btn btn-dark ';
    $listaDePokemones.append(option);
    option.addEventListener('click', () => {
      const nombrePokemonSeleccionado = document.querySelector(
        `#${option.id}`,
      ).value;
      const urlPokemonSeleccionado = document
        .querySelector(`#${nombrePokemonSeleccionado}`)
        .getAttribute('data-url');
      mostrarYOcultarCargando();
      obtenerPropiedadesPokemon(
        urlPokemonSeleccionado,
        nombrePokemonSeleccionado,
      );
      mostrarYOcultarCargando();
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
  crearPaginador,
  armarBotonesPokemones,
  mostrarPokemonSeleccionado,
  botonAnteriorYSiguiente,
};
