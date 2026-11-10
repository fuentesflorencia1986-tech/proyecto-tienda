import { vaciarCarrito, renderizarCarrito } from "./carrito.js";

const form = document.querySelector("#formContacto");
const inputNombre = document.querySelector("#inputNombre");
const inputEmail = document.querySelector("#inputEmail");
const inputMensaje = document.querySelector("#inputMensaje");
const contadorMensaje = document.querySelector("#contadorMensaje");
const btnEnviar = document.querySelector("#btnEnviar");
const spinnerEnviar = document.querySelector("#spinnerEnviar");
const textoBtnEnviar = document.querySelector("#textoBtnEnviar");
const mensajeExito = document.querySelector("#mensajeExito");

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

inputMensaje.addEventListener("input", () => {
  contadorMensaje.textContent = `${inputMensaje.value.length} / 300`;
});

function enviarServidor(datos) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Enviado:", datos);
      resolve({ ok: true });
    }, 1500);
  });
}

export function inicializarFormulario() {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valido = true;
    if (inputNombre.value.trim() === "") {
      valido = false;
      inputNombre.classList.add("error-input");
    } else {
      inputNombre.classList.remove("error-input");
    }

    if (!REGEX_EMAIL.test(inputEmail.value.trim())) {
      valido = false;
      inputEmail.classList.add("error-input");
    } else {
      inputEmail.classList.remove("error-input");
    }

    if (!valido) return;

    // Spinner y bloqueo de botón (Clase 8)
    spinnerEnviar.classList.remove("oculto");
    textoBtnEnviar.classList.add("oculto");
    btnEnviar.disabled = true;

    try {
      await enviarServidor({
        nombre: inputNombre.value,
        email: inputEmail.value,
        mensaje: inputMensaje.value
      });

      mensajeExito.classList.remove("oculto");
      form.reset();
      contadorMensaje.textContent = "0 / 300";
      vaciarCarrito();
      renderizarCarrito();

      setTimeout(() => mensajeExito.classList.add("oculto"), 3000);
    } catch (error) {
      alert("Hubo un error al enviar.");
    } finally {
      spinnerEnviar.classList.add("oculto");
      textoBtnEnviar.classList.remove("oculto");
      btnEnviar.disabled = false;
    }
  });
}