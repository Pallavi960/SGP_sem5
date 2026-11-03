import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, Droplets, Mountain, Calendar, TrendingUp, DollarSign, 
  ChevronRight, ChevronLeft, Loader2, CheckCircle2, Info,
  Sprout, Clock, Sparkles, BarChart3, AlertCircle, RotateCcw
} from 'lucide-react'
import { 
  cropRecommendationAPI, 
  STATES, WATER_OPTIONS, SOIL_OPTIONS, SEASON_OPTIONS,
  PREFERENCE_OPTIONS, BUDGET_OPTIONS, GOAL_OPTIONS,
  type FarmerInput, type CropRecommendation, type FarmLayoutSection
} from './services/cropRecommendationService'

export default function CropRecommendation() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([])
  const [farmLayout, setFarmLayout] = useState<FarmLayoutSection[]>([])
  const [adjustedLayout, setAdjustedLayout] = useState<FarmLayoutSection[]>([])
  
  const [formData, setFormData] = useState<FarmerInput>({
    state: 'Maharashtra',
    district: '',
    village: '',
    farmSize: 5,
    farmSizeUnit: 'acres',
    waterAvailability: 'limited_irrigation',
    soilType: 'loamy_soil',
    previousCrop: '',
    season: 'Rabi',
    farmingPreference: 'any_suitable',
    budget: 'medium',
    mainGoal: 'higher_profit'
  })

  const totalSteps = 4

  const updateField = (field: keyof FarmerInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step === 4) {
      handleSubmit()
    } else {
      setStep(prev => prev + 1)
    }
  }

  const prevStep = () => setStep(prev => Math.max(1, prev - 1))

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await cropRecommendationAPI.getRecommendations(formData)
      setRecommendations(result.recommendations)
      setFarmLayout(result.farmLayout)
      setAdjustedLayout(result.farmLayout)
      setStep(5)
    } catch (err) {
      setError('Failed to get recommendations. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLayoutAdjustment = (index: number, newPercentage: number) => {
    const layout = [...adjustedLayout]
    const oldPercentage = layout[index].areaPercentage
    const diff = newPercentage - oldPercentage
    
    layout[index].areaPercentage = newPercentage
    layout[index].area = (newPercentage / 100) * formData.farmSize
    
    const otherIndices = layout.map((_, i) => i).filter(i => i !== index)
    const totalOthers = otherIndices.reduce((sum, i) => sum + layout[i].areaPercentage, 0)
    
    otherIndices.forEach(i => {
      const proportion = totalOthers > 0 ? layout[i].areaPercentage / totalOthers : 1 / otherIndices.length
      layout[i].areaPercentage = Math.max(0, layout[i].areaPercentage - (diff * proportion))
      layout[i].area = (layout[i].areaPercentage / 100) * formData.farmSize
    })
    
    setAdjustedLayout(layout)
  }

  const resetLayout = () => setAdjustedLayout(farmLayout)

  const restart = () => {
    setStep(1)
    setRecommendations([])
    setFarmLayout([])
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Crop Advisory
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Crop Recommendation System
          </h1>
          <p className="text-gray-600">
            Get personalized crop suggestions based on your farm conditions
          </p>
        </motion.div>

        {/* Progress Bar */}
        {step <= 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${
                    s <= step ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
                  </div>
                  {s < 4 && <div className={`flex-1 h-1 mx-2 ${s < step ? 'bg-green-600' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 px-1">
              <span>Location</span>
              <span>Farm Details</span>
              <span>Preferences</span>
              <span>Goals</span>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Location */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Farm Location</h2>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select
                    value={formData.state}
                    onChange={(e) => updateField('state', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => updateField('district', e.target.value)}
                    placeholder="e.g., Nashik"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Village/Town</label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => updateField('village', e.target.value)}
                    placeholder="e.g., Sinnar"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={nextStep}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                Continue <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* Step 2: Farm Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Sprout className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Farm Details</h2>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Farm Size</label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={formData.farmSize}
                      onChange={(e) => updateField('farmSize', parseFloat(e.target.value) || 0)}
                      min="0.1"
                      step="0.5"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                    />
                    <select
                      value={formData.farmSizeUnit}
                      onChange={(e) => updateField('farmSizeUnit', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                    >
                      <option value="acres">Acres</option>
                      <option value="hectares">Hectares</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Water Availability</label>
                  <div className="grid grid-cols-1 gap-3">
                    {WATER_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => updateField('waterAvailability', opt.value)}
                        className={`p-4 border-2 rounded-xl text-left transition-all ${
                          formData.waterAvailability === opt.value
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{opt.icon}</span>
                          <span className="font-medium">{opt.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                  <select
                    value={formData.soilType}
                    onChange={(e) => updateField('soilType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                  >
                    {SOIL_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.icon} {opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Crop (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.previousCrop}
                    onChange={(e) => updateField('previousCrop', e.target.value)}
                    placeholder="e.g., Cotton, Rice"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>
                <button
                  onClick={nextStep}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Farming Preferences</h2>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
                  <div className="grid grid-cols-1 gap-3">
                    {SEASON_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => updateField('season', opt.value)}
                        className={`p-4 border-2 rounded-xl text-left transition-all ${
                          formData.season === opt.value
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{opt.icon}</span>
                          <span className="font-medium">{opt.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Crop Preference</label>
                  <select
                    value={formData.farmingPreference}
                    onChange={(e) => updateField('farmingPreference', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                  >
                    {PREFERENCE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.icon} {opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                  <div className="grid grid-cols-1 gap-3">
                    {BUDGET_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => updateField('budget', opt.value)}
                        className={`p-4 border-2 rounded-xl text-left transition-all ${
                          formData.budget === opt.value
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{opt.icon}</span>
                          <span className="font-medium">{opt.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>
                <button
                  onClick={nextStep}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Goals */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Your Farming Goal</h2>
              </div>
              
              <div className="space-y-3">
                {GOAL_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => updateField('mainGoal', opt.value)}
                    className={`w-full p-5 border-2 rounded-xl text-left transition-all ${
                      formData.mainGoal === opt.value
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{opt.icon}</span>
                      <span className="font-semibold text-lg">{opt.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={prevStep}
                  disabled={loading}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Get Recommendations <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Results */}
          {step === 5 && recommendations.length > 0 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Recommendations */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-green-600" />
                  Top 3 Recommended Crops
                </h2>
                
                <div className="space-y-4">
                  {recommendations.map((crop, idx) => (
                    <div key={idx} className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{crop.cropName}</h3>
                          {crop.cropNameLocal && (
                            <p className="text-sm text-gray-600">{crop.cropNameLocal}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          <BarChart3 className="w-4 h-4" />
                          {crop.suitabilityScore}% Match
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{crop.whySuitable}</p>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{crop.season}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{crop.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{crop.waterRequirement}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mountain className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{crop.soilSuitability}</span>
                        </div>
                      </div>
                      
                      {crop.considerations.length > 0 && (
                        <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                          <p className="text-sm font-semibold text-amber-900 mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            Important Considerations:
                          </p>
                          <ul className="text-sm text-amber-800 space-y-1">
                            {crop.considerations.map((con, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-amber-600 mt-1">•</span>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Farm Layout */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-green-600" />
                    Visual Farm Layout
                  </h2>
                  <button
                    onClick={resetLayout}
                    className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>

                {/* Farm Visualization */}
                <div className="aspect-square w-full max-w-md mx-auto mb-6 border-4 border-gray-300 rounded-lg overflow-hidden relative bg-amber-50">
                  {adjustedLayout.map((section, idx) => {
                    const prevPercentages = adjustedLayout.slice(0, idx).reduce((sum, s) => sum + s.areaPercentage, 0)
                    return (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: section.color,
                          height: `${section.areaPercentage}%`,
                          top: `${prevPercentages}%`
                        }}
                        className="absolute w-full flex items-center justify-center text-white font-bold border-b-2 border-white/30"
                      >
                        <div className="text-center">
                          <div className="text-lg">{section.cropName}</div>
                          <div className="text-sm opacity-90">
                            {section.area.toFixed(1)} {formData.farmSizeUnit} ({section.areaPercentage.toFixed(0)}%)
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Area Adjustments */}
                <div className="space-y-4">
                  {adjustedLayout.map((section, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded" style={{ backgroundColor: section.color }} />
                          <span className="font-semibold text-gray-900">{section.cropName}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {section.area.toFixed(1)} {formData.farmSizeUnit}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="90"
                        value={section.areaPercentage}
                        onChange={(e) => handleLayoutAdjustment(idx, parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <div className="text-right text-sm text-gray-500 mt-1">
                        {section.areaPercentage.toFixed(0)}%
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Total Farm Area:</strong> {formData.farmSize} {formData.farmSizeUnit}
                  </p>
                </div>
              </div>

              <button
                onClick={restart}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Start New Recommendation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
