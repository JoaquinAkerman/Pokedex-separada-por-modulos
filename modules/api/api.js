async function fetchPokemon(paginaPokemon) {
  try {
    const respuestaApi = await fetch(paginaPokemon);
    const respuestaApiEnJson = await respuestaApi.json();
    return respuestaApiEnJson;
  } catch (error) {
    return console.error('falló cargar la pagina, intente nuevamente', error);
  }
}
export default async function fetchPagina(key) {
  const input = Number(key);
  if (Number.isNaN(input)) { // si el input no es un numero, la funcion intentara buscar un pokemon
    return fetchPokemon(key);
  }

  const offsetSegunPagina = (key - 1) * 20;
  const direccionApi = `https://pokeapi.co/api/v2/pokemon?offset=${offsetSegunPagina}&limit=20`;

  try {
    const respuestaApi = await fetch(direccionApi);
    const respuestaApiEnJson = await respuestaApi.json();
    return respuestaApiEnJson;
  } catch (error) {
    return console.error('falló cargar la pagina, intente nuevamente', error);
  }
}
