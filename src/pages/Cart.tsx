import React from "react";

interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  // TODO: Connect to Redux cart state
  const cartItems: CartItem[] = [];

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: string, newQuantity: number) => {
    // TODO: Implement quantity update logic
    console.log("Update quantity for item:", id, "to:", newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    // TODO: Implement remove item logic
    console.log("Remove item:", id);
  };

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    console.log("Proceed to checkout");
    alert("Checkout functionality to be implemented");
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <a href="/books">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-details">
              <h3>{item.title}</h3>
              <p>by {item.author}</p>
              <p className="price">${item.price.toFixed(2)}</p>
            </div>

            <div className="quantity-controls">
              <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
              <input
                type="number"
                id={`quantity-${item.id}`}
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
              />
            </div>

            <div className="item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              className="remove-btn"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total">
          <strong>Total: ${totalAmount.toFixed(2)}</strong>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
