import STRIPE_KEYS from "./keys.js";

const d = document,
  $template = d.getElementById("templete-article").content,
  $article = d.getElementById("articles"),
  $fragment = d.createDocumentFragment(),
  options = {
    headers: {
      Authorization: `Bearer ${STRIPE_KEYS.secret}`,
    },
  };

let products, prices;

const moneyFormart = (num) => `$${num.slice(0, -2)}.${num.slice(-2)}`;

Promise.all([
  fetch("https://api.stripe.com/v1/products", options),
  fetch("https://api.stripe.com/v1/prices", options),
])
  .then((responses) => Promise.all(responses.map((res) => res.json())))
  .then((json) => {
    products = json[0].data;
    prices = json[1].data;
    prices.forEach((el) => {
      let productData = products.filter((product) => product.id === el.product);

      $template
        .querySelector("img")
        .setAttribute("src", productData[0].images[0]);
      $template.querySelector("img").setAttribute("alt", productData[0].name);
      $template.querySelector("h3").innerText = productData[0].name;
      $template.querySelector("h5").innerText = `${moneyFormart(
        el.unit_amount_decimal
      )} ${el.currency}`;
      $template.querySelector("button").setAttribute("data-id", el.id);
      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });
    $article.appendChild($fragment);
  })
  .catch((err) => {
    console.error(err);
    let message = err.statusText || "Ocurrio un error";
    $article.innerHTML = `<p>Error ${err.status} --- ${message}</p>`;
  });

d.addEventListener("click", (e) => {
  if (e.target.matches("article button")) {
    let price = e.target.getAttribute("data-id");

    Stripe(STRIPE_KEYS.public)
      .redirectToCheckout({
        lineItems: [{ price, quantity: 1 }],
        mode: "subscription",
        successUrl: "http://127.0.0.1:5500/stripe/layouts/success.html",
        cancelUrl: "http://127.0.0.1:5500/stripe/layouts/cancel.html",
      })
      .then((res) => {
        console.log(res);
        if (res.error) {
          $article.insertAdjacentHTML("afterend", res.error.message);
        }
      });
  }
});
