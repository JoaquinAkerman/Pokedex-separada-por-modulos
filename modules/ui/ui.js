import { buscarPagina } from '../servicios/servicios.js';
import { Pokemon } from '../clases/pokemon.js';

function inicializar() {
  const paginaInicial = 'https://pokeapi.co/api/v2/pokemon';
  armarPagina(paginaInicial);
}
function armarPagina(direccionDePagina, paginaActiva = 1) {
  buscarPagina(direccionDePagina).then(function (resultado) {
    const cantidadDePaginas = Math.ceil(resultado.count / 20);
    armarBotonesPokemones(resultado.results);
    crearPaginador(cantidadDePaginas, paginaActiva);
    botonAnteriorYSiguiente(resultado);
    mostrarCantidadDePokemones(resultado.count);
  });
}

function mostrarDetallesPoekmon(urlDePokemon) {
  const detalles = buscarPagina(urlDePokemon);
  detalles.then(function (detallesObtenidos) {
    armarTarjetaDePokemon(detallesObtenidos);
  });
}

const crearPaginador = (cantidadDePaginas, paginaActiva = 1) => {
  const $paginador = document.getElementById('paginador');
  $paginador.innerHTML = '';
  for (let i = 1; i <= cantidadDePaginas; i++) {
    const pagina = document.createElement('li');
    pagina.classList.add('page-item');
    const a = document.createElement('a');
    a.classList.add('page-link');
    a.href = Number(i);
    a.innerText = i.toString();
    a.id = i;
    a.addEventListener('click', (event) => {
      event.preventDefault();
      manejarBotonesPaginador(i);
    });

    if (i === paginaActiva) {
      a.id = 'pagina-activa';
      a.value = i;
      pagina.classList.add('active');
      mostrarPaginaActual(paginaActiva);
    }
    pagina.appendChild(a);
    $paginador.appendChild(pagina);
  }
};
const mostrarPaginaActual = (numeroDePagina) => {
  document.querySelector(
    '#pagina-actual',
  ).innerHTML = `Página ${numeroDePagina}`;
};

const armarBotonesPokemones = (infoPokemon) => {
  const $listaDePokemones = document.querySelector('#botonera-pokemon');
  $listaDePokemones.innerHTML = '';

  infoPokemon.forEach(($pokemon) => {
    const { name, url } = $pokemon;
    const option = document.createElement('button');
    option.value = name;
    option.innerText = name;
    option.id = name;
    option.dataset.url = url;
    option.classList = 'botones btn btn-dark ';
    $listaDePokemones.append(option);
    option.addEventListener('click', () => {
      const nombrePokemonSeleccionado = document.querySelector(
        `#${option.id}`,
      ).value;
      const urlPokemonSeleccionado = document
        .querySelector(`#${nombrePokemonSeleccionado}`)
        .getAttribute('data-url');
      mostrarYOcultarCargando();
      mostrarDetallesPoekmon(urlPokemonSeleccionado, nombrePokemonSeleccionado);
      mostrarYOcultarCargando();
    });
  });
};

const armarTarjetaDePokemon = (infoPokemonSeleccionado) => {
  const pokemonSeleccionado = new Pokemon(
    infoPokemonSeleccionado.id,
    infoPokemonSeleccionado.name,
    infoPokemonSeleccionado.sprites.other.dream_world.front_default,
    infoPokemonSeleccionado.sprites.front_default,
    infoPokemonSeleccionado.abilities,
    infoPokemonSeleccionado.types,
    infoPokemonSeleccionado.weight,
    infoPokemonSeleccionado.height,
  );
  const { id, nombre, foto1, foto2, habilidades, tipos, peso, altura } =
    pokemonSeleccionado;
  const $nombrePokemon = document.querySelector('#nombre');
  const $IDPokemon = document.querySelector('#ID');
  const $tipoPokemon = document.querySelector('#tipo');
  const $pesoPokemon = document.querySelector('#peso');
  const $alturaPokemon = document.querySelector('#altura');
  const $habilidadesPokemon = document.querySelector('#habilidades');
  const $imagenPokemon = document.querySelector('#imagen-pokemon');
  $imagenPokemon.src = mostrarFoto(foto1, foto2);
  $nombrePokemon.innerText = `Nombre: ${nombre}`;
  $IDPokemon.innerText = `ID: ${id}`;
  $pesoPokemon.innerText = `Peso: ${peso}`;
  $alturaPokemon.innerText = `Altura: ${altura}`;
  mostrarTipos(tipos, $tipoPokemon);
  mostrarSpecs(habilidades, $habilidadesPokemon);
};

const botonAnteriorYSiguiente = (respuestaJSON) => {
  const botonAnterior = document.querySelector('#boton-anterior');
  const botonSiguiente = document.querySelector('#boton-siguiente');

  if (respuestaJSON.previous === null) {
    botonAnterior.classList = 'oculto';
  } else {
    botonAnterior.classList = 'float-left btn btn-success';
  }

  botonAnterior.onclick = function (e) {
    const nuevaPaginaActiva =
      Number(document.querySelector('.active').firstChild.innerText) - 1;
    document.querySelector('#paginador').innerHTML = '';
    document.querySelector('#botonera-pokemon').innerHTML = '';
    armarPagina(respuestaJSON.previous, nuevaPaginaActiva);
  };
  if (respuestaJSON.next === null) {
    botonSiguiente.classList = 'oculto';
  } else {
    botonSiguiente.classList = 'float-right btn btn-success';
  }
  botonSiguiente.onclick = function (e) {
    const nuevaPaginaActiva =
      Number(document.querySelector('.active').firstChild.innerText) + 1;
    document.querySelector('#paginador').innerHTML = '';
    document.querySelector('#botonera-pokemon').innerHTML = '';
    armarPagina(respuestaJSON.next, nuevaPaginaActiva);

    document.querySelector('#boton-anterior').classList =
      'float-left btn btn-success';
  };
};

const manejarBotonesPaginador = (numeroDeLaPaginaSeleccionada) => {
  const pokemonesPorPagina = 20;
  const offsetSegunPagina =
    (numeroDeLaPaginaSeleccionada - 1) * pokemonesPorPagina;
  const direccionApiSegunPagina = `https://pokeapi.co/api/v2/pokemon?offset=${offsetSegunPagina}&limit=${pokemonesPorPagina}`;
  armarPagina(direccionApiSegunPagina, numeroDeLaPaginaSeleccionada);
};
const mostrarYOcultarCargando = () => {
  const avisoCargando = document.querySelector('#aviso-cargando');
  avisoCargando.classList.toggle('oculto');
};
const mostrarCantidadDePokemones = (cantidadDePokemones) => {
  const $cantidadDePokemones = document.querySelector('#cantidad-de-pokemones');
  $cantidadDePokemones.innerHTML = `Hay ${cantidadDePokemones} Pokemones, selecciona uno para ver la info`;
};

const mostrarTipos = (tipos, $selector) => {
  $selector.innerText = `Tipo:`;
  tipos.forEach((tipos) => {
    $selector.append(` "${tipos.type.name}" `);
  });
};

const mostrarSpecs = (specs, $selector) => {
  $selector.innerText = 'Habilidades: ';
  specs.forEach((specs) => {
    $selector.append(`"${specs.ability.name}" `);
  });
};

const mostrarFoto = (foto1, foto2) => {
  if (foto1 === null && foto2 !== null) {
    return foto2;
  } else if (foto1 !== null) {
    return foto1;
  } else {
    return '/imagenes/faltaImagen.png';
  }
};
export { inicializar };
