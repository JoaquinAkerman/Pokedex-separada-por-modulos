import buscarPagina from '../servicios/servicios.js';
import {
  armarBotonesPokemones,
  crearPaginador,
  botonAnteriorYSiguiente,
  mostrarCantidadDePokemones,
} from '../ui/ui.js';

function armarPagina(direccionDePagina, paginaActiva = 1) {
  buscarPagina(direccionDePagina).then((resultado) => {
    const cantidadDePaginas = Math.ceil(resultado.count / 20);
    armarBotonesPokemones(resultado.results);
    crearPaginador(cantidadDePaginas, paginaActiva);
    botonAnteriorYSiguiente(resultado);
    mostrarCantidadDePokemones(resultado.count);
  });
}
function inicializar() {
  const paginaInicial = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
  armarPagina(paginaInicial);
}
export { inicializar, armarPagina };
