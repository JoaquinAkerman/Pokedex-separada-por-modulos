import buscarPagina from '../servicios/servicios.js';
import { Pokemon } from '../clases/pokemon.js';

const mostrarTipos = (tipos) => {
  const detallesTipos = [];
  tipos.forEach((tiposPokemon) => {
    detallesTipos.push(` "${tiposPokemon.type.name}"`);
  });
  return `Tipos:${detallesTipos}`;
};

const mostrarHabilidades = (habilidades) => {
  const detallesHabilidades = [];
  habilidades.forEach((habilidadesPokemon) => {
    detallesHabilidades.push(` "${habilidadesPokemon.ability.name}"`);
  });
  return `Habilidades:${detallesHabilidades}`;
};

function mostrarFoto(foto1, foto2) {
  let fotoDePokemon = foto1;
  if (foto1 === null) {
    fotoDePokemon = foto2;
  }
  if (fotoDePokemon === null) {
    fotoDePokemon = '/imagenes/faltaImagen.png';
  }

  return fotoDePokemon;
}

const mostrarYOcultarCargando = () => {
  const avisoCargando = document.querySelector('#aviso-cargando');
  avisoCargando.classList.toggle('oculto');
};
const armarTarjetaDePokemon = (infoPokemonSeleccionado) => {
  mostrarYOcultarCargando();
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
  $tipoPokemon.innerText = mostrarTipos(tipos);
  $habilidadesPokemon.innerText = mostrarHabilidades(habilidades);
  mostrarYOcultarCargando();
};
function mostrarDetallesPoekmon(urlDePokemon) {
  const detalles = buscarPagina(urlDePokemon);
  detalles.then((detallesObtenidos) => {
    armarTarjetaDePokemon(detallesObtenidos);
  });
}

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
      mostrarDetallesPoekmon(urlPokemonSeleccionado, nombrePokemonSeleccionado);
    });
  });
};

const botonAnteriorYSiguiente = (respuestaJSON) => {
  const botonAnterior = document.querySelector('#boton-anterior');
  const botonSiguiente = document.querySelector('#boton-siguiente');

  if (respuestaJSON.previous === null) {
    botonAnterior.classList = 'oculto';
  } else {
    botonAnterior.classList = 'float-left btn btn-success';
  }

  botonAnterior.onclick = () => {
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
  botonSiguiente.onclick = () => {
    const nuevaPaginaActiva =
      Number(document.querySelector('.active').firstChild.innerText) + 1;
    document.querySelector('#paginador').innerHTML = '';
    document.querySelector('#botonera-pokemon').innerHTML = '';
    armarPagina(respuestaJSON.next, nuevaPaginaActiva);

    document.querySelector('#boton-anterior').classList =
      'float-left btn btn-success';
  };
};

const mostrarCantidadDePokemones = (cantidadDePokemones) => {
  const $cantidadDePokemones = document.querySelector('#cantidad-de-pokemones');
  $cantidadDePokemones.innerHTML = `Hay ${cantidadDePokemones} Pokemones, selecciona uno para ver la info`;
};

function armarPagina(direccionDePagina, paginaActiva = 1) {
  buscarPagina(direccionDePagina).then((resultado) => {
    const cantidadDePaginas = Math.ceil(resultado.count / 20);
    armarBotonesPokemones(resultado.results);
    crearPaginador(cantidadDePaginas, paginaActiva);
    botonAnteriorYSiguiente(resultado);
    mostrarCantidadDePokemones(resultado.count);
  });
}
const manejarBotonesPaginador = (numeroDeLaPaginaSeleccionada) => {
  const pokemonesPorPagina = 20;
  const offsetSegunPagina =
    (numeroDeLaPaginaSeleccionada - 1) * pokemonesPorPagina;
  const direccionApiSegunPagina = `https://pokeapi.co/api/v2/pokemon?offset=${offsetSegunPagina}&limit=${pokemonesPorPagina}`;
  armarPagina(direccionApiSegunPagina, numeroDeLaPaginaSeleccionada);
};
const mostrarPaginaActual = (numeroDePagina) => {
  document.querySelector(
    '#pagina-actual',
  ).innerHTML = `Página ${numeroDePagina}`;
};
const crearPaginador = (cantidadDePaginas, paginaActiva = 1) => {
  const $paginador = document.getElementById('paginador');
  $paginador.innerHTML = '';
  for (let i = 1; i <= cantidadDePaginas; i += 1) {
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

export default function inicializar() {
  const paginaInicial = 'https://pokeapi.co/api/v2/pokemon';
  armarPagina(paginaInicial);
}

export { inicializar };
