import { API_CONFIG } from './config'
import {
  Coordinates,
  ForecastData,
  GeocodingResponse,
  WeatherData,
} from './types'

class WeatherAPI {
  private createURL(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    })
    return `${endpoint}?${searchParams.toString()}`
  }

  private async fetchWeatherData<T>(url: string): Promise<T> {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }

    return response.json()
  }

  async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    const url = this.createURL(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: 'metric',
    })
    return this.fetchWeatherData<WeatherData>(url)
  }

  async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    const url = this.createURL(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: 'metric',
    })
    return this.fetchWeatherData<ForecastData>(url)
  }

  async reverseGeocode({
    lat,
    lon,
  }: Coordinates): Promise<GeocodingResponse[]> {
    const url = this.createURL(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: '1',
    })
    return this.fetchWeatherData<GeocodingResponse[]>(url)
  }

  async searchLocations(query: string): Promise<GeocodingResponse[]> {
    const url = this.createURL(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: '5',
    })
    return this.fetchWeatherData<GeocodingResponse[]>(url)
  }
}

export const weatherAPI = new WeatherAPI()
