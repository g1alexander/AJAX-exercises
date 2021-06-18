const d = document,
  $main = d.querySelector("main"),
  $template = d.getElementById("template").content,
  $fragment = d.createDocumentFragment();

const getTvmaze = async (url) => {
  try {
    $main.innerHTML = /*html*/ `<img id="loader" src="/assets/loader.svg"/>`;

    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${url}`),
      json = await res.json();

    if (json.length === 0)
      return ($main.innerHTML = `<p>no hay elementos que coincidan con la busqueda</p>`);

    json.forEach((el) => {
      if (el.show.image !== null) {
        $template
          .querySelector("img")
          .setAttribute("src", el.show.image.medium);
        $template.querySelector("figcaption").innerText = el.show.name;
        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      }
    });
    $main.appendChild($fragment);
    $main.removeChild(d.getElementById("loader"));

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
  } catch (err) {
    let message = err.statusText || "Ocurrio un error";
    $main.innerHTML = `<p>Error ${err.status} --- ${message}</p>`;
  }
};

d.addEventListener("submit", (e) => {
  e.preventDefault();

  let $search = e.target.search.value;
  $search = `${$search.toLowerCase()}.`;

  getTvmaze($search);
});
