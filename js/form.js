const d = document;
function contactForm() {
  // detecta el formulario y los inputs
  const $form = d.querySelector(".form"),
    $inputs = d.querySelectorAll(".form [required]");
  //por cada input hay un span  nota de error
  $inputs.forEach((input) => {
    const $span = d.createElement("span");
    $span.id = input.name;
    //agregarle el texto de title
    $span.textContent = input.title;
    //agregarle la clase de css
    $span.classList.add("contact-form-error", "none");
    //adonde va a estar el mensaje
    input.insertAdjacentElement("afterend", $span);
  });
  // la validacion para mostrar el msj cada vez que vaya escribiendo keyup
  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".form [required]")) {
      let $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;
      if (pattern && $input.value !== "") {
        let regex = new RegExp(pattern);
        return !regex.exec($input.value)
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }
      if (!pattern) {
        return $input.value === ""
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }
    }
  });
  d.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("enviando formulario");
    const $loader = d.querySelector(".contact-form-loader"),
      $response = d.querySelector(".contact-form-response");
    $loader.classList.remove("none");

    fetch("https://formsubmit.co/ajax/pizarropabloandres@hotmail.com", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        $loader.classList.add("none");
        $response.classList.remove("none");
        $response.innerHTML = `<p>${json.message}</p>`;
        $form.reset();
      })
      .catch((err) => {
        console.log(err);
        let message =
          err.statusText || "Ocurrio un error al enviar intenta nuevamente";
        $response.innerHTML = `Error ${err.status} ${message}`;
      })
      .finally(() => {
        setTimeout(() => {
          $response.classList.add("none");
          $response.innerHTML = "";
        }, 3000);
      });
  });
}
d.addEventListener("DOMContentLoaded", contactForm);
