import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users,
  BarChart3,
  Zap,
  CheckCircle,
  ArrowRight,
  Mail,
  Send,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { token } = useAuth();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const contactRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });
  const contactInView = useInView(contactRef, { once: true, margin: '-100px' });

  const heroControls = useAnimation();
  const featuresControls = useAnimation();
  const statsControls = useAnimation();
  const contactControls = useAnimation();

  useEffect(() => {
    if (heroInView) heroControls.start('visible');
    if (featuresInView) featuresControls.start('visible');
    if (statsInView) statsControls.start('visible');
    if (contactInView) contactControls.start('visible');
  }, [heroInView, featuresInView, statsInView, contactInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const features = [
    {
      icon: Users,
      title: 'Customer Management',
      description: 'Streamline your customer relationships with powerful management tools and intuitive interfaces.',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Get real-time insights with comprehensive analytics and customizable reporting features.',
    },
    {
      icon: Zap,
      title: 'Task Automation',
      description: 'Automate repetitive tasks and boost productivity with intelligent workflow automation.',
    },
  ];

  const stats = [
    { value: '98%', label: 'Customer Satisfaction' },
    { value: '50K+', label: 'Active Users' },
    { value: '24/7', label: 'Support Available' },
    { value: '99.9%', label: 'Uptime Guarantee' },
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-white to-purple-50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroControls}
            className="text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent"
            >
              Empowering Relationships,
              <br />
              Elevating Growth
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            >
              Transform your business with our modern SaaS platform designed to help you manage
              relationships, track progress, and achieve your goals.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to={token ? '/dashboard' : '/register'}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Sign In
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={featuresRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresControls}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900"
            >
              Powerful Features
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto"
            >
              Everything you need to manage your business efficiently
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="about"
        ref={statsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 to-purple-800 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={statsControls}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-purple-200 text-lg font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={contactControls}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600">
                Have questions? We'd love to hear from you.
              </p>
            </motion.div>
            <motion.form variants={itemVariants} onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={20} />
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-white">TaskFlow</span>
          </div>
          <p className="text-gray-400">© 2024 TaskFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

