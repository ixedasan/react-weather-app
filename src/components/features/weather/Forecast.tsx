import type { ForecastData } from '@/api/types'
import { format } from 'date-fns'
import { ArrowDown, ArrowUp, Calendar, Droplets, Wind } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  data: ForecastData
}

interface DailyForecast {
  date: number
  temp_min: number
  temp_max: number
  humidity: number
  wind: number
  weather: {
    description: string
  }
}

const Forecast = ({ data }: Props) => {
  const dailyForecasts = Object.values(
    data.list.reduce<Record<string, DailyForecast>>((acc, forecast) => {
      const dateKey = format(new Date(forecast.dt * 1000), 'yyyy-MM-dd')

      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: forecast.dt,
          temp_min: forecast.main.temp_min,
          temp_max: forecast.main.temp_max,
          humidity: forecast.main.humidity,
          wind: forecast.wind.speed,
          weather: forecast.weather[0],
        }
      } else {
        acc[dateKey].temp_min = Math.min(
          acc[dateKey].temp_min,
          forecast.main.temp_min,
        )
        acc[dateKey].temp_max = Math.max(
          acc[dateKey].temp_max,
          forecast.main.temp_max,
        )
      }

      return acc
    }, {}),
  ).slice(1, 6)

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-background to-muted/50">
      <CardHeader className="space-y-1 pb-8">
        <CardTitle className="text-2xl font-bold tracking-tight">
          5 Day Forecast
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Weather forecast for the next three days
        </p>
      </CardHeader>
      <CardContent>
        <div
          className="flex flex-col gap-4"
          role="list"
          aria-label="Weather forecast"
        >
          {dailyForecasts.map(day => (
            <ForecastCard key={day.date} day={day} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const ForecastCard = ({ day }: { day: DailyForecast }) => {
  return (
    <div
      className="group relative h-full overflow-hidden rounded-xl border bg-gradient-to-br from-white/50 to-white/30 p-6 shadow-lg transition-all hover:shadow-xl dark:from-gray-800/50 dark:to-gray-900/30"
      role="listitem"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative grid grid-cols-3 items-center gap-4">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'rounded-lg p-2.5',
              'bg-gradient-to-br from-primary/10 to-primary/5',
            )}
          >
            <Calendar className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold tracking-tight">
              {format(new Date(day.date * 1000), 'EEE, MMM d')}
            </p>
            <p className="line-clamp-1 text-sm capitalize text-muted-foreground">
              {day.weather.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <TemperatureDisplay
            icon={ArrowUp}
            value={day.temp_max}
            className="text-red-500"
          />
          <TemperatureDisplay
            icon={ArrowDown}
            value={day.temp_min}
            className="text-blue-500"
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <WeatherDetail icon={Droplets} value={`${day.humidity}%`} />
          <WeatherDetail icon={Wind} value={`${day.wind} m/s`} />
        </div>
      </div>
    </div>
  )
}

const TemperatureDisplay = ({
  icon: Icon,
  value,
  className,
}: {
  icon: typeof ArrowUp
  value: number
  className: string
}) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <Icon className="h-4 w-4" />
    <span className="font-semibold">{Math.round(value)}°</span>
  </div>
)

const WeatherDetail = ({
  icon: Icon,
  value,
}: {
  icon: typeof Droplets
  value: string
}) => (
  <div className="flex items-center gap-2">
    <Icon className="h-4 w-4 text-blue-500" />
    <span className="text-sm text-muted-foreground">{value}</span>
  </div>
)

export default Forecast
