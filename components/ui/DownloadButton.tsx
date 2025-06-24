'use client'

import { useState } from 'react'
import { ArrowDownTrayIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface DownloadButtonProps {
  downloadUrl: string
  filename: string
  fileSize?: string
  className?: string
  variant?: 'primary' | 'secondary' | 'gradient'
  onDownloadComplete?: () => void
}

export default function DownloadButton({
  downloadUrl,
  filename,
  fileSize,
  className = '',
  variant = 'primary',
  onDownloadComplete
}: DownloadButtonProps) {
  const [isDownloaded, setIsDownloaded] = useState(false)

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-600 hover:bg-primary-700 text-white'
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 text-white'
      case 'gradient':
        return 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white'
      default:
        return 'bg-primary-600 hover:bg-primary-700 text-white'
    }
  }

  const handleDownloadClick = () => {
    setIsDownloaded(true)
    onDownloadComplete?.()
  }

  // Convert API URL to direct file URL
  const directDownloadUrl = downloadUrl.startsWith('/api/download/') 
    ? downloadUrl.replace('/api/download/', '/downloads/')
    : downloadUrl

  return (
    <a
      href={directDownloadUrl}
      download={filename}
      onClick={handleDownloadClick}
      className={`
        inline-flex items-center justify-center space-x-2 px-4 py-3 
        font-medium rounded-lg transition-all duration-200 
        hover:shadow-lg transform hover:-translate-y-0.5
        ${getVariantClasses()} ${className}
        ${isDownloaded ? 'opacity-75' : ''}
      `}
    >
      {isDownloaded ? (
        <>
          <CheckCircleIcon className="h-5 w-5" />
          <span>Downloaded</span>
        </>
      ) : (
        <>
          <ArrowDownTrayIcon className="h-5 w-5" />
          <span>Download {fileSize && `(${fileSize})`}</span>
        </>
      )}
    </a>
  )
} 