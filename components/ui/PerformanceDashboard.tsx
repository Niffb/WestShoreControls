'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePerformanceMonitor } from '@/lib/utils/performance-utils'
import { XMarkIcon, ChartBarIcon, ClockIcon, EyeIcon } from '@heroicons/react/24/outline'

interface VitalMetrics {
  fcp: number | null
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
}

interface PerformanceDashboardProps {
  isVisible: boolean
  onClose: () => void
}

export default function PerformanceDashboard({ isVisible, onClose }: PerformanceDashboardProps) {
  const [vitals, setVitals] = useState<VitalMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null
  })
  const [customMetrics, setCustomMetrics] = useState<Record<string, any>>({})
  const [isMinimized, setIsMinimized] = useState(false)
  const { getMetrics } = usePerformanceMonitor()

  // Collect basic performance metrics
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Basic performance timing
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming
          setVitals(prev => ({
            ...prev,
            fcp: navEntry.loadEventEnd - navEntry.fetchStart,
            ttfb: navEntry.responseStart - navEntry.fetchStart
          }))
        }
      }
    })

    if ('PerformanceObserver' in window) {
      observer.observe({ entryTypes: ['navigation'] })
    }

    return () => observer.disconnect()
  }, [])

  // Update custom metrics
  useEffect(() => {
    const interval = setInterval(() => {
      const metrics = getMetrics()
      setCustomMetrics(metrics)
    }, 1000)

    return () => clearInterval(interval)
  }, [getMetrics])

  const getScoreColor = (metric: string, value: number) => {
    const thresholds: Record<string, { good: number; needs: number }> = {
      fcp: { good: 1800, needs: 3000 },
      lcp: { good: 2500, needs: 4000 },
      fid: { good: 100, needs: 300 },
      cls: { good: 0.1, needs: 0.25 },
      ttfb: { good: 800, needs: 1800 }
    }

    const threshold = thresholds[metric]
    if (!threshold) return 'text-gray-500'
    
    if (value <= threshold.good) return 'text-green-500'
    if (value <= threshold.needs) return 'text-yellow-500'
    return 'text-red-500'
  }

  const formatValue = (value: number | null, unit: string = 'ms') => {
    if (value === null) return 'Loading...'
    return `${value.toFixed(1)}${unit}`
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 max-w-md"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <ChartBarIcon className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-900">Performance</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <EyeIcon className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <XMarkIcon className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 space-y-4">
                {/* Core Web Vitals */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    Core Web Vitals
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>FCP:</span>
                      <span className={getScoreColor('fcp', vitals.fcp || 0)}>
                        {formatValue(vitals.fcp)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>LCP:</span>
                      <span className={getScoreColor('lcp', vitals.lcp || 0)}>
                        {formatValue(vitals.lcp)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>FID:</span>
                      <span className={getScoreColor('fid', vitals.fid || 0)}>
                        {formatValue(vitals.fid)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>CLS:</span>
                      <span className={getScoreColor('cls', vitals.cls || 0)}>
                        {formatValue(vitals.cls, '')}
                      </span>
                    </div>
                    <div className="flex justify-between col-span-2">
                      <span>TTFB:</span>
                      <span className={getScoreColor('ttfb', vitals.ttfb || 0)}>
                        {formatValue(vitals.ttfb)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Custom Metrics */}
                {Object.keys(customMetrics).length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Custom Metrics</h4>
                    <div className="space-y-1 text-sm">
                      {Object.entries(customMetrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key.replace('-', ' ')}:</span>
                          <span className="text-gray-600">
                            {value.average?.toFixed(1)}ms (avg) | {value.count} samples
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Memory Usage (if available) */}
                {(performance as any).memory && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Memory</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Used:</span>
                        <span>{((performance as any).memory.usedJSHeapSize / 1024 / 1024).toFixed(1)} MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Limit:</span>
                        <span>{((performance as any).memory.jsHeapSizeLimit / 1024 / 1024).toFixed(1)} MB</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Performance Score */}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Overall Score</span>
                    <div className="flex items-center space-x-2">
                      {vitals.lcp && vitals.fcp && vitals.cls !== null && (
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          vitals.lcp <= 2500 && vitals.fcp <= 1800 && vitals.cls <= 0.1
                            ? 'bg-green-100 text-green-800'
                            : vitals.lcp <= 4000 && vitals.fcp <= 3000 && vitals.cls <= 0.25
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {vitals.lcp <= 2500 && vitals.fcp <= 1800 && vitals.cls <= 0.1
                            ? 'Good'
                            : vitals.lcp <= 4000 && vitals.fcp <= 3000 && vitals.cls <= 0.25
                            ? 'Needs Improvement'
                            : 'Poor'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

// Hook to easily toggle performance dashboard
export const usePerformanceDashboard = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggle = useCallback(() => {
    setIsVisible(prev => !prev)
  }, [])

  const show = useCallback(() => {
    setIsVisible(true)
  }, [])

  const hide = useCallback(() => {
    setIsVisible(false)
  }, [])

  // Keyboard shortcut to toggle (Ctrl/Cmd + Shift + P)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'P') {
        event.preventDefault()
        toggle()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toggle])

  return {
    isVisible,
    toggle,
    show,
    hide,
    Dashboard: ({ onClose = hide }: { onClose?: () => void }) => (
      <PerformanceDashboard isVisible={isVisible} onClose={onClose} />
    )
  }
} 