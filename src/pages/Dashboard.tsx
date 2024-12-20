import { AlertTriangle, MapPin, RefreshCwIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useGeolocation } from '@/hooks/useGeolocation'
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from '@/hooks/useWeather'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import SkeletonWrapper from '@/components/common/SkeletonWrapper'
import FavoriteCities from '@/components/features/city/FavoritesCities'
import CurrentWeather from '@/components/features/weather/CurrentWeather'
import Forecast from '@/components/features/weather/Forecast'
import Temperature from '@/components/features/weather/Temperature'
import WeatherDetails from '@/components/features/weather/WeatherDetails'
import WeatherSkeleton from '@/components/features/weather/WeatherSkeleton'

const Dashboard = () => {
  const { coordinates, error, getLocation, isLoading } = useGeolocation()

  const weatherQuery = useWeatherQuery(coordinates)
  const forecastQuery = useForecastQuery(coordinates)
  const locationQuery = useReverseGeocodeQuery(coordinates)

  const handleRefresh = () => {
    getLocation()
    if (coordinates) {
      weatherQuery.refetch()
      forecastQuery.refetch()
      locationQuery.refetch()
    }
  }

  if (error) {
    return (
      <Alert variant={'destructive'}>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          {error}
          <Button variant={'outline'} onClick={getLocation}>
            <MapPin className="mr-1 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  const locationName = locationQuery.data?.[0]

  const isLoadingData = weatherQuery.isFetching || forecastQuery.isFetching

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />
  }

  return (
    <div className="space-y-6">
      <FavoriteCities />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tighter">My Location</h1>
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={handleRefresh}
          disabled={isLoadingData}
        >
          <RefreshCwIcon
            className={cn('h-4 w-4', isLoadingData && 'animate-spin')}
          />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          <SkeletonWrapper isLoading={isLoadingData}>
            <CurrentWeather data={weatherQuery.data} location={locationName} />
          </SkeletonWrapper>

          <Temperature data={forecastQuery.data} />
        </div>

        <WeatherDetails data={weatherQuery.data} />
        <Forecast data={forecastQuery.data} />
      </div>
    </div>
  )
}

export default Dashboard
