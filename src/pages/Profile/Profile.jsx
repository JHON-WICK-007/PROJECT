import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders', 'settings'
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data - in real app, this would come from API/database
  const [user, setUser] = useState({
    id: 'USR-001234',
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    avatar: null,
    joinDate: 'January 2024',
    address: '123 Main Street, Bandra West, Mumbai - 400050',
    preferences: {
      dietary: 'Vegetarian',
      spiceLevel: 'Medium',
      favoriteTable: 'T-12',
    },
  });

  const [editForm, setEditForm] = useState({ ...user });

  // Mock order history - in real app, this would come from database
  const [orderHistory] = useState([
    {
      id: 'ORD-2024-001234',
      date: 'Feb 2, 2024',
      status: 'Delivered',
      total: 1510,
      items: ['Butter Chicken (2)', 'Garlic Naan (4)', 'Paneer Tikka (1)', 'Mango Lassi (2)'],
      restaurant: 'Mumbai - Bandra West',
    },
    {
      id: 'ORD-2024-001189',
      date: 'Jan 28, 2024',
      status: 'Delivered',
      total: 890,
      items: ['Biryani Special (2)', 'Raita (2)', 'Gulab Jamun (4)'],
      restaurant: 'Delhi - Connaught Place',
    },
    {
      id: 'ORD-2024-001156',
      date: 'Jan 20, 2024',
      status: 'Delivered',
      total: 1240,
      items: ['Dal Makhani (1)', 'Butter Naan (6)', 'Palak Paneer (1)', 'Lassi (3)'],
      restaurant: 'Mumbai - Bandra West',
    },
    {
      id: 'ORD-2024-001098',
      date: 'Jan 15, 2024',
      status: 'Cancelled',
      total: 560,
      items: ['Chole Bhature (2)', 'Sweet Lassi (2)'],
      restaurant: 'Bangalore - Indiranagar',
    },
  ]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setUser({ ...editForm });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...user });
    setIsEditing(false);
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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      case 'preparing':
        return 'status-preparing';
      default:
        return '';
    }
  };

  const tabs = [
    {
      id: 'profile', label: 'Profile', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'orders', label: 'Order History', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      id: 'settings', label: 'Settings', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
  ];

  return (
    <>
      <div className="profile-container">
        {/* Background Elements */}
        <div className="profile-background">
          <div className="profile-gradient-orb orb-1"></div>
          <div className="profile-gradient-orb orb-2"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="profile-content"
        >
          {/* Profile Header */}
          <motion.div variants={itemVariants} className="profile-header">
            <div className="profile-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.firstName} />
              ) : (
                <span className="avatar-initials">
                  {user.firstName[0]}{user.lastName[0]}
                </span>
              )}
              <button className="avatar-edit-btn">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{user.firstName} {user.lastName}</h1>
              <p className="profile-email">{user.email}</p>
              <p className="member-since">Member since {user.joinDate}</p>
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={itemVariants} className="tab-navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="tab-content"
              >
                <div className="content-card">
                  <div className="card-header">
                    <h2>Personal Information</h2>
                    {!isEditing ? (
                      <button onClick={() => setIsEditing(true)} className="edit-btn">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit
                      </button>
                    ) : (
                      <div className="edit-actions">
                        <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                        <button onClick={handleSave} className="save-btn">Save</button>
                      </div>
                    )}
                  </div>

                  <div className="info-grid">
                    <div className="info-field">
                      <label>First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="firstName"
                          value={editForm.firstName}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      ) : (
                        <p>{user.firstName}</p>
                      )}
                    </div>
                    <div className="info-field">
                      <label>Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="lastName"
                          value={editForm.lastName}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      ) : (
                        <p>{user.lastName}</p>
                      )}
                    </div>
                    <div className="info-field">
                      <label>Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editForm.email}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      ) : (
                        <p>{user.email}</p>
                      )}
                    </div>
                    <div className="info-field">
                      <label>Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={editForm.phone}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      ) : (
                        <p>{user.phone}</p>
                      )}
                    </div>
                    <div className="info-field full-width">
                      <label>Address</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={editForm.address}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      ) : (
                        <p>{user.address}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="content-card">
                  <div className="card-header">
                    <h2>Dining Preferences</h2>
                  </div>

                  <div className="preferences-grid">
                    <div className="preference-item">
                      <span className="preference-icon">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </span>
                      <div>
                        <label>Dietary Preference</label>
                        <p>{user.preferences.dietary}</p>
                      </div>
                    </div>
                    <div className="preference-item">
                      <span className="preference-icon">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        </svg>
                      </span>
                      <div>
                        <label>Spice Level</label>
                        <p>{user.preferences.spiceLevel}</p>
                      </div>
                    </div>
                    <div className="preference-item">
                      <span className="preference-icon">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </span>
                      <div>
                        <label>Favorite Table</label>
                        <p>{user.preferences.favoriteTable}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="tab-content"
              >
                <div className="content-card">
                  <div className="card-header">
                    <h2>Order History</h2>
                    <span className="order-count">{orderHistory.length} orders</span>
                  </div>

                  <div className="orders-list">
                    {orderHistory.map((order) => (
                      <motion.div
                        key={order.id}
                        className="order-card"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="order-main">
                          <div className="order-info">
                            <div className="order-header">
                              <span className="order-id">{order.id}</span>
                              <span className={`order-status ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="order-restaurant">{order.restaurant}</p>
                            <p className="order-items">{order.items.join(' • ')}</p>
                            <p className="order-date">{order.date}</p>
                          </div>
                          <div className="order-total">
                            <span className="total-label">Total</span>
                            <span className="total-amount">₹{order.total}</span>
                          </div>
                        </div>
                        <div className="order-actions">
                          <Link to={`/order-status`} className="action-btn">
                            View Details
                          </Link>
                          <button className="action-btn secondary">Reorder</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="tab-content"
              >
                <div className="content-card">
                  <div className="card-header">
                    <h2>Account Settings</h2>
                  </div>

                  <div className="settings-list">
                    <div className="setting-item">
                      <div className="setting-info">
                        <h3>Email Notifications</h3>
                        <p>Receive updates about your orders and special offers</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <h3>SMS Notifications</h3>
                        <p>Get order status updates via text message</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <h3>Marketing Communications</h3>
                        <p>Receive promotional offers and newsletters</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="content-card danger-zone">
                  <div className="card-header">
                    <h2>Danger Zone</h2>
                  </div>

                  <div className="danger-actions">
                    <div className="danger-item">
                      <div className="danger-info">
                        <h3>Change Password</h3>
                        <p>Update your account password</p>
                      </div>
                      <button className="danger-btn outline">Change</button>
                    </div>

                    <div className="danger-item">
                      <div className="danger-info">
                        <h3>Delete Account</h3>
                        <p>Permanently delete your account and all data</p>
                      </div>
                      <button className="danger-btn">Delete</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back Link */}
          <motion.div variants={itemVariants} className="back-section">
            <Link to="/" className="back-link">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;
