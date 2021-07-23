'use strict';

import {
  mostrarYOcultarCargando,
  mostrarPokemonSeleccionado,
} from '../dom/dom.js';
import { guardarPokemonesDePaginaEnLocalStorage } from '../funciones/funciones.js';

const direccionAPI = 'https://pokeapi.co/api/v2/pokemon';

//'https://pokeapi.co/api/v2/pokemon'

const listarPokemones = async (direccionAPI, paginaActiva = 1) => {
  try {
    console.log('entró en el try');
    const listadoEnLocalStorage = localStorage.getItem(paginaActiva);
    if (listadoEnLocalStorage === null) {
      console.log('entro en el if');
      const respuestaDeApi = await fetch(direccionAPI);
      const respuestaApiEnJson = await respuestaDeApi.json();
      guardarPokemonesDePaginaEnLocalStorage(respuestaApiEnJson, paginaActiva);
      console.log(respuestaApiEnJson);
      return respuestaApiEnJson;
    } else {
      console.log('entro en el else');
      console.log(JSON.parse(listadoEnLocalStorage));
      return JSON.parse(listadoEnLocalStorage);
    }
  } catch (error) {
    console.log('entró en el catch');
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
