import { ReactNode } from 'react'
import classes from './List.module.css'

type IListProps = {
  children: ReactNode
}

export function List({ children }: IListProps) {
  return <div className={classes.listContainer}>{children}</div>
}
