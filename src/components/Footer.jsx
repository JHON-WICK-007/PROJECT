import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowUp,
  FaUtensils
} from 'react-icons/fa';
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'Book Table', path: '/book-table' },
        { name: 'About Us', path: '/about' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact', path: '/contact' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
      ]
    }
  ];

  const socialIcons = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: 'https://facebook.com',
      color: '#1877F2',
      hoverClass: 'hover:bg-blue-600'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://instagram.com',
      color: '#E4405F',
      hoverClass: 'hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://twitter.com',
      color: '#1DA1F2',
      hoverClass: 'hover:bg-sky-500'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com',
      color: '#0A66C2',
      hoverClass: 'hover:bg-blue-700'
    },
  ];

  const contactInfo = [
    {
      icon: FaPhone,
      text: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      label: 'Call us'
    },
    {
      icon: FaEnvelope,
      text: 'info@restaurant.com',
      link: 'mailto:info@restaurant.com',
      label: 'Email us'
    },
    {
      icon: FaMapMarkerAlt,
      text: '123 Gourmet St, Food City',
      link: '#',
      label: 'Visit us'
    },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribeStatus('success');
      setTimeout(() => {
        setEmail('');
        setSubscribeStatus('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-16 border-b border-gray-800">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center space-x-3 mb-6 group">
              <div
                className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
                style={{
                  background: '#E5A500',
                }}
              >
                <FaUtensils className="text-black text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Restaurant</h3>
                <p className="text-sm font-medium text-yellow-500">Fine Dining</p>
              </div>
            </Link>

            <p className="text-gray-400 leading-relaxed mb-8 text-base">
              Experience the finest dining with our curated menu and exceptional service. Making every meal memorable since 2020.
            </p>

            {/* Social Icons with brand color hovers */}
            <div className="flex flex-wrap gap-3">
              {socialIcons.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-neutral-900 border border-neutral-800 hover:border-transparent ${social.hoverClass} group`}
                    aria-label={`Visit our ${social.name} page`}
                  >
                    <Icon className="text-gray-400 text-xl group-hover:text-white transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div
              key={section.title}
              className="lg:col-span-1"
            >
              <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
                {section.title}
                <div
                  className="absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-to-r from-yellow-500 to-transparent"
                  style={{ width: '60%' }}
                />
              </h4>

              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-yellow-500 transition-colors duration-300 inline-flex items-center text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
              Contact Info
              <div
                className="absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-to-r from-yellow-500 to-transparent"
                style={{ width: '60%' }}
              />
            </h4>

            <ul className="space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text}>
                    <a
                      href={item.link}
                      className="flex items-center gap-4 group"
                      aria-label={item.label}
                    >
                      {/* Icon */}
                      <div
                        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 bg-neutral-900 border border-neutral-800"
                      >
                        <Icon className="text-lg text-yellow-500 transition-all duration-300" />
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <p className="text-base font-medium text-gray-400 group-hover:text-yellow-500 transition-colors duration-300">
                          {item.text}
                        </p>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-16 border-b border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-400 text-lg">
                Get exclusive deals, new menu updates, and special offers delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="mt-10 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 relative items-stretch">
                {/* Input Field */}
                <div className="flex-1 w-full relative">
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    className="newsletter-input w-full h-14 px-6 text-white text-base placeholder:text-gray-500 focus:outline-none transition-all duration-300 bg-transparent"
                    style={{
                      fontFamily: 'inherit',
                      letterSpacing: '0.01em',
                      border: '2px solid #E5A500',
                      borderRadius: '12px'
                    }}
                  />

                  {subscribeStatus === 'success' && (
                    <div className="absolute -bottom-8 left-0 text-sm font-medium flex items-center gap-2 text-green-500">
                      <span>✓</span>
                      Thanks for subscribing!
                    </div>
                  )}
                </div>

                {/* Subscribe Button */}
                <button
                  type="submit"
                  className="subscribe-button h-14 px-10 text-black transition-all duration-300 hover:opacity-90 active:scale-95 flex items-center justify-center whitespace-nowrap"
                  style={{
                    background: '#E5A500',
                    fontSize: '16px',
                    fontWeight: '700',
                    letterSpacing: '0.02em',
                    borderRadius: '12px',
                    minWidth: '150px'
                  }}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-500">
          <p className="text-sm md:text-base flex items-center gap-2">
            © {currentYear} Restaurant. All rights reserved.
            <span className="hidden md:inline">Crafted with</span>
            <span className="text-red-500">❤️</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="transition-colors text-gray-500 hover:text-yellow-500"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-2xl flex items-center justify-center text-black z-50 back-to-top hover:opacity-90 transition-opacity duration-300"
        style={{
          background: '#E5A500',
        }}
        aria-label="Back to top"
      >
        <FaArrowUp className="text-xl" />
      </button>
    </footer>
  );
};

export default Footer;