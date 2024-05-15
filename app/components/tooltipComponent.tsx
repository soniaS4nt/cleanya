'use client'
import React, { useState, ReactNode } from 'react'

interface TooltipProps {
  children: ReactNode
  className?: string
  content: any
  direction?: 'top' | 'right' | 'bottom' | 'left'
  delay?: number
}

export default function Tooltip({
  children,
  className = '',
  content,
  direction = 'top',
  delay = 400,
}: TooltipProps) {
  const [active, setActive] = useState(false)
  let timeout: NodeJS.Timeout

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true)
    }, delay)
  }

  const hideTip = () => {
    clearTimeout(timeout)
    setActive(false)
  }

  return (
    <div
      className={`Tooltip-Wrapper ${className}`}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && <div className={`Tooltip-Tip ${direction}`}>{content}</div>}
    </div>
  )
}
