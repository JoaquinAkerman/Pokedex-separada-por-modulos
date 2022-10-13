import fetchPagina from '../api/api.js';
import { guardarPaginaEnLocalStorage, buscarEnLocalStorage } from '../storage/storage.js';

export default async function buscarPagina(pagina) {
  if (pagina === undefined) {
    throw new Error('Se necesita una direccion para cargar la pagina');
  }
  try {
    const paginaEnLocalStorage = buscarEnLocalStorage(pagina);
    if (paginaEnLocalStorage === null) {
      const respuestaDeApi = await fetchPagina(pagina);
      guardarPaginaEnLocalStorage(pagina, respuestaDeApi);

      return respuestaDeApi;
    }
    return paginaEnLocalStorage;
  } catch (error) {
    const mensajeError = console.error('falló cargar la pagina, intente nuevamente', error);
    return mensajeError;
  }
}
