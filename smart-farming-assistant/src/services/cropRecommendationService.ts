import axios from 'axios'

const API_BASE = `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'}/api/crop`

export interface CropRecommendationInput {
  state: string
  district: string
  village?: string
  farmSize: number
  farmSizeUnit: 'Acres' | 'Hectares'
  waterAvailability: string
  soilType: string
  previousCrop?: string
  season: string
  farmingPreference: string
  budget: string
  mainGoal: string
}

export interface CropRecommendation {
  name: string
  emoji: string
  whySuitable: string
  season: string
  duration: string
  waterRequirement: string
  soilSuitability: string
  estimatedYield: string | null
  importantConsiderations: string[]
  suggestedAreaPercent: number
}

export interface CropRecommendationResponse {
  recommendations: CropRecommendation[]
  location: { state: string; district: string }
}

export async function getCropRecommendations(
  input: CropRecommendationInput
): Promise<CropRecommendationResponse> {
  const response = await axios.post(`${API_BASE}/recommend`, input)
  return response.data
}
