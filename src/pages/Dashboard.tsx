import { AlertTriangle, MapPin, RefreshCwIcon } from 'lucide-react'

import { useGeolocation } from '@/hooks/useGeolocation'
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from '@/hooks/useWeather'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

const Dashboard = () => {
  const { coordinates, error, getLocation, isLoading } = useGeolocation()

  const weaherQuery = useWeatherQuery(coordinates)
  const forecastQuery = useForecastQuery(coordinates)
  const locationQuery = useReverseGeocodeQuery(coordinates)

  const handleRefresh = () => {
    getLocation()
    if (coordinates) {
      weaherQuery.refetch()
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

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tighter">My Location</h1>
        <Button variant={'outline'} size={'icon'} onClick={handleRefresh}>
          <RefreshCwIcon />
        </Button>
      </div>
    </div>
  )
}
export default Dashboard
