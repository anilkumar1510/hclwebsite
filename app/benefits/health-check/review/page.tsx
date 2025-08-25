'use client';

import { motion } from 'framer-motion';
import { 
  Check,
  Calendar,
  Clock,
  MapPin,
  Users,
  Building,
  CreditCard,
  Shield,
  ChevronLeft,
  Sparkles,
  Home
} from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useState } from 'react';

export default function ReviewPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Mock data - in real app, this would come from previous steps
  const bookingDetails = {
    members: ['John Doe (Self)', 'Jane Doe (Spouse)'],
    address: {
      type: 'Home',
      line1: '123 Main Street, Apt 4B',
      line2: 'Near Central Park',
      city: 'Mumbai',
      pincode: '400001'
    },
    collectionType: 'home',
    provider: 'Metropolis Healthcare',
    date: 'December 28, 2024',
    time: '9:00 AM',
    addOns: [
      { name: 'Vitamin D Test', price: 800 },
      { name: 'Upgrade to Platinum', price: 2500 }
    ]
  };

  const basePackageValue = 5000;
  const addOnsTotal = bookingDetails.addOns.reduce((sum, addon) => sum + addon.price, 0);
  const totalAmount = addOnsTotal; // Base package is free

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setBookingComplete(true);
    }, 2000);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Navigation />
        
        <div className="max-w-4xl mx-auto px-6 py-32">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-12 h-12 text-green-600" />
            </motion.div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Booking Confirmed!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Your health check has been successfully scheduled
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <p className="text-gray-600 mb-2">Booking ID</p>
              <p className="text-2xl font-bold text-gray-900">#HCL2024122801</p>
            </div>
            
            <div className="space-y-4 text-left max-w-md mx-auto mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{bookingDetails.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{bookingDetails.time}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Home Collection</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-8">
              You will receive a confirmation SMS and email with complete details
            </p>
            
            <div className="flex gap-4 justify-center">
              <Link href="/benefits">
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                  Back to Benefits
                </button>
              </Link>
              <Link href="/">
                <button className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
                  Go to Home
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/benefits/health-check/book">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              Back to Booking
            </button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Review Your Booking
              </h1>
              <p className="text-gray-600">
                Please review all details before confirming
              </p>
            </motion.div>

            {/* Members */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-900">Members</h2>
              </div>
              <div className="space-y-2">
                {bookingDetails.members.map((member, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">{member}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Collection Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Home className="w-6 h-6 text-purple-500" />
                <h2 className="text-xl font-semibold text-gray-900">Collection Details</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Type</p>
                  <p className="text-gray-900 font-medium">Home Collection</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Address</p>
                  <p className="text-gray-900">
                    {bookingDetails.address.line1}<br />
                    {bookingDetails.address.line2}<br />
                    {bookingDetails.address.city} - {bookingDetails.address.pincode}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date</p>
                    <p className="text-gray-900 font-medium">{bookingDetails.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Time</p>
                    <p className="text-gray-900 font-medium">{bookingDetails.time}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Provider */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-900">Lab Partner</h2>
              </div>
              <p className="text-gray-900 font-medium">{bookingDetails.provider}</p>
              <p className="text-sm text-gray-600 mt-1">NABL Certified • 4.8 Rating</p>
            </motion.div>

            {/* Add-ons */}
            {bookingDetails.addOns.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-orange-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Add-on Tests</h2>
                </div>
                <div className="space-y-3">
                  {bookingDetails.addOns.map((addon, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{addon.name}</span>
                      <span className="font-medium text-gray-900">₹{addon.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Price Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Price Summary
              </h2>
              
              <div className="space-y-4 pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Annual Health Check</span>
                  <div className="text-right">
                    <p className="text-gray-500 line-through text-sm">₹{basePackageValue}</p>
                    <p className="text-green-600 font-medium">FREE</p>
                  </div>
                </div>
                
                {bookingDetails.addOns.map((addon, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-600">{addon.name}</span>
                    <span className="text-gray-900">₹{addon.price}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {totalAmount > 0 ? `₹${totalAmount}` : 'FREE'}
                  </span>
                </div>
                
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-700">
                      You saved ₹{basePackageValue} on this booking
                    </p>
                  </div>
                </div>
              </div>
              
              {totalAmount > 0 && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-medium text-gray-900">Online Payment</p>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={handleConfirmBooking}
                disabled={isProcessing}
                className={`
                  w-full mt-6 py-4 rounded-xl font-semibold text-white transition-all
                  ${isProcessing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg'}
                `}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  totalAmount > 0 ? `Pay ₹${totalAmount} & Confirm` : 'Confirm Booking'
                )}
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                By confirming, you agree to our terms and conditions
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}