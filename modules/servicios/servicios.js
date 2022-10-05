import fetchPagina from '../api/api.js';
import { guardarPaginaEnLocalStorage, buscarEnLocalStorage } from '../storage/storage.js';

export default async function buscarPagina(pagina) {
  try {
    const paginaEnLocalStorage = buscarEnLocalStorage(pagina);
    if (paginaEnLocalStorage === null) {
      const respuestaDeApi = await fetchPagina(pagina);
      guardarPaginaEnLocalStorage(respuestaDeApi, pagina);

      return respuestaDeApi;
    }

    return JSON.parse(paginaEnLocalStorage);
  } catch (error) {
    const mensajeError = console.error('falló cargar la pagina, intente nuevamente', error);
    return mensajeError;
  }
}
