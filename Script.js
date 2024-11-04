function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.name === productName);
    
    if (productIndex >= 0) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(li);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
}

function checkout() {
    localStorage.removeItem('cart'); 
    displayCart(); 

    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';

    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

window.onload = displayCart;