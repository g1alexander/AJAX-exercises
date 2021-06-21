const d = document,
  $estados = d.getElementById("estados"),
  $municipios = d.getElementById("municipios"),
  $colonias = d.getElementById("colonias"),
  $error = d.querySelector(".error");

const getEstados = async () => {
  try {
    const res = await fetch(
        "https://api.copomex.com/query/get_estados?token=5ba57f9f-680e-4c0c-828e-fafebe0ae765"
      ),
      json = await res.json();
    let $estadoTemplate = "";
    json.response.estado.forEach((el) => {
      $estadoTemplate += /*html*/ `<option value="${el}">${el}</option>`;
    });
    $estados.innerHTML = $estadoTemplate;
  } catch (err) {
    console.error(err);
    let message = err.statusText || "ocurrio un error";
    $error.innerHTML = `${err.status}: ${message}`;
  }
};

d.addEventListener("DOMContentLoaded", getEstados());

d.addEventListener("change", async (e) => {
  if (e.target.matches("#estados")) {
    try {
      const res = await fetch(
          `https://api.copomex.com/query/get_municipio_por_estado/${e.target.value}?token=5ba57f9f-680e-4c0c-828e-fafebe0ae765`
        ),
        json = await res.json();
      let $municipiosTemplate = "";
      json.response.municipios.forEach((el) => {
        $municipiosTemplate += /*html*/ `<option value="${el}">${el}</option>`;
      });
      $municipios.innerHTML = $municipiosTemplate;
      $colonias.innerHTML = /*html*/ `<option disabled selected>Selecciona una opción</option>`;
    } catch (err) {
      console.error(err);
      let message = err.statusText || "ocurrio un error";
      $error.innerHTML = `${err.status}: ${message}`;
    }
  }
  if (e.target.matches("#municipios")) {
    try {
      const res = await fetch(
          `https://api.copomex.com/query/get_colonia_por_municipio/${e.target.value}?token=5ba57f9f-680e-4c0c-828e-fafebe0ae765`
        ),
        json = await res.json();
      let $coloniasTemplate = "";
      json.response.colonia.forEach((el) => {
        $coloniasTemplate += /*html*/ `<option value="${el}">${el}</option>`;
      });
      $colonias.innerHTML = $coloniasTemplate;
    } catch (err) {
      console.error(err);
      let message = err.statusText || "ocurrio un error";
      $error.innerHTML = `${err.status}: ${message}`;
    }
  }
});
