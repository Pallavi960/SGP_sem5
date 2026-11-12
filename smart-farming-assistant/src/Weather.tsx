import { useState, useEffect } from 'react'
import { getWeatherIcon } from './hooks/useWeather'
import { useLanguage, type LangCode } from './context/LanguageContext'
import { tr, pickLang } from './lib/i18n'

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

const WMO_LABEL_GU: Record<number, string> = {
  0: 'સ્વચ્છ આકાશ', 1: 'મુખ્યત્વે સ્વચ્છ', 2: 'આંશિક વાદળછાયું', 3: 'વાદળછાયું',
  45: 'ધુમ્મસ', 48: 'ગાઢ ધુમ્મસ',
  51: 'હળવો ઝરમર વરસાદ', 53: 'ઝરમર વરસાદ', 55: 'ભારે ઝરમર વરસાદ',
  61: 'હળવો વરસાદ', 63: 'વરસાદ', 65: 'ભારે વરસાદ',
  71: 'હળવી હિમવર્ષા', 73: 'હિમવર્ષા', 75: 'ભારે હિમવર્ષા',
  80: 'હળવા ઝાપટા', 81: 'વરસાદી ઝાપટા', 82: 'ભારે ઝાપટા',
  95: 'ગાજવીજ સાથે વરસાદ', 96: 'વીજળી સાથે વરસાદ', 99: 'ભારે વાવાઝોડું',
}

const WMO_LABEL_PA: Record<number, string> = {
  0: 'ਸਾਫ਼ ਅਸਮਾਨ', 1: 'ਮੁੱਖ ਤੌਰ ਤੇ ਸਾਫ਼', 2: 'ਅੰਸ਼ਿਕ ਬੱਦਲਵਾਈ', 3: 'ਬੱਦਲਵਾਈ',
  45: 'ਧੁੰਦ', 48: 'ਸੰਘਣੀ ਧੁੰਦ',
  51: 'ਹਲਕੀ ਬੂੰਦਾਬਾਂਦੀ', 53: 'ਬੂੰਦਾਬਾਂਦੀ', 55: 'ਤੇਜ਼ ਬੂੰਦਾਬਾਂਦੀ',
  61: 'ਹਲਕਾ ਮੀਂਹ', 63: 'ਮੀਂਹ', 65: 'ਭਾਰੀ ਮੀਂਹ',
  71: 'ਹਲਕੀ ਬਰਫ਼ਬਾਰੀ', 73: 'ਬਰਫ਼ਬਾਰੀ', 75: 'ਭਾਰੀ ਬਰਫ਼ਬਾਰੀ',
  80: 'ਹਲਕੀਆਂ ਬੌਛਾਰਾਂ', 81: 'ਮੀਂਹ ਦੀਆਂ ਬੌਛਾਰਾਂ', 82: 'ਤੇਜ਼ ਬੌਛਾਰਾਂ',
  95: 'ਗਰਜ ਨਾਲ ਮੀਂਹ', 96: 'ਬਿਜਲੀ ਨਾਲ ਮੀਂਹ', 99: 'ਭਿਆਨਕ ਤੂਫ਼ਾਨ',
}

const WMO_LABEL_TA: Record<number, string> = {
  0: 'தெளிவான வானம்', 1: 'பெரும்பாலும் தெளிவு', 2: 'பகுதி மேகமூட்டம்', 3: 'மேகமூட்டம்',
  45: 'பனிமூட்டம்', 48: 'அடர் பனிமூட்டம்',
  51: 'லேசான தூறல்', 53: 'தூறல்', 55: 'கனத்த தூறல்',
  61: 'லேசான மழை', 63: 'மழை', 65: 'கனமழை',
  71: 'லேசான பனிப்பொழிவு', 73: 'பனிப்பொழிவு', 75: 'கனத்த பனிப்பொழிவு',
  80: 'லேசான மழைத்தூறல்', 81: 'மழைச்சாரல்', 82: 'பலத்த மழைச்சாரல்',
  95: 'இடியுடன் கூடிய மழை', 96: 'மின்னலுடன் கூடிய மழை', 99: 'கடும் புயல்',
}

const WMO_LABEL_TE: Record<number, string> = {
  0: 'నిర్మలమైన ఆకాశం', 1: 'ప్రధానంగా నిర్మలం', 2: 'పాక్షిక మేఘావృతం', 3: 'మేఘావృతం',
  45: 'పొగమంచు', 48: 'దట్టమైన పొగమంచు',
  51: 'తేలికపాటి జల్లులు', 53: 'జల్లులు', 55: 'భారీ జల్లులు',
  61: 'తేలికపాటి వర్షం', 63: 'వర్షం', 65: 'భారీ వర్షం',
  71: 'తేలికపాటి మంచు', 73: 'మంచు', 75: 'భారీ మంచు',
  80: 'తేలికపాటి వర్షపు జల్లులు', 81: 'వర్షపు జల్లులు', 82: 'భారీ వర్షపు జల్లులు',
  95: 'ఉరుములతో కూడిన వర్షం', 96: 'పిడుగులతో వర్షం', 99: 'తీవ్రమైన తుఫాను',
}

const DAYS_BY_LANG: Record<LangCode, string[]> = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  hi: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
  mr: ['रवि', 'सोम', 'मंगळ', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
  gu: ['રવિ', 'સોમ', 'મંગળ', 'બુધ', 'ગુરુ', 'શુક્ર', 'શનિ'],
  pa: ['ਐਤ', 'ਸੋਮ', 'ਮੰਗਲ', 'ਬੁੱਧ', 'ਵੀਰ', 'ਸ਼ੁੱਕਰ', 'ਸ਼ਨੀ'],
  ta: ['ஞாயி', 'திங்', 'செவ்', 'புத', 'வியா', 'வெள்', 'சனி'],
  te: ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని'],
}

const WMO_MAPS: Record<LangCode, { labels: Record<number, string>; fallback: string }> = {
  en: { labels: WMO_LABEL_EN, fallback: 'Unknown' },
  hi: { labels: WMO_LABEL_HI, fallback: 'सामान्य मौसम' },
  mr: { labels: WMO_LABEL_MR, fallback: 'सामान्य हवामान' },
  gu: { labels: WMO_LABEL_GU, fallback: 'સામાન્ય હવામાન' },
  pa: { labels: WMO_LABEL_PA, fallback: 'ਆਮ ਮੌਸਮ' },
  ta: { labels: WMO_LABEL_TA, fallback: 'சாதாரண வானிலை' },
  te: { labels: WMO_LABEL_TE, fallback: 'సాధారణ వాతావరణం' },
}

function getWmoLabel(code: number, lang: LangCode): string {
  const entry = WMO_MAPS[lang] ?? WMO_MAPS.en
  return entry.labels[code] ?? entry.fallback
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

  const daysList = pickLang(lang, DAYS_BY_LANG)

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

          let city = tr(lang, 'Your Location', 'आपका स्थान', 'तुमचे ठिकाण')
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
              ? (tr(lang, 'Today', 'आज', 'आज'))
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
        {tr(lang, 'Fetching live weather...', 'मौसम की ताजा जानकारी प्राप्त हो रही है...', 'थेट हवामानाचा अंदाज आणत आहे...')}
      </p>
    </div>
  )

  if (error === 'denied' || (!loading && !current)) return (
    <div className="flex flex-col items-center justify-center py-32 gap-3">
      <div className="text-5xl">📍</div>
      <p className="text-gray-600 font-medium">
        {tr(lang, 'Location access denied', 'स्थान अनुमति अस्वीकृत', 'स्थान परवानगी नाकारली')}
      </p>
      <p className="text-gray-400 text-sm">
        {tr(lang, 'Please allow location permission to see weather', 'मौसम देखने के लिए कृपया स्थान की अनुमति दें', 'हवामान पाहण्यासाठी कृपया स्थानाची परवानगी द्या')}
      </p>
    </div>
  )

  if (error === 'fetch') return (
    <div className="flex flex-col items-center justify-center py-32 gap-3">
      <div className="text-5xl">🌐</div>
      <p className="text-gray-600 font-medium">
        {tr(lang, 'Unable to fetch weather data', 'मौसम डेटा प्राप्त करने में असमर्थ', 'हवामान माहिती आणण्यात अडचण')}
      </p>
      <p className="text-gray-400 text-sm">
        {tr(lang, 'Check your internet connection and try again', 'इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें', 'इंटरनेट तपासा आणि पुन्हा प्रयत्न करा')}
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
          <span>💧 {tr(lang, 'Humidity', 'नमी', 'आर्द्रता')}: {current!.humidity}%</span>
          <span>💨 {tr(lang, 'Wind', 'हवा', 'वारा')}: {current!.windspeed} km/h</span>
          <span>🌧️ {tr(lang, 'Precipitation', 'वर्षा', 'पाऊस')}: {current!.precipitation} mm</span>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          {tr(lang, '24-Hour Forecast', '24 घंटे का पूर्वानुमान', '24 तासांचा अंदाज')}
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
          {tr(lang, '7-Day Forecast', '7 दिनों का पूर्वानुमान', '7 दिवसांचा अंदाज')}
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
        {tr(lang, 'Powered by Open-Meteo • Updates on page load', 'Open-Meteo द्वारा संचालित • पेज लोड पर अपडेट होता है', 'Open-Meteo द्वारे समर्थित • पेज लोड झाल्यावर अपडेट होते')}
      </p>
    </div>
  )
}
