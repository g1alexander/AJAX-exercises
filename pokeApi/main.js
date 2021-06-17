const d = document,
  $links = d.querySelector("nav"),
  $main = d.querySelector("main"),
  pokeUrl = "https://pokeapi.co/api/v2/pokemon/";

const pokeApi = async (url) => {
  try {
    $main.innerHTML = /*html*/ `<img src="/assets/loader.svg"/>`;

    const res = await fetch(url),
      json = await res.json();

    let $template = "",
      $right = "",
      $left = "";

    for (let i = 0; i < json.results.length; i++) {
      try {
        const res = await fetch(json.results[i].url),
          pokemon = await res.json();

        $template += /*html*/ `<figure><img src="${pokemon.sprites.front_default}"/><figcaption> ${json.results[i].name} <figcaption/> </figure>`;

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
      } catch (err) {
        let message = err.statusText || "Ocurrio un error";
        $template += `<p>Error ${err.status} --- ${message}</p>`;
      }
    }

    $left = json.previous ? /*html*/ `<a href="${json.previous}">⏮️</a>` : "";
    $right = json.next ? /*html*/ `<a href="${json.next}">⏭️</a>` : "";

    $main.innerHTML = $template;
    $links.innerHTML = $left + " " + $right;

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
  } catch (err) {
    let message = err.statusText || "Ocurrio un error";
    $main.innerHTML = `<p>Error ${err.status} --- ${message}</p>`;
  }
};

d.addEventListener("DOMContentLoad", pokeApi(pokeUrl));

d.addEventListener("click", (e) => {
  if (e.target.matches("nav a")) {
    e.preventDefault();
    pokeApi(e.target.getAttribute("href"));
  }
});
