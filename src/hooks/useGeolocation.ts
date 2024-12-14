import { useEffect, useState } from 'react'
import { Coordinates } from '@/api/types'

interface LocationState {
  coordinates: Coordinates | null
  error: string | null
  isLoading: boolean
}

export function useGeolocation() {
  const [locationData, setLocationData] = useState<LocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  })

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: 'Geolocation is not supported',
        isLoading: false,
      })
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocationData({
          coordinates: {
            lat: coords.latitude,
            lon: coords.longitude,
          },
          error: null,
          isLoading: false,
        })
      },
      error => {
        setLocationData({
          coordinates: null,
          error: error.message,
          isLoading: false,
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    )
  }

  useEffect(() => {
    getLocation()
  }, [])

  return {
    ...locationData,
    getLocation,
  }
}
