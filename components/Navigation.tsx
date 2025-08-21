'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Our Approach', href: '#approach' },
    { label: 'Our Results', href: '#results' },
    { label: 'Resources', href: '#resources' },
    { label: 'Who We Are', href: '#about' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-4" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-2"
        >
          <Link href="/" className="flex items-center">
            <div className="flex flex-col">
              <div className="flex items-center">
                {/* HCL Logo */}
                <div className="relative">
                  <div className="bg-[#0066CC] px-4 py-1.5 skew-x-[-20deg]">
                    <span className="text-white font-bold text-2xl italic skew-x-[20deg] inline-block">HCL</span>
                  </div>
                </div>
                {/* Healthcare Text */}
                <span className="ml-3 text-2xl font-bold text-[#0066CC] tracking-wide">HEALTHCARE</span>
              </div>
              {/* Tagline */}
              <div className="mt-1">
                <span className="text-sm text-[#0066CC] tracking-wider">Making Corporate India Healthier</span>
              </div>
            </div>
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Link
                href={item.href}
                className="text-gray-700 hover:text-[#0066CC] transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:flex items-center space-x-4"
          >
            <Link
              href="#"
              className="text-[#0066CC] hover:text-[#0052A3] font-medium transition-colors"
            >
              Member login
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0066CC] hover:bg-[#0052A3] text-white px-6 py-2.5 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Request a demo
            </motion.button>
          </motion.div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <div className="space-y-1.5">
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 6 : 0,
                }}
                className="block w-6 h-0.5 bg-gray-900"
              />
              <motion.span
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
                className="block w-6 h-0.5 bg-gray-900"
              />
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -6 : 0,
                }}
                className="block w-6 h-0.5 bg-gray-900"
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-6 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-[#0066CC] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t space-y-3">
                <Link
                  href="#"
                  className="block text-[#0066CC] hover:text-[#0052A3] font-medium"
                >
                  Member login
                </Link>
                <button className="w-full bg-[#0066CC] hover:bg-[#0052A3] text-white px-6 py-2.5 rounded-full font-medium transition-all">
                  Request a demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;