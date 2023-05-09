let qs = (element) => {
    return document.querySelector(element);
  }
  
  window.addEventListener("load", () => {
    let $inputName = qs('#inputName'),
      $nameErrors = qs('#nameErrors'),
      $lastName = qs('input[name="last_name"]'),
      $lastNameErrors = qs('.text-danger[name="last_name"]'),
      $email = qs('input[name="email"]'),
      $emailErrors = qs('.text-danger[name="email"]'),
      $form = qs("form"),
      $submit = qs("button[type='submit']");
  
    //validações
    $inputName.addEventListener("blur", () => {
      if (!$inputName.value.trim()) {
        $nameErrors.innerText = "El campo nombre es obligatorio";
        $inputName.classList.add("is-invalid");
      } else {
        $nameErrors.innerText = "";
        $inputName.classList.remove("is-invalid");
      }
    });
  
    $lastName.addEventListener("blur", () => {
      if (!$lastName.value.trim()) {
        $lastNameErrors.innerText = "El campo apellido es obligatorio";
        $lastName.classList.add("is-invalid");
      } else {
        $lastNameErrors.innerText = "";
        $lastName.classList.remove("is-invalid");
      }
    });
  
    $email.addEventListener("blur", () => {
      if (!$email.value.trim()) {
        $emailErrors.innerText = "El campo email es obligatorio";
        $email.classList.add("is-invalid");
      } else {
        $emailErrors.innerText = "";
        $email.classList.remove("is-invalid");
      }
    });
  
    //validar antes de enviar
    $form.addEventListener("submit", function (event) {
      const invalidInputs = $form.querySelectorAll('.is-invalid');
      if (invalidInputs.length > 0) {
        event.preventDefault();
        alert('Existen errores en el formulario. Por favor, revisa los campos marcados en rojo.');
      }
    });
  });
  