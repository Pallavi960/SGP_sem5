import axios from 'axios'

const API_BASE = `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'}/api/crop`

// Indian states list
export const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
]

// Water availability options
export const WATER_OPTIONS = [
  { value: 'rainwater_only', label: 'Rainwater only', icon: '☁️' },
  { value: 'limited_irrigation', label: 'Limited irrigation', icon: '💧' },
  { value: 'sufficient_irrigation', label: 'Sufficient irrigation', icon: '💦' }
]

// Soil type options
export const SOIL_OPTIONS = [
  { value: 'black_soil', label: 'Black soil', icon: '⬛' },
  { value: 'sandy_soil', label: 'Sandy soil', icon: '🏖️' },
  { value: 'clay_soil', label: 'Clay soil', icon: '🧱' },
  { value: 'loamy_soil', label: 'Loamy soil', icon: '🟤' },
  { value: 'red_soil', label: 'Red soil', icon: '🔴' },
  { value: 'unknown', label: "I don't know", icon: '❓' }
]

// Season options
export const SEASON_OPTIONS = [
  { value: 'Kharif', label: 'Kharif (Monsoon season)', icon: '🌧️' },
  { value: 'Rabi', label: 'Rabi (Winter season)', icon: '❄️' },
  { value: 'Zaid', label: 'Zaid (Summer season)', icon: '☀️' }
]

// Farming preference options
export const PREFERENCE_OPTIONS = [
  { value: 'food_crops', label: 'Food crops', icon: '🌾' },
  { value: 'cash_crops', label: 'Cash crops', icon: '💰' },
  { value: 'vegetables', label: 'Vegetables', icon: '🥬' },
  { value: 'oilseeds', label: 'Oilseeds', icon: '🌻' },
  { value: 'any_suitable', label: 'Any suitable crop', icon: '🌱' }
]

// Budget options
export const BUDGET_OPTIONS = [
  { value: 'low', label: 'Low (₹20k-50k)', icon: '💵' },
  { value: 'medium', label: 'Medium (₹50k-1.5L)', icon: '💴' },
  { value: 'high', label: 'High (₹1.5L+)', icon: '💸' }
]

// Goal options
export const GOAL_OPTIONS = [
  { value: 'higher_profit', label: 'Higher profit', icon: '💰' },
  { value: 'lower_water', label: 'Lower water use', icon: '💧' },
  { value: 'food_production', label: 'Food production', icon: '🌾' },
  { value: 'lower_risk', label: 'Lower risk', icon: '🛡️' }
]

export interface FarmerInput {
  state: string
  district: string
  village: string
  farmSize: number
  farmSizeUnit: string
  waterAvailability: string
  soilType: string
  previousCrop: string
  season: string
  farmingPreference: string
  budget: string
  mainGoal: string
}

export interface CropRecommendation {
  cropName: string
  cropNameLocal: string | null
  suitabilityScore: number
  whySuitable: string
  season: string
  duration: string
  waterRequirement: string
  soilSuitability: string
  estimatedYield: string | null
  estimatedProfit: string | null
  considerations: string[]
  category: string
}

export interface FarmLayoutSection {
  cropName: string
  color: string
  areaPercentage: number
  area: number
}

export interface CropRecommendationResponse {
  success: boolean
  recommendations: CropRecommendation[]
  farmLayout: FarmLayoutSection[]
  totalArea: number
  unit: string
}

export async function getCropRecommendations(
  input: FarmerInput
): Promise<CropRecommendationResponse> {
  const response = await axios.post(`${API_BASE}/recommend`, input)
  return response.data
}

// API object for compatibility
export const cropRecommendationAPI = {
  getRecommendations: getCropRecommendations
}
