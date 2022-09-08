async function fetchPagina(direccionDeLapagina) {
  try {
    const respuestaDeApi = await fetch(direccionDeLapagina);
    const respuestaApiEnJson = await respuestaDeApi.json();
    return respuestaApiEnJson;
  } catch (error) {
    console.error('falló cargar la pagina, intente nuevamente', error);
  }
}

export { fetchPagina };
