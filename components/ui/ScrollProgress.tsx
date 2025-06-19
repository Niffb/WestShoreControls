'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-blue to-accent-green z-[60] origin-left"
        style={{ scaleX }}
      />
      
      {/* Scroll Progress Circle */}
      <motion.div
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-white shadow-lg border-2 border-primary-500 flex items-center justify-center z-50 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: scrollYProgress.get() > 0.1 ? 1 : 0,
          scale: scrollYProgress.get() > 0.1 ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M12 2L12 22M12 2L18 8M12 2L6 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-500"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        
        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
          <motion.path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="100, 100"
            className="text-primary-500"
            style={{
              strokeDashoffset: `${100 - scrollYProgress.get() * 100}`,
            }}
          />
        </svg>
      </motion.div>
    </>
  )
} 