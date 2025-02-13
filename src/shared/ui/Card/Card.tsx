import { ReactNode } from 'react'
import cls from './Card.module.css'
import { classNames } from '../../lib/classNames'

type ICardProps = {
  children: ReactNode
  hover?: boolean
}

export function Card({ children, hover = true }: ICardProps) {
  const classes = classNames(cls.card, { [cls.hover]: hover })

  return <div className={classes}>{children}</div>
}
