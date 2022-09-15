import fetchPagina from '../api/api.js';
import { guardarPaginaEnLocalStorage, buscarEnLocalStorage } from '../storage/storage.js';

export default async function buscarPagina(direccionDePagina) {
  try {
    const paginaEnLocalStorage = buscarEnLocalStorage(direccionDePagina);
    if (paginaEnLocalStorage === null) {
      const respuestaDeApi = await fetchPagina(direccionDePagina);
      guardarPaginaEnLocalStorage(respuestaDeApi, direccionDePagina);
      return respuestaDeApi;
    }
    return JSON.parse(paginaEnLocalStorage);
  } catch (error) {
    const mensajeError = console.error('falló cargar la pagina, intente nuevamente', error);
    return mensajeError;
  }
}
