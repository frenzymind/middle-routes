import { useNavigate } from 'react-router'
import heroes from '../../data/characters.json'
import { useSortParams } from '../../shared/hook/useSortParams/useSortParams'
import { sortDate } from '../../shared/lib/sortDate'
import { Card } from '../../shared/ui/Card/Card'
import { List } from '../../shared/ui/List/LIst'
import { Sort } from '../../shared/ui/Sort/Sort'
import classes from './HeroPage.module.css'
import { ISortOrder } from '../../shared/types/sort'

export function HeroPage() {
  const [order, setOrder] = useSortParams()

  const navigate = useNavigate()

  const handleHeroClick = (id: number) => {
    navigate(`/hero/${id}`)
  }

  const handleChangeSortOrder = (sortOrder: ISortOrder) => {
    setOrder(sortOrder)
  }

  const heroCards = heroes
    .sort((l, r) => sortDate(order, l.created, r.created))
    .map(hero => (
      <Card key={hero.id}>
        <div className={classes.cardUserInfo} onClick={() => handleHeroClick(hero.id)}>
          <img src={hero.image} alt='' />
          <div>
            <h2>Имя: {hero.name}</h2>
            <h2>Создан: {new Date(hero.created).toLocaleString()}</h2>
          </div>
        </div>
      </Card>
    ))

  return (
    <>
      <Sort sortOrder={order} sortChange={e => handleChangeSortOrder(e)} />
      <List>{heroCards}</List>
    </>
  )
}
