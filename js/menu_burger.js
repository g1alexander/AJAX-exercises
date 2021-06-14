const d = document;

export default function menu(selector1, selector2, nav, btn) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(selector1) || e.target.matches(selector2)) {
      nav.classList.toggle("hidden-burger");
      btn.className === "fas fa-bars"
        ? (btn.className = "fas fa-times")
        : (btn.className = "fas fa-bars");
    }
  });
}
