document.addEventListener("DOMContentLoaded", () => {

    const cartList = document.getElementById("cart-list");
    const emptyCart = document.getElementById("empty-cart");
    const cartContent = document.getElementById("cart-content");

    const cartCount = document.getElementById("cart-count");
    const summaryItems = document.getElementById("summary-items");
    const summaryTotal = document.getElementById("summary-total");
    const remainingPoints = document.getElementById("remaining-points");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // =========================
    // GUARDAR CARRITO
    // =========================
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // =========================
    // RENDER CARRITO
    // =========================
    function renderCart() {

        cartList.innerHTML = "";

        if (cart.length === 0) {

            emptyCart.style.display = "block";
            cartContent.style.display = "none";

            cartCount.textContent = "Tu carrito está vacío";
            summaryItems.textContent = "0";
            summaryTotal.textContent = "0 pts";
            remainingPoints.textContent = "0 pts";

            return;
        }

        emptyCart.style.display = "none";
        cartContent.style.display = "flex";

        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {

            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;

            cartList.innerHTML += `
                <div class="cart-card">

                    <div class="product-row">

                        <div class="product-left">

                            <div class="product-icon">
                                ${item.icon}
                            </div>

                            <div class="product-info">

                                <h3>${item.name}</h3>

                                <p>${item.description}</p>

                                <div class="price">
                                    ⭐ ${item.price} pts
                                </div>

                            </div>

                        </div>

                        <div class="qty-controls">

                            <button onclick="changeQty(${item.id}, -1)">-</button>

                            <span>${item.quantity}</span>

                            <button onclick="changeQty(${item.id}, 1)">+</button>

                            <span class="delete-btn"
                                  onclick="removeItem(${item.id})">
                                🗑
                            </span>

                        </div>

                    </div>

                </div>
            `;
        });

        cartCount.textContent = `${totalItems} artículo(s) en tu carrito`;
        summaryItems.textContent = totalItems;
        summaryTotal.textContent = totalPrice + " pts";

        // puntos del usuario (fallback seguro)
        const usuario = obtenerUsuarioActual();
        const puntosUsuario = usuario?.puntos || 0;

        remainingPoints.textContent = (puntosUsuario - totalPrice) + " pts";
    }

    // =========================
    // CAMBIAR CANTIDAD
    // =========================
    window.changeQty = function (id, value) {

        let item = cart.find(p => p.id === id);

        if (!item) return;

        item.quantity += value;

        if (item.quantity <= 0) {
            cart = cart.filter(p => p.id !== id);
        }

        saveCart();
        renderCart();
    };

    // =========================
    // ELIMINAR ITEM
    // =========================
    window.removeItem = function (id) {

        cart = cart.filter(item => item.id !== id);

        saveCart();
        renderCart();
    };

    // =========================
    // INICIAL
    // =========================
    renderCart();

});