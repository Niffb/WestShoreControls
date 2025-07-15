import React from 'react';
import { Metadata } from 'next';
import { MitsubishiDrivesSection } from '@/components/product';

export const metadata: Metadata = {
  title: 'Mitsubishi Electric Products | West Shore Controls',
  description: 'Explore our range of premium Mitsubishi Electric products including variable frequency drives, automation components, and control systems.',
};

export default function MitsubishiPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-6 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Mitsubishi Electric</h1>
          <p className="text-lg mb-8 max-w-3xl">
            West Shore Controls is proud to be a distributor of Mitsubishi Electric Factory Automation products. 
            Mitsubishi Electric offers a comprehensive lineup of automation equipment, featuring cutting-edge 
            technologies for industrial use including PLCs, HMIs, variable frequency drives, servo systems, and more.
          </p>
          
          {/* Featured Section - Drives */}
          <MitsubishiDrivesSection />
        </div>
      </div>
    </div>
  );
} 