/*document.getElementById("btnEliminar").addEventListener("click", () => {
  const n = document.getElementById("name").textContent;

  console.log(n);
}); */

function eliminar(id) {
  console.log(id);
  const URL = "/" + id;
  fetch(URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
