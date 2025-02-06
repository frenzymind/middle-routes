import { useNavigate } from 'react-router'
import locations from '../../data/location.json'
import { Card } from '../../shared/ui/Card/Card'
import { List } from '../../shared/ui/List/LIst'
import { useSortParams } from '../../shared/hook/useSortParams/useSortParams'
import { Sort } from '../../shared/ui/Sort/Sort'
import { ISortOrder } from '../../shared/types/sort'
import { sortDate } from '../../shared/lib/sortDate'

export function LocationPage() {
  const [order, setOrder] = useSortParams()
  const navigate = useNavigate()

  const handleClick = (id: number) => {
    navigate(`/location/${id}`)
  }

  const handleChangeSortOrder = (sortOrder: ISortOrder) => {
    setOrder(sortOrder)
  }

  const locationCards = locations
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
    <>
      <Sort sortOrder={order} sortChange={e => handleChangeSortOrder(e)} />
      <List>{locationCards}</List>
    </>
  )
}
