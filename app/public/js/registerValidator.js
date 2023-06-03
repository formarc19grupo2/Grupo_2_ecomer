let qs = (element) => {
  return document.querySelector(element);
};

window.addEventListener("load", () => {
  let $inputName = qs("#inputName"),
    $nameErrors = qs("#nameErrors"),
    $lastName = qs("#last_name"),
    $lastNameErrors = qs("#last_nameErrors"),
    $email = qs("#email"),
    $emailErrors = qs("#emailErrors"),
    $pass1Input = qs("#pass1"),
    $pass2Input = qs("#pass2"),
    $file = qs("#inputImage"),
    $fileErrors = qs("#fileErrors"),
    $imgPreview = qs("#img-preview"),
    $form = qs("#form"),
    $submit = qs("#submitButton");

  // Validaciones para el campo 'Nombre'
  $inputName.addEventListener("blur", () => {
    switch (true) {
      case !$inputName.value.trim():
        $nameErrors.innerText = "El campo nombre es obligatorio";
        $inputName.classList.add("is-invalid");
        break;
      case $inputName.value.trim().length < 2:
        $nameErrors.innerText =
          "El campo nombre debe tener al menos 2 caracteres";
        $inputName.classList.add("is-invalid");
        break;
      default:
        $inputName.classList.remove("is-invalid");
        $inputName.classList.add("is-valid");
        $nameErrors.innerText = "";
        break;
    }
  });

  // Validaciones para el campo 'Apellido'
  $lastName.addEventListener("blur", () => {
    if (!$lastName.value.trim()) {
      $lastNameErrors.innerText = "El campo apellido es obligatorio";
      $lastName.classList.add("is-invalid");
    } else if ($lastName.value.trim().length < 2) {
      $lastNameErrors.innerText =
        "El campo apellido debe tener al menos 2 caracteres";
      $lastName.classList.add("is-invalid");
    } else {
      $lastNameErrors.innerText = "";
      $lastName.classList.remove("is-invalid");
    }
  });

  // Validaciones para el campo 'Email'
  $email.addEventListener("blur", () => {
    const emailValue = $email.value.trim();
    if (!emailValue) {
      $emailErrors.innerText = "El campo email es obligatorio";
      $email.classList.add("is-invalid");
    } else if (!isValidEmail(emailValue)) {
      $emailErrors.innerText = "Por favor, ingresa un email válido";
      $email.classList.add("is-invalid");
    } else {
      $emailErrors.innerText = "";
      $email.classList.remove("is-invalid");
    }
  });

  function isValidEmail(email) {
    // Expressão regular para validar o formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validaciones para el campo 'Contraseña'
  $pass1Input.addEventListener("blur", () => {
    if ($pass1Input.value.length < 8) {
      $pass1Input.classList.add("is-invalid");
      $pass1Input.nextElementSibling.innerText =
        "La contraseña debe tener al menos 8 caracteres";
    } else {
      $pass1Input.classList.remove("is-invalid");
      $pass1Input.nextElementSibling.innerText = "";
    }
  });

  // Validaciones para el campo 'Repetir Contraseña'
  $pass2Input.addEventListener("blur", () => {
    const pass1Value = $pass1Input.value;
    const pass2Value = $pass2Input.value;

    if (pass2Value !== pass1Value) {
      $pass2Input.classList.add("is-invalid");
      $pass2Input.nextElementSibling.innerText = "Las contraseñas no coinciden";
    } else {
      $pass2Input.classList.remove("is-invalid");
      $pass2Input.nextElementSibling.innerText = "";
    }
  });


  // Validar antes de enviar
  $form.addEventListener("submit", function (event) {
    const invalidInputs = $form.querySelectorAll(".is-invalid");
    if (invalidInputs.length > 0) {
      event.preventDefault();
      alert(
        "Existen errores en el formulario. Por favor, revisa los campos marcados en rojo."
      );
    }
  });
});
