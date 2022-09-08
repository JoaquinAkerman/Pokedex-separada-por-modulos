/* eslint-disable import/extensions */
import fetchPagina from '../api/api.js';
import { guardarPaginaEnLocalStorage } from '../storage/storage.js';

export default async function buscarPagina(direccionDePagina) {
  try {
    const paginaEnLocalStorage = localStorage.getItem(direccionDePagina);
    if (paginaEnLocalStorage === null) {
      const respuestaDeApi = await fetchPagina(direccionDePagina);
      guardarPaginaEnLocalStorage(respuestaDeApi, direccionDePagina);
      return respuestaDeApi;
    } else {
      return JSON.parse(paginaEnLocalStorage);
    }
  } catch (error) {
    console.error('falló cargar la pagina, intente nuevamente', error);
  }
}
