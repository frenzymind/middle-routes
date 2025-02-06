import { useParams } from 'react-router'
import { Card } from '../../shared/ui/Card/Card'
import locations from '../../data/location.json'

export function LocationDetailPage() {
  const { id } = useParams<{ id: string }>()

  const location = locations.find(h => h.id === Number(id))

  if (!location) {
    return <h2>Локация не найдена</h2>
  }

  return (
    <Card hover={false}>
      <p>Имя: {location.name}</p>
      <p>Измерение: {location.dimension}</p>
      <p>Тип: {location.type}</p>
      <p>Создан: {new Date(location.created).toLocaleString()}</p>
    </Card>
  )
}
