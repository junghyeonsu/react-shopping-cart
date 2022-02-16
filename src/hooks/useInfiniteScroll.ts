import { useRef, useState, useEffect, RefObject } from 'react'

const useInfiniteScroll = (targetEl: RefObject<HTMLDivElement | null>) => {
  const [intersecting, setIntersecting] = useState(false)
  const observerRef = useRef<any>(null)
  const initiating = useRef(true)

  const getObserver = () => {
    if (!targetEl.current) return null
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(entries => {
        const intersecting = entries.some(entry => entry.isIntersecting)
        if (!initiating.current) {
          setIntersecting(intersecting)
          return
        }
        initiating.current = intersecting
      })
    }
    return observerRef.current
  }

  const destroyObserver = () => {
    getObserver()?.disconnect()
    observerRef.current = null
  }

  useEffect(() => {
    if (targetEl.current) getObserver()?.observe(targetEl.current)
  }, [targetEl?.current])

  useEffect(() => {
    return () => {
      destroyObserver()
    }
  }, [])

  return { intersecting }
}

export default useInfiniteScroll
