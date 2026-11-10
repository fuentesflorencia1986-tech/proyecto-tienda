export function formatearDinero(precio) {
  return "$" + precio.toLocaleString("es-AR");
}