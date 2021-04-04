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
    crearPaginador(
      calcularCantidadPaginas(respuestaApiEnJson.count, 20),
      paginaActiva
    );
    armarBotonesPokemones(respuestaApiEnJson.results);
    botonAnteriorYSiguiente(respuestaApiEnJson);
    mostrarCantidadDePokemones(respuestaApiEnJson.count);
  } catch (error) {
    return console.error(
      'falló cargar la lista de pokemones, intente nuevamente',
      error
    );
  }
};

const obtenerPropiedadesPokemon = async (urlDelPokemon) => {
  try {
    mostrarYOcultarCargando();
    const respuestaDeApiInfoPokemon = await fetch(urlDelPokemon);
    const respuestaDeApiInfoPokemonEnJson = await respuestaDeApiInfoPokemon.json();
    mostrarPokemonSeleccionado(respuestaDeApiInfoPokemonEnJson);
    mostrarYOcultarCargando();
  } catch (error) {
    return console.error(
      'falló cargar el pokemon seleccionado, intente nuevamente',
      error
    );
  }
};

export { direccionAPI, listarPokemones, obtenerPropiedadesPokemon };
