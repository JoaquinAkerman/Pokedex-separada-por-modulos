function guardarPaginaEnLocalStorage(direccionDePagina, dataDePaginaEnJson) {
  const dataDePaginaEnString = JSON.stringify(dataDePaginaEnJson);
  localStorage.setItem(direccionDePagina, dataDePaginaEnString);
}

function buscarEnLocalStorage(direccionPagina) {
  const paginaEnLocalStorage = localStorage.getItem(direccionPagina);
  const respuestaEnJson = JSON.parse(paginaEnLocalStorage);
  return respuestaEnJson;
}
export { guardarPaginaEnLocalStorage, buscarEnLocalStorage };
