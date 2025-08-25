'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  Home,
  Building,
  Calendar,
  Clock,
  Plus,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
  ShoppingCart,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface Member {
  id: string;
  name: string;
  relation: string;
  selected: boolean;
}

interface Address {
  id: string;
  type: string;
  line1: string;
  line2: string;
  city: string;
  pincode: string;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  popular?: boolean;
}

const steps = [
  { id: 1, name: 'Members', icon: Users },
  { id: 2, name: 'Address', icon: MapPin },
  { id: 3, name: 'Collection', icon: Home },
  { id: 4, name: 'Provider', icon: Building },
  { id: 5, name: 'Schedule', icon: Calendar },
  { id: 6, name: 'Add-ons', icon: Plus },
];

const initialMembers: Member[] = [
  { id: '1', name: 'John Doe', relation: 'Self', selected: true },
  { id: '2', name: 'Jane Doe', relation: 'Spouse', selected: false },
  { id: '3', name: 'Jack Doe', relation: 'Son', selected: false },
];

const savedAddresses: Address[] = [
  { 
    id: '1', 
    type: 'Home',
    line1: '123 Main Street, Apt 4B',
    line2: 'Near Central Park',
    city: 'Mumbai',
    pincode: '400001'
  },
  { 
    id: '2', 
    type: 'Office',
    line1: 'Tech Park, Tower A',
    line2: 'Bandra Kurla Complex',
    city: 'Mumbai',
    pincode: '400051'
  },
];

const providers = [
  { id: '1', name: 'Metropolis Healthcare', rating: 4.8, tests: '50K+' },
  { id: '2', name: 'Dr. Lal PathLabs', rating: 4.7, tests: '45K+' },
  { id: '3', name: 'Thyrocare', rating: 4.6, tests: '40K+' },
];

const addOns: AddOn[] = [
  { 
    id: '1', 
    name: 'Vitamin D Test', 
    price: 800, 
    originalPrice: 1200,
    description: 'Essential for bone health',
    popular: true
  },
  { 
    id: '2', 
    name: 'Vitamin B12 Test', 
    price: 700, 
    originalPrice: 1000,
    description: 'Important for nerve function'
  },
  { 
    id: '3', 
    name: 'Iron Studies', 
    price: 900, 
    originalPrice: 1400,
    description: 'Complete iron profile'
  },
  { 
    id: '4', 
    name: 'Upgrade to Platinum', 
    price: 2500, 
    originalPrice: 4000,
    description: 'Includes 20+ additional tests',
    popular: true
  },
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [members, setMembers] = useState(initialMembers);
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0].id);
  const [collectionType, setCollectionType] = useState<'home' | 'clinic'>('home');
  const [selectedProvider, setSelectedProvider] = useState(providers[0].id);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const toggleMember = (id: string) => {
    setMembers(members.map(m => 
      m.id === id ? { ...m, selected: !m.selected } : m
    ));
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id) 
        ? prev.filter(a => a !== id)
        : [...prev, id]
    );
  };

  const calculateTotal = () => {
    return selectedAddOns.reduce((total, id) => {
      const addon = addOns.find(a => a.id === id);
      return total + (addon?.price || 0);
    }, 0);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToReview = () => {
    window.location.href = '/benefits/health-check/review';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Progress Bar */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${currentStep > step.id ? 'bg-green-500 text-white' : 
                      currentStep === step.id ? 'bg-blue-500 text-white' : 
                      'bg-gray-200 text-gray-400'}
                  `}>
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium hidden md:block
                    ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'}
                  `}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300
                    ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Select Members */}
          {currentStep === 1 && (
            <motion.div
              key="members"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Select Members</h2>
              <p className="text-gray-600">Choose who needs the health check</p>
              
              <div className="space-y-4">
                {members.map(member => (
                  <motion.div
                    key={member.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => toggleMember(member.id)}
                    className={`
                      p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300
                      ${member.selected 
                        ? 'bg-blue-50 border-blue-500' 
                        : 'bg-white border-gray-200 hover:border-gray-300'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {member.name}
                        </h3>
                        <p className="text-gray-600">{member.relation}</p>
                      </div>
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                        ${member.selected 
                          ? 'bg-blue-500 border-blue-500' 
                          : 'border-gray-300'}
                      `}>
                        {member.selected && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Address */}
          {currentStep === 2 && (
            <motion.div
              key="address"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Select Address</h2>
              <p className="text-gray-600">Choose where you want the collection</p>
              
              <div className="space-y-4">
                {savedAddresses.map(address => (
                  <motion.div
                    key={address.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedAddress(address.id)}
                    className={`
                      p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300
                      ${selectedAddress === address.id 
                        ? 'bg-blue-50 border-blue-500' 
                        : 'bg-white border-gray-200 hover:border-gray-300'}
                    `}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {address.type === 'Home' ? (
                            <Home className="w-5 h-5 text-gray-600" />
                          ) : (
                            <Building className="w-5 h-5 text-gray-600" />
                          )}
                          <h3 className="text-lg font-semibold text-gray-900">
                            {address.type}
                          </h3>
                        </div>
                        <p className="text-gray-700">{address.line1}</p>
                        <p className="text-gray-600">{address.line2}</p>
                        <p className="text-gray-600">
                          {address.city} - {address.pincode}
                        </p>
                      </div>
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                        ${selectedAddress === address.id 
                          ? 'bg-blue-500 border-blue-500' 
                          : 'border-gray-300'}
                      `}>
                        {selectedAddress === address.id && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <button className="w-full p-6 rounded-2xl border-2 border-dashed border-gray-300 text-gray-600 hover:border-gray-400 transition-colors">
                  <Plus className="w-6 h-6 mx-auto mb-2" />
                  Add New Address
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Collection Type */}
          {currentStep === 3 && (
            <motion.div
              key="collection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Collection Type</h2>
              <p className="text-gray-600">How would you like to give your sample?</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCollectionType('home')}
                  className={`
                    p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300
                    ${collectionType === 'home' 
                      ? 'bg-blue-50 border-blue-500' 
                      : 'bg-white border-gray-200 hover:border-gray-300'}
                  `}
                >
                  <Home className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Home Collection
                  </h3>
                  <p className="text-gray-600">
                    Our phlebotomist will visit your home
                  </p>
                  <div className="mt-4 text-sm text-green-600 font-medium">
                    ✓ Free Service
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCollectionType('clinic')}
                  className={`
                    p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300
                    ${collectionType === 'clinic' 
                      ? 'bg-blue-50 border-blue-500' 
                      : 'bg-white border-gray-200 hover:border-gray-300'}
                  `}
                >
                  <Building className="w-12 h-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Visit Clinic
                  </h3>
                  <p className="text-gray-600">
                    Visit our nearest collection center
                  </p>
                  <div className="mt-4 text-sm text-blue-600 font-medium">
                    ✓ Priority Processing
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Select Provider */}
          {currentStep === 4 && (
            <motion.div
              key="provider"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Select Provider</h2>
              <p className="text-gray-600">Choose your preferred lab partner</p>
              
              <div className="space-y-4">
                {providers.map(provider => (
                  <motion.div
                    key={provider.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedProvider(provider.id)}
                    className={`
                      p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300
                      ${selectedProvider === provider.id 
                        ? 'bg-blue-50 border-blue-500' 
                        : 'bg-white border-gray-200 hover:border-gray-300'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {provider.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-600">
                            ⭐ {provider.rating} Rating
                          </span>
                          <span className="text-sm text-gray-600">
                            {provider.tests} Tests Done
                          </span>
                        </div>
                      </div>
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                        ${selectedProvider === provider.id 
                          ? 'bg-blue-500 border-blue-500' 
                          : 'border-gray-300'}
                      `}>
                        {selectedProvider === provider.id && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 5: Schedule */}
          {currentStep === 5 && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Schedule Collection</h2>
              <p className="text-gray-600">Pick a convenient date and time</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'].map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`
                          py-3 rounded-xl border-2 font-medium transition-all duration-300
                          ${selectedTime === time 
                            ? 'bg-blue-500 border-blue-500 text-white' 
                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-2xl p-4">
                  <p className="text-sm text-blue-700">
                    💡 Fasting Required: Please don&apos;t eat or drink anything except water for 10-12 hours before the test
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 6: Add-ons */}
          {currentStep === 6 && (
            <motion.div
              key="addons"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Enhance Your Check-up</h2>
              <p className="text-gray-600">Add valuable tests at discounted prices</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {addOns.map(addon => (
                  <motion.div
                    key={addon.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleAddOn(addon.id)}
                    className={`
                      p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative
                      ${selectedAddOns.includes(addon.id) 
                        ? 'bg-blue-50 border-blue-500' 
                        : 'bg-white border-gray-200 hover:border-gray-300'}
                    `}
                  >
                    {addon.popular && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                        POPULAR
                      </span>
                    )}
                    
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {addon.name}
                      </h3>
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0
                        ${selectedAddOns.includes(addon.id) 
                          ? 'bg-blue-500 border-blue-500' 
                          : 'border-gray-300'}
                      `}>
                        {selectedAddOns.includes(addon.id) && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {addon.description}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{addon.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{addon.originalPrice}
                      </span>
                      <span className="text-sm text-green-600 font-medium">
                        {Math.round((1 - addon.price / addon.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {selectedAddOns.length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">Total Add-on Cost</p>
                      <p className="text-3xl font-bold text-gray-900">
                        ₹{calculateTotal()}
                      </p>
                    </div>
                    <ShoppingCart className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-12">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
              ${currentStep === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'}
            `}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          
          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={goToReview}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              Review Booking
              <Sparkles className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}