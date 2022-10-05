import buscarPagina from '../servicios/servicios.js';
import { armarListaPokemones, crearPaginador } from '../ui/ui.js';

function armarPagina(paginaActiva) {
  buscarPagina(paginaActiva).then((respuesta) => {
    const cantidadPokemones = respuesta.count;
    const cantidadDePaginas = Math.ceil(cantidadPokemones / 20);
    crearPaginador(cantidadDePaginas, cantidadPokemones, paginaActiva, armarPagina);
    armarListaPokemones(respuesta.results);
  });
}
function inicializar() {
  armarPagina(1);
}
export { inicializar, armarPagina };
