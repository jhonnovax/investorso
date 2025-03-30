'use client'

import { useState, useEffect } from 'react'

// Tailwind CSS default breakpoints
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('')

  useEffect(() => {
    // Handler to update breakpoint state
    const handleResize = () => {
      const width = window.innerWidth
      
      if (width < BREAKPOINTS.sm) {
        setBreakpoint('xs')
      } else if (width < BREAKPOINTS.md) {
        setBreakpoint('sm')
      } else if (width < BREAKPOINTS.lg) {
        setBreakpoint('md')
      } else if (width < BREAKPOINTS.xl) {
        setBreakpoint('lg')
      } else if (width < BREAKPOINTS['2xl']) {
        setBreakpoint('xl')
      } else {
        setBreakpoint('2xl')
      }
    }

    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Call handler right away to set initial breakpoint
    handleResize()

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoint
}

export default useBreakpoint 