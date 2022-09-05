import { fetchPagina } from '../api/api.js';
import { guardarPaginaEnLocalStorage } from '../storage/storage.js';

const buscarPagina = async (direccionDePagina) => {
  try {
    const paginaEnLocalStorage = localStorage.getItem(direccionDePagina);
    if (paginaEnLocalStorage === null) {
      console.log('se hizo fetch a la api');

      const respuestaDeApi = await fetchPagina(direccionDePagina);
      guardarPaginaEnLocalStorage(respuestaDeApi, direccionDePagina);
      return respuestaDeApi;
    } else {
      console.log('se busco de localStorage');
      return JSON.parse(paginaEnLocalStorage);
    }
  } catch (error) {
    console.error('falló cargar la pagina, intente nuevamente', error);
  }
};

export { buscarPagina };
