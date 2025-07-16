"use client";

import React from 'react';
import { FiDownload } from 'react-icons/fi';

interface Brochure {
  name: string;
  url: string;
  type: 'pdf' | 'doc' | 'other';
}

interface BrochureDownloadProps {
  title?: string;
  brochures: Brochure[];
  className?: string;
}

const BrochureDownload: React.FC<BrochureDownloadProps> = ({ 
  title = "Product Brochures", 
  brochures, 
  className = "" 
}) => {
  if (!brochures || brochures.length === 0) {
    return null;
  }

  return (
    <div className={`mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200 ${className}`}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-2">
        {brochures.map((brochure, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 bg-white rounded hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-red-100 text-red-500 mr-3">
                <FiDownload className="h-5 w-5" />
              </div>
              <span className="font-medium">{brochure.name}</span>
              <span className="ml-2 text-xs uppercase bg-gray-200 px-2 py-0.5 rounded text-gray-600">
                {brochure.type}
              </span>
            </div>
            <a
              href={brochure.url}
              download={brochure.name}
              className="px-3 py-1 text-sm font-medium text-blue-600 rounded-md hover:bg-blue-50"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrochureDownload; 