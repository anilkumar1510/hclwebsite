'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Card {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  color: string;
  image: string;
  appName: string;
}

const cards: Card[] = [
  {
    id: 1,
    title: "Welcome back! I'm glad to see you again, Maya.",
    subtitle: "Last time we chatted, we touched on confrontation and explored a breathing exercise.",
    content: "What would you like to talk about today?",
    color: 'bg-yellow-400',
    image: '/api/placeholder/300/600',
    appName: 'Ebb'
  },
  {
    id: 2,
    title: 'Susan',
    subtitle: 'Renaissance Psychiatrist',
    content: 'Specializing in anxiety and stress management',
    color: 'bg-orange-400',
    image: '/api/placeholder/300/600',
    appName: 'MHC'
  },
  {
    id: 3,
    title: 'Meditation Session',
    subtitle: 'Daily mindfulness practice',
    content: 'Join our guided meditation for inner peace',
    color: 'bg-blue-500',
    image: '/api/placeholder/300/600',
    appName: 'Session'
  },
  {
    id: 4,
    title: 'Wellness Check',
    subtitle: 'Track your progress',
    content: 'Complete your daily wellness assessment',
    color: 'bg-pink-400',
    image: '/api/placeholder/300/600',
    appName: 'Tracker'
  },
  {
    id: 5,
    title: 'Group Therapy',
    subtitle: 'Connect with others',
    content: 'Share experiences in a safe environment',
    color: 'bg-green-400',
    image: '/api/placeholder/300/600',
    appName: 'Connect'
  },
  {
    id: 6,
    title: 'Sleep Better',
    subtitle: 'Improve your rest',
    content: 'Personalized sleep improvement program',
    color: 'bg-purple-400',
    image: '/api/placeholder/300/600',
    appName: 'Sleep'
  }
];

const users = [
  { id: 1, name: 'Maya', avatar: '/api/placeholder/60/60', story: "Maya's first stop: empathy and guidance from Ebb" },
  { id: 2, name: 'John', avatar: '/api/placeholder/60/60', story: "John's journey: Finding balance through mindfulness" },
  { id: 3, name: 'Sarah', avatar: '/api/placeholder/60/60', story: "Sarah's path: Building resilience with professional support" },
  { id: 4, name: 'Mike', avatar: '/api/placeholder/60/60', story: "Mike's experience: Overcoming challenges with team support" },
  { id: 5, name: 'Emma', avatar: '/api/placeholder/60/60', story: "Emma's growth: Developing healthy coping strategies" },
  { id: 6, name: 'David', avatar: '/api/placeholder/60/60', story: "David's transformation: From stress to success" }
];

const PopulationSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % cards.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handleProgressClick = (index: number) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  // Calculate card positions for stack effect
  const getCardStyle = (index: number) => {
    const position = (index - currentIndex + cards.length) % cards.length;
    
    if (position === 0) {
      // Current card
      return {
        x: 0,
        scale: 1,
        opacity: 1,
        zIndex: 30,
        rotateY: 0,
      };
    } else if (position === 1) {
      // Next card
      return {
        x: 80,
        scale: 0.9,
        opacity: 0.8,
        zIndex: 20,
        rotateY: -5,
      };
    } else if (position === 2) {
      // Second next card
      return {
        x: 140,
        scale: 0.8,
        opacity: 0.6,
        zIndex: 10,
        rotateY: -10,
      };
    } else if (position === cards.length - 1) {
      // Previous card
      return {
        x: -80,
        scale: 0.9,
        opacity: 0.8,
        zIndex: 20,
        rotateY: 5,
      };
    } else {
      // Hidden cards
      return {
        x: 200,
        scale: 0.7,
        opacity: 0,
        zIndex: 0,
        rotateY: -15,
      };
    }
  };

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <motion.div style={{ opacity }} className="container max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Support your full population with<br />proven, cost-effective care
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how the right care at the right time helps members stay healthy, engaged, and ready for whatever life brings.
          </p>
        </motion.div>

        {/* Card Stack Container */}
        <div className="relative h-[600px] mb-20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-4xl h-[500px]" style={{ perspective: '1200px' }}>
              <AnimatePresence mode="popLayout">
                {cards.map((card, index) => {
                  const style = getCardStyle(index);
                  return (
                    <motion.div
                      key={card.id}
                      className="absolute left-1/2 top-1/2"
                      initial={false}
                      animate={{
                        x: style.x - 200,
                        y: -250,
                        scale: style.scale,
                        opacity: style.opacity,
                        rotateY: style.rotateY,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      style={{
                        zIndex: style.zIndex,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div className={`relative w-[400px] h-[500px] ${card.color} rounded-3xl shadow-2xl overflow-hidden`}>
                        {/* Phone Frame */}
                        <div className="absolute inset-4 bg-white rounded-2xl overflow-hidden">
                          {/* Phone Status Bar */}
                          <div className="bg-gray-100 h-8 flex items-center justify-between px-4">
                            <span className="text-xs font-semibold text-gray-700">{card.appName}</span>
                            <div className="flex items-center gap-1">
                              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                            </div>
                          </div>
                          
                          {/* Phone Content */}
                          <div className="p-6 h-full bg-gradient-to-b from-white to-gray-50">
                            {/* Avatar or Icon */}
                            <div className="mb-6">
                              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full mx-auto flex items-center justify-center">
                                <span className="text-3xl">😊</span>
                              </div>
                            </div>
                            
                            {/* Chat Content */}
                            <div className="space-y-4">
                              <div className="bg-gray-100 rounded-2xl p-4">
                                <p className="text-sm font-medium text-gray-800">
                                  {card.title}
                                </p>
                              </div>
                              
                              {card.subtitle && (
                                <div className="bg-gray-100 rounded-2xl p-4">
                                  <p className="text-sm text-gray-600">
                                    {card.subtitle}
                                  </p>
                                </div>
                              )}
                              
                              {card.content && (
                                <div className="bg-gray-100 rounded-2xl p-4">
                                  <p className="text-sm text-gray-600">
                                    {card.content}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            {/* Input Field */}
                            <div className="absolute bottom-6 left-6 right-6">
                              <div className="bg-gray-100 rounded-full px-4 py-3 flex items-center">
                                <input
                                  type="text"
                                  placeholder="Share your thoughts..."
                                  className="bg-transparent text-sm flex-1 outline-none"
                                  disabled
                                />
                                <button className="bg-blue-500 text-white rounded-full px-4 py-1 text-sm font-medium">
                                  Send
                                </button>
                              </div>
                              
                              <div className="mt-2 text-center">
                                <button className="text-xs text-gray-500 underline">
                                  Suggest an activity
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </motion.button>

            {/* Progress Bar with User Avatar */}
            <div className="flex-1 mx-8">
              <div className="relative">
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <motion.div
                    key={currentIndex}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="relative"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {users[currentIndex].name[0]}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Progress Segments */}
                <div className="flex items-center gap-1">
                  {cards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleProgressClick(index)}
                      className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400'
                          : index < currentIndex
                          ? 'bg-orange-300'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              disabled={isAnimating}
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </motion.button>
          </div>

          {/* User Story Text */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {users[currentIndex].story}
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Maya is feeling overwhelmed by work, caregiving, and sleep trouble. She opens the Headspace 
              app and connects with Ebb, the AI companion. Ebb listens patiently and responds with 
              empathy, helping Maya feel seen as she describes what she's going through. Ebb then guides 
              her through a calming breathing exercise, followed by a short clinical assessment.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default PopulationSection;