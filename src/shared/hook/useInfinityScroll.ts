import { RefObject, useEffect, useRef } from 'react'

export type IUseInfinitiScrollProps<T> = {
  onScrollEnd: () => void
  triggerRef: RefObject<T>
  intersectionOptions?: IntersectionObserverInit
}

export function useInfinitiScroll<T extends HTMLElement = HTMLElement>({
  onScrollEnd,
  triggerRef,
  intersectionOptions,
}: IUseInfinitiScrollProps<T>) {
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const triggerElement = triggerRef.current

    if (onScrollEnd) {
      const options = {
        root: null,
        rootMargin: '350px',
        threshold: 1.0,
        ...intersectionOptions,
      }

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          onScrollEnd()
        }
      }, options)

      if (triggerElement) {
        observer.current.observe(triggerElement)
      }
    }

    return () => {
      if (observer.current && triggerElement) {
        observer.current.unobserve(triggerElement)
      }
    }
  }, [intersectionOptions, onScrollEnd, triggerRef])
}
