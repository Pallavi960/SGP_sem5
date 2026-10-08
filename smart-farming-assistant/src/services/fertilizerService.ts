export type CropType =
  | 'Wheat'
  | 'Rice / Paddy'
  | 'Cotton'
  | 'Sugarcane'
  | 'Maize'
  | 'Tomato'
  | 'Potato'
  | 'Mustard'
  | 'Soybean'
  | 'Groundnut'
  | 'Pulses / Gram'
  | 'Onion'
  | 'Chili / Pepper'

export type GrowthStage =
  | 'Basal / Land Prep'
  | 'Vegetative / Tillering'
  | 'Flowering / Panicle / Squaring'
  | 'Fruit / Grain / Tuber Bulking'
  | 'Maturity / Pre-Harvest'

export type SoilType =
  | 'Alluvial Soil'
  | 'Black Cotton Soil'
  | 'Red & Yellow Soil'
  | 'Sandy Loam'
  | 'Clay Loam'
  | 'Laterite Soil'

export type NutrientLevel = 'Low' | 'Medium' | 'High'
export type AreaUnit = 'Acres' | 'Hectares' | 'Bigha' | 'Guntha'

export interface FertilizerInput {
  crop: CropType
  stage: GrowthStage
  soilType: SoilType
  soilPh: number
  nitrogenLevel: NutrientLevel
  phosphorusLevel: NutrientLevel
  potassiumLevel: NutrientLevel
  area: number
  areaUnit: AreaUnit
  organicMode: boolean
}

export interface FertilizerDose {
  name: string
  commercialName: string
  totalQuantity: string
  quantityPerUnit: string
  nutrientGrade: string
  timingAndMethod: string
  iconColor: string
}

export interface FertilizerRecommendationResult {
  crop: CropType
  stage: GrowthStage
  soilType: SoilType
  soilPh: number
  soilStatusSummary: string
  phStatusSummary: string
  phCategory: 'Acidic' | 'Neutral / Optimal' | 'Alkaline'
  recommendedAction: string[]
  primaryFertilizers: FertilizerDose[]
  organicAlternatives: string[]
  micronutrientAdvice: string
  whyRecommendation: string
  precautions: string[]
  disclaimer: string
}

// Convert input area into standard Acres for calculation
export function toStandardAcres(area: number, unit: AreaUnit): number {
  if (area <= 0) return 1
  switch (unit) {
    case 'Hectares':
      return area * 2.47105
    case 'Bigha':
      return area * 0.4 // standard central/western bigha approx
    case 'Guntha':
      return area * 0.025
    case 'Acres':
    default:
      return area
  }
}

export function calculateFertilizerRecommendation(input: FertilizerInput): FertilizerRecommendationResult {
  const acres = toStandardAcres(input.area, input.areaUnit)
  const isBasal = input.stage === 'Basal / Land Prep'
  const isVeg = input.stage === 'Vegetative / Tillering'
  const isFlowering = input.stage === 'Flowering / Panicle / Squaring'
  const isBulking = input.stage === 'Fruit / Grain / Tuber Bulking'

  // pH analysis
  let phCategory: 'Acidic' | 'Neutral / Optimal' | 'Alkaline' = 'Neutral / Optimal'
  let phStatusSummary = 'Soil pH is in the optimal range (6.2 - 7.5). Nutrient availability is balanced.'
  if (input.soilPh < 6.0) {
    phCategory = 'Acidic'
    phStatusSummary = `Soil is Acidic (pH ${input.soilPh}). Phosphorus and Calcium availability may be locked. Consider applying Agricultural Lime or Dolomite.`
  } else if (input.soilPh > 7.8) {
    phCategory = 'Alkaline'
    phStatusSummary = `Soil is Alkaline (pH ${input.soilPh}). Zinc and Iron micronutrient deficiencies are common. Consider applying Gypsum or Sulphur to moderate pH.`
  }

  // Multipliers based on soil nutrient ratings
  const nFactor = input.nitrogenLevel === 'Low' ? 1.25 : input.nitrogenLevel === 'High' ? 0.75 : 1.0
  const pFactor = input.phosphorusLevel === 'Low' ? 1.3 : input.phosphorusLevel === 'High' ? 0.7 : 1.0
  const kFactor = input.potassiumLevel === 'Low' ? 1.3 : input.potassiumLevel === 'High' ? 0.7 : 1.0

  const primaryFertilizers: FertilizerDose[] = []
  const recommendedActions: string[] = []

  // Base kg/acre requirement by crop
  let baseUreaKg = 45
  let baseDapKg = 35
  let baseMopKg = 25

  switch (input.crop) {
    case 'Sugarcane':
      baseUreaKg = 85
      baseDapKg = 50
      baseMopKg = 40
      break
    case 'Cotton':
      baseUreaKg = 55
      baseDapKg = 40
      baseMopKg = 30
      break
    case 'Tomato':
    case 'Potato':
      baseUreaKg = 60
      baseDapKg = 60
      baseMopKg = 45
      break
    case 'Mustard':
    case 'Soybean':
    case 'Pulses / Gram':
    case 'Groundnut':
      // Legumes and oilseeds need less direct Nitrogen (nitrogen fixers) and more P & Sulphur
      baseUreaKg = 20
      baseDapKg = 40
      baseMopKg = 20
      break
    default:
      baseUreaKg = 45
      baseDapKg = 35
      baseMopKg = 25
      break
  }

  // Adjust by stage & nutrient levels
  if (isBasal) {
    // Basal application: Full P, Full/Partial K, Partial N
    const dapPerAcre = Math.round(baseDapKg * pFactor)
    const mopPerAcre = Math.round((baseMopKg * 0.7) * kFactor)
    const ureaPerAcre = Math.round((baseUreaKg * 0.3) * nFactor)

    primaryFertilizers.push({
      name: 'Di-Ammonium Phosphate (DAP)',
      commercialName: 'DAP / IFFCO / Coromandel',
      totalQuantity: `${Math.round(dapPerAcre * acres)} kg`,
      quantityPerUnit: `${dapPerAcre} kg / acre`,
      nutrientGrade: '18% N, 46% P₂O₅',
      timingAndMethod: 'Apply as basal dose by deep placement in furrows before sowing/transplanting.',
      iconColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    })

    if (mopPerAcre > 0) {
      primaryFertilizers.push({
        name: 'Muriate of Potash (MOP)',
        commercialName: 'Potash (0-0-60)',
        totalQuantity: `${Math.round(mopPerAcre * acres)} kg`,
        quantityPerUnit: `${mopPerAcre} kg / acre`,
        nutrientGrade: '60% K₂O',
        timingAndMethod: 'Incorporate into root zone during final land preparation.',
        iconColor: 'bg-amber-50 text-amber-700 border-amber-200',
      })
    }

    if (ureaPerAcre > 0) {
      primaryFertilizers.push({
        name: 'Neem Coated Urea',
        commercialName: 'Urea (46% N)',
        totalQuantity: `${Math.round(ureaPerAcre * acres)} kg`,
        quantityPerUnit: `${ureaPerAcre} kg / acre`,
        nutrientGrade: '46% Nitrogen',
        timingAndMethod: 'Basal starter dose alongside DAP to support initial seedling vigor.',
        iconColor: 'bg-blue-50 text-blue-700 border-blue-200',
      })
    }

    recommendedActions.push(
      'Apply 100% of the recommended Phosphorus (DAP) at sowing to stimulate deep root development.',
      'Incorporate 5-10 tonnes of Farmyard Manure (FYM) or Vermicompost before final harrowing.',
      'If planting oilseed or pulse, include 10-15 kg Bentonite Sulphur per acre.'
    )
  } else if (isVeg) {
    // Vegetative Stage: High Nitrogen Demand
    const ureaPerAcre = Math.round((baseUreaKg * 0.5) * nFactor)

    primaryFertilizers.push({
      name: 'Neem Coated Urea',
      commercialName: 'Urea (46% N)',
      totalQuantity: `${Math.round(ureaPerAcre * acres)} kg`,
      quantityPerUnit: `${ureaPerAcre} kg / acre`,
      nutrientGrade: '46% Nitrogen',
      timingAndMethod: 'Top dressing in moist soil just after irrigation or light rainfall. Avoid waterlogged puddles.',
      iconColor: 'bg-blue-50 text-blue-700 border-blue-200',
    })

    primaryFertilizers.push({
      name: 'Water Soluble NPK 19:19:19',
      commercialName: 'Balanced Foliar Fertigation',
      totalQuantity: `${(1.5 * acres).toFixed(1)} kg`,
      quantityPerUnit: '1.5 kg / acre (5g per Liter water)',
      nutrientGrade: '19-19-19 + TE',
      timingAndMethod: 'Foliar spray during early morning or late afternoon for rapid leaf absorption.',
      iconColor: 'bg-teal-50 text-teal-700 border-teal-200',
    })

    recommendedActions.push(
      'Provide Nitrogen top-dressing to stimulate rapid vegetative tillers and dark green chlorophyll synthesis.',
      'Ensure soil has sufficient moisture prior to broadcasting granular Urea.',
      'Perform light inter-row weeding before top-dressing.'
    )
  } else if (isFlowering) {
    // Flowering / Panicle: Balanced with Micronutrients (Boron/Zinc)
    const ureaPerAcre = Math.round((baseUreaKg * 0.25) * nFactor)
    const mopPerAcre = Math.round((baseMopKg * 0.3) * kFactor)

    if (ureaPerAcre > 0) {
      primaryFertilizers.push({
        name: 'Neem Coated Urea',
        commercialName: 'Urea (46% N) Final Split',
        totalQuantity: `${Math.round(ureaPerAcre * acres)} kg`,
        quantityPerUnit: `${ureaPerAcre} kg / acre`,
        nutrientGrade: '46% Nitrogen',
        timingAndMethod: 'Light top dressing before panicle emergence / flower opening.',
        iconColor: 'bg-blue-50 text-blue-700 border-blue-200',
      })
    }

    primaryFertilizers.push({
      name: 'Mono Potassium Phosphate (00:52:34)',
      commercialName: 'MKP / Peak Flower Booster',
      totalQuantity: `${(1.5 * acres).toFixed(1)} kg`,
      quantityPerUnit: '1.5 kg / acre (5-7g per Liter)',
      nutrientGrade: '52% P₂O₅, 34% K₂O',
      timingAndMethod: 'Foliar spray at early flower bud initiation to reduce flower drop and enhance pollination.',
      iconColor: 'bg-purple-50 text-purple-700 border-purple-200',
    })

    recommendedActions.push(
      'Minimize excess Nitrogen to avoid excessive vegetative growth at the expense of flower setting.',
      'Boost Potassium and Phosphorus to strengthen reproductive buds and flower retention.',
      'Add 1g/L Boron (20% Disodium Octaborate) to improve pollen fertility and reduce flower drop.'
    )
  } else if (isBulking) {
    // Bulking / Grain Filling: High Potassium
    primaryFertilizers.push({
      name: 'Potassium Nitrate (13:00:45) / SOP (00:00:50)',
      commercialName: 'Fruit & Grain Finisher',
      totalQuantity: `${(2 * acres).toFixed(1)} kg`,
      quantityPerUnit: '2.0 kg / acre (8-10g per Liter)',
      nutrientGrade: '13% N, 45% K₂O (or 50% K₂O + 17% S)',
      timingAndMethod: 'Foliar spray during milk-to-dough stage (grains) or fruit enlargement.',
      iconColor: 'bg-orange-50 text-orange-700 border-orange-200',
    })

    recommendedActions.push(
      'Potassium enhances carbohydrate translocation into grains, tubers, and fruits, resulting in higher test weight.',
      'Avoid high Nitrogen application at this stage to prevent late succulent growth and pest vulnerability.',
      'Maintain stable moisture to prevent fruit cracking or premature drying.'
    )
  } else {
    // Maturity
    recommendedActions.push(
      'Stop chemical fertilization 2-3 weeks before harvesting to ensure clean produce with minimum chemical residue.',
      'Maintain proper drainage and prepare field for drying.'
    )
  }

  // Why this recommendation description
  const soilDesc = `Based on your ${input.soilType} with ${input.nitrogenLevel} Nitrogen, ${input.phosphorusLevel} Phosphorus, and ${input.potassiumLevel} Potassium:`
  const stageDesc = `During the ${input.stage} of ${input.crop}, the crop's nutrient demand focuses on ${
    isBasal ? 'root establishment and cellular division' : isVeg ? 'canopy formation and leafy growth' : isFlowering ? 'flower induction and pollen health' : 'dry matter accumulation and grain filling'
  }.`
  const whyRecommendation = `${soilDesc} ${stageDesc} ${
    input.nitrogenLevel === 'Low'
      ? ' Nitrogen dosage has been adjusted upward by 25% to prevent chlorosis.'
      : input.nitrogenLevel === 'High'
      ? ' Nitrogen dosage has been dialed down by 25% to prevent lodging and disease susceptibility.'
      : ''
  } ${
    input.phosphorusLevel === 'Low'
      ? ' Phosphorus is prioritized to stimulate root architecture.'
      : ''
  }`

  // Micronutrient Advice
  let micronutrientAdvice = 'Apply Zinc Sulphate (21% or 33%) @ 5 kg/acre once per season if soil is deficient.'
  if (input.crop === 'Rice / Paddy' || input.crop === 'Wheat') {
    micronutrientAdvice = 'Zinc deficiency is prevalent in cereal crops (Khaira disease in rice). Apply 5-10 kg/acre Zinc Sulphate (21% Zn) or spray Chelated Zinc (12% EDTA) @ 1g/L.'
  } else if (input.crop === 'Mustard' || input.crop === 'Groundnut' || input.crop === 'Soybean') {
    micronutrientAdvice = 'Sulphur is vital for oil synthesis. Apply 15 kg/acre Bentonite Sulphur (90% S) during land preparation.'
  } else if (input.crop === 'Cotton' || input.crop === 'Tomato') {
    micronutrientAdvice = 'Boron and Magnesium spray (MgSO₄ @ 5g/L + Boron 20% @ 1g/L) helps prevent internal necrosis, flower shedding, and reddening of leaves.'
  }

  const organicAlternatives = [
    'Well-decomposed Farmyard Manure (FYM): 4-5 tonnes/acre before sowing.',
    'Vermicompost: 1.5 - 2 tonnes/acre enriched with biofertilizers.',
    'Azotobacter / Rhizobium seed inoculation (250g / 10kg seeds).',
    'PSB (Phosphate Solubilizing Bacteria) @ 2 kg/acre mixed with compost.',
    'Neem Cake: 100 kg/acre to repel subterranean termites and act as slow-release organic N.',
    'Jeevamrutha / Panchagavya: 200 Liters/acre via irrigation once every 15 days.',
  ]

  const precautions = [
    'Always broadcast or band-apply chemical fertilizers in moist soil conditions, never in completely bone-dry fields.',
    'Do not mix chemical Nitrogen/Urea directly with biofertilizers (Rhizobium/PSB) in the same container.',
    'Keep a minimum 5-7 cm distance between seeds and concentrated fertilizer bands during sowing.',
    'Wear protective gloves and face mask when handling chemical fertilizer dust.',
  ]

  const disclaimer =
    'Disclaimer: These fertilizer dosage recommendations are generated based on standard agronomic practices and standard crop nutritional requirements. For high-precision fertilizer management, please obtain an official Soil Health Card (SHC) from your local Krishi Vigyan Kendra (KVK) or State Agricultural Department.'

  return {
    crop: input.crop,
    stage: input.stage,
    soilType: input.soilType,
    soilPh: input.soilPh,
    soilStatusSummary: `Nitrogen: ${input.nitrogenLevel} • Phosphorus: ${input.phosphorusLevel} • Potassium: ${input.potassiumLevel}`,
    phStatusSummary,
    phCategory,
    recommendedAction: recommendedActions,
    primaryFertilizers,
    organicAlternatives,
    micronutrientAdvice,
    whyRecommendation,
    precautions,
    disclaimer,
  }
}
