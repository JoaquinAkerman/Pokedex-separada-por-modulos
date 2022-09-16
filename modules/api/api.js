async function fetchPokemon(paginaPokemon) {
  try {
    const respuestaApi = await fetch(paginaPokemon);
    const respuestaApiEnJson = await respuestaApi.json();
    return respuestaApiEnJson;
  } catch (error) {
    return console.error('falló cargar la pagina, intente nuevamente', error);
  }
}
export default async function fetchPagina(pagina) {
  if (pagina.length > 2) {
    return fetchPokemon(pagina);
  }

  const offsetSegunPagina = (pagina - 1) * 20;
  const direccionApi = `https://pokeapi.co/api/v2/pokemon?offset=${offsetSegunPagina}&limit=20`;

  try {
    const respuestaApi = await fetch(direccionApi);
    const respuestaApiEnJson = await respuestaApi.json();
    return respuestaApiEnJson;
  } catch (error) {
    return console.error('falló cargar la pagina, intente nuevamente', error);
  }
}
