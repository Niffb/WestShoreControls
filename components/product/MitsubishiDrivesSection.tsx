"use client";

import React from 'react';
import { DynamicProductGrid, BrochureDownload } from '@/components/product';
import { getMitsubishiProductsByCategory } from '@/lib/products/mitsubishi-products';

const MitsubishiDrivesSection: React.FC = () => {
  const mitsubishiDrives = getMitsubishiProductsByCategory("Variable Frequency Drives");
  
  const brochures = [
    {
      name: "FR-A800 Plus Series Catalog",
      url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
      type: "pdf" as const
    },
    {
      name: "MilServo J2 Super Brochure",
      url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
      type: "pdf" as const
    },
    {
      name: "FR-A800 for Roll-to-Roll Applications",
      url: "/downloads/mitsubishi/drives/fr-a800-for-roll-to-roll.pdf",
      type: "pdf" as const
    },
    {
      name: "FR-A800 Series for Cranes",
      url: "/downloads/mitsubishi/drives/fr-a800-series-for-cranes.pdf",
      type: "pdf" as const
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Mitsubishi Electric Drives</h2>
      <p className="mb-8 text-gray-700">
        Explore our comprehensive range of Mitsubishi Electric Variable Frequency Drives, 
        offering advanced motor control, enhanced energy savings, and superior system 
        integration capabilities for various industrial applications.
      </p>
      
      <DynamicProductGrid products={mitsubishiDrives} />
      
      <div className="mt-12">
        <BrochureDownload
          title="Mitsubishi Drive Brochures"
          brochures={brochures}
          className="max-w-4xl mx-auto"
        />
      </div>
    </div>
  );
};

export default MitsubishiDrivesSection; 