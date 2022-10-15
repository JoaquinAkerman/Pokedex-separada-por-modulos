/* eslint-disable object-curly-newline */
class Pokemon {
  /**
   * @param {Number} id
   * @param {String} nombre
   * @param {String} foto1
   * @param {String} foto2
   * @param {Array<String>} habilidades
   * @param {Array<String>} tipos
   * @param {Array<Movimiento>} movimientos
   * @param {Number} peso
   * @param {Number} altura
   */
  constructor(
    id,
    nombre,
    foto1,
    foto2,
    peso,
    altura,
    habilidades = [],
    tipos = [],
    movimientos = [],
  ) {
    this.id = id;
    this.nombre = nombre;
    this.foto1 = foto1;
    this.foto2 = foto2;
    this.peso = peso;
    this.altura = altura;
    this.habilidades = habilidades;
    this.tipos = tipos;
    this.movimientos = movimientos;
  }
}

export default function construirPokemon(infoPokemon) {
  const { id, name, sprites, weight, height, abilities, types, moves } = infoPokemon;
  const pokemon = new Pokemon(
    id,
    name,
    sprites.other.dream_world.front_default,
    sprites.front_default,
    weight,
    height,
    abilities,
    types,
    moves,
  );
  return pokemon;
}
export { construirPokemon };
