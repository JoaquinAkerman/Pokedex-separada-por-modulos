export default class Pokemon {
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
    habilidades = [],
    tipos = [],
    movimientos = [],
    peso,
    altura,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.foto1 = foto1;
    this.foto2 = foto2;
    this.habilidades = habilidades;
    this.tipos = tipos;
    this.movimientos = movimientos;
    this.peso = peso;
    this.altura = altura;
  }
}

export { Pokemon };
