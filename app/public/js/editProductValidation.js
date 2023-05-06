let qs = (element)=>{
    return document.querySelector(element);
}

window.addEventListener("load",()=>{
    let $inputName = qs('#inputName'),
    $nameErrors = qs('#nameErrors'),
    $category = qs('#category'),
    $categoryErrors = qs('#categoryErrors'),
    $subcategory = qs('#subcategory'),
    $subcategoryErrors = qs('#subcategoryErrors'),
    $price = qs ('#inputPrice'),
    $priceErrors = qs('#priceErrors'),
    $discount   = qs ('#inputDiscount'),
    $discountErrors = qs ('#discountErrors'),
    $form = qs ("#form")
    regExPrice = /^[0-9]+([,][0-9]+)?$/
    regExInt = /^\d+$/

    

    
        //validaciones
        $inputName.addEventListener("blur",()=>{
        switch (true) {
            case !$inputName.value.trim():
                $nameErrors.innerText = "El campo nombre es obligatorio";
                $inputName.classList.add("is-invalid")
                break;
            default:
                $inputName.classList.remove("is-invalid");
                    $inputName.classList.add("is-valid");
                    $nameErrors.innerText = "";
                    break;
        }
        })

        $category.addEventListener('blur',()=>{
            if (!$category.value.trim()) {
                $categoryErrors.innerHTML = 'Campo requerido';
                $category.classList.add('is-invalid');
            }else {
                $category.classList.remove('is-invalid');
                $category.classList.add('is-valid');
                $categoryErrors.innerHTML = '';
            }   
        })

        $subcategory.addEventListener('blur',()=>{
            if (!$subcategory.value.trim()) {
                $subcategoryErrors.innerHTML = 'Campo requerido';
                $subcategory.classList.add('is-invalid');
            }else {
                $subcategory.classList.remove('is-invalid');
                $subcategory.classList.add('is-valid');
                $subcategoryErrors.innerHTML = '';
            }
        })

        $price.addEventListener('blur', () => {
            switch (true) {
                case !$price.value.trim():
                    $priceErrors.innerText = 'El precio es un campo obligatorio';
                    $price.classList.add('is-invalid')
                    break;
                case regExPrice.test($price.value):
                    $priceErrors.innerText = 'Debe ingresar un precio válido (ej: 200,00)';
                    $price.classList.add('is-invalid')
                    break
                default:
                    $price.classList.remove('is-invalid');
                    $price.classList.add('is-valid');
                    $priceErrors.innerText = ''
                    break;
            }
        })

        $discount.addEventListener('blur', () => {
            switch (true) {
              case !regExInt.test($discount.value):
                $discountErrors.innerText = 'Debe ingresar un descuento válido (ej: 0 - 10 - 20)';
                $discount.classList.add('is-invalid')
                break
              default:
                $discount.classList.remove('is-invalid');
                $discount.classList.add('is-valid');
                $discountErrors.innerText = ''
                break;
            }
          });
          

        // //validar antes de enviar
        // let elementosConErrores = document.querySelectorAll(".is-invalid");
        // let errores = elementosConErrores.length > 0; 

        // if(errores) {
        //     submitErrors.innerText = "Hay errores en el formulario"
        // } else {
        //     $form.submit()
        // }
     





})

