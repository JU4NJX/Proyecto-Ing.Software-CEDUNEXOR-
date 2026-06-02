const cartList = document.getElementById("cart-list");
const emptyCart = document.getElementById("empty-cart");
const cartContent = document.getElementById("cart-content");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart(){

    cartList.innerHTML = "";

    if(cart.length === 0){

        emptyCart.style.display = "block";
        cartContent.style.display = "none";

        document.getElementById("cart-count").textContent =
            "Tu carrito está vacío";

        return;
    }

    emptyCart.style.display = "none";
    cartContent.style.display = "flex";

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item=>{

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

                    <button onclick="changeQty(${item.id},-1)">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQty(${item.id},1)">+</button>

                    <span class="delete-btn"
                    onclick="removeItem(${item.id})">
                    🗑
                    </span>

                </div>

            </div>

        </div>
        `;
    });

    document.getElementById("cart-count").textContent =
        `${totalItems} artículo(s) en tu carrito`;

    document.getElementById("summary-items").textContent =
        totalItems;

    document.getElementById("summary-total").textContent =
        totalPrice + " pts";

    document.getElementById("remaining-points").textContent =
        (2050 - totalPrice) + " pts";
}

function changeQty(id,value){

    let item = cart.find(p => p.id === id);

    item.quantity += value;

    if(item.quantity <= 0){
        cart = cart.filter(p => p.id !== id);
    }

    localStorage.setItem("cart",
    JSON.stringify(cart));

    renderCart();
}

function removeItem(id){

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem("cart",
    JSON.stringify(cart));

    renderCart();
}

renderCart();