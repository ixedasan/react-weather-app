import { useMemo } from 'react'
import { ForecastData } from '@/api/types'
import { Thermometer } from 'lucide-react'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
  data: ForecastData
}

type ChartData = {
  time: string
  temp: number
  feels_like: number
}

const Temperature = ({ data }: Props) => {
  const chartData: ChartData[] = useMemo(() => {
    if (!data?.list?.length) return []

    return data.list.slice(0, 12).map(item => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
    }))
  }, [data.list])

  return (
    <Card className="flex-1 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="border-b bg-muted/50 p-4">
        <CardTitle className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Thermometer /> Today's Temperature
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 py-12">
        <div className="h-48 w-full">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={value => `${value}°`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Temperature
                            </span>
                            <span className="font-bold">
                              {payload[0].value}°
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Feels Like
                            </span>
                            <span className="font-bold">
                              {payload[1].value}°
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#64748b"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
export default Temperature
