let qs = (elemento) => {
  return document.querySelector(elemento);
};

window.addEventListener("load", () => {
  let $inputName = qs("#name"),
    $nameErrors = qs("#nameErrors"),
    $precio = qs("#precio"),
    $precioErrors = qs("#precioErrors"),
    $descuento = qs("#descuento"),
    $descuentoErrors = qs("#descuentoErrors"),
    $descripcion = qs("descripcion"),
    $descripcionErrors = qs("#descripcionErrors"),
    $form = qs("#form");



  (regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/),
    (regExDNI = /^[0-9]{7,8}$/),
    (regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i),
    (regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/);

    $inputName.addEventListener('blur', () => {
        switch (true) {
            case !$inputName.value.trim():
                $nameErrors.classList.add('is-invalid');
                
                break;
            case !regExAlpha.test($inputName.value):
                $inputName.classList.add('is-invalid');
                break;
        
            default:
                $inputName.classList.remove("is-invalid");
                $inputName.classList.add("is-valid");
                $nameErrors.innerText = '';
                
                break;
        }
    })

    $precio.addEventListener('blur', () => {
        switch (true) {
            case !$iprecio.value.trim():
                $precioErrors.classList.add('is-invalid');
                
                break;
            case !regExAlpha.test($precio.value):
                $inputName.classList.add('is-invalid');
                break;
        
            default:
                $precio.classList.remove("is-invalid");
                $precio.classList.add("is-valid");
                $precioErrors.innerText = '';
                
                break;
        }
    })

    $descuento.addEventListener('blur', () => {
        switch (true) {
            case !$descuento.value.trim():
                $descuentoErrors.classList.add('is-invalid');
                
                break;
            case !regExAlpha.test($descuento.value):
                $descuento.classList.add('is-invalid');
                break;
        
            default:
                $descuento.classList.remove("is-invalid");
                $descuento.classList.add("is-valid");
                $descuentoErrors.innerText = '';
                
                break;
        }
    })

    $descripcion.addEventListener('blur', () => {
        switch (true) {
            case !$descripcion.value.trim():
                $descuentoErrors.classList.add('is-invalid');
                
                break;
            case !regExAlpha.test($descripcion.value):
                $descripcion.classList.add('is-invalid');
                break;
        
            default:
                $descripcion.classList.remove("is-invalid");
                $descripcion.classList.add("is-valid");
                $descripcionErrors.innerText = '';
                
                break;
        }
    })

    $form.addEventListener("submit", (event) => {
        event.preventDefault();
        const FORM_ELEMENTS = event.target.elements;
    
        for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
            const element = FORM_ELEMENTS[index];
            if(element.value === "" && element.type !== "file") {
                element.classList.add("is-invalid")
            }
            /* element.dispatchEvent(new Event("blur")) */
        }
    
        
    
        let elementosConErrores = document.querySelectorAll(".is-invalid");
        let errores = elementosConErrores.length > 0; 
    
        if(errores) {
            submitErrors.innerText = "Hay errores en el formulario"
        } else {
            $form.submit()
        }
     }) 


});






