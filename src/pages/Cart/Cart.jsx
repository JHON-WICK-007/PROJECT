import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Butter Chicken',
      category: 'Main Course',
      price: 549,
      description: 'Creamy tomato-based curry with tender chicken',
      type: 'non-veg',
      quantity: 2
    },
    {
      id: 2,
      name: 'Paneer Tikka',
      category: 'Starters',
      price: 349,
      description: 'Grilled cottage cheese with aromatic spices',
      type: 'veg',
      quantity: 1
    },
    {
      id: 3,
      name: 'Gulab Jamun',
      category: 'Desserts',
      price: 149,
      description: 'Sweet dumplings soaked in sugar syrup',
      type: 'veg',
      quantity: 3
    },
    {
      id: 4,
      name: 'Mango Lassi',
      category: 'Drinks',
      price: 129,
      description: 'Traditional yogurt-based mango drink',
      type: 'veg',
      quantity: 2
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const promoCodes = {
    'SAVE10': 10,
    'WELCOME20': 20,
    'FEAST15': 15
  };

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
    setShowDeleteConfirm(null);
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setDiscount(0);
    setPromoApplied(false);
  };

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase().trim();
    if (promoCodes[code]) {
      setDiscount(promoCodes[code]);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code!');
      setPromoCode('');
    }
  };

  const removePromoCode = () => {
    setDiscount(0);
    setPromoApplied(false);
    setPromoCode('');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxRate = 5;
  const taxAmount = ((subtotal - discountAmount) * taxRate) / 100;
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const total = subtotal - discountAmount + taxAmount + deliveryFee;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Proceeding to checkout...');
    navigate('/checkout');
  };

  return (
    <div className="cart-page-wrapper">
      {/* Background Orbs */}
      <div className="page-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>
      <div className="cart-page-content">
        <section className="cart-hero">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Shopping Cart
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </motion.p>
        </section>

        <div className="cart-container">
          {cartItems.length === 0 ? (
            <motion.div
              className="empty-cart"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="empty-cart-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2>Your Cart is Empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <Link to="/menu" className="browse-menu-btn">
                Browse Menu
              </Link>
            </motion.div>
          ) : (
            <div className="cart-content-grid">
              <div className="cart-items-section">
                <div className="section-header">
                  <h2>Cart Items ({cartItems.length})</h2>
                  <button className="clear-cart-btn" onClick={clearCart}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear Cart
                  </button>
                </div>

                <div className="cart-items-list">
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="cart-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`item-type-badge ${item.type}`}>
                          <div className="type-dot" />
                        </div>

                        <div className="item-image-placeholder">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>

                        <div className="item-details">
                          <div className="item-info">
                            <h3>{item.name}</h3>
                            <span className="item-category">{item.category}</span>
                            <p className="item-desc">{item.description}</p>
                          </div>

                          <div className="item-actions">
                            <div className="item-price-box">
                              <span className="price-label">Price:</span>
                              <span className="item-price">₹{item.price}</span>
                            </div>

                            <div className="quantity-controls">
                              <button
                                className="qty-btn"
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={item.quantity <= 1}
                              >
                                −
                              </button>
                              <span className="quantity">{item.quantity}</span>
                              <button
                                className="qty-btn"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                +
                              </button>
                            </div>

                            <div className="item-subtotal-box">
                              <span className="subtotal-label">Subtotal:</span>
                              <span className="subtotal-amount">₹{item.price * item.quantity}</span>
                            </div>

                            <button
                              className="delete-btn"
                              onClick={() => setShowDeleteConfirm(item.id)}
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <AnimatePresence>
                          {showDeleteConfirm === item.id && (
                            <motion.div
                              className="delete-confirm"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <div className="confirm-box">
                                <p>Remove this item?</p>
                                <div className="confirm-btns">
                                  <button className="confirm-yes" onClick={() => removeItem(item.id)}>
                                    Yes
                                  </button>
                                  <button className="confirm-no" onClick={() => setShowDeleteConfirm(null)}>
                                    No
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <Link to="/menu" className="continue-shopping">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>

              <div className="order-summary-section">
                <motion.div
                  className="order-summary"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2>Order Summary</h2>

                  <div className="promo-section">
                    <label>Have a promo code?</label>
                    {!promoApplied ? (
                      <div className="promo-input">
                        <input
                          type="text"
                          placeholder="Enter code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        />
                        <button onClick={applyPromoCode}>Apply</button>
                      </div>
                    ) : (
                      <div className="promo-applied">
                        <span className="promo-code">{promoCode}</span>
                        <span className="promo-discount">-{discount}% OFF</span>
                        <button className="remove-promo" onClick={removePromoCode}>
                          ×
                        </button>
                      </div>
                    )}
                    <div className="promo-hint">Try: SAVE10, WELCOME20, FEAST15</div>
                  </div>

                  <div className="price-breakdown">
                    <div className="price-row">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="price-row discount">
                        <span>Discount ({discount}%)</span>
                        <span>-₹{discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="price-row">
                      <span>GST ({taxRate}%)</span>
                      <span>₹{taxAmount.toFixed(2)}</span>
                    </div>

                    <div className="price-row">
                      <span>Delivery Fee</span>
                      {deliveryFee === 0 ? (
                        <span className="free">FREE</span>
                      ) : (
                        <span>₹{deliveryFee.toFixed(2)}</span>
                      )}
                    </div>

                    {subtotal < 500 && (
                      <div className="delivery-note">
                        Add ₹{(500 - subtotal).toFixed(2)} more for free delivery
                      </div>
                    )}

                    <div className="divider" />

                    <div className="price-row total">
                      <span>Total Amount</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button className="checkout-btn" onClick={handleCheckout}>
                    Proceed to Checkout
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  <div className="payment-methods">
                    <p>We Accept</p>
                    <div className="payment-icons">
                      <span>💳</span>
                      <span>💵</span>
                      <span>📱</span>
                    </div>
                  </div>

                  <div className="security-badge">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Secure Checkout</span>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;