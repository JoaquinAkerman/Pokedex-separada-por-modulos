const guardarPaginaEnLocalStorage = (dataDePaginaEnJson, direccionDePagina) => {
  const dataDePaginaEnString = JSON.stringify(dataDePaginaEnJson);
  localStorage.setItem(direccionDePagina, dataDePaginaEnString);
};

export { guardarPaginaEnLocalStorage };
