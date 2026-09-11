let cart = [];

function addToCart(name, price) {
    let item = cart.find(function(product) {
        return product.name === name;
    });

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    showCart();
}

function increaseQuantity(index) {
    cart[index].quantity++;
    showCart();
}

function decreaseQuantity(index) {
    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    showCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    showCart();
}function showCart() {

    let cartBox = document.getElementById("cartBox");
    let totalBox = document.getElementById("total");

    if (!cartBox || !totalBox) {
        return;
    }

    if (cart.length === 0) {
        cartBox.innerHTML = "<p>Your cart is empty.</p>";
        totalBox.innerHTML = "Total: ₹0";
        return;
    }

    let html = "";
    let total = 0;

    cart.forEach(function(item, index) {

        let itemTotal = item.price * item.quantity;
        total = total + itemTotal;

        html += `
        <div>
            <strong>${item.name}</strong><br>
            ₹${item.price} × ${item.quantity}
            = ₹${itemTotal}<br>

            <button onclick="decreaseQuantity(${index})">−</button>
            <button onclick="increaseQuantity(${index})">+</button>
            <button onclick="removeItem(${index})">Remove</button>

            <hr>
        </div>
        `;
    });

    cartBox.innerHTML = html;
    totalBox.innerHTML = "Total: ₹" + total;
}function searchFood() {

    let input = document.getElementById("searchInput");

    if (!input) {
        return;
    }

    let text = input.value.toLowerCase().trim();

    let cards = document.querySelectorAll(".menu-item");
    let categories = document.querySelectorAll(".category");

    cards.forEach(function(card) {

        let title = card.querySelector("h3");

        if (title) {
            let foodName = title.innerText.toLowerCase();

            if (foodName.includes(text)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        }
    });

    categories.forEach(function(category) {

        let next = category.nextElementSibling;
        let found = false;

        while (next && !next.classList.contains("category")) {

            if (
                next.classList.contains("menu-item") &&
                next.style.display !== "none"
            ) {
                found = true;
            }

            next = next.nextElementSibling;
        }

        if (text === "") {
            category.style.display = "block";
        } else {
            category.style.display = found ? "block" : "none";
        }
    });
}function placeOrder() {

    let name = document.getElementById("customerName").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();

    if (cart.length === 0) {
        alert("Please add food to your cart first!");
        return;
    }

    if (name === "" || phone === "" || address === "") {
        alert("Please fill all order details!");
        return;
    }

    let orderMessage = document.getElementById("orderMessage");

    if (orderMessage) {
        orderMessage.innerHTML =
            "🎉 Order placed successfully!<br>" +
            "Thank you, " + name + "!";
    } else {
        alert("🎉 Order placed successfully! Thank you, " + name + "!");
    }
}