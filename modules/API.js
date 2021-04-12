'use strict';

import { calcularCantidadPaginas } from './funciones.js';
import {
  mostrarYOcultarCargando,
  crearPaginador,
  botonAnteriorYSiguiente,
  mostrarPokemonSeleccionado,
  armarBotonesPokemones,
  mostrarCantidadDePokemones,
} from './dom.js';

const direccionAPI = 'https://pokeapi.co/api/v2/pokemon';

const listarPokemones = async (direccionAPI, paginaActiva = 1) => {
  try {
    const respuestaDeApi = await fetch(direccionAPI);
    const respuestaApiEnJson = await respuestaDeApi.json();
    return respuestaApiEnJson;
  } catch (error) {
    return console.error(
      'falló cargar la lista de pokemones, intente nuevamente',
      error
    );
  }
};

const obtenerPropiedadesPokemon = async (urlDelPokemon, nombreDelPokemon) => {
  {
    try {
      mostrarYOcultarCargando();
      const pokemonEnLocalStorage = localStorage.getItem(nombreDelPokemon);
      if (pokemonEnLocalStorage == undefined) {
        const respuestaDeApiInfoPokemon = await fetch(urlDelPokemon);
        const respuestaDeApiInfoPokemonEnJson = await respuestaDeApiInfoPokemon.json();
        mostrarPokemonSeleccionado(respuestaDeApiInfoPokemonEnJson);
        console.log(`se buscó desde la API a ${nombreDelPokemon}`);
        mostrarYOcultarCargando();
      } else {
        mostrarPokemonSeleccionado(JSON.parse(pokemonEnLocalStorage));
        mostrarYOcultarCargando();
        console.log(`se buscó desde localStorage a ${nombreDelPokemon}`);
      }
    } catch (error) {
      return console.error(
        'falló cargar el pokemon seleccionado, intente nuevamente',
        error
      );
    }
  }
};

export { direccionAPI, listarPokemones, obtenerPropiedadesPokemon };
