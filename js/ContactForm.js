const d = document;

export default function ContactForm() {
  const $inputs = d.querySelectorAll("#form-contact [required]");

  $inputs.forEach((input) => {
    const $span = d.createElement("span");
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add("form-error", "hidden");
    input.insertAdjacentElement("afterend", $span);
  });

  d.addEventListener("keyup", (e) => {
    if (e.target.matches("#form-contact [required]")) {
      let $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;

      if (pattern && $input.value !== "") {
        let regex = new RegExp(pattern);
        return !regex.exec($input.value)
          ? d.getElementById($input.name).classList.remove("hidden")
          : d.getElementById($input.name).classList.add("hidden");
      }

      if (!pattern) {
        return $input.value === ""
          ? d.getElementById($input.name).classList.remove("hidden")
          : d.getElementById($input.name).classList.add("hidden");
      }
    }
  });

  const formSubmit = async (form) => {
    const $loader = d.getElementById("loader"),
      $submitOk = d.getElementById("submitOk");

    $loader.classList.remove("hidden");
    try {
      const res = await fetch(
        // formsubmit.co
        // "https://formsubmit.co/ajax/alexlds26@gmail.com",
        // php
        "http://localhost/AJAX-exercises/php/send_email.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // aceptar intercambio de datos de servidores distintos
            mode: "cors",
          },
          body: JSON.stringify({
            name: form.nombre.value,
            email: form.correo.value,
            asunto: form.asunto.value,
            message: form.comentarios.value,
          }),
        }
      );
      const json = await res.json();

      $submitOk.classList.remove("hidden");
      $submitOk.textContent = json.message;

      if (!res.ok) throw { status: res.success, statusText: res.message };
    } catch (err) {
      console.error(err);
    }
    $loader.classList.add("hidden");
    setTimeout(() => {
      $submitOk.classList.add("hidden");
      form.reset();
    }, 2000);
  };

  d.addEventListener("submit", (e) => {
    if (e.target.matches("#form-contact")) {
      e.preventDefault();

      formSubmit(e.target);
    }
  });
}
