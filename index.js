import {products, cupones} from './data.js'

const cart = [];

class ProductCart{
    constructor(obj, qty){
        this.id = obj.id,
        this.name = obj.name,
        this.price = obj.price,
        this.quantity = qty
    }
}

const addProductToCart = (id, quantity=1) =>{
    const product = products.find(p => p.id == id)
    if(!product){
        return "El producto no existe";
    }
    if(product.stock <= quantity){
        return "No hay suficiente stock";
    }

    const productCart = cart.find(p => p.id == id);
    if(productCart){
        productCart.quantity += quantity
    }
    else{
        cart.push((new ProductCart(product, quantity)))
    }

    product.stock -= quantity;
    //Correccion de error en el video puse product.quantity y es product.stock

    return cart;
}


const delProductToCart = (id, qty=1) =>{
    const product = cart.find((p) => p.id == id);
    if(!product){
        return "El producto no existe en el carrito"
    }

    product.quantity -= qty;
    

    if(product.quantity < 1){
        //Reemplazo indexOf() por findIndex() que me devuelve el índice del primer elemento 
        //de un array que cumpla con la función de prueba proporcionada
        const idx = cart.findIndex(p => p.id == id);
        cart.splice(idx,1);


        console.log(`Producto ${product.name} eliminado del carrito`);
    }

    const actualizarStock = products.find((p) => p.id == id);

    if(actualizarStock){
        actualizarStock.stock += qty;
    }

    return cart;
}


const addCupon = (cupon) =>{
    const cuponFound = cupones.find(c => c.name == cupon && !c.apply);
    if(!cuponFound){
        return "El cupon no fue encontrado";
    }

    cuponFound.apply = true;

    cart.forEach((p) => p.price = p.price * 0.85);

    return cart;
}

const precioTotal = () =>{
    const suma = cart.reduce((suma, p) => suma + (p.price * p.quantity), 0);
    return `Total: ${suma}`
}

const searchProduts = (product) =>{
    const productsFounds = products.filter(p => p.name.includes(product));
    if(productsFounds.length == 0){
        return "No existen productos que coincidan con ese nombre en la pagina";
    }

    return productsFounds;
}

const searchByMaxPrice = () =>{
    const productsMaxPrice = products.filter(p => p.price > 100);
    //correccion en el if para que me retorne el mensaje en caso de no haber productos mayores a $100
    if(productsMaxPrice.length == 0){
        return "No hay productos con precios mayores a $100";
    }
    return productsMaxPrice.sort((a,b) => b.price - a.price)
    
    
}

const searchByMinPrice = () =>{
    const productsMinPrice = products.filter(p => p.price <= 100);
    //correccion en el if para que me retorne el mensaje en caso de no haber productos menores o iguales a $100
    if(productsMinPrice.length == 0){
        return "No hay productos con precios menores o iguales a $100";
    }
    return productsMinPrice.sort((a,b) => a.price - b.price)
}



console.table(addProductToCart(1,5));
console.table(addProductToCart(2,4));
console.table(addProductToCart(7,3));
console.table(delProductToCart(7,3));
const cupon = prompt("Ingrese su cupon de descuento").toUpperCase();
console.table(addCupon(cupon));
console.table(precioTotal());
const inputProd = prompt("Ingrese el nombre del producto que desea buscar").toUpperCase();
console.table(searchProduts(inputProd));
console.table(searchByMaxPrice());
console.table(searchByMinPrice());

