import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "../../components/Footer";
import "./Home.css";

const Home = () => {
  const [branches, setBranches] = useState([]);
  const [featuredDishes, setFeaturedDishes] = useState([]);
  const [offers, setOffers] = useState([]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 125]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  useEffect(() => {
    setBranches([
      {
        id: 1,
        city: "Mumbai",
        address: "Bandra West",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
      },
      {
        id: 2,
        city: "Delhi",
        address: "Connaught Place",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
      },
      {
        id: 3,
        city: "Bangalore",
        address: "Indiranagar",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
      },
    ]);

    setFeaturedDishes([
      {
        id: 1,
        name: "Butter Chicken",
        price: "₹450",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=400&fit=crop",
      },
      {
        id: 2,
        name: "Paneer Tikka",
        price: "₹320",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&h=400&fit=crop",
      },
      {
        id: 3,
        name: "Biryani Special",
        price: "₹380",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop",
      },
    ]);

    setOffers([
      "20% off on orders above ₹1000",
      "Free dessert with family meals",
      "Happy hours 4-6 PM daily"
    ]);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <motion.section
          style={{ y: heroY }}
          className="hero-section"
        >
          <div className="video-container">
            {!isVideoLoaded && (
              <div className="video-loading" />
            )}
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={() => setIsVideoLoaded(true)}
            >
              <source src="/videos/restaurant.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="hero-overlay" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="hero-content"
          >
            <motion.h1 variants={fadeInUp}>
              Experience Dining, Redefined
            </motion.h1>

            <motion.p variants={fadeInUp}>
              Discover premium food, seamless table booking, and unforgettable hospitality.
            </motion.p>

            <motion.div className="hero-buttons" variants={fadeInUp}>
              <Link to="/menu" className="btn-primary">
                Explore Menu
              </Link>
              <Link to="/book-table" className="btn-secondary">
                Book a Table
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="about-section"
        >
          <h2>About Our Restaurant</h2>
          <p>
            We blend tradition with innovation to create unforgettable dining
            experiences. Each dish tells a story, crafted with passion and served with care.
          </p>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="history-section"
        >
          <h2>Our Journey</h2>
          <p>
            From one kitchen to multiple cities, our story is built on trust and
            flavor. Every milestone reflects our commitment to excellence.
          </p>
        </motion.section>

        <section className="branches-section">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Our Branches
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="branches-grid"
          >
            {branches.map((branch) => (
              <motion.div
                key={branch.id}
                variants={cardVariant}
                whileHover={{ y: -8 }}
                className="branch-card"
              >
                <div className="branch-overlay" />
                <img src={branch.image} alt={branch.city} loading="lazy" />
                <div className="branch-info">
                  <h3>{branch.city}</h3>
                  <p>{branch.address}</p>
                </div>
                <div className="branch-accent" />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="dishes-section">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Popular Dishes
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="dishes-grid"
          >
            {featuredDishes.map((dish) => (
              <motion.div
                key={dish.id}
                variants={cardVariant}
                whileHover={{ y: -8 }}
                className="dish-card"
              >
                <div className="dish-overlay" />
                <img src={dish.image} alt={dish.name} loading="lazy" />
                <div className="dish-info">
                  <h3>{dish.name}</h3>
                  <p>{dish.price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="offers-section"
        >
          <h2>Current Offers</h2>
          <motion.ul variants={staggerContainer}>
            {offers.map((offer, index) => (
              <motion.li
                key={index}
                variants={cardVariant}
                whileHover={{ scale: 1.02, x: 8 }}
              >
                🎉 {offer}
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="cta-section"
        >
          <h2>Ready to Dine With Us?</h2>
          <Link to="/book-table" className="cta-button">
            Reserve Your Table
          </Link>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
};

export default Home;