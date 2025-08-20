'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const microsteps = [
  {
    id: 1,
    category: 'Food',
    title: 'Lasting behavior change starts with Microsteps',
    description: 'Small daily changes become big & life-long daily behaviors can lead to massive improvements in our health and wellbeing.',
    tip: 'Pour choices influence our daily and long-term health, impacting our energy, gut health, blood sugar, inflammation, and mood.',
    image: '/api/placeholder/400/400',
    color: 'bg-orange-100'
  },
  {
    id: 2,
    category: 'Sleep',
    title: 'Quality rest transforms your wellbeing',
    description: 'Better sleep leads to improved focus, mood, and overall health outcomes.',
    tip: 'Consistent sleep schedules and bedtime routines can significantly improve your sleep quality.',
    image: '/api/placeholder/400/400',
    color: 'bg-blue-100'
  },
  {
    id: 3,
    category: 'Movement',
    title: 'Every step counts towards better health',
    description: 'Regular movement boosts energy, reduces stress, and improves overall fitness.',
    tip: 'Even small amounts of daily movement can have significant health benefits.',
    image: '/api/placeholder/400/400',
    color: 'bg-green-100'
  }
];

const MicrostepsSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentStep]);

  const handleNext = () => {
    setDirection(1);
    setCurrentStep((prev) => (prev + 1) % microsteps.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentStep((prev) => (prev - 1 + microsteps.length) % microsteps.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-white overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] overflow-hidden rounded-3xl">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className={`absolute inset-0 ${microsteps[currentStep].color} p-8 flex flex-col justify-between`}
                >
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="w-32 h-32 rounded-full overflow-hidden mb-6"
                    >
                      <div className="w-full h-full bg-gray-300" />
                    </motion.div>
                    
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl font-bold text-gray-900 mb-4"
                    >
                      {microsteps[currentStep].title}
                    </motion.h3>
                    
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-700"
                    >
                      {microsteps[currentStep].description}
                    </motion.p>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    
                    <div className="flex space-x-2">
                      {microsteps.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => {
                            setDirection(index > currentStep ? 1 : -1);
                            setCurrentStep(index);
                          }}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentStep ? 'w-8 bg-orange-500' : 'w-2 bg-gray-300'
                          }`}
                          whileHover={{ scale: 1.2 }}
                        />
                      ))}
                    </div>
                    
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              key={microsteps[currentStep].category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {microsteps[currentStep].category}
              </h2>
              <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <p className="text-gray-600">
                  {microsteps[currentStep].tip}
                </p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
              >
                Learn more
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MicrostepsSection;