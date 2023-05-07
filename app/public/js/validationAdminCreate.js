let qs = (elememt) => {
    return document.querySelector(elememt)
};

window.addEventListener('load', () => {
     let $inputName = qs("#name"),
     (regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/),
    (regExDNI = /^[0-9]{7,8}$/),
    (regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i),
    (regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/);

})

$inputName.addEventListener('blur', () => {
    switch (true) {
        case !$inputName.value.trim():
            $nameErrors.innertext = "Nombre obligatiorio";
            $inputName.classList.add("is-invalid")
            break;
        case !regExAlpha.test($inputName.value):
                $nameErrors.innerText = "Nombre invalido";
                $inputName.classList.add("is-invalid");
                break;
    
        default:
            $inputName.classList.remove("is-invalid");
                $inputName.classList.add("is-valid");
                $nameErrors.innerText = "";
            break;
    }
})