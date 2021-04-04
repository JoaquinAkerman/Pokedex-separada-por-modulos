import { listarPokemones } from './API.js';

const calcularCantidadPaginas = (totalDePokemones, pokemonesEnPagina) => {
  return Math.ceil(totalDePokemones / pokemonesEnPagina);
};

const mostrarTipos = (arrayDeTipos, $selector) => {
  $selector.innerText = `Tipo:`;
  arrayDeTipos.forEach((tipos) => {
    $selector.append(` "${tipos.type.name}" `);
  });
};

const mostrarHabilidades = (arrayDeHabilidades, $selector) => {
  $selector.innerText = 'Habilidades :';
  console.log(arrayDeHabilidades);
  arrayDeHabilidades.forEach((habilidades) => {
    $selector.append(` "${habilidades.ability.name}" `);
  });
};

export { calcularCantidadPaginas, mostrarTipos, mostrarHabilidades };
