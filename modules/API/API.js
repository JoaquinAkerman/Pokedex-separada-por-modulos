'use strict';

import {
  mostrarYOcultarCargando,
  mostrarPokemonSeleccionado,
} from '../dom/dom.js';
import { guardarPokemonesDePaginaEnLocalStorage } from '../funciones/funciones.js';

const direccionAPI = 'https://pokeapi.co/api/v2/pokemon';

const listarPokemones = async (direccionAPI, paginaActiva = 1) => {
  try {
    const listadoEnLocalStorage = localStorage.getItem(paginaActiva);
    if (listadoEnLocalStorage === null) {
      const respuestaDeApi = await fetch(direccionAPI);
      const respuestaApiEnJson = await respuestaDeApi.json();
      guardarPokemonesDePaginaEnLocalStorage(respuestaApiEnJson, paginaActiva);
      return respuestaApiEnJson;
    } else {
      return JSON.parse(listadoEnLocalStorage);
    }
  } catch (error) {
    console.error(
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
      if (pokemonEnLocalStorage === null) {
        console.log('se busco pokemon desde api');
        const respuestaDeApiInfoPokemon = await fetch(urlDelPokemon);
        const respuestaDeApiInfoPokemonEnJson =
          await respuestaDeApiInfoPokemon.json();
        mostrarPokemonSeleccionado(respuestaDeApiInfoPokemonEnJson);
        mostrarYOcultarCargando();
      } else {
        mostrarPokemonSeleccionado(JSON.parse(pokemonEnLocalStorage));
        mostrarYOcultarCargando();
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
