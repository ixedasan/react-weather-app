import { WeatherData } from '@/api/types'
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const WIND_DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const

type Props = {
  data: WeatherData
}

interface WeatherDetailItem {
  title: string
  value: string
  icon: React.ElementType
  color: string
}

const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getWindDirection = (degree: number): string => {
  const normalizedDegree = ((degree % 360) + 360) % 360
  const index = Math.round(normalizedDegree / 45) % 8
  return WIND_DIRECTIONS[index]
}

const WeatherDetailCard = ({ detail }: { detail: WeatherDetailItem }) => (
  <div
    className="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-white/50 to-white/30 p-6 shadow-lg transition-all hover:shadow-xl dark:from-gray-800/50 dark:to-gray-900/30"
    role="listitem"
    aria-label={`${detail.title}: ${detail.value}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <div className="relative flex items-center gap-4">
      <div
        className={cn(
          'rounded-lg p-2.5',
          'bg-gradient-to-br from-primary/10 to-primary/5',
          'dark:from-primary/20 dark:to-primary/10',
        )}
      >
        <detail.icon
          className={cn(
            'h-6 w-6 transition-transform duration-300',
            'group-hover:scale-110',
            detail.color,
          )}
          aria-hidden="true"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold tracking-tight">{detail.title}</p>
        <p className="text-sm text-muted-foreground">{detail.value}</p>
      </div>
    </div>
  </div>
)

const WeatherDetails = ({ data }: Props) => {
  if (!data) {
    throw new Error('Weather data is required')
  }

  const { wind, main, sys } = data

  const details: WeatherDetailItem[] = [
    {
      title: 'Sunrise',
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: 'text-orange-500',
    },
    {
      title: 'Sunset',
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: 'text-blue-500',
    },
    {
      title: 'Wind Direction',
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: 'text-green-500',
    },
    {
      title: 'Pressure',
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: 'text-purple-500',
    },
  ]

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-background to-muted/50">
      <CardHeader className="space-y-1 pb-8">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Weather Details
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Detailed weather information for your location
        </p>
      </CardHeader>
      <CardContent>
        <div
          className="grid gap-4 sm:grid-cols-2"
          role="list"
          aria-label="Weather details"
        >
          {details.map(detail => (
            <WeatherDetailCard key={detail.title} detail={detail} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherDetails
