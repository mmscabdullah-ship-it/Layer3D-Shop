// Render Cart Page
function renderCart() {
    const cartContent = document.getElementById('cart-content');
    if (!cartContent) return;

    if (cart.cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Start shopping by exploring our featured products</p>
                <a href="index.html#products" class="btn">Continue Shopping</a>
            </div>
        `;
        return;
    }

    const itemsHTML = cart.cart.map(item => `
        <div class="cart-item">
            <div class="item-info" style="flex: 1;">
                <h4>${item.name}</h4>
                <p>${item.type === 'digital' ? '📥 Digital Product' : '📦 Physical Item'}</p>
            </div>
            <div style="text-align: right; margin: 0 2rem;">
                <p style="color: #9ca3af; font-size: 0.9rem;">Qty: ${item.quantity}</p>
            </div>
            <div class="item-price" style="min-width: 100px; text-align: right;">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    const total = cart.getTotal();
    const subtotal = parseFloat(total);
    const tax = (subtotal * 0.1).toFixed(2);
    const shipping = cart.cart.some(item => item.type === 'physical') ? 10 : 0;
    const grandTotal = (subtotal + parseFloat(tax) + shipping).toFixed(2);

    cartContent.innerHTML = `
        <div class="cart-grid">
            <div class="cart-items">
                ${itemsHTML}
            </div>
            <div class="cart-summary">
                <h3 style="margin-bottom: 1.5rem;">Order Summary</h3>
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>$${subtotal}</span>
                </div>
                <div class="summary-row">
                    <span>Tax (10%):</span>
                    <span>$${tax}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping:</span>
                    <span>$${shipping.toFixed(2)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>$${grandTotal}</span>
                </div>
                <button class="btn checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
                <a href="index.html#products" class="btn" style="display: block; text-align: center; background: #6366f1; margin-top: 1rem;">Continue Shopping</a>
            </div>
        </div>
    `;
}

// Remove from Cart
function removeFromCart(productId) {
    cart.removeProduct(productId);
    renderCart();
}

// Proceed to Checkout
function proceedToCheckout() {
    alert('🎉 Thanks for shopping!\n\nCheckout integration coming soon.\nDemo Cart Items: ' + cart.getCount());
}

// Update cart count in header
cart.updateCartCount();

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    cart.updateCartCount();
});
