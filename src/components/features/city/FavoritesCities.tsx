import { Loader2, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useFavorites } from '@/hooks/useFavorite'
import { useWeatherQuery } from '@/hooks/useWeather'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface City {
  id: string
  name: string
  lat: number
  lon: number
}

interface WeatherData {
  weather: Array<{
    icon: string
    description: string
  }>
  main: {
    temp: number
  }
  sys: {
    country: string
  }
}

interface FavoriteCityTabletProps extends City {
  onRemove: (id: string) => void
}

const WeatherDisplay = ({
  weather,
  name,
}: {
  weather: WeatherData
  name: string
}) => (
  <>
    <div className="flex items-center gap-2">
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].description}
        className="h-8 w-8"
      />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{weather.sys.country}</p>
      </div>
    </div>
    <div className="ml-auto text-right">
      <p className="text-xl font-bold">{Math.round(weather.main.temp)}°</p>
      <p className="text-xs capitalize text-muted-foreground">
        {weather.weather[0].description}
      </p>
    </div>
  </>
)

const FavoriteCityTablet = ({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavoriteCityTabletProps) => {
  const navigate = useNavigate()
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon })

  const handleClick = () => {
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemove(id)
    toast.error(`Removed ${name} from Favorites`)
  }

  return (
    <div
      onClick={handleClick}
      className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100"
        onClick={handleRemove}
        aria-label={`Remove ${name} from favorites`}
      >
        <X className="h-4 w-4" />
      </Button>

      {isLoading ? (
        <div className="flex h-8 items-center justify-center">
          <Loader2
            className="h-4 w-4 animate-spin"
            aria-label="Loading weather data"
          />
        </div>
      ) : weather ? (
        <WeatherDisplay weather={weather} name={name} />
      ) : null}
    </div>
  )
}

const FavoriteCities = () => {
  const { favorites, removeFavorite } = useFavorites()

  if (!favorites.length) {
    return null
  }

  return (
    <section aria-label="Favorite cities">
      <h1 className="text-xl font-bold tracking-tight">Favorites</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4">
          {favorites.map(city => (
            <FavoriteCityTablet
              key={city.id}
              {...city}
              onRemove={() => removeFavorite.mutate(city.id)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </section>
  )
}

export default FavoriteCities
