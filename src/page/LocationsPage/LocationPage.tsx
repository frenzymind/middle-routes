import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { InfinityScroll } from '../../shared/hoc/InfinityScroll'
import { useFetch } from '../../shared/hook/useFetch'
import { useSortParams } from '../../shared/hook/useSortParams/useSortParams'
import { sortDate } from '../../shared/lib/sortDate'
import { IRickAndMortyResponse } from '../../shared/types/api'
import { ISortOrder } from '../../shared/types/sort'
import { Card } from '../../shared/ui/Card/Card'
import { List } from '../../shared/ui/List/LIst'
import { Sort } from '../../shared/ui/Sort/Sort'
import { ILocation } from './types'

export function LocationPage() {
  const [order, setOrder] = useSortParams()
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const { data, error, isLoading, sendRequest } = useFetch<IRickAndMortyResponse<ILocation>>(
    'https://rickandmortyapi.com/api/location'
  )
  const [locations, setLocations] = useState<ILocation[]>([])

  useEffect(() => {
    sendRequest({
      params: {
        page,
      },
    })
  }, [page, sendRequest])

  useEffect(() => {
    if (!data) {
      setLocations([])
      return
    }

    if (data.info.next) {
      setHasMore(true)
    } else {
      setHasMore(false)
    }

    setLocations(prev => [...prev, ...data.results])
  }, [data])

  const handleScroll = () => {
    if (hasMore && !isLoading && !error) {
      setPage(prevPage => prevPage + 1)
    }
  }

  const handleClick = (id: number) => {
    navigate(`/location/${id}`)
  }

  const handleChangeSortOrder = (sortOrder: ISortOrder) => {
    setOrder(sortOrder)
  }

  const locationCards = locations
    .slice(0)
    .sort((l, r) => sortDate(order, l.created, r.created))
    .map(location => (
      <div key={location.id} onClick={() => handleClick(location.id)}>
        <Card>
          <h2>{location.name}</h2>
          <h3>{new Date(location.created).toLocaleString()}</h3>
        </Card>
      </div>
    ))

  return (
    <InfinityScroll onScrollEnd={handleScroll}>
      <Sort sortOrder={order} sortChange={e => handleChangeSortOrder(e)} />
      <List>{locationCards}</List>
    </InfinityScroll>
  )
}

export default LocationPage
