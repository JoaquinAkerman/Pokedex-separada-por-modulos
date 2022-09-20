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
  const pokemon = new Pokemon(
    infoPokemon.id,
    infoPokemon.name,
    infoPokemon.sprites.other.dream_world.front_default,
    infoPokemon.sprites.front_default,
    infoPokemon.weight,
    infoPokemon.height,
    infoPokemon.abilities,
    infoPokemon.types,
    infoPokemon.moves,
  );
  return pokemon;
}
export { construirPokemon };
