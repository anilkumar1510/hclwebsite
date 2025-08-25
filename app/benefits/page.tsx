'use client';

import { motion } from 'framer-motion';
import { 
  Heart, 
  Stethoscope, 
  TestTube2, 
  Pill, 
  Building2,
  ChevronRight,
  Plus,
  FileText,
  CreditCard,
  FolderOpen
} from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useState } from 'react';

interface Profile {
  id: string;
  name: string;
  initials: string;
  abha?: string;
  selected: boolean;
}

interface Benefit {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
  link: string;
}

export default function BenefitsPage() {
  const [profiles, setProfiles] = useState<Profile[]>([
    { id: '1', name: 'Anil Kumar', initials: 'AK', abha: '74-0103-0738-1327', selected: true },
    { id: '2', name: 'Sarah Miller', initials: 'SM', selected: false },
    { id: '3', name: 'Sam Kumar', initials: 'SK', selected: false }
  ]);

  const selectedProfile = profiles.find(p => p.selected);

  const selectProfile = (id: string) => {
    setProfiles(profiles.map(p => ({ ...p, selected: p.id === id })));
  };

  const careCenter: Benefit[] = [
    {
      id: 'health-check',
      title: 'Annual health check-up',
      icon: Heart,
      badge: 'Free',
      badgeColor: 'bg-gradient-to-r from-orange-400 to-pink-400',
      link: '/benefits/health-check'
    },
    {
      id: 'doctor',
      title: 'Talk to a doctor on mfine',
      icon: Stethoscope,
      badge: 'Free',
      badgeColor: 'bg-gradient-to-r from-orange-400 to-pink-400',
      link: '/benefits/doctor'
    },
    {
      id: 'lab-test',
      title: 'Book a lab test on 1mg',
      icon: TestTube2,
      badge: 'Upto 70% off',
      badgeColor: 'bg-gradient-to-r from-orange-400 to-pink-400',
      link: '/benefits/lab-test'
    },
    {
      id: 'medicine',
      title: 'Order medicine online on 1mg',
      icon: Pill,
      badge: 'Upto 20% off',
      badgeColor: 'bg-gradient-to-r from-orange-400 to-pink-400',
      link: '/benefits/medicine'
    }
  ];

  const healthLocker = [
    {
      id: 'ecards',
      title: 'E Cards',
      icon: CreditCard,
      link: '/benefits/ecards'
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: FolderOpen,
      link: '/benefits/documents'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Profile Selection Header */}
      <div className="pt-24 pb-6 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          {/* Profile Avatars */}
          <div className="flex items-center justify-center gap-4 mb-6">
            {profiles.map(profile => (
              <button
                key={profile.id}
                onClick={() => selectProfile(profile.id)}
                className="relative"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-lg transition-all ${
                  profile.selected 
                    ? 'bg-gradient-to-r from-green-400 to-green-500 ring-4 ring-green-400/30' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}>
                  {profile.initials}
                </div>
                {profile.selected && (
                  <motion.div
                    layoutId="selected-indicator"
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-400 rounded-full"
                  />
                )}
              </button>
            ))}
            
            {/* Add Member Button */}
            <button className="w-16 h-16 rounded-full border-2 border-gray-600 border-dashed flex items-center justify-center text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-colors">
              <Plus className="w-6 h-6" />
            </button>
          </div>

          {/* Selected Profile Info */}
          {selectedProfile && (
            <motion.div
              key={selectedProfile.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white"
            >
              <h1 className="text-3xl font-bold mb-2">{selectedProfile.name}</h1>
              {selectedProfile.abha && (
                <div className="inline-flex items-center gap-2 bg-blue-600/20 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-blue-300">ABHA</span>
                  <span className="text-sm text-white">{selectedProfile.abha}</span>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Your Care Centre Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your care centre</h2>
          
          {/* Cashless Hospitals Card */}
          <Link href="/benefits/hospitals">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-4 flex items-center justify-between mb-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">10,500+ cashless hospitals</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="w-4 h-4">📍</span> across India
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </motion.div>
          </Link>

          {/* Benefit Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {careCenter.map((benefit, index) => (
              <Link key={benefit.id} href={benefit.link}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-2xl p-4 shadow-sm relative"
                >
                  {benefit.badge && (
                    <div className={`absolute -top-2 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${benefit.badgeColor}`}>
                      {benefit.badge}
                    </div>
                  )}
                  
                  <div className="flex flex-col items-start pt-2">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                      <benefit.icon className="w-6 h-6 text-gray-600" />
                    </div>
                    
                    <h3 className="text-sm font-medium text-gray-900 leading-tight">
                      {benefit.title}
                    </h3>
                    
                    <ChevronRight className="w-4 h-4 text-gray-400 mt-2 ml-auto" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Your Health Locker Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your health locker</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {healthLocker.map((item, index) => (
              <Link key={item.id} href={item.link}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                    <item.icon className="w-8 h-8 text-gray-600" />
                  </div>
                  
                  <h3 className="text-sm font-medium text-gray-900">
                    {item.title}
                  </h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}