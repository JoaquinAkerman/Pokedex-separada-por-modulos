function guardarPaginaEnLocalStorage(dataDePaginaEnJson, direccionDePagina) {
  const dataDePaginaEnString = JSON.stringify(dataDePaginaEnJson);
  localStorage.setItem(direccionDePagina, dataDePaginaEnString);
}

function buscarEnLocalStorage(direccionPagina) {
  const paginaEnLocalStorage = localStorage.getItem(direccionPagina);
  return paginaEnLocalStorage;
}
export { guardarPaginaEnLocalStorage, buscarEnLocalStorage };
