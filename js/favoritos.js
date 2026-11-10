import { productos } from "./datos.js";

const CLAVE_FAVORITOS = "libreria-favoritos";
let favoritos = JSON.parse(localStorage.getItem(CLAVE_FAVORITOS)) || [];

function guardarFavoritos() {
  localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));
}

export function obtenerFavoritos() {
  return favoritos;
}

export function mostrarToast(mensaje, tipo = "info") {
  const contenedor = document.querySelector("#toasts");
  const toast = document.createElement("div");
  toast.className = `toast toast--${tipo}`;
  toast.textContent = mensaje;
  contenedor.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}

export function alternarFavorito(id, callbackRender) {
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(favId => favId !== id);
  } else {
    favoritos.push(id);
  }
  guardarFavoritos();
  
  const libro = productos.find(p => p.id === id);
  mostrarToast(`Actualizado favoritos: ${libro.nombre}`);
  
  if (callbackRender) callbackRender();
}