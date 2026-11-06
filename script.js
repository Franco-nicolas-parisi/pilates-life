// =========================================
// VISOR DE FOTOS de la galería
// - Clic en una foto: se abre en grande.
// - Se cierra con: clic en la foto o en el fondo, la ×, la tecla Esc,
//   o el botón "atrás" del navegador/celular.
// =========================================

const visor = document.getElementById('visor');
const visorImg = visor.querySelector('.visor-img');
const botonCerrar = visor.querySelector('.visor-cerrar');

// Abrir el visor con la foto que se tocó
function abrirVisor(foto) {
  visorImg.src = foto.src;
  visorImg.alt = foto.alt;
  visor.showModal();
  // Agrega un paso al historial: así el botón "atrás" cierra la foto
  // en vez de salir de la página
  history.pushState({ visor: true }, '');
}

// Cerrar el visor
function cerrarVisor() {
  if (visor.open) {
    visor.close();
  }
}

// Cada foto de la galería abre el visor al hacer clic
document.querySelectorAll('.galeria-item').forEach(function (boton) {
  boton.addEventListener('click', function () {
    abrirVisor(boton.querySelector('img'));
  });
});

// Clic en la foto grande, en el fondo oscuro o en la ×: volver atrás
// (eso dispara 'popstate' de abajo, que cierra el visor)
visor.addEventListener('click', function () {
  history.back();
});
botonCerrar.addEventListener('click', function (evento) {
  evento.stopPropagation(); // evita que cuente como doble clic
  history.back();
});

// La tecla Esc cierra el <dialog> sola; acá sacamos el paso del historial
visor.addEventListener('cancel', function (evento) {
  evento.preventDefault();
  history.back();
});

// Botón "atrás" del navegador o del celular: cierra el visor
window.addEventListener('popstate', cerrarVisor);
// =========================================
// MENÚ HAMBURGUESA (celular)
// - Tocar el botón: abre o cierra el menú.
// - Tocar un link del menú: lo cierra.
// =========================================

const menu = document.querySelector('.menu');
const menuBoton = document.querySelector('.menu-boton');

function cerrarMenu() {
  menu.classList.remove('abierto');
  menuBoton.setAttribute('aria-expanded', 'false');
  menuBoton.setAttribute('aria-label', 'Abrir menú');
}

menuBoton.addEventListener('click', function () {
  const abierto = menu.classList.toggle('abierto');   // agrega o saca la clase
  menuBoton.setAttribute('aria-expanded', abierto);
  menuBoton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
});

document.querySelectorAll('nav a').forEach(function (link) {
  link.addEventListener('click', cerrarMenu);
});