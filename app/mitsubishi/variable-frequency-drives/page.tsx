'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

// Main VFD categories to display as cards
const vfdCategories = [
  {
    id: 'a800',
    name: 'FR-A800 Plus Series Inverters',
    slug: 'a800-series',
    description: 'Premium inverters with advanced features and high performance for demanding applications',
    image: '/a800.png',
    features: [
      'Advanced energy-saving algorithms',
      'Integrated PLC functionality',
      'Enhanced system protection features',
      'Extended life design'
    ]
  },
  {
    id: 'f800',
    name: 'FR-F800 Series Inverters',
    slug: 'f800-series',
    description: 'Specialized for fan and pump applications with optimized energy efficiency',
    image: '/f800.png',
    features: [
      'Optimized for HVAC applications',
      'Advanced PID control',
      'Energy-saving functions',
      'Long life design'
    ]
  }
];

export default function VariableFrequencyDrivesPage() {
  const [isClient, setIsClient] = useState(false);

  // Debug: Check if images load properly
  useEffect(() => {
    setIsClient(true);
    console.log('VFD Categories images paths:', vfdCategories.map(cat => cat.image));
    
    // Test image loading
    vfdCategories.forEach(cat => {
      const img = new Image();
      img.onload = () => console.log(`Image loaded successfully: ${cat.image}`);
      img.onerror = () => console.error(`Failed to load image: ${cat.image}`);
      img.src = cat.image;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5 relative">
      {/* Hero Section */}
      <motion.section   
        className="relative pt-24 pb-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/30 to-red-800/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-800/30 to-red-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav 
            className="flex items-center space-x-2 text-sm mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/" 
              className="text-gray-500 hover:text-red-600 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              href="/mitsubishi"
              className="text-gray-500 hover:text-red-600 transition-colors flex items-center"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Mitsubishi
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-red-600 font-medium">Variable Frequency Drives</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div>
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-transparent bg-gradient-to-r from-red-500 to-red-900 bg-clip-text">
                  Mitsubishi
                </span>
                <br />
                Variable Frequency Drives
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Explore our range of premium Mitsubishi variable frequency drives, optimized for various industrial applications.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* VFD Categories Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vfdCategories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <Link href={`/mitsubishi/variable-frequency-drives/${category.slug}`} className="block h-full">
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-contain p-6"
                      style={{ border: '1px solid red' }}
                      onError={(e) => {
                        console.error(`Error loading image: ${category.image}`);
                        e.currentTarget.src = '/images/brands/westlogo.webp'; // Fallback
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Key Features:</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {category.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <svg className="h-4 w-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <span className="inline-flex items-center text-red-600 font-medium hover:text-red-800">
                        View Products
                        <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 