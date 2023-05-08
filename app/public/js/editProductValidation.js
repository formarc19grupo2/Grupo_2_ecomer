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
    $form = qs ("#form"),
    $submit = qs ("#submit")
    $submitErrors = ("$submitErrors")
    regExPrice = /^[0-9]+([,][0-9]+)?$/  // expresión regular valida un número decimal en formato de punto flotante con coma decimal opcional.
    regExInt = /^\d+$/   //expresión regular para validar numeros enteros

    

    
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
        const form = document.querySelector('form');

        form.addEventListener('submit', function(event) {
          const invalidInputs = form.querySelectorAll('.is-invalid');
          if (invalidInputs.length > 0) {
            event.preventDefault();
            alert('Existen errores en el formulario. Por favor, revisa los campos marcados en rojo.');
          }
        });
     





})

