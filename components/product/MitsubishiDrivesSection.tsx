"use client";

import React, { useState } from 'react';
import { DynamicProductGrid, BrochureDownload } from '@/components/product';
import { 
  getMitsubishiSubcategoriesByCategory, 
  getMitsubishiProductsByCategoryAndSubcategory 
} from '@/lib/products/mitsubishi-products';
import Link from 'next/link';

const MitsubishiDrivesSection: React.FC = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  
  const driveSubcategories = getMitsubishiSubcategoriesByCategory("Variable Frequency Drives");
  const products = selectedSubcategory 
    ? getMitsubishiProductsByCategoryAndSubcategory("Variable Frequency Drives", selectedSubcategory)
    : [];
  
  const brochures = [
    {
      name: "FR-A800 Plus Series Catalog",
      url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
      type: "pdf" as const
    },
    {
      name: "FR-F800 Series Catalog",
      url: "/downloads/mitsubishi/drives/fr-f800-catalog.pdf",
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {driveSubcategories.includes("FR-A800 Plus Series Inverters") && (
          <div 
            className={`bg-slate-50 p-6 rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md ${
              selectedSubcategory === "FR-A800 Plus Series Inverters" ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedSubcategory(
              selectedSubcategory === "FR-A800 Plus Series Inverters" 
                ? null 
                : "FR-A800 Plus Series Inverters"
            )}
          >
            <h3 className="text-xl font-semibold mb-3">FR-A800 Plus Series Inverters</h3>
            <p className="text-gray-700">
              The premium inverter with advanced functionality and enhanced drive control capability.
              Ideal for precise motion control and applications requiring high-performance drives.
            </p>
          </div>
        )}
        
        {driveSubcategories.includes("FR-F800 Series Inverters") && (
          <div 
            className={`bg-slate-50 p-6 rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md ${
              selectedSubcategory === "FR-F800 Series Inverters" ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedSubcategory(
              selectedSubcategory === "FR-F800 Series Inverters" 
                ? null 
                : "FR-F800 Series Inverters"
            )}
          >
            <h3 className="text-xl font-semibold mb-3">FR-F800 Series Inverters</h3>
            <p className="text-gray-700">
              Designed specifically for fan, pump, and HVAC applications with exceptional 
              energy-saving features and optimized performance for fluid flow control.
              These drives excel in applications where continuous, efficient operation is critical.
            </p>
          </div>
        )}
      </div>
      
      {selectedSubcategory ? (
        <>
          <h3 className="text-xl font-bold mb-4">{selectedSubcategory}</h3>
          <DynamicProductGrid products={products} />
          <div className="mt-6 mb-8">
            <button 
              onClick={() => setSelectedSubcategory(null)} 
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all drives
            </button>
          </div>
        </>
      ) : (
        <p className="text-lg text-center mb-6">
          Select a drive series above to view available products
        </p>
      )}
      
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