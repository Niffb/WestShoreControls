'use client'

import { useEffect, useState } from 'react'
import { PerformanceMonitor } from '@/lib/utils/performance-utils'

interface PerformanceMonitorProps {
  enabled?: boolean
  showDebugInfo?: boolean
}

export default function PerformanceMonitorComponent({ 
  enabled = process.env.NODE_ENV === 'development',
  showDebugInfo = false 
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<Record<string, any>>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return

    const monitor = PerformanceMonitor.getInstance()
    
    // Update metrics every 5 seconds
    const interval = setInterval(() => {
      const currentMetrics = monitor.getMetrics()
      setMetrics(currentMetrics)
    }, 5000)

    // Keyboard shortcut to toggle visibility (Ctrl+Shift+P)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [enabled, isVisible])

  if (!enabled || (!isVisible && !showDebugInfo)) return null

  const hasSlowOperations = Object.values(metrics).some(
    (metric: any) => metric.average > 100
  )

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Performance Monitor</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {hasSlowOperations && (
          <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
            ⚠️ Slow operations detected
          </div>
        )}

        <div className="space-y-2">
          {Object.entries(metrics).map(([operation, metric]: [string, any]) => (
            <div key={operation} className="text-xs">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{operation}</span>
                <span className={`${metric.average > 100 ? 'text-red-600' : 'text-green-600'}`}>
                  {metric.average.toFixed(1)}ms
                </span>
              </div>
              <div className="text-gray-500">
                Count: {metric.count} | Latest: {metric.latest.toFixed(1)}ms
              </div>
            </div>
          ))}
        </div>

        {Object.keys(metrics).length === 0 && (
          <div className="text-xs text-gray-500 text-center py-2">
            No performance data available
          </div>
        )}

        <div className="mt-3 pt-2 border-t border-gray-200 text-xs text-gray-500">
          Press Ctrl+Shift+P to toggle
        </div>
      </div>
    </div>
  )
}

// Hook for measuring component performance
export function usePerformanceMeasure(operationName: string) {
  useEffect(() => {
    const monitor = PerformanceMonitor.getInstance()
    const endMeasure = monitor.startMeasure(operationName)
    
    return () => {
      endMeasure()
    }
  }, [operationName])
}

// Higher-order component for automatic performance measurement
export function withPerformanceMonitoring<T extends object>(
  Component: React.ComponentType<T>,
  operationName?: string
) {
  return function PerformanceMonitoredComponent(props: T) {
    const componentName = operationName || Component.displayName || Component.name || 'Component'
    usePerformanceMeasure(`render-${componentName}`)
    
    return <Component {...props} />
  }
} 