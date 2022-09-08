/* eslint-disable no-console */
export default async function defetchPagina(direccionDeLapagina) {
  try {
    const respuestaDeApi = await fetch(direccionDeLapagina);
    const respuestaApiEnJson = await respuestaDeApi.json();
    return respuestaApiEnJson;
  } catch (error) {
    return console.error('falló cargar la pagina, intente nuevamente', error);
  }
}
