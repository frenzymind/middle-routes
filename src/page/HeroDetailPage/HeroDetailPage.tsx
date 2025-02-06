import { useParams } from 'react-router'
import heroes from '../../data/characters.json'
import { Card } from '../../shared/ui/Card/Card'

export function HeroDetailPage() {
  const { id } = useParams<{ id: string }>()

  const hero = heroes.find(h => h.id === Number(id))

  if (!hero) {
    return <h2>Герой не найден</h2>
  }

  return (
    <Card hover={false}>
      <img src={hero.image} alt='' />
      <p>Имя: {hero.name}</p>
      <p>Статус: {hero.status}</p>
      <p>Пол: {hero.gender}</p>
      <p>Раса: {hero.species}</p>
      <p>Создан: {new Date(hero.created).toLocaleString()}</p>
    </Card>
  )
}
