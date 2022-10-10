export default `<div id="general">
<div id="cabecera">
  <h1 style="text-align: center">
    <img src="/imagenes/pokedex.png" alt="Pokedex-titulo" />
  </h1>
  <br />
  <h2
    id="cantidad-de-pokemones"
    style="
      color: black;
      background-color: whitesmoke;
      height: fit-content;
      width: fit-content;
    "
  >
    Cargando...
  </h2>

  <div id="botones-anterior-siguiente">
    <button id="boton-anterior" style="margin: 20px" class="" type="button">anterior</button>
    <button
      id="boton-siguiente"
      style="margin: 20px"
      class="float-right btn btn-success"
      type="button"
    >
      siguiente
    </button>
  </div>
  <nav aria-label="...">
    <ul id="paginador" class="pagination flex-wrap"></ul>
    <h2
      style="
        color: black;
        background-color: whitesmoke;
        height: fit-content;
        width: fit-content;
      "
      id="pagina-actual"
    >
      Cargando...
    </h2>
  </nav>
</div>

<div id="contenido-pokedex">
  <div id="botonera-pokemon" class="btn-group-vertical"></div>

  <div id="pokedex" class="card" style="width: 18rem">
    <div id="aviso-cargando" class="oculto">Cargando..</div>
    <img
      id="imagen-pokemon"
      width="500"
      height="300"
      class="card-img-top"
      src="/imagenes/interrogacionSimbolo.png"
      alt="Imagen de pokemon"
    />

    <div id="informacion-del-pokemon" class="card-body">
      <p id="nombre">Nombre</p>
      <p id="ID">ID</p>
      <p id="peso">Peso</p>
      <p id="altura">Altura</p>
      <p id="tipo">Tipo</p>
      <p id="habilidades">Habilidades</p>
      <p id="movimientos">Movimientos</p>
    </div>
  </div>
</div>
</div>`;
