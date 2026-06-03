document.addEventListener("DOMContentLoaded", () => {

    const usuario = obtenerUsuarioActual();

    const pointsElement = document.getElementById("userPoints");

    if (pointsElement) {
        pointsElement.textContent = (usuario?.puntos || 0) + " puntos";
    }

    updateCartCount();
});

/* =========================
   AGREGAR AL CARRITO
========================= */

function addToCart(product) {

    if (!product || !product.id) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " agregado al carrito ✔");
}

/* =========================
   CONTADOR DEL CARRITO
========================= */

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}