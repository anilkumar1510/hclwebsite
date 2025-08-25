'use client';

import { motion } from 'framer-motion';
import { 
  Check, 
  Calendar, 
  FileText, 
  Heart,
  Clock,
  MapPin,
  Shield,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const includedTests = [
  'Complete Blood Count (CBC)',
  'Lipid Profile',
  'Liver Function Test',
  'Kidney Function Test',
  'Thyroid Profile',
  'Blood Sugar (Fasting & PP)',
  'HbA1c',
  'Vitamin D & B12',
  'Urine Routine',
  'ECG',
  'Chest X-Ray',
  'Ultrasound Abdomen'
];

const steps = [
  {
    number: '01',
    title: 'Schedule Your Test',
    description: 'Choose a convenient date and time for home collection or clinic visit',
    icon: Calendar,
    color: 'from-blue-400 to-blue-600'
  },
  {
    number: '02',
    title: 'Complete the Test',
    description: 'Our certified phlebotomist will collect samples with care',
    icon: Heart,
    color: 'from-purple-400 to-purple-600'
  },
  {
    number: '03',
    title: 'Receive Smart Report',
    description: 'Get detailed health insights and doctor recommendations',
    icon: FileText,
    color: 'from-green-400 to-green-600'
  }
];

export default function HealthCheckPage() {
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
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold mb-6">
              <Shield className="w-5 h-5" />
              100% Free for Employees
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Annual Health Check
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive health screening with 50+ tests to help you stay ahead of health issues
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - What's Included */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  What&apos;s Included
                </h2>
                <div className="space-y-3">
                  {includedTests.map((test, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{test}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 mt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Key Benefits
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Fast Results</p>
                      <p className="text-gray-600">Reports within 24-48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 text-purple-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Home Collection</p>
                      <p className="text-gray-600">Free sample collection at your doorstep</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">NABL Certified Labs</p>
                      <p className="text-gray-600">Accurate and reliable results</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - How it Works */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  How It Works
                </h2>
                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="relative"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-4xl font-bold text-gray-200">
                              {step.number}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-gray-600">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="ml-8 h-8 w-0.5 bg-gray-200" />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link href="/benefits/health-check/book">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300"
                  >
                    Book Your Health Check
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 bg-gray-50 rounded-3xl p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">50K+</p>
                    <p className="text-sm text-gray-600">Tests Done</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">4.9</p>
                    <p className="text-sm text-gray-600">User Rating</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">24hr</p>
                    <p className="text-sm text-gray-600">Report Time</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}