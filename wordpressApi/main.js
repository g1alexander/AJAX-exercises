const d = document,
  w = window,
  $site = d.getElementById("site"),
  $posts = d.getElementById("posts"),
  $loader = d.querySelector(".loader"),
  $template = d.getElementById("post-template").content,
  $fragment = d.createDocumentFragment(),
  DOMAIN = "https://malvestida.com",
  SITE = `${DOMAIN}/wp-json`,
  API_WP = `${SITE}/wp/v2`,
  POSTS = `${API_WP}/posts?_embed`,
  PAGES = `${API_WP}/pages`,
  CATEGORIES = `${API_WP}/categories`;

let page = 1,
  perPage = 5;

const getSite = () => {
  fetch(SITE)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      $site.innerHTML = /*html*/ `
          <h3>Sitio web</h3>
          <h2>
            <a href="${json.url}" target="_blank">${json.name}</a>
          </h2>
          <p>${json.description}</p>
          <p>${json.timezone_string}</p>
        `;
    })
    .catch((err) => {
      console.error(err);
      let message = err.statusText || "Ocurrio un error";
      $site.innerHTML = /*html*/ `<p>status ${err.status} --- ${message}</p>`;
    });
};

const getPosts = () => {
  $loader.style.display = "block";
  fetch(`${POSTS}&page=${page}&per_page=${perPage}`)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      json.forEach((el) => {
        let categories = "",
          tags = "";
        el._embedded["wp:term"][0].forEach(
          (el) => (categories += /*html*/ `<li>${el.name}</li>`)
        );
        el._embedded["wp:term"][1].forEach(
          (el) => (tags += /*html*/ `<li>${el.name}</li>`)
        );

        $template.querySelector(".post-title").innerHTML = el.title.rendered;
        $template.querySelector(".post-image").src =
          el._embedded["wp:featuredmedia"][0].source_url;
        $template.querySelector(".post-image").alt =
          el._embedded["wp:featuredmedia"][0].alt_text;
        $template.querySelector(".post-author").innerHTML = /*html*/ `
          <img src="${el._embedded.author[0].avatar_urls[48]}" alt="${el._embedded.author[0].name}"/>
          <figcaption>${el._embedded.author[0].name}</figcaption>
          `;
        $template.querySelector(".post-date").innerHTML = new Date(
          el.date
        ).toLocaleString();
        $template.querySelector(".post-link").href = el.link;
        $template.querySelector(".post-excerpt").innerHTML =
          el.excerpt.rendered.replace("[&hellip;]", "...");

        $template.querySelector(".post-categories").innerHTML = /*html*/ `
          <p>Categorias</p>
          <ul>${categories}</ul>
        `;
        $template.querySelector(".post-tags").innerHTML = /*html*/ `
          <p>Etiquetas</p>
          <ul>${tags}</ul>
        `;
        $template.querySelector(".post-content > article").innerHTML =
          el.content.rendered;

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
      $posts.appendChild($fragment);
      $loader.style.display = "none";
    })
    .catch((err) => {
      console.error(err);
      let message = err.statusText || "Ocurrio un error";
      $posts.innerHTML = /*html*/ `<p>status ${err.status} --- ${message}</p>`;
      $loader.style.display = "none";
    });
};

d.addEventListener("DOMContentLoaded", (e) => {
  getSite();
  getPosts();
});

w.addEventListener("scroll", (e) => {
  const { scrollTop, clientHeight, scrollHeight } = d.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    page++;
    getPosts();
  }
});
