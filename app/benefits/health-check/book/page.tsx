'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
  MapPin,
  Clock,
  Users,
  Plus,
  Minus,
  Info
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Member {
  id: string;
  name: string;
  relation: string;
  selected: boolean;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function BookHomePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'John Doe', relation: 'Self', selected: false },
    { id: '2', name: 'Jane Doe', relation: 'Spouse', selected: false },
    { id: '3', name: 'Jack Doe', relation: 'Child', selected: false },
    { id: '4', name: 'Jill Doe', relation: 'Child', selected: false }
  ]);
  
  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    pincode: ''
  });
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const dates = [
    { date: '26', day: 'Mon', month: 'Dec', available: true },
    { date: '27', day: 'Tue', month: 'Dec', available: true },
    { date: '28', day: 'Wed', month: 'Dec', available: true },
    { date: '29', day: 'Thu', month: 'Dec', available: false },
    { date: '30', day: 'Fri', month: 'Dec', available: true },
    { date: '31', day: 'Sat', month: 'Dec', available: true }
  ];
  
  const timeSlots: TimeSlot[] = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: false },
    { time: '5:00 PM', available: true }
  ];

  const toggleMember = (id: string) => {
    setMembers(members.map(m => 
      m.id === id ? { ...m, selected: !m.selected } : m
    ));
  };

  const selectedMembersCount = members.filter(m => m.selected).length;
  const isStepValid = () => {
    switch(currentStep) {
      case 1:
        return selectedMembersCount > 0;
      case 2:
        return address.line1 && address.city && address.pincode;
      case 3:
        return selectedDate && selectedTime;
      default:
        return false;
    }
  };

  const handleConfirm = () => {
    router.push('/benefits/health-check/review');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/benefits/health-check">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
            </Link>
            <h1 className="text-xl font-semibold">Book home tests</h1>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="bg-blue-50 rounded-2xl p-4 flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            You can make multiple bookings based on the availability and location of your family members.
          </p>
        </div>
      </div>

      {/* Steps Container */}
      <div className="max-w-2xl mx-auto px-4 pb-32">
        <div className="space-y-4">
          {/* Step 1: Select Members */}
          <div 
            className={`bg-white rounded-2xl transition-all ${
              currentStep === 1 ? 'ring-2 ring-green-500' : ''
            }`}
          >
            <button
              onClick={() => setCurrentStep(1)}
              className="w-full p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  selectedMembersCount > 0 ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
                }`}>
                  {selectedMembersCount > 0 ? <Check className="w-4 h-4" /> : '1'}
                </div>
                <span className="font-medium text-gray-900">Select members</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <AnimatePresence>
              {currentStep === 1 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-3">
                    {members.map((member) => (
                      <label
                        key={member.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={member.selected}
                            onChange={() => toggleMember(member.id)}
                            className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.relation}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Step 2: Enter Address */}
          <div 
            className={`bg-white rounded-2xl transition-all ${
              currentStep === 2 ? 'ring-2 ring-green-500' : ''
            } ${currentStep < 2 ? 'opacity-50' : ''}`}
          >
            <button
              onClick={() => currentStep >= 2 && setCurrentStep(2)}
              disabled={currentStep < 2}
              className="w-full p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  address.line1 && address.city && address.pincode ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
                }`}>
                  {address.line1 && address.city && address.pincode ? <Check className="w-4 h-4" /> : '2'}
                </div>
                <span className="font-medium text-gray-900">Enter address</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <AnimatePresence>
              {currentStep === 2 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        value={address.line1}
                        onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-green-500 focus:outline-none"
                        placeholder="House/Flat No, Building Name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        value={address.line2}
                        onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-green-500 focus:outline-none"
                        placeholder="Street, Landmark"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-green-500 focus:outline-none"
                          placeholder="Mumbai"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pincode
                        </label>
                        <input
                          type="text"
                          value={address.pincode}
                          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-green-500 focus:outline-none"
                          placeholder="400001"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Step 3: Select Date and Time */}
          <div 
            className={`bg-white rounded-2xl transition-all ${
              currentStep === 3 ? 'ring-2 ring-green-500' : ''
            } ${currentStep < 3 ? 'opacity-50' : ''}`}
          >
            <button
              onClick={() => currentStep >= 3 && setCurrentStep(3)}
              disabled={currentStep < 3}
              className="w-full p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  selectedDate && selectedTime ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
                }`}>
                  {selectedDate && selectedTime ? <Check className="w-4 h-4" /> : '3'}
                </div>
                <span className="font-medium text-gray-900">Select date and time</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <AnimatePresence>
              {currentStep === 3 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-4">
                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Select Date
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {dates.map((date, index) => (
                          <button
                            key={index}
                            onClick={() => date.available && setSelectedDate(`${date.date} ${date.month}`)}
                            disabled={!date.available}
                            className={`p-3 rounded-xl border-2 transition-all ${
                              selectedDate === `${date.date} ${date.month}`
                                ? 'border-green-500 bg-green-50'
                                : date.available
                                ? 'border-gray-200 hover:border-gray-300'
                                : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                            }`}
                          >
                            <p className="text-2xl font-semibold text-gray-900">{date.date}</p>
                            <p className="text-xs text-gray-500">{date.day}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Select Time
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map((slot, index) => (
                          <button
                            key={index}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                            disabled={!slot.available}
                            className={`px-4 py-3 rounded-xl border-2 transition-all ${
                              selectedTime === slot.time
                                ? 'border-green-500 bg-green-50'
                                : slot.available
                                ? 'border-gray-200 hover:border-gray-300'
                                : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                            }`}
                          >
                            <p className="text-sm font-medium text-gray-900">{slot.time}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleConfirm}
            disabled={!isStepValid() || currentStep < 3}
            className={`w-full py-4 rounded-2xl font-medium transition-all ${
              isStepValid() && currentStep === 3
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Confirm booking
          </button>
        </div>
      </div>
    </div>
  );
}