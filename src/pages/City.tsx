import { AlertTriangle } from 'lucide-react'
import { useParams, useSearchParams } from 'react-router-dom'

import { useForecastQuery, useWeatherQuery } from '@/hooks/useWeather'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FavoriteButton } from '@/components/FavoriteButton'
import CurrentWeather from '@/components/features/weather/CurrentWeather'
import Forecast from '@/components/features/weather/Forecast'
import Temperature from '@/components/features/weather/Temperature'
import WeatherDetails from '@/components/features/weather/WeatherDetails'
import WeatherSkeleton from '@/components/features/weather/WeatherSkeleton'

const City = () => {
  const [searchParams] = useSearchParams()
  const params = useParams()
  const lat = parseFloat(searchParams.get('lat') || '0')
  const lon = parseFloat(searchParams.get('lon') || '0')

  const coordinates = { lat, lon }

  const weatherQuery = useWeatherQuery(coordinates)
  const forecastQuery = useForecastQuery(coordinates)

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    )
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.name) {
    return <WeatherSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.name}, {weatherQuery.data.sys.country}
        </h1>
        <div className="flex gap-2">
          <FavoriteButton data={{ ...weatherQuery.data, name: params.name }} />
        </div>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          <CurrentWeather data={weatherQuery.data} />
          <Temperature data={forecastQuery.data} />
        </div>
        <WeatherDetails data={weatherQuery.data} />
        <Forecast data={forecastQuery.data} />
      </div>
    </div>
  )
}

export default City
