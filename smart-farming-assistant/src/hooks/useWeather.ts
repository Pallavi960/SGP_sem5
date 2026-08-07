import { useState, useEffect } from 'react'

interface WeatherData {
  temp: number
  humidity: number
  windspeed: number
  weathercode: number
  city: string
}

const WMO_ICONS: Record<number, string> = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌧️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '🌨️',
  80: '🌦️', 81: '🌧️', 82: '⛈️',
  95: '⛈️', 96: '⛈️', 99: '⛈️',
}

export function getWeatherIcon(code: number): string {
  return WMO_ICONS[code] ?? '🌡️'
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) { setLoading(false); return }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { latitude: lat, longitude: lon } = coords

          const [weatherRes, geoRes] = await Promise.all([
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,windspeed_10m,weathercode&timezone=auto`),
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
          ])

          const weatherJson = await weatherRes.json()
          const geoJson = await geoRes.json()

          const c = weatherJson.current
          const city =
            geoJson.address?.city ||
            geoJson.address?.town ||
            geoJson.address?.village ||
            geoJson.address?.county ||
            'Your Location'

          setWeather({
            temp: Math.round(c.temperature_2m),
            humidity: c.relative_humidity_2m,
            windspeed: Math.round(c.windspeed_10m),
            weathercode: c.weathercode,
            city,
          })
        } catch {
          // silently fail
        } finally {
          setLoading(false)
        }
      },
      () => setLoading(false)
    )
  }, [])

  return { weather, loading }
}
