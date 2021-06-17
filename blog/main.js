const d = document,
  $main = d.querySelector("main");

fetch("markdown.md")
  .then((res) => (res.ok ? res.text() : Promise.reject(res)))
  .then((html) => {
    $main.innerHTML = new showdown.Converter().makeHtml(html);
  })
  .catch((err) => {
    let message = err.statusText || "Ocurrio un error";
    $main.innerHTML = `${err.status} --- ${message}`;
  });
