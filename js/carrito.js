import { productos } from "./datos.js";
import { formatearDinero } from "./helpers.js";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

const listaCarrito = document.querySelector("#listaCarrito");
const carritoVacio = document.querySelector("#carritoVacio");
const totalEl = document.querySelector("#total");
const contadorEl = document.querySelector("#contadorCarrito");

export function agregarAlCarrito(id) {
  const productoEnCarrito = carrito.find(item => item.id === id);
  const productoOriginal = productos.find(p => p.id === id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++; // Incrementa sin duplicar
  } else {
    carrito.push({ ...productoOriginal, cantidad: 1 });
  }

  guardarLocalStorage();
  renderizarCarrito();
}

export function modificarCantidad(id, operacion) {
  const item = carrito.find(i => i.id === id);
  if (!item) return;

  if (operacion === "+") {
    item.cantidad++;
  } else if (operacion === "-") {
    item.cantidad--;
    if (item.cantidad <= 0) {
      carrito = carrito.filter(i => i.id !== id);
    }
  }

  guardarLocalStorage();
  renderizarCarrito();
}

export function eliminarDelCarrito(id) {
  carrito = carrito.filter(i => i.id !== id);
  guardarLocalStorage();
  renderizarCarrito();
}

export function vaciarCarrito() {
  carrito = [];
  guardarLocalStorage();
  renderizarCarrito();
}

// Delegación de eventos en el carrito (+, -, eliminar)
if (listaCarrito) {
  listaCarrito.addEventListener("click", (e) => {
    const boton = e.target.closest("[data-accion]");
    if (!boton) return;

    const id = Number(boton.dataset.id);
    const accion = boton.dataset.accion;

    if (accion === "sumar") modificarCantidad(id, "+");
    if (accion === "restar") modificarCantidad(id, "-");
    if (accion === "eliminar") eliminarDelCarrito(id);
  });
}

export function renderizarCarrito() {
  if (carrito.length === 0) {
    listaCarrito.innerHTML = "";
    listaCarrito.appendChild(carritoVacio);
    carritoVacio.classList.remove("oculto");
  } else {
    carritoVacio.classList.add("oculto");
    listaCarrito.innerHTML = carrito.map(item => `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; border-bottom:1px solid #ddd; padding-bottom:5px;">
        <span>${item.nombre} - ${formatearDinero(item.precio)} c/u</span>
        <div>
          <button data-accion="restar" data-id="${item.id}">-</button>
          <span style="margin: 0 8px;">${item.cantidad}</span>
          <button data-accion="sumar" data-id="${item.id}">+</button>
          <button data-accion="eliminar" data-id="${item.id}" style="background:#d9534f; margin-left:8px;">🗑️</button>
        </div>
      </div>
    `).join("");
  }

  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  totalEl.textContent = formatearDinero(total);
  contadorEl.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
}