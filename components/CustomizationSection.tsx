'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Check, Star, Clock, Users } from 'lucide-react';

const CustomizationSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const features = [
    { icon: Check, label: 'Personalized wellness plans' },
    { icon: Star, label: 'Evidence-based interventions' },
    { icon: Clock, label: '24/7 support availability' },
    { icon: Users, label: 'Team collaboration tools' }
  ];

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          style={{ scale, opacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200 rounded-full blur-3xl opacity-30"
        />
      </div>

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Make it your own
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Customize policies and capabilities to match your needs goals and even express your brand.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-200 mb-8"
            >
              Take a look →
            </motion.button>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                  >
                    <feature.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-gray-700 font-medium">{feature.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-2xl">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="bg-white rounded-2xl p-6 shadow-lg mb-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Good morning, Max</h3>
                  <span className="text-sm text-gray-500">Time tracking</span>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full" />
                  <div>
                    <p className="font-medium text-gray-900">Max Auer</p>
                    <p className="text-sm text-gray-500">UX Designer</p>
                  </div>
                </div>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '70%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                />
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-4 shadow-md"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg mb-2" />
                  <p className="text-sm font-medium text-gray-700">Daily check-in</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-4 shadow-md"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg mb-2" />
                  <p className="text-sm font-medium text-gray-700">Wellness score</p>
                </motion.div>
              </div>

              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full blur-2xl opacity-50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomizationSection;