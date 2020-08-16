const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
  cursos.addEventListener('click', comprarCurso);
  carrito.addEventListener('click', eliminarCurso);
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

function comprarCurso(event) {
  event.preventDefault();
  if (event.target.classList.contains('agregar-carrito')) {
    const curso = event.target.parentElement.parentElement;
    leerDatosCurso(curso);
  }
}

function leerDatosCurso(curso) {
  const infoCurso = {
    id: curso.querySelector('a').dataset.id,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    imagen: curso.querySelector('img').src,
  };
  insertarCarrito(infoCurso);
}

function insertarCarrito(curso) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><img src="${curso.imagen}" width="100"></td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
  `;
  listaCursos.appendChild(row);
  guardarCursoLocalStorage(curso);
}

function eliminarCurso(event) {
  event.preventDefault();
  let curso, cursoId;
  if (event.target.classList.contains('borrar-curso')) {
    event.target.parentElement.parentElement.remove();
    curso = event.target.parentElement.parentElement;
    cursoId = curso.querySelector('a').dataset.id;
    eliminarCursoLocalStorage(cursoId);
  }
}

function vaciarCarrito() {
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }
  vaciarLocalStorage();
  return false;
}

function guardarCursoLocalStorage(curso) {
  let cursos;
  cursos = obtenerCursosLocalStorage();
  cursos.push(curso);
  localStorage.setItem('cursos', JSON.stringify(cursos));
}

function obtenerCursosLocalStorage() {
  let cursosLs;
  if (localStorage.getItem('cursos') === null) {
    cursosLs = [];
  } else {
    cursosLs = JSON.parse(localStorage.getItem('cursos'));
  }
  return cursosLs;
}

function leerLocalStorage() {
  let cursosLS;
  cursosLS = obtenerCursosLocalStorage();
  cursosLS.forEach(function (curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${curso.imagen}" width="100"></td>
      <td>${curso.titulo}</td>
      <td>${curso.precio}</td>
      <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
    `;
    listaCursos.appendChild(row);
  });
}

function eliminarCursoLocalStorage(cursoId) {
  let cursos;
  cursos = obtenerCursosLocalStorage();
  cursos.forEach(function (curso, index) {
    if (curso.id === cursoId) {
      cursos.splice(index, 1);
    }
  });
  localStorage.setItem('cursos', JSON.stringify(cursos));
}

function vaciarLocalStorage() {
  localStorage.clear();
}
