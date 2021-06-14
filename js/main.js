import menu from "./menu_burger.js";
import navegation from "./navegation.js";
import upload from "./upload.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  menu("#burger", "i", d.querySelector("nav"), d.querySelector("#burger i"));

  navegation("./views/inicio.html", ".content");
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".menu-action a")) {
    e.preventDefault();
    navegation(e.target.href, ".content");
  }
});

d.addEventListener("change", (e) => {
  if (e.target.matches("#upload")) {
    upload(Array.from(e.target.files));
  }
});
