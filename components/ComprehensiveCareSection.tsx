'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const ComprehensiveCareSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const careFeatures = [
    { title: 'The right care, at the right time for global teams', icon: '🌍' },
    { title: 'Evidence-based approach', icon: '📊' },
    { title: 'One integrated care team', icon: '👥' },
    { title: 'Leading the in high quality care', icon: '⭐' },
    { title: 'AI backed by clinical experts', icon: '🤖' },
    { title: 'Partner for driving cultural change', icon: '🤝' },
    { title: 'Support anytime, anywhere', icon: '💬' }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-300 rounded-full opacity-50"
              />
              
              <div className="relative z-10 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Your appointment is confirmed</h3>
                  <div className="w-8 h-8 bg-yellow-400 rounded-full" />
                </div>
                
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-2">Provider</p>
                    <p className="font-medium text-gray-900">Dr. Sarah Johnson</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-2">Time</p>
                    <p className="font-medium text-gray-900">Tomorrow, 2:00 PM</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4 bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
                >
                  Join Session
                </motion.button>
              </div>

              <div className="mt-6 flex items-center space-x-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-sm bg-white rounded-full px-4 py-2 shadow-md"
                >
                  Calming at Anxious Mind
                </motion.div>
                
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  className="text-sm bg-white rounded-full px-4 py-2 shadow-md"
                >
                  Stress Check-In
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive care<br />for everyone
            </h2>

            <div className="space-y-3">
              {careFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group"
                >
                  <motion.div
                    animate={{
                      x: hoveredIndex === index ? 10 : 0,
                      backgroundColor: hoveredIndex === index ? '#FEF3C7' : '#FFFFFF'
                    }}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-orange-300 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <span className="font-medium text-gray-800">{feature.title}</span>
                    </div>
                    <motion.div
                      animate={{ x: hoveredIndex === index ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComprehensiveCareSection;