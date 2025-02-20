import { ReactNode, useRef } from 'react'
import { useInfinitiScroll } from '../hook/useInfinityScroll'

export type IInifinityScrollProps = {
  children: ReactNode
  onScrollEnd: () => void
}

export function InfinityScroll({ children, onScrollEnd }: IInifinityScrollProps) {
  const triggerRef = useRef<HTMLDivElement>(null)

  useInfinitiScroll<HTMLDivElement>({ onScrollEnd, triggerRef })

  return (
    <>
      {children}
      <div ref={triggerRef} style={{ width: '1px', height: '1px', position: 'absolute' }} />
    </>
  )
}
