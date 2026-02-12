import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './OrderStatus.css';

const OrderStatus = () => {
  // Mock order data - in real app, this would come from API/database
  const [order, setOrder] = useState({
    id: 'ORD-2024-001234',
    restaurantName: 'Restaurant Mumbai - Bandra West',
    tableNumber: 'T-12',
    orderTime: '12:45 PM',
    estimatedTime: '25-30 mins',
    status: 'preparing', // 'accepted', 'preparing', 'ready', 'served'
    items: [
      { id: 1, name: 'Butter Chicken', quantity: 2, price: 450 },
      { id: 2, name: 'Garlic Naan', quantity: 4, price: 60 },
      { id: 3, name: 'Paneer Tikka', quantity: 1, price: 320 },
      { id: 4, name: 'Mango Lassi', quantity: 2, price: 120 },
    ],
  });

  const [currentStep, setCurrentStep] = useState(2); // 1: accepted, 2: preparing, 3: ready, 4: served

  // Simulate real-time status updates
  useEffect(() => {
    const statusMap = {
      accepted: 1,
      preparing: 2,
      ready: 3,
      served: 4,
    };
    setCurrentStep(statusMap[order.status]);
  }, [order.status]);

  // Simulate status progression for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setOrder((prev) => {
        const statusFlow = ['accepted', 'preparing', 'ready', 'served'];
        const currentIndex = statusFlow.indexOf(prev.status);
        if (currentIndex < statusFlow.length - 1) {
          return { ...prev, status: statusFlow[currentIndex + 1] };
        }
        return prev;
      });
    }, 8000); // Progress every 8 seconds for demo

    return () => clearInterval(interval);
  }, []);

  const statusSteps = [
    {
      id: 1,
      key: 'accepted',
      title: 'Order Accepted',
      description: 'Restaurant has confirmed your order',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      id: 2,
      key: 'preparing',
      title: 'Preparing',
      description: 'Chef is preparing your delicious meal',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 3,
      key: 'ready',
      title: 'Ready',
      description: 'Your order is ready to be served',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 4,
      key: 'served',
      title: 'Served',
      description: 'Enjoy your meal!',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ];

  const calculateTotal = () => {
    return order.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <div className="order-status-container">
        {/* Background Elements */}
        <div className="order-status-background">
          <div className="status-gradient-orb orb-1"></div>
          <div className="status-gradient-orb orb-2"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="order-status-content"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="order-header">
            <h1 className="order-title">Order Status</h1>
            <p className="order-id">Order ID: {order.id}</p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="order-grid">
            {/* Status Tracker */}
            <motion.div variants={itemVariants} className="status-card">
              <div className="status-card-header">
                <h2>Track Your Order</h2>
                <span className="estimated-time">Est. {order.estimatedTime}</span>
              </div>

              {/* Progress Steps */}
              <div className="status-tracker">
                {statusSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`status-step ${currentStep >= step.id ? 'active' : ''} ${currentStep === step.id ? 'current' : ''
                      }`}
                  >
                    {/* Connector Line */}
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`step-connector ${currentStep > step.id ? 'completed' : ''}`}
                      ></div>
                    )}

                    {/* Step Icon */}
                    <motion.div
                      className="step-icon-wrapper"
                      animate={
                        currentStep === step.id
                          ? {
                            scale: [1, 1.1, 1],
                            boxShadow: [
                              '0 0 0 0 rgba(234, 179, 8, 0.4)',
                              '0 0 0 10px rgba(234, 179, 8, 0)',
                              '0 0 0 0 rgba(234, 179, 8, 0)',
                            ],
                          }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: currentStep === step.id ? Infinity : 0,
                      }}
                    >
                      {step.icon}
                    </motion.div>

                    {/* Step Info */}
                    <div className="step-info">
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-description">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Current Status Badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={order.status}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="current-status-badge"
                >
                  <span className="status-dot"></span>
                  <span className="status-text">
                    {statusSteps.find((s) => s.key === order.status)?.title}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Order Details */}
            <motion.div variants={itemVariants} className="order-details-card">
              <div className="details-header">
                <h2>Order Details</h2>
                <span className="order-time">{order.orderTime}</span>
              </div>

              {/* Restaurant Info */}
              <div className="restaurant-info">
                <div className="restaurant-icon">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="restaurant-details">
                  <span className="restaurant-name">{order.restaurantName}</span>
                  <span className="table-number">Table: {order.tableNumber}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="order-items">
                <h3 className="items-title">Items Ordered</h3>
                <ul className="items-list">
                  {order.items.map((item) => (
                    <motion.li
                      key={item.id}
                      className="order-item"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="item-info">
                        <span className="item-quantity">{item.quantity}x</span>
                        <span className="item-name">{item.name}</span>
                      </div>
                      <span className="item-price">₹{item.price * item.quantity}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Order Total */}
              <div className="order-total">
                <span className="total-label">Total Amount</span>
                <span className="total-amount">₹{calculateTotal()}</span>
              </div>

              {/* Action Buttons */}
              <div className="order-actions">
                <Link to="/menu" className="btn-secondary">
                  Order More
                </Link>
                <button className="btn-primary">Need Help?</button>
              </div>
            </motion.div>
          </div>

          {/* Back Link */}
          <motion.div variants={itemVariants} className="back-section">
            <Link to="/" className="back-link">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default OrderStatus;
