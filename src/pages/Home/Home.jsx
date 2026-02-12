import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Home.css";


const Home = () => {
  const [branches, setBranches] = useState([]);
  const [featuredDishes, setFeaturedDishes] = useState([]);
  const [offers, setOffers] = useState([]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 50]);

  /* ===============================
     ANIMATION VARIANTS (Optimized)
  =============================== */
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
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  /* ===============================
     DATA INITIALIZATION
  =============================== */
  useEffect(() => {
    // Set data immediately (no async needed for static data)
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
    <div className="bg-black min-h-screen">

      {/* ===============================
          HERO SECTION (Optimized)
      =============================== */}
      <motion.section
        style={{ y: heroY, isolation: 'isolate' }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background with Loading State */}
        <div className="absolute inset-0 w-full h-full z-0">
          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black animate-pulse" />
          )}
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%23000' width='1920' height='1080'/%3E%3C/svg%3E"
          >
            <source src="/videos/restaurant.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black z-[1]" />

        {/* Hero Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-4xl px-6 md:px-12 text-center z-[2]"
        >
          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-6 text-white leading-tight"
            variants={fadeInUp}
          >
            Experience Dining, Redefined
          </motion.h1>

          <motion.p
            className="text-base md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Discover premium food, seamless table booking, and unforgettable hospitality.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            <Link
              to="/menu"
              className="group relative px-10 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-full shadow-xl hover:shadow-2xl shadow-yellow-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 min-w-[200px] text-center w-full sm:w-auto"
            >
              <span className="relative z-10">Explore Menu</span>
            </Link>

            <Link
              to="/book-table"
              className="px-10 py-4 border-2 border-yellow-500 text-yellow-500 font-semibold rounded-full transition-all duration-300 hover:bg-yellow-500 hover:text-black hover:scale-105 min-w-[200px] text-center w-full sm:w-auto"
            >
              Book a Table
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ===============================
          UNIFIED GRADIENT WRAPPER
          About → Journey → Branches → Dishes → Offers
      =============================== */}
      <div className="relative z-10 bg-gradient-to-b from-black via-gray-900 to-black" style={{ marginTop: '-4px' }}>

        {/* ===============================
          ABOUT SECTION
      =============================== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
          variants={fadeInUp}
          className="py-20 px-6 md:px-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-yellow-500 mb-6">
            About Our Restaurant
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            We blend tradition with innovation to create unforgettable dining
            experiences. Each dish tells a story, crafted with passion and served with care.
          </p>
        </motion.section>

        {/* ===============================
          HISTORY SECTION
      =============================== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
          variants={fadeInUp}
          className="py-20 px-6 md:px-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-yellow-500 mb-6">
            Our Journey
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            From one kitchen to multiple cities, our story is built on trust and
            flavor. Every milestone reflects our commitment to excellence.
          </p>
        </motion.section>

        {/* ===============================
          BRANCHES SECTION
      =============================== */}
        <section className="py-20 px-6 md:px-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold text-yellow-500 text-center mb-12"
          >
            Our Branches
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
          >
            {branches.map((branch) => (
              <motion.div
                key={branch.id}
                variants={cardVariant}
                whileHover={{ y: -6, transition: { type: "tween", duration: 0.2 } }}
                className="group relative bg-white/[0.08] rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-yellow-500/50 transition-colors duration-200 will-change-transform"
              >

                <img
                  src={branch.image}
                  alt={branch.city}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />

                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                    {branch.city}
                  </h3>
                  <p className="text-gray-400">{branch.address}</p>
                </div>

                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500" />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ===============================
          FEATURED DISHES
      =============================== */}
        <section className="py-20 px-6 md:px-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold text-yellow-500 text-center mb-12"
          >
            Popular Dishes
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
          >
            {featuredDishes.map((dish) => (
              <motion.div
                key={dish.id}
                variants={cardVariant}
                whileHover={{ y: -6, transition: { type: "tween", duration: 0.2 } }}
                className="group relative bg-white/[0.08] rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-yellow-500/50 transition-colors duration-200 will-change-transform"
              >

                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />

                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-yellow-500 text-xl font-semibold">{dish.price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ===============================
          OFFERS SECTION
      =============================== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
          variants={fadeInUp}
          className="py-20 px-6 md:px-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-yellow-500 text-center mb-12">
            Current Offers
          </h2>

          <motion.ul
            variants={staggerContainer}
            className="max-w-2xl mx-auto space-y-4"
          >
            {offers.map((offer, index) => (
              <motion.li
                key={index}
                variants={cardVariant}
                whileHover={{ scale: 1.02, x: 8, transition: { type: "tween", duration: 0.15 } }}
                className="bg-white/[0.08] border border-white/10 rounded-xl px-6 py-4 text-gray-200 text-base md:text-lg shadow-lg hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-colors duration-200 cursor-pointer will-change-transform"
              >
                🎉 {offer}
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

      </div>

      {/* ===============================
          CTA SECTION
      =============================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="py-24 px-6 md:px-16 text-center bg-gradient-to-br from-yellow-500 via-yellow-600 to-black"
      >
        <h2 className="text-3xl md:text-6xl font-bold text-black mb-8">
          Ready to Dine With Us?
        </h2>

        <Link
          to="/book-table"
          className="inline-block px-10 py-4 bg-black text-yellow-500 font-bold text-lg rounded-full shadow-2xl hover:scale-105 hover:shadow-yellow-500/50 transition-all duration-300"
        >
          Reserve Your Table
        </Link>
      </motion.section>

    </div>
  );
};

export default Home;