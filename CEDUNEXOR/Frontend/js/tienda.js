function addToCart(product){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.id === product.id);

    if(existing){
        existing.quantity++;
    }else{
        cart.push({
            ...product,
            quantity:1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Producto agregado al carrito");
}