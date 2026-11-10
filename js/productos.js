import { productos } from "./datos.js";
import { formatearDinero } from "./helpers.js";
import { agregarAlCarrito } from "./carrito.js";

const contenedor = document.querySelector("#grillaProdutos");
const inputBusqueda = document.querySelector("#inputBusqueda");

export function inicializarProductos() {
  
  function render(listaAgesionar) {
    // Generación de cards obligatoria con .map() y template strings
    contenedor.innerHTML = listaAgesionar.map(p => `
      <div class="card">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p><strong>${formatearDinero(p.precio)}</strong></p>
        <button data-accion="agregar" data-id="${p.id}">Agregar al carrito</button>
      </div>
    `).join("");
  }

  // Delegación de eventos estricta con e.target.closest (Exigencia del profe)
  contenedor.addEventListener("click", (e) => {
    const boton = e.target.closest("[data-accion]");
    if (!boton) return;

    const id = Number(boton.dataset.id);
    const accion = boton.dataset.accion;

    if (accion === "agregar") {
      agregarAlCarrito(id);
    }
  });

  // Buscador simple en tiempo real
  inputBusqueda.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
    render(filtrados);
  });

  // Render inicial
  render(productos);
}