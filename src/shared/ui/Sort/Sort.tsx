import { ChangeEvent } from 'react'
import { ISortOrder, SORT_ORDER } from '../../types/sort'
import cls from './Sort.module.css'

export type ISortChange = (sort: ISortOrder) => void

export type ISortProps = {
  sortOrder?: ISortOrder
  sortChange?: ISortChange
}

export function Sort({ sortOrder = 'asc', sortChange }: ISortProps) {
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    sortChange?.(e.target.value as ISortOrder)
  }

  return (
    <div className={cls.container}>
      <span>Сортировка</span>
      <select value={sortOrder} onChange={e => handleSortChange(e)}>
        <option value={SORT_ORDER.asc}>ASC</option>
        <option value={SORT_ORDER.desc}>DESC</option>
      </select>
    </div>
  )
}
