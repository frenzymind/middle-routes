import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { ISortOrder, SORT_PARAM, SORT_ORDER } from '../../types/sort'

export function useSortParams(): [ISortOrder, (newOrder: ISortOrder) => void] {
  const [params, setParams] = useSearchParams()
  const [order, setOrder] = useState<ISortOrder>('asc')

  useEffect(() => {
    const sort = params.get(SORT_PARAM)

    if (!sort || (sort !== SORT_ORDER.asc && sort !== SORT_ORDER.desc)) {
      setParams({ [SORT_PARAM]: SORT_ORDER.asc })
      setOrder('asc')

      return
    }

    setOrder(sort as ISortOrder)
  }, [])

  const setSortOrder = useCallback((newOrder: ISortOrder) => {
    setParams({ [SORT_PARAM]: newOrder })
    setOrder(newOrder)
  }, [])

  return [order, setSortOrder]
}
