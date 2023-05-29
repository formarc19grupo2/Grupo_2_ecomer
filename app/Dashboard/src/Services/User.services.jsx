const BASE_PRODUCT_API = "http://localhost:3030/api/products";

export const getProducts = async () => {
    try{
        const response = await fetch(BASE_PRODUCT_API);
        const jsonProduct = await response.json();
        return jsonProduct;
    }catch(error){
        console.log("Error de busqueda");
        return Promise.reject("Error de busqueda")
    }
}

