import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to top on route change. When navigation carries `state.scrollTo`
 * (an element id), waits for that element to mount and scrolls to it instead.
 */
export default function ScrollTop() {
  const { pathname, state } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)

    const targetId = (state as { scrollTo?: string } | null)?.scrollTo
    if (!targetId) return

    let attempts = 0
    const timer = window.setInterval(() => {
      const el = document.getElementById(targetId)
      attempts += 1
      if (el) {
        window.clearInterval(timer)
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else if (attempts > 40) {
        window.clearInterval(timer)
      }
    }, 100)

    return () => window.clearInterval(timer)
  }, [pathname, state])

  return null
}
