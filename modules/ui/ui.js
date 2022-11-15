/* eslint-disable object-curly-newline */
import buscarPagina from '../servicios/servicios.js';
import { construirPokemon } from '../pokemon/pokemon.js';

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
const mostrarPokemonSeleccionado = (pokemon) => {
  mostrarYOcultarCargando();
  const { id, nombre, foto1, foto2, habilidades, tipos, movimientos, peso, altura } = pokemon;
  const $nombrePokemon = document.querySelector('#nombre');
  const $IDPokemon = document.querySelector('#ID');
  const $tipoPokemon = document.querySelector('#tipo');
  const $pesoPokemon = document.querySelector('#peso');
  const $alturaPokemon = document.querySelector('#altura');
  const $habilidadesPokemon = document.querySelector('#habilidades');
  const $imagenPokemon = document.querySelector('#imagen-pokemon');
  const $movimientosPokemon = document.querySelector('#movimientos');
  $imagenPokemon.src = mostrarFoto(foto1, foto2);
  $nombrePokemon.innerText = `Nombre: ${nombre}`;
  $IDPokemon.innerText = `ID: ${id}`;
  $pesoPokemon.innerText = `Peso: ${peso}`;
  $alturaPokemon.innerText = `Altura: ${altura}`;
  $tipoPokemon.innerText = `Tipos:${tipos}`;
  $habilidadesPokemon.innerText = `Habilidades:${habilidades}`;
  $movimientosPokemon.innerText = `Movimientos:${movimientos}`;
  mostrarYOcultarCargando();
};

const armarListaPokemones = (infoPokemones, mostrarPokemon = () => {}) => {
  const $listaDePokemones = document.querySelector('#botonera-pokemon');
  $listaDePokemones.textContent = '';

  infoPokemones.forEach(($pokemon) => {
    const { name, url } = $pokemon;
    const option = document.createElement('button');
    option.value = name;
    option.innerText = name;
    option.id = name;
    option.dataset.url = url;
    option.classList = 'botones btn btn-dark ';
    $listaDePokemones.append(option);
    option.addEventListener('click', (e) => {
      const detalles = buscarPagina(e.target.dataset.url);
      detalles.then((specsPokemon) => {
        const pokemon = construirPokemon(specsPokemon);
        mostrarPokemon(pokemon);
      });
    });
  });
};

const configurarBotonAnteriorYSiguiente = (
  paginaActiva,
  cantidadDePaginas,
  manejarClickEnPaginador = () => {},
) => {
  const botonAnterior = document.querySelector('#boton-anterior');
  const botonSiguiente = document.querySelector('#boton-siguiente');

  if (paginaActiva === 1) {
    botonAnterior.classList = 'oculto';
  } else {
    botonAnterior.classList = 'float-left btn btn-success';
  }

  botonAnterior.onclick = () => {
    const paginaSeleccionada = Number(document.querySelector('.active').firstChild.innerText) - 1;
    document.querySelector('#paginador').innerHTML = '';
    document.querySelector('#botonera-pokemon').innerHTML = '';
    manejarClickEnPaginador(paginaSeleccionada);
  };
  if (paginaActiva === cantidadDePaginas) {
    botonSiguiente.classList = 'oculto';
  } else {
    botonSiguiente.classList = 'float-right btn btn-success';
  }
  botonSiguiente.onclick = () => {
    const paginaSeleccionada = Number(document.querySelector('.active').firstChild.innerText) + 1;
    document.querySelector('#paginador').innerHTML = '';
    document.querySelector('#botonera-pokemon').innerHTML = '';
    manejarClickEnPaginador(paginaSeleccionada);

    document.querySelector('#boton-anterior').classList = 'float-left btn btn-success';
  };
};

const mostrarCantidadDePokemones = (cantidadDePokemones) => {
  const $cantidadDePokemones = document.querySelector('#cantidad-de-pokemones');
  $cantidadDePokemones.textContent = `Hay ${cantidadDePokemones} Pokemones, selecciona uno para ver la info`;
};

const mostrarPaginaActual = (numeroDePagina) => {
  document.querySelector('#pagina-actual').innerText = `Página ${numeroDePagina}`;
};

const crearPaginador = (
  cantidadDePaginas,
  cantidadPokemones,
  paginaActiva = 1,
  manejarClickEnPaginador = () => {},
) => {
  mostrarCantidadDePokemones(cantidadPokemones);
  configurarBotonAnteriorYSiguiente(paginaActiva, cantidadDePaginas, manejarClickEnPaginador);
  const $paginador = document.getElementById('paginador');
  $paginador.innerHTML = '';
  for (let i = 1; i <= cantidadDePaginas; i += 1) {
    const pagina = document.createElement('li');
    pagina.classList.add('page-item');
    const a = document.createElement('a');
    a.classList.add('page-link');
    a.href = Number(i);
    a.innerText = i;
    a.id = i;
    a.addEventListener('click', (event) => {
      event.preventDefault();
      manejarClickEnPaginador(i);
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

export {
  armarListaPokemones,
  mostrarCantidadDePokemones,
  crearPaginador,
  mostrarPokemonSeleccionado,
};
