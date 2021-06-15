import menu from "./menu_burger.js";
import navegation from "./navegation.js";
import upload from "./upload.js";
import ContactForm from "./ContactForm.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  menu("#burger", "i", d.querySelector("nav"), d.querySelector("#burger i"));

  // navegation("./views/form.html", ".content");

  ContactForm();
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".menu-action a")) {
    e.preventDefault();
    navegation(e.target.href, ".content");
  }
});

// SUBIR ARCHIVO AL SERVIDOR || 2 MANERAS DIFERENTES
d.addEventListener("change", (e) => {
  if (e.target.matches("#upload")) {
    upload(Array.from(e.target.files), d.querySelector("#upload"));
  }
});

d.addEventListener("dragover", (e) => {
  if (e.target.matches("#drop")) {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.add("is-active");
  }
});
d.addEventListener("dragleave", (e) => {
  if (e.target.matches("#drop")) {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove("is-active");
  }
});
d.addEventListener("drop", (e) => {
  if (e.target.matches("#drop")) {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove("is-active");
    upload(Array.from(e.dataTransfer.files), d.querySelector("#upload"));
  }
});
