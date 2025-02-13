import { ISortOrder } from '../types/sort'

export function sortDate(order: ISortOrder, lhv: string, rhv: string) {
  const sortMethod = order === 'asc' ? 1 : -1

  const date1 = Date.parse(lhv)
  const date2 = Date.parse(rhv)

  if (date1 < date2) {
    return -1 * sortMethod
  }

  if (date1 > date2) {
    return 1 * sortMethod
  }
  return 0
}
