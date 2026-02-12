import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Menu.css';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Menu Categories
  const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Drinks'];

  // Menu Items Data
  const menuItems = [
    // Starters
    {
      id: 1,
      name: 'Spring Rolls',
      category: 'Starters',
      price: 299,
      description: 'Crispy vegetable rolls served with sweet chili sauce',
      image: '/images/spring-rolls.jpg',
      type: 'veg',
      popular: true
    },
    {
      id: 2,
      name: 'Chicken Wings',
      category: 'Starters',
      price: 399,
      description: 'Spicy buffalo wings with ranch dip',
      image: '/images/chicken-wings.jpg',
      type: 'non-veg',
      popular: true
    },
    {
      id: 3,
      name: 'Paneer Tikka',
      category: 'Starters',
      price: 349,
      description: 'Grilled cottage cheese with aromatic spices',
      image: '/images/paneer-tikka.jpg',
      type: 'veg',
      popular: false
    },
    {
      id: 4,
      name: 'Fish Fingers',
      category: 'Starters',
      price: 449,
      description: 'Crispy fried fish strips with tartar sauce',
      image: '/images/fish-fingers.jpg',
      type: 'non-veg',
      popular: false
    },

    // Main Course
    {
      id: 5,
      name: 'Butter Chicken',
      category: 'Main Course',
      price: 549,
      description: 'Creamy tomato-based curry with tender chicken',
      image: '/images/butter-chicken.jpg',
      type: 'non-veg',
      popular: true
    },
    {
      id: 6,
      name: 'Dal Makhani',
      category: 'Main Course',
      price: 349,
      description: 'Black lentils cooked in butter and cream',
      image: '/images/dal-makhani.jpg',
      type: 'veg',
      popular: true
    },
    {
      id: 7,
      name: 'Grilled Salmon',
      category: 'Main Course',
      price: 799,
      description: 'Fresh salmon with herbs and lemon butter',
      image: '/images/salmon.jpg',
      type: 'non-veg',
      popular: false
    },
    {
      id: 8,
      name: 'Veg Biryani',
      category: 'Main Course',
      price: 399,
      description: 'Aromatic basmati rice with mixed vegetables',
      image: '/images/veg-biryani.jpg',
      type: 'veg',
      popular: true
    },

    // Desserts
    {
      id: 9,
      name: 'Gulab Jamun',
      category: 'Desserts',
      price: 149,
      description: 'Sweet dumplings soaked in sugar syrup',
      image: '/images/gulab-jamun.jpg',
      type: 'veg',
      popular: true
    },
    {
      id: 10,
      name: 'Chocolate Lava Cake',
      category: 'Desserts',
      price: 249,
      description: 'Warm chocolate cake with molten center',
      image: '/images/lava-cake.jpg',
      type: 'veg',
      popular: true
    },
    {
      id: 11,
      name: 'Tiramisu',
      category: 'Desserts',
      price: 299,
      description: 'Italian coffee-flavored dessert',
      image: '/images/tiramisu.jpg',
      type: 'veg',
      popular: false
    },

    // Drinks
    {
      id: 12,
      name: 'Mango Lassi',
      category: 'Drinks',
      price: 129,
      description: 'Traditional yogurt-based mango drink',
      image: '/images/mango-lassi.jpg',
      type: 'veg',
      popular: true
    },
    {
      id: 13,
      name: 'Fresh Lime Soda',
      category: 'Drinks',
      price: 99,
      description: 'Refreshing lime with soda water',
      image: '/images/lime-soda.jpg',
      type: 'veg',
      popular: false
    },
    {
      id: 14,
      name: 'Masala Chai',
      category: 'Drinks',
      price: 79,
      description: 'Spiced Indian tea',
      image: '/images/masala-chai.jpg',
      type: 'veg',
      popular: false
    },
  ];

  // Filter menu items
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Add to cart
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, change) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  // Calculate total
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="menu-page">
      {/* Background Orbs */}
      <div className="page-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>
      {/* Add padding top to account for fixed navbar */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="menu-hero">
          <div className="menu-hero-content">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Menu
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover our delicious selection of dishes
            </motion.p>
          </div>
        </section>

        {/* Search & Filter Section */}
        <div className="menu-controls">
          <div className="container">
            {/* Search Bar */}
            <div className="search-bar">
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Cart Button */}
            <button className="cart-toggle" onClick={() => setShowCart(!showCart)}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="cart-count">{cart.length}</span>
            </button>
          </div>
        </div>

        {/* Menu Items Grid */}
        <section className="menu-items">
          <div className="container">
            <div className="items-grid">
              <AnimatePresence>
                {filteredItems.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="menu-card"
                  >
                    {/* Popular Badge */}
                    {item.popular && (
                      <div className="popular-badge">Popular</div>
                    )}

                    {/* Veg/Non-Veg Label */}
                    <div className={`food-type ${item.type}`}>
                      <div className="type-dot"></div>
                    </div>

                    {/* Item Image */}
                    <div className="item-image">
                      <div className="image-placeholder">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>

                    {/* Item Details */}
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-description">{item.description}</p>

                      <div className="item-footer">
                        <span className="item-price">₹{item.price}</span>
                        <button
                          className="add-to-cart-btn"
                          onClick={() => addToCart(item)}
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredItems.length === 0 && (
              <div className="no-results">
                <p>No items found matching your search.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              className="cart-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
            />
            <motion.div
              className="cart-sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="cart-header">
                <h2>Your Cart</h2>
                <button onClick={() => setShowCart(false)}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="cart-items">
                {cart.length === 0 ? (
                  <div className="empty-cart">
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <p>₹{item.price}</p>
                      </div>
                      <div className="cart-item-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span className="total-amount">₹{totalAmount}</span>
                  </div>
                  <button className="checkout-btn">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;