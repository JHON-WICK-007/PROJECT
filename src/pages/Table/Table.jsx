import { useState } from 'react';
import { motion } from 'framer-motion';
import './Table.css';

const BookTable = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Time slots
  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
    '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM',
    '10:00 PM'
  ];

  // Guest options
  const guestOptions = Array.from({ length: 15 }, (_, i) => i + 1);

  // Occasions
  const occasions = [
    'Birthday',
    'Anniversary',
    'Business Meeting',
    'Date Night',
    'Family Gathering',
    'Celebration',
    'Other'
  ];

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check availability
  const checkAvailability = async () => {
    if (!validateForm()) return;

    setIsChecking(true);
    setIsAvailable(null);

    // Simulate API call
    setTimeout(() => {
      // Random availability (80% chance of being available)
      const available = Math.random() > 0.2;
      setIsAvailable(available);
      setIsChecking(false);
    }, 1500);
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Reset availability when form changes
    if (isAvailable !== null) {
      setIsAvailable(null);
    }
  };

  // Handle booking confirmation
  const handleBooking = () => {
    if (!isAvailable) return;

    // Generate booking ID
    const id = `BK${Date.now().toString().slice(-8)}`;
    setBookingId(id);
    setShowConfirmation(true);

    // Reset form after showing confirmation
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        occasion: '',
        specialRequests: ''
      });
      setIsAvailable(null);
    }, 500);
  };

  // Close confirmation modal
  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  // Get minimum date (today)
  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <>
      <div className="book-table-page">
        {/* Background Orbs */}
        <div className="page-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
        </div>
        {/* Hero Section */}
        <section className="booking-hero">
          <div className="booking-hero-content">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Reserve Your Table
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Book a table for an unforgettable dining experience
            </motion.p>
          </div>
        </section>

        {/* Booking Form Section */}
        <section className="booking-form-section">
          <div className="container">
            <div className="booking-grid">
              {/* Info Card */}
              <motion.div
                className="booking-info"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2>Why Book With Us?</h2>

                <div className="info-item">
                  <div className="info-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3>Guaranteed Seating</h3>
                    <p>Your table will be ready when you arrive</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3>Instant Confirmation</h3>
                    <p>Receive booking confirmation immediately</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3>Special Occasions</h3>
                    <p>We make your celebrations memorable</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3>24/7 Support</h3>
                    <p>Customer service available anytime</p>
                  </div>
                </div>

                <div className="restaurant-hours">
                  <h3>Restaurant Hours</h3>
                  <div className="hours-list">
                    <div className="hours-item">
                      <span>Monday - Friday</span>
                      <span>11:00 AM - 10:30 PM</span>
                    </div>
                    <div className="hours-item">
                      <span>Saturday - Sunday</span>
                      <span>10:00 AM - 11:00 PM</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Booking Form */}
              <motion.div
                className="booking-form-card"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <form className="booking-form">
                  <h2>Book Your Table</h2>

                  {/* Personal Information */}
                  <div className="form-section">
                    <h3>Personal Information</h3>

                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={errors.name ? 'error' : ''}
                      />
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                      </div>

                      <div className="form-group">
                        <label>Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 12345 67890"
                          className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Reservation Details */}
                  <div className="form-section">
                    <h3>Reservation Details</h3>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Date *</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={getMinDate()}
                          className={errors.date ? 'error' : ''}
                        />
                        {errors.date && <span className="error-text">{errors.date}</span>}
                      </div>

                      <div className="form-group">
                        <label>Time *</label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className={errors.time ? 'error' : ''}
                        >
                          <option value="">Select time</option>
                          {timeSlots.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                        {errors.time && <span className="error-text">{errors.time}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Number of Guests *</label>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                        >
                          {guestOptions.map(num => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Occasion (Optional)</label>
                        <select
                          name="occasion"
                          value={formData.occasion}
                          onChange={handleChange}
                        >
                          <option value="">Select occasion</option>
                          {occasions.map(occ => (
                            <option key={occ} value={occ}>{occ}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="form-section">
                    <div className="form-group">
                      <label>Special Requests (Optional)</label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        placeholder="Any special requirements? (e.g., dietary restrictions, seating preferences)"
                        rows="4"
                      />
                    </div>
                  </div>

                  {/* Check Availability Button */}
                  <button
                    type="button"
                    className="check-availability-btn"
                    onClick={checkAvailability}
                    disabled={isChecking}
                  >
                    {isChecking ? (
                      <>
                        <div className="spinner"></div>
                        Checking Availability...
                      </>
                    ) : (
                      'Check Availability'
                    )}
                  </button>

                  {/* Availability Status */}
                  {isAvailable !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`availability-status ${isAvailable ? 'available' : 'unavailable'}`}
                    >
                      {isAvailable ? (
                        <>
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <h4>Table Available!</h4>
                            <p>Your preferred time slot is available. Confirm your booking now.</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <h4>Sorry, Not Available</h4>
                            <p>This time slot is fully booked. Please try a different time.</p>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}

                  {/* Confirm Booking Button */}
                  {isAvailable && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      type="button"
                      className="confirm-booking-btn"
                      onClick={handleBooking}
                    >
                      Confirm Booking
                    </motion.button>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="modal-overlay" onClick={closeConfirmation}>
            <motion.div
              className="confirmation-modal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h2>Booking Confirmed!</h2>
              <p className="modal-subtitle">Your table has been successfully reserved</p>

              <div className="booking-details">
                <div className="detail-item">
                  <span className="detail-label">Booking ID:</span>
                  <span className="detail-value">{bookingId}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{formData.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date & Time:</span>
                  <span className="detail-value">
                    {new Date(formData.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} at {formData.time}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Guests:</span>
                  <span className="detail-value">{formData.guests} {formData.guests === '1' ? 'Guest' : 'Guests'}</span>
                </div>
              </div>

              <p className="confirmation-note">
                A confirmation email has been sent to <strong>{formData.email}</strong>
              </p>

              <button className="close-modal-btn" onClick={closeConfirmation}>
                Done
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookTable;