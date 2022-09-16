import buscarPagina from '../servicios/servicios.js';
import {
  armarBotonesPokemones,
  crearPaginador,
  botonAnteriorYSiguiente,
  mostrarCantidadDePokemones,
} from '../ui/ui.js';

function armarPagina(paginaActiva) {
  buscarPagina(paginaActiva).then((resultado) => {
    const cantidadDePaginas = Math.ceil(resultado.count / 20);
    armarBotonesPokemones(resultado.results);
    crearPaginador(cantidadDePaginas, paginaActiva);
    botonAnteriorYSiguiente(resultado);
    mostrarCantidadDePokemones(resultado.count);
  });
}
function inicializar() {
  armarPagina(1);
}
export { inicializar, armarPagina };
