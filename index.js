import { direccionAPI, listarPokemones } from './modules/API/API.js';
import { calcularCantidadPaginas } from './modules/funciones/funciones.js';
import {
  crearPaginador,
  armarBotonesPokemones,
  botonAnteriorYSiguiente,
  mostrarCantidadDePokemones,
} from './modules/dom/dom.js';

const inicializar = async () => {
  const listadoPokemones = await listarPokemones(direccionAPI);
  crearPaginador(calcularCantidadPaginas(listadoPokemones.count, 20));
  armarBotonesPokemones(listadoPokemones.results);
  botonAnteriorYSiguiente(listadoPokemones);
  mostrarCantidadDePokemones(listadoPokemones.count);
};

const cambiarPagina = async (nuevaDireccionAPI, numeroDePaginaSeleccionada) => {
  const listadoPokemones = await listarPokemones(
    nuevaDireccionAPI,
    numeroDePaginaSeleccionada
  );
  crearPaginador(
    calcularCantidadPaginas(listadoPokemones.count, 20),
    numeroDePaginaSeleccionada
  );
  armarBotonesPokemones(listadoPokemones.results);
  botonAnteriorYSiguiente(listadoPokemones);
  mostrarCantidadDePokemones(listadoPokemones.count);
};
inicializar();
export { cambiarPagina };
