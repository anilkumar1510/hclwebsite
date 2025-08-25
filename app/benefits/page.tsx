'use client';

import { motion } from 'framer-motion';
import { 
  Heart, 
  Stethoscope, 
  TestTube, 
  Pill, 
  Activity,
  Users,
  Shield,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  discount?: string;
  isFree?: boolean;
  popular?: boolean;
}

const benefits: Benefit[] = [
  {
    id: 'health-check',
    title: 'Annual Health Check',
    description: 'Comprehensive health screening with 50+ tests',
    icon: Heart,
    color: 'from-red-400 to-red-600',
    isFree: true,
    popular: true
  },
  {
    id: 'doctor-consultation',
    title: 'Doctor Consultations',
    description: 'Unlimited consultations with general physicians',
    icon: Stethoscope,
    color: 'from-blue-400 to-blue-600',
    isFree: true
  },
  {
    id: 'specialist',
    title: 'Specialist Consultations',
    description: 'Access to 20+ specialist doctors',
    icon: Users,
    color: 'from-purple-400 to-purple-600',
    discount: '30% OFF'
  },
  {
    id: 'lab-tests',
    title: 'Lab Tests',
    description: 'Diagnostic tests at NABL accredited labs',
    icon: TestTube,
    color: 'from-green-400 to-green-600',
    discount: '20% OFF'
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy',
    description: 'Medicines delivered to your doorstep',
    icon: Pill,
    color: 'from-orange-400 to-orange-600',
    discount: '20% OFF'
  },
  {
    id: 'radiology',
    title: 'Radiology & Imaging',
    description: 'ECG, X-Ray, Ultrasound & more',
    icon: Activity,
    color: 'from-indigo-400 to-indigo-600',
    discount: '15% OFF'
  }
];

export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Your Wellness Benefits
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access comprehensive healthcare benefits for you and your family. 
              Your company cares about your wellbeing.
            </p>
          </motion.div>

          {/* Member Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Viewing benefits for
              </label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none transition-colors">
                <option>Self - John Doe</option>
                <option>Spouse - Jane Doe</option>
                <option>Child - Jack Doe</option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative"
              >
                <Link href={`/benefits/${benefit.id}`}>
                  <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 h-full cursor-pointer border border-gray-100">
                    {/* Popular Badge */}
                    {benefit.popular && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                        POPULAR
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6`}>
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {benefit.description}
                    </p>

                    {/* Badge */}
                    <div className="flex items-center justify-between">
                      {benefit.isFree ? (
                        <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                          <Shield className="w-4 h-4" />
                          FREE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                          <Shield className="w-4 h-4" />
                          {benefit.discount}
                        </span>
                      )}
                      <span className="text-blue-600 font-semibold">
                        Book Now →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-center text-white"
          >
            <Calendar className="w-16 h-16 mx-auto mb-4 text-white/80" />
            <h2 className="text-3xl font-bold mb-4">
              Need help choosing the right benefit?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Our wellness experts are here to guide you
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Talk to an Expert
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}