import { useState, useEffect } from 'react'
import { getWeatherIcon } from './hooks/useWeather'
import { useLanguage } from './context/LanguageContext'

const WMO_LABEL_EN: Record<number, string> = {
  0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Cloudy',
  45: 'Foggy', 48: 'Foggy',
  51: 'Light Drizzle', 53: 'Drizzle', 55: 'Heavy Drizzle',
  61: 'Light Rain', 63: 'Rain', 65: 'Heavy Rain',
  71: 'Light Snow', 73: 'Snow', 75: 'Heavy Snow',
  80: 'Light Showers', 81: 'Showers', 82: 'Heavy Showers',
  95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm',
}

const WMO_LABEL_HI: Record<number, string> = {
  0: 'साफ आसमान', 1: 'मुख्यतः साफ', 2: 'आंशिक बादल', 3: 'बादल छाए रहेंगे',
  45: 'कोहरा', 48: 'घना कोहरा',
  51: 'हल्की बूंदाबांदी', 53: 'बूंदाबांदी', 55: 'तेज बूंदाबांदी',
  61: 'हल्की बारिश', 63: 'बारिश', 65: 'भारी बारिश',
  71: 'हल्की बर्फबारी', 73: 'बर्फबारी', 75: 'भारी बर्फबारी',
  80: 'हल्की बौछारें', 81: 'बौछारें', 82: 'तेज बौछारें',
  95: 'गरज के साथ बारिश', 96: 'गरज के साथ बौछारें', 99: 'भीषण तूफान',
}

const WMO_LABEL_MR: Record<number, string> = {
  0: 'निरभ्र आकाश', 1: 'मुख्यतः स्वच्छ', 2: 'अंशतः ढगाळ', 3: 'ढगाळ',
  45: 'धुके', 48: 'दाट धुके',
  51: 'हलकी रिमझिम', 53: 'रिमझिम पाऊस', 55: 'मुसळधार रिमझिम',
  61: 'हलका पाऊस', 63: 'पाऊस', 65: 'मुसळधार पाऊस',
  71: 'हलकी बर्फवृष्टी', 73: 'बर्फवृष्टी', 75: 'मुसळधार बर्फवृष्टी',
  80: 'हलक्या सरी', 81: 'पावसाच्या सरी', 82: 'जोरदार सरी',
  95: 'वादळी पाऊस', 96: 'विजांसह पाऊस', 99: 'तीव्र वादळ',
}

const DAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DAYS_HI = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि']
const DAYS_MR = ['रवि', 'सोम', 'मंगळ', 'बुध', 'गुरु', 'शुक्र', 'शनि']

function getWmoLabel(code: number, lang: string): string {
  if (lang === 'hi') return WMO_LABEL_HI[code] ?? 'सामान्य मौसम'
  if (lang === 'mr') return WMO_LABEL_MR[code] ?? 'सामान्य हवामान'
  return WMO_LABEL_EN[code] ?? 'Unknown'
}

interface Current {
  temp: number
  humidity: number
  windspeed: number
  precipitation: number
  weathercode: number
  city: string
}

interface HourlyPoint {
  time: string
  temp: number
  weathercode: number
}

interface DailyPoint {
  date: string
  day: string
  tempMax: number
  tempMin: number
  weathercode: number
  label: string
}

export default function Weather() {
  const { lang } = useLanguage()
  const [current, setCurrent] = useState<Current | null>(null)
  const [hourly, setHourly] = useState<HourlyPoint[]>([])
  const [daily, setDaily] = useState<DailyPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const daysList = lang === 'hi' ? DAYS_HI : lang === 'mr' ? DAYS_MR : DAYS_EN

  useEffect(() => {
    if (!navigator.geolocation) { setError('denied'); setLoading(false); return }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { latitude: lat, longitude: lon } = coords

          // Fetch weather and geocoding independently so one failure doesn't block the other
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,windspeed_10m,precipitation,weathercode&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=7`
          )
          const wj = await weatherRes.json()

          let city = lang === 'hi' ? 'आपका स्थान' : lang === 'mr' ? 'तुमचे ठिकाण' : 'Your Location'
          try {
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
            const gj = await geoRes.json()
            const rawCity = gj.address?.city || gj.address?.town || gj.address?.village || gj.address?.county || ''
            const state = gj.address?.state ?? ''
            if (rawCity) city = state ? `${rawCity}, ${state}` : rawCity
          } catch {
            // geocoding failed — use coordinates as fallback
            city = `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`
          }

          const c = wj.current
          setCurrent({
            temp: Math.round(c.temperature_2m),
            humidity: c.relative_humidity_2m,
            windspeed: Math.round(c.windspeed_10m),
            precipitation: c.precipitation,
            weathercode: c.weathercode,
            city,
          })

          // next 24 hourly points from now
          const nowHour = new Date().getHours()
          const todayPrefix = new Date().toISOString().slice(0, 10)
          const allHours: HourlyPoint[] = wj.hourly.time.map((t: string, i: number) => ({
            time: t,
            temp: Math.round(wj.hourly.temperature_2m[i]),
            weathercode: wj.hourly.weathercode[i],
          }))
          const startIdx = allHours.findIndex((h: HourlyPoint) => h.time.startsWith(todayPrefix) && parseInt(h.time.slice(11, 13)) >= nowHour)
          setHourly(allHours.slice(startIdx, startIdx + 24))

          // 7-day daily
          const dailyPoints: DailyPoint[] = wj.daily.time.map((date: string, i: number) => {
            const d = new Date(date)
            const isToday = i === 0
            const dayLabel = isToday
              ? (lang === 'hi' ? 'आज' : lang === 'mr' ? 'आज' : 'Today')
              : daysList[d.getDay()]
            return {
              date,
              day: dayLabel,
              tempMax: Math.round(wj.daily.temperature_2m_max[i]),
              tempMin: Math.round(wj.daily.temperature_2m_min[i]),
              weathercode: wj.daily.weathercode[i],
              label: getWmoLabel(wj.daily.weathercode[i], lang),
            }
          })
          setDaily(dailyPoints)
        } catch {
          setError('fetch')
        } finally {
          setLoading(false)
        }
      },
      () => { setError('denied'); setLoading(false) }
    )
  }, [lang])

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-3">
      <div className="text-5xl animate-bounce">🌤️</div>
      <p className="text-gray-500 text-sm">
        {lang === 'hi' ? 'मौसम की ताजा जानकारी प्राप्त हो रही है...' : lang === 'mr' ? 'थेट हवामानाचा अंदाज आणत आहे...' : 'Fetching live weather...'}
      </p>
    </div>
  )

  if (error === 'denied' || (!loading && !current)) return (
    <div className="flex flex-col items-center justify-center py-32 gap-3">
      <div className="text-5xl">📍</div>
      <p className="text-gray-600 font-medium">
        {lang === 'hi' ? 'स्थान अनुमति अस्वीकृत' : lang === 'mr' ? 'स्थान परवानगी नाकारली' : 'Location access denied'}
      </p>
      <p className="text-gray-400 text-sm">
        {lang === 'hi' ? 'मौसम देखने के लिए कृपया स्थान की अनुमति दें' : lang === 'mr' ? 'हवामान पाहण्यासाठी कृपया स्थानाची परवानगी द्या' : 'Please allow location permission to see weather'}
      </p>
    </div>
  )

  if (error === 'fetch') return (
    <div className="flex flex-col items-center justify-center py-32 gap-3">
      <div className="text-5xl">🌐</div>
      <p className="text-gray-600 font-medium">
        {lang === 'hi' ? 'मौसम डेटा प्राप्त करने में असमर्थ' : lang === 'mr' ? 'हवामान माहिती आणण्यात अडचण' : 'Unable to fetch weather data'}
      </p>
      <p className="text-gray-400 text-sm">
        {lang === 'hi' ? 'इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें' : lang === 'mr' ? 'इंटरनेट तपासा आणि पुन्हा प्रयत्न करा' : 'Check your internet connection and try again'}
      </p>
    </div>
  )

  // for hourly bar chart — normalize temps
  const hourlyTemps = hourly.map(h => h.temp)
  const minT = Math.min(...hourlyTemps)
  const maxT = Math.max(...hourlyTemps)
  const normalize = (t: number) => maxT === minT ? 50 : ((t - minT) / (maxT - minT)) * 60 + 10

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">

      {/* Current Weather Card */}
      <div className="bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-2xl p-6 text-white shadow-lg">
        <p className="text-sm opacity-80 mb-1">📍 {current!.city}</p>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-7xl font-thin">{current!.temp}°C</div>
            <div className="text-lg mt-1 opacity-90">{getWmoLabel(current!.weathercode, lang)}</div>
          </div>
          <div className="text-8xl">{getWeatherIcon(current!.weathercode)}</div>
        </div>
        <div className="flex gap-6 mt-5 text-sm opacity-90">
          <span>💧 {lang === 'hi' ? 'नमी' : lang === 'mr' ? 'आर्द्रता' : 'Humidity'}: {current!.humidity}%</span>
          <span>💨 {lang === 'hi' ? 'हवा' : lang === 'mr' ? 'वारा' : 'Wind'}: {current!.windspeed} km/h</span>
          <span>🌧️ {lang === 'hi' ? 'वर्षा' : lang === 'mr' ? 'पाऊस' : 'Precipitation'}: {current!.precipitation} mm</span>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          {lang === 'hi' ? '24 घंटे का पूर्वानुमान' : lang === 'mr' ? '24 तासांचा अंदाज' : '24-Hour Forecast'}
        </h2>
        <div className="overflow-x-auto">
          <div className="flex gap-3 min-w-max pb-2">
            {hourly.map((h, i) => {
              const hour = parseInt(h.time.slice(11, 13))
              const label = hour === 0 ? '12am' : hour < 12 ? `${hour}am` : hour === 12 ? '12pm' : `${hour - 12}pm`
              const barH = normalize(h.temp)
              return (
                <div key={i} className="flex flex-col items-center gap-1 w-12">
                  <span className="text-xs text-gray-400">{label}</span>
                  <span className="text-base">{getWeatherIcon(h.weathercode)}</span>
                  <div className="w-2 bg-[#E8F5E9] rounded-full relative" style={{ height: '80px' }}>
                    <div
                      className="absolute bottom-0 w-full bg-[#2E7D32] rounded-full transition-all"
                      style={{ height: `${barH}px` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{h.temp}°</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          {lang === 'hi' ? '7 दिनों का पूर्वानुमान' : lang === 'mr' ? '7 दिवसांचा अंदाज' : '7-Day Forecast'}
        </h2>
        <div className="divide-y divide-gray-50">
          {daily.map((d, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <span className="w-16 text-sm font-medium text-gray-700">{d.day}</span>
              <span className="text-2xl">{getWeatherIcon(d.weathercode)}</span>
              <span className="flex-1 text-sm text-gray-400 text-center">{d.label}</span>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className="text-[#2E7D32]">{d.tempMax}°</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-400">{d.tempMin}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-gray-300">
        {lang === 'hi' ? 'Open-Meteo द्वारा संचालित • पेज लोड पर अपडेट होता है' : lang === 'mr' ? 'Open-Meteo द्वारे समर्थित • पेज लोड झाल्यावर अपडेट होते' : 'Powered by Open-Meteo • Updates on page load'}
      </p>
    </div>
  )
}
