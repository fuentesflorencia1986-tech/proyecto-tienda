import { inicializarProductos } from "./productos.js";
import { renderizarCarrito, vaciarCarrito } from "./carrito.js";

document.addEventListener("DOMContentLoaded", () => {
  inicializarProductos();
  renderizarCarrito();

  // Botón para vaciar carrito
  document.querySelector("#btnVaciar").addEventListener("click", () => {
    vaciarCarrito();
  });

  // Botón modo oscuro básico
  const btnDark = document.querySelector("#btn-dark");
  btnDark.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  
});