import type { GeocodingResponse, WeatherData } from '@/api/types'
import { ArrowDown, ArrowUp, Droplets, MapPin, Wind } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Props = {
  data: WeatherData
  location?: GeocodingResponse
}

const CurrentWeather = ({ data, location }: Props) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data

  const formattedTemp = (temp: number) => {
    return `${Math.round(temp)}°`
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="border-b bg-muted/50 p-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-bold tracking-tight">
                {location?.name}
              </h2>
              {location?.state && (
                <span className="text-base text-muted-foreground">
                  {location.state}
                </span>
              )}
              <p className="text-sm font-medium text-muted-foreground">
                {location?.country}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-8xl font-bold tracking-tighter text-primary">
                  {formattedTemp(temp)}
                </p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  Feels like {formattedTemp(feels_like)}
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="space-y-2 text-sm font-medium">
                  <span className="flex items-center gap-1.5 text-red-500">
                    <ArrowUp className="h-4 w-4" />
                    {formattedTemp(temp_max)}
                  </span>
                  <span className="flex items-center gap-1.5 text-blue-500">
                    <ArrowDown className="h-4 w-4" />
                    {formattedTemp(temp_min)}
                  </span>
                  <Separator className="my-1" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-lg border bg-card p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-500/10 p-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-lg font-semibold text-primary">
                    {humidity}%
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-500/10 p-2">
                  <Wind className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Wind Speed</p>
                  <p className="text-lg font-semibold text-primary">
                    {speed} m/s
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[250px] items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-transparent p-4">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-full w-full object-contain drop-shadow-lg transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute -bottom-2 rounded-full bg-background/95 px-4 py-2 shadow-lg">
                <p className="text-sm font-medium capitalize text-primary">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default CurrentWeather
