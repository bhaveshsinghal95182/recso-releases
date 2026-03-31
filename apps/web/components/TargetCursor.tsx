"use client";
import React, { useEffect, useRef, useCallback, useMemo } from 'react'
import { gsap } from 'gsap'

export interface TargetCursorProps {
  targetSelector?: string
  spinDuration?: number
  hideDefaultCursor?: boolean
  hoverDuration?: number
  parallaxOn?: boolean
  proximity?: number
}

const TargetCursor: React.FC<TargetCursorProps> = ({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
  proximity = 0,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null)
  const spinTl = useRef<gsap.core.Timeline | null>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const isActiveRef = useRef(false)
  const activeTargetRef = useRef<Element | null>(null)
  const targetCornerPositionsRef = useRef<{ x: number; y: number }[] | null>(
    null,
  )
  const targetCenterValuesRef = useRef<{ x: number; y: number } | null>(null)
  const tickerFnRef = useRef<(() => void) | null>(null)
  const activeStrengthRef = useRef({ current: 0 })

  // Keep track of all potential targets for proximity checks
  const allTargetsRef = useRef<Element[]>([])

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false
    }

    const isSmallScreen = window.innerWidth <= 768
    const windowWithOpera = window as Window & { opera?: string }
    const userAgent =
      navigator.userAgent || navigator.vendor || windowWithOpera.opera || ''
    const mobileRegex =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase())
    // A better heuristic for "true mobile" versus just "a laptop with a touchscreen"
    // is to check if it's primarily a touch interface without a fine pointer
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    return isSmallScreen && (isCoarsePointer || isMobileUserAgent)
  }, [])

  const constants = useMemo(() => ({ borderWidth: 3, cornerSize: 12 }), [])

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return
    gsap.to(cursorRef.current, { x, y, duration: 0.1, ease: 'power3.out' })
  }, [])

  useEffect(() => {
    if (isMobile || !cursorRef.current) return

    const originalCursor = document.body.style.cursor
    const root = document.documentElement
    const activeStrength = activeStrengthRef.current
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none'
      root.classList.add('cursor-hidden')
    }

    const cursor = cursorRef.current
    cornersRef.current = cursor.querySelectorAll<HTMLDivElement>(
      '.target-cursor-corner',
    )

    let resumeTimeout: ReturnType<typeof setTimeout> | null = null

    // Cache all targets
    const updateAllTargets = () => {
      allTargetsRef.current = Array.from(
        document.querySelectorAll(targetSelector),
      )
    }
    updateAllTargets()
    // Observe DOM changes to update targets list if needed - simplified for now to just run once or on scroll/resize maybe?
    // For now, let's just update on mount and maybe we can export a refresh function if needed.
    // simpler: update on mouse move if efficient enough, but let's stick to cached list for perf.

    // Actually, getting them on mouse move is safer if the DOM changes, but querySelectorAll is slow.
    // Let's rely on a ResizeObserver or MutationObserver if we really need dynamic updates.
    // For this implementation, we will refresh the list on mouse enter of the *document* or periodically?
    // Let's stick to an interval or just refresh for robusteness in a real app, but for now simple caching:
    const mutationObserver = new MutationObserver(updateAllTargets)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    })

    const createSpinTimeline = () => {
      if (spinTl.current) {
        spinTl.current.kill()
      }
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' })
    }

    createSpinTimeline()

    const tickerFn = () => {
      if (
        !targetCornerPositionsRef.current ||
        !cursorRef.current ||
        !cornersRef.current
      ) {
        return
      }
      const strength = activeStrength.current
      if (strength === 0) return
      const cursorX = gsap.getProperty(cursorRef.current, 'x') as number
      const cursorY = gsap.getProperty(cursorRef.current, 'y') as number
      const corners = Array.from(cornersRef.current)
      corners.forEach((corner, i) => {
        const currentX = gsap.getProperty(corner, 'x') as number
        const currentY = gsap.getProperty(corner, 'y') as number
        const targetCorner = targetCornerPositionsRef.current?.[i]
        if (!targetCorner) return
        const targetX = targetCorner.x - cursorX
        const targetY = targetCorner.y - cursorY
        const finalX = currentX + (targetX - currentX) * strength
        const finalY = currentY + (targetY - currentY) * strength
        const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05
        gsap.to(corner, {
          x: finalX,
          y: finalY,
          duration: duration,
          ease: duration === 0 ? 'none' : 'power1.out',
          overwrite: 'auto',
        })
      })

      // Move dot towards target center
      if (dotRef.current && targetCenterValuesRef.current) {
        // target center relative to cursor
        const targetDotX = targetCenterValuesRef.current.x - cursorX
        const targetDotY = targetCenterValuesRef.current.y - cursorY

        // Interpolate based on strength
        // When strength is 0, dot should be at 0,0 relative to cursor (default)
        // When strength is 1, dot should be at targetDotX, targetDotY relative to cursor
        // Wait, 'x' and 'y' on dotRef are transforms relative to its parent (cursor).
        // Cursor is already at cursorX, cursorY.

        // So targetDotX is indeed the vector from cursor to target center.
        const finalDotX = targetDotX * strength
        const finalDotY = targetDotY * strength

        // We use a small duration or just set it if we want it super snappy,
        // but 'strength' is already animated, so we can just set it directly?
        // Actually, if we use gsap.set or .to with short duration it works.
        // Let's use .to with same duration approach as corners for consistency

        const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05

        gsap.to(dotRef.current, {
          x: finalDotX,
          y: finalDotY,
          duration: duration,
          ease: duration === 0 ? 'none' : 'power1.out',
          overwrite: 'auto',
        })
      }
    }

    tickerFnRef.current = tickerFn

    // Helper functions

    const deactivateTarget = (target: Element) => {
      if (activeTargetRef.current !== target) return

      gsap.ticker.remove(tickerFnRef.current!)
      isActiveRef.current = false
      targetCornerPositionsRef.current = null
      targetCenterValuesRef.current = null
      gsap.set(activeStrength, { current: 0, overwrite: true })
      activeTargetRef.current = null

      // Reset dot position
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power3.out',
        })
      }

      if (cornersRef.current) {
        const corners = Array.from(cornersRef.current)
        gsap.killTweensOf(corners)
        const { cornerSize } = constants
        const positions = [
          { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: cornerSize * 0.5 },
          { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
        ]
        const tl = gsap.timeline()
        corners.forEach((corner, index) => {
          const position = positions[index]
          if (!position) return
          tl.to(
            corner,
            {
              x: position.x,
              y: position.y,
              duration: 0.3,
              ease: 'power3.out',
            },
            0,
          )
        })
      }

      resumeTimeout = setTimeout(() => {
        if (!activeTargetRef.current && cursorRef.current && spinTl.current) {
          const currentRotation = gsap.getProperty(
            cursorRef.current,
            'rotation',
          ) as number
          const normalizedRotation = currentRotation % 360
          spinTl.current.kill()
          spinTl.current = gsap.timeline({ repeat: -1 }).to(cursorRef.current, {
            rotation: '+=360',
            duration: spinDuration,
            ease: 'none',
          })

          gsap.to(cursorRef.current, {
            rotation: normalizedRotation + 360,
            duration: spinDuration * (1 - normalizedRotation / 360),
            ease: 'none',
            onComplete: () => {
              spinTl.current?.restart()
            },
          })
        }
        resumeTimeout = null
      }, 50)
    }

    const activateTarget = (target: Element) => {
      if (!cursorRef.current || !cornersRef.current) return
      if (activeTargetRef.current === target) return

      if (activeTargetRef.current) {
        deactivateTarget(activeTargetRef.current)
      }

      if (resumeTimeout) {
        clearTimeout(resumeTimeout)
        resumeTimeout = null
      }

      activeTargetRef.current = target
      const corners = Array.from(cornersRef.current)
      corners.forEach((corner) => gsap.killTweensOf(corner))
      gsap.killTweensOf(cursorRef.current, 'rotation')
      spinTl.current?.pause()
      gsap.set(cursorRef.current, { rotation: 0 })

      const rect = target.getBoundingClientRect()
      const { borderWidth, cornerSize } = constants
      const cursorX = gsap.getProperty(cursorRef.current, 'x') as number
      const cursorY = gsap.getProperty(cursorRef.current, 'y') as number

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      targetCenterValuesRef.current = { x: centerX, y: centerY }

      targetCornerPositionsRef.current = [
        { x: rect.left - borderWidth, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
        {
          x: rect.right + borderWidth - cornerSize,
          y: rect.bottom + borderWidth - cornerSize,
        },
        {
          x: rect.left - borderWidth,
          y: rect.bottom + borderWidth - cornerSize,
        },
      ]

      isActiveRef.current = true
      gsap.ticker.add(tickerFnRef.current!)

      gsap.to(activeStrength, {
        current: 1,
        duration: hoverDuration,
        ease: 'power2.out',
      })

      corners.forEach((corner, i) => {
        const targetCorner = targetCornerPositionsRef.current?.[i]
        if (!targetCorner) return
        gsap.to(corner, {
          x: targetCorner.x - cursorX,
          y: targetCorner.y - cursorY,
          duration: 0.2,
          ease: 'power2.out',
        })
      })
    }

      const getProximity = (element: Element) => {
        let className = ''
        if (element.classList) {
           // use classList for robustness, or handle SVGAnimatedString
           const cn = element.className as string | SVGAnimatedString
           className = typeof cn === 'object' && 'baseVal' in cn 
             ? cn.baseVal 
             : String(cn)
        }
        
        if (!className) return proximity

        const classes = className.split(' ')
        const proximityClass = classes.find((c) => c.startsWith('proximity-'))
        if (proximityClass) {
          const proximityValue = proximityClass.split('-')[1]
          if (!proximityValue) return proximity
          const value = parseInt(proximityValue, 10)
          return isNaN(value) ? proximity : value
        }
        return proximity
      }

    const moveHandler = (e: MouseEvent) => {
      moveCursor(e.clientX, e.clientY)

      // Proximity Logic
      if (allTargetsRef.current.length > 0) {
        let closestTarget: Element | null = null
        let minDistance = Infinity

        allTargetsRef.current.forEach((target) => {
          const rect = target.getBoundingClientRect()
          const targetProximity = getProximity(target)
          
          // Calculate distance to the nearest point on the rectangle (clamping)
          const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right)
          const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom)
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance <= targetProximity && distance < minDistance) {
            minDistance = distance
            closestTarget = target
          }
        })

        if (closestTarget) {
          activateTarget(closestTarget)
        } else if (activeTargetRef.current) {
          const targetProximity = getProximity(activeTargetRef.current)
           // Check if we are actually hovering the active target (std mouseover behavior backup)
           // OR if we are still within the variable proximity of the active target
           // (This prevents flickering at the edge if we entered via a larger proximity)
           
           // Re-calculate distance to active target
           const rect = activeTargetRef.current.getBoundingClientRect()
           const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right)
           const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom)
           const distance = Math.sqrt(dx * dx + dy * dy)

           if (distance > targetProximity) {
             deactivateTarget(activeTargetRef.current)
           }
        }
      }
    }

    window.addEventListener('mousemove', moveHandler)

    const scrollHandler = () => {
      if (!activeTargetRef.current || !cursorRef.current) return

      // Update position references if we needed to, but we mostly care if we scrolled away
      // If we scroll, the mouse stays relative to screen, but elements move.
      // So we should re-run proximity check actually?
      // Ideally moveHandler logic should run on scroll too.
      // reusing existing logic:
      const mouseX = gsap.getProperty(cursorRef.current, 'x') as number
      const mouseY = gsap.getProperty(cursorRef.current, 'y') as number
      // We can synthesize a mouse event or just copy the logic.
      // For simplicity, let's just do a basic check similar to original:

      if (proximity === 0) {
        const elementUnderMouse = document.elementFromPoint(mouseX, mouseY)
        const isStillOverTarget =
          elementUnderMouse &&
          (elementUnderMouse === activeTargetRef.current ||
            elementUnderMouse.closest(targetSelector) ===
              activeTargetRef.current)
        if (!isStillOverTarget) {
          deactivateTarget(activeTargetRef.current)
        }
      } else {
        // With proximity, simpler check: is the active target still within range?
        // We might need the last mouse position effectively.
        // Let's rely on the next mousemove or just let the user move the mouse to update.
      }
    }
    window.addEventListener('scroll', scrollHandler, { passive: true })

    const mouseDownHandler = () => {
      if (!dotRef.current) return
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 })
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 })
    }

    const mouseUpHandler = () => {
      if (!dotRef.current) return
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 })
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 })
    }

    window.addEventListener('mousedown', mouseDownHandler)
    window.addEventListener('mouseup', mouseUpHandler)

    // Fallback for when proximity is 0 or to catch basic hovers efficiently
    const enterHandler = (e: MouseEvent) => {
      // If proximity is on, we handle it in moveHandler mostly, but this helps for direct enters if mouse didn't move much (e.g. on load)
      const directTarget = e.target as Element
      if (!directTarget.matches) return // guard

      const target = directTarget.matches(targetSelector)
        ? directTarget
        : directTarget.closest(targetSelector)

      if (target) {
        activateTarget(target)
      }
    }

    const clickProxyHandler = (e: MouseEvent) => {
      if (proximity > 0 && activeTargetRef.current) {
        const target = activeTargetRef.current as HTMLElement
        // If the actual click target is NOT the active target (or inside it)
        // It means we clicked in the "magnetic" gap.
        if (e.target !== target && !target.contains(e.target as Node)) {
          e.preventDefault()
          e.stopPropagation()
          target.click()
        }
      }
    }

    // We only need this if proximity is 0 really, but it doesn't hurt to have both.
    // If proximity > 0, moveHandler will likely trigger first.
    if (proximity === 0) {
      window.addEventListener('mouseover', enterHandler as EventListener)
    }

    if (proximity > 0) {
      window.addEventListener('click', clickProxyHandler, { capture: true })
    }

    return () => {
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current)
      }
      window.removeEventListener('mousemove', moveHandler)
      if (proximity === 0) {
        window.removeEventListener('mouseover', enterHandler as EventListener)
      }
      if (proximity > 0) {
        window.removeEventListener('click', clickProxyHandler, {
          capture: true,
        })
      }
      window.removeEventListener('scroll', scrollHandler)
      window.removeEventListener('mousedown', mouseDownHandler)
      window.removeEventListener('mouseup', mouseUpHandler)
      mutationObserver.disconnect()

      spinTl.current?.kill()
      document.body.style.cursor = originalCursor
      if (hideDefaultCursor) {
        root.classList.remove('cursor-hidden')
      }
      isActiveRef.current = false
      targetCornerPositionsRef.current = null
      activeStrength.current = 0
    }
  }, [
    targetSelector,
    spinDuration,
    moveCursor,
    constants,
    hideDefaultCursor,
    isMobile,
    hoverDuration,
    parallaxOn,
    proximity,
  ])

  useEffect(() => {
    if (isMobile || !cursorRef.current || !spinTl.current) return
    if (spinTl.current.isActive()) {
      spinTl.current.kill()
      spinTl.current = gsap.timeline({ repeat: -1 }).to(cursorRef.current, {
        rotation: '+=360',
        duration: spinDuration,
        ease: 'none',
      })
    }
  }, [spinDuration, isMobile])

  if (isMobile) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-9999"
      style={{ willChange: 'transform' }}
    >
      <div
        ref={dotRef}
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-white -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0"
        style={{ willChange: 'transform' }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-white translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0"
        style={{ willChange: 'transform' }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-white translate-x-1/2 translate-y-1/2 border-l-0 border-t-0"
        style={{ willChange: 'transform' }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-white -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0"
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}

export default TargetCursor
