'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const rotatingWords = [
    { text: 'Preventive Care', color: 'text-orange-500' },
    { text: 'Smart Clinics', color: 'text-blue-500' },
    { text: 'Digital Health', color: 'text-emerald-500' },
    { text: 'Real-Time Insights', color: 'text-purple-500' },
    { text: 'Better Habits', color: 'text-pink-500' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const getNextIndex = () => {
    return (currentWordIndex + 1) % rotatingWords.length;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-sky-300 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal">
            <div className="text-gray-900 mb-4">Your Workforce,</div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-gray-900">Powered By</span>
                
                {/* Rotating text with dynamic button */}
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentWordIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-50 border border-gray-200 rounded-full px-8 py-2 shadow-sm"
                    >
                      <motion.span
                        key={`text-${currentWordIndex}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className={`font-bold text-4xl md:text-5xl whitespace-nowrap block ${rotatingWords[currentWordIndex].color}`}
                      >
                        {rotatingWords[currentWordIndex].text}
                      </motion.span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Next text preview - below the button */}
              <div className="h-8 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`next-${getNextIndex()}`}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.4 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex justify-center"
                  >
                    <span className={`text-2xl md:text-3xl font-medium whitespace-nowrap ${rotatingWords[getNextIndex()].color}`} style={{ opacity: 0.4 }}>
                      {rotatingWords[getNextIndex()].text}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-700 mb-12 max-w-5xl mx-auto leading-relaxed font-light"
        >
          We partner with leading employers and healthcare organizations to help people 
          adopt healthy habits, driving better health outcomes, engagement, and productivity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white border-2 border-gray-900 text-gray-900 px-10 py-4 rounded-full font-medium text-lg transition-all duration-200 hover:bg-gray-900 hover:text-white"
          >
            Contact Our Team
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;