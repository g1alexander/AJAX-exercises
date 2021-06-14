const d = document;

export default function navegation(url, id) {
  fetch(url)
    .then((res) => {
      return res.text();
    })
    .then((body) => {
      d.querySelector(id).innerHTML = body;
    });
}
