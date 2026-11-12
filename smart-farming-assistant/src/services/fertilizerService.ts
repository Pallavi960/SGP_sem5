import type { LangCode } from '../context/LanguageContext'
import { tr, trFormat } from '../lib/i18n'

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

export interface NutrientSummaryItem {
  key: 'Nitrogen' | 'Phosphorus' | 'Potassium'
  label: string
  rawLevel: NutrientLevel
  levelLabel: string
}

export interface FertilizerRecommendationResult {
  crop: string
  stage: string
  soilType: string
  soilPh: number
  soilStatusSummary: string
  nutrientItems: NutrientSummaryItem[]
  phStatusSummary: string
  phCategory: string
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

export function calculateFertilizerRecommendation(
  input: FertilizerInput,
  lang: LangCode = 'en'
): FertilizerRecommendationResult {
  const acres = toStandardAcres(input.area, input.areaUnit)
  const isBasal = input.stage === 'Basal / Land Prep'
  const isVeg = input.stage === 'Vegetative / Tillering'
  const isFlowering = input.stage === 'Flowering / Panicle / Squaring'
  const isBulking = input.stage === 'Fruit / Grain / Tuber Bulking'

  // pH analysis
  let phCategoryKey: 'Acidic' | 'Neutral / Optimal' | 'Alkaline' = 'Neutral / Optimal'
  let phStatusSummary = tr(lang, 'Soil pH is in the optimal range (6.2 - 7.5). Nutrient availability is balanced.')
  if (input.soilPh < 6.0) {
    phCategoryKey = 'Acidic'
    phStatusSummary = trFormat(
      lang,
      'Soil is Acidic (pH {soilPh}). Phosphorus and Calcium availability may be locked. Consider applying Agricultural Lime or Dolomite.',
      { soilPh: input.soilPh }
    )
  } else if (input.soilPh > 7.8) {
    phCategoryKey = 'Alkaline'
    phStatusSummary = trFormat(
      lang,
      'Soil is Alkaline (pH {soilPh}). Zinc and Iron micronutrient deficiencies are common. Consider applying Gypsum or Sulphur to moderate pH.',
      { soilPh: input.soilPh }
    )
  }
  const phCategory = tr(lang, phCategoryKey)

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
      name: tr(lang, 'Di-Ammonium Phosphate (DAP)'),
      commercialName: tr(lang, 'DAP / IFFCO / Coromandel'),
      totalQuantity: trFormat(lang, '{total} kg', { total: Math.round(dapPerAcre * acres) }),
      quantityPerUnit: trFormat(lang, '{perAcre} kg / acre', { perAcre: dapPerAcre }),
      nutrientGrade: tr(lang, '18% N, 46% P₂O₅'),
      timingAndMethod: tr(lang, 'Apply as basal dose by deep placement in furrows before sowing/transplanting.'),
      iconColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    })

    if (mopPerAcre > 0) {
      primaryFertilizers.push({
        name: tr(lang, 'Muriate of Potash (MOP)'),
        commercialName: tr(lang, 'Potash (0-0-60)'),
        totalQuantity: trFormat(lang, '{total} kg', { total: Math.round(mopPerAcre * acres) }),
        quantityPerUnit: trFormat(lang, '{perAcre} kg / acre', { perAcre: mopPerAcre }),
        nutrientGrade: tr(lang, '60% K₂O'),
        timingAndMethod: tr(lang, 'Incorporate into root zone during final land preparation.'),
        iconColor: 'bg-amber-50 text-amber-700 border-amber-200',
      })
    }

    if (ureaPerAcre > 0) {
      primaryFertilizers.push({
        name: tr(lang, 'Neem Coated Urea'),
        commercialName: tr(lang, 'Urea (46% N)'),
        totalQuantity: trFormat(lang, '{total} kg', { total: Math.round(ureaPerAcre * acres) }),
        quantityPerUnit: trFormat(lang, '{perAcre} kg / acre', { perAcre: ureaPerAcre }),
        nutrientGrade: tr(lang, '46% Nitrogen'),
        timingAndMethod: tr(lang, 'Basal starter dose alongside DAP to support initial seedling vigor.'),
        iconColor: 'bg-blue-50 text-blue-700 border-blue-200',
      })
    }

    recommendedActions.push(
      tr(lang, 'Apply 100% of the recommended Phosphorus (DAP) at sowing to stimulate deep root development.'),
      tr(lang, 'Incorporate 5-10 tonnes of Farmyard Manure (FYM) or Vermicompost before final harrowing.'),
      tr(lang, 'If planting oilseed or pulse, include 10-15 kg Bentonite Sulphur per acre.')
    )
  } else if (isVeg) {
    // Vegetative Stage: High Nitrogen Demand
    const ureaPerAcre = Math.round((baseUreaKg * 0.5) * nFactor)

    primaryFertilizers.push({
      name: tr(lang, 'Neem Coated Urea'),
      commercialName: tr(lang, 'Urea (46% N)'),
      totalQuantity: trFormat(lang, '{total} kg', { total: Math.round(ureaPerAcre * acres) }),
      quantityPerUnit: trFormat(lang, '{perAcre} kg / acre', { perAcre: ureaPerAcre }),
      nutrientGrade: tr(lang, '46% Nitrogen'),
      timingAndMethod: tr(lang, 'Top dressing in moist soil just after irrigation or light rainfall. Avoid waterlogged puddles.'),
      iconColor: 'bg-blue-50 text-blue-700 border-blue-200',
    })

    primaryFertilizers.push({
      name: tr(lang, 'Water Soluble NPK 19:19:19'),
      commercialName: tr(lang, 'Balanced Foliar Fertigation'),
      totalQuantity: trFormat(lang, '{total} kg', { total: (1.5 * acres).toFixed(1) }),
      quantityPerUnit: tr(lang, '1.5 kg / acre (5g per Liter water)'),
      nutrientGrade: tr(lang, '19-19-19 + TE'),
      timingAndMethod: tr(lang, 'Foliar spray during early morning or late afternoon for rapid leaf absorption.'),
      iconColor: 'bg-teal-50 text-teal-700 border-teal-200',
    })

    recommendedActions.push(
      tr(lang, 'Provide Nitrogen top-dressing to stimulate rapid vegetative tillers and dark green chlorophyll synthesis.'),
      tr(lang, 'Ensure soil has sufficient moisture prior to broadcasting granular Urea.'),
      tr(lang, 'Perform light inter-row weeding before top-dressing.')
    )
  } else if (isFlowering) {
    // Flowering / Panicle: Balanced with Micronutrients (Boron/Zinc)
    const ureaPerAcre = Math.round((baseUreaKg * 0.25) * nFactor)

    if (ureaPerAcre > 0) {
      primaryFertilizers.push({
        name: tr(lang, 'Neem Coated Urea'),
        commercialName: tr(lang, 'Urea (46% N) Final Split'),
        totalQuantity: trFormat(lang, '{total} kg', { total: Math.round(ureaPerAcre * acres) }),
        quantityPerUnit: trFormat(lang, '{perAcre} kg / acre', { perAcre: ureaPerAcre }),
        nutrientGrade: tr(lang, '46% Nitrogen'),
        timingAndMethod: tr(lang, 'Light top dressing before panicle emergence / flower opening.'),
        iconColor: 'bg-blue-50 text-blue-700 border-blue-200',
      })
    }

    primaryFertilizers.push({
      name: tr(lang, 'Mono Potassium Phosphate (00:52:34)'),
      commercialName: tr(lang, 'MKP / Peak Flower Booster'),
      totalQuantity: trFormat(lang, '{total} kg', { total: (1.5 * acres).toFixed(1) }),
      quantityPerUnit: tr(lang, '1.5 kg / acre (5-7g per Liter)'),
      nutrientGrade: tr(lang, '52% P₂O₅, 34% K₂O'),
      timingAndMethod: tr(lang, 'Foliar spray at early flower bud initiation to reduce flower drop and enhance pollination.'),
      iconColor: 'bg-purple-50 text-purple-700 border-purple-200',
    })

    recommendedActions.push(
      tr(lang, 'Minimize excess Nitrogen to avoid excessive vegetative growth at the expense of flower setting.'),
      tr(lang, 'Boost Potassium and Phosphorus to strengthen reproductive buds and flower retention.'),
      tr(lang, 'Add 1g/L Boron (20% Disodium Octaborate) to improve pollen fertility and reduce flower drop.')
    )
  } else if (isBulking) {
    // Bulking / Grain Filling: High Potassium
    primaryFertilizers.push({
      name: tr(lang, 'Potassium Nitrate (13:00:45) / SOP (00:00:50)'),
      commercialName: tr(lang, 'Fruit & Grain Finisher'),
      totalQuantity: trFormat(lang, '{total} kg', { total: (2 * acres).toFixed(1) }),
      quantityPerUnit: tr(lang, '2.0 kg / acre (8-10g per Liter)'),
      nutrientGrade: tr(lang, '13% N, 45% K₂O (or 50% K₂O + 17% S)'),
      timingAndMethod: tr(lang, 'Foliar spray during milk-to-dough stage (grains) or fruit enlargement.'),
      iconColor: 'bg-orange-50 text-orange-700 border-orange-200',
    })

    recommendedActions.push(
      tr(lang, 'Potassium enhances carbohydrate translocation into grains, tubers, and fruits, resulting in higher test weight.'),
      tr(lang, 'Avoid high Nitrogen application at this stage to prevent late succulent growth and pest vulnerability.'),
      tr(lang, 'Maintain stable moisture to prevent fruit cracking or premature drying.')
    )
  } else {
    // Maturity
    recommendedActions.push(
      tr(lang, 'Stop chemical fertilization 2-3 weeks before harvesting to ensure clean produce with minimum chemical residue.'),
      tr(lang, 'Maintain proper drainage and prepare field for drying.')
    )
  }

  // Why this recommendation description
  const translatedSoil = tr(lang, input.soilType)
  const translatedCrop = tr(lang, input.crop)
  const translatedStage = tr(lang, input.stage)
  const nLabel = tr(lang, input.nitrogenLevel)
  const pLabel = tr(lang, input.phosphorusLevel)
  const kLabel = tr(lang, input.potassiumLevel)

  const soilDesc = trFormat(
    lang,
    'Based on your {soilType} with {nLevel} Nitrogen, {pLevel} Phosphorus, and {kLevel} Potassium:',
    { soilType: translatedSoil, nLevel: nLabel, pLevel: pLabel, kLevel: kLabel }
  )
  const focusText = tr(
    lang,
    isBasal
      ? 'root establishment and cellular division'
      : isVeg
      ? 'canopy formation and leafy growth'
      : isFlowering
      ? 'flower induction and pollen health'
      : 'dry matter accumulation and grain filling'
  )
  const stageDesc = trFormat(
    lang,
    "During the {stage} of {crop}, the crop's nutrient demand focuses on {focus}.",
    { stage: translatedStage, crop: translatedCrop, focus: focusText }
  )
  const nExtra =
    input.nitrogenLevel === 'Low'
      ? tr(lang, 'Nitrogen dosage has been adjusted upward by 25% to prevent chlorosis.')
      : input.nitrogenLevel === 'High'
      ? tr(lang, 'Nitrogen dosage has been dialed down by 25% to prevent lodging and disease susceptibility.')
      : ''
  const pExtra =
    input.phosphorusLevel === 'Low'
      ? tr(lang, 'Phosphorus is prioritized to stimulate root architecture.')
      : ''
  const whyRecommendation = [soilDesc, stageDesc, nExtra, pExtra].filter(Boolean).join(' ')

  // Micronutrient Advice
  let micronutrientAdvice = tr(lang, 'Apply Zinc Sulphate (21% or 33%) @ 5 kg/acre once per season if soil is deficient.')
  if (input.crop === 'Rice / Paddy' || input.crop === 'Wheat') {
    micronutrientAdvice = tr(
      lang,
      'Zinc deficiency is prevalent in cereal crops (Khaira disease in rice). Apply 5-10 kg/acre Zinc Sulphate (21% Zn) or spray Chelated Zinc (12% EDTA) @ 1g/L.'
    )
  } else if (input.crop === 'Mustard' || input.crop === 'Groundnut' || input.crop === 'Soybean') {
    micronutrientAdvice = tr(
      lang,
      'Sulphur is vital for oil synthesis. Apply 15 kg/acre Bentonite Sulphur (90% S) during land preparation.'
    )
  } else if (input.crop === 'Cotton' || input.crop === 'Tomato') {
    micronutrientAdvice = tr(
      lang,
      'Boron and Magnesium spray (MgSO₄ @ 5g/L + Boron 20% @ 1g/L) helps prevent internal necrosis, flower shedding, and reddening of leaves.'
    )
  }

  const organicAlternatives = [
    tr(lang, 'Well-decomposed Farmyard Manure (FYM): 4-5 tonnes/acre before sowing.'),
    tr(lang, 'Vermicompost: 1.5 - 2 tonnes/acre enriched with biofertilizers.'),
    tr(lang, 'Azotobacter / Rhizobium seed inoculation (250g / 10kg seeds).'),
    tr(lang, 'PSB (Phosphate Solubilizing Bacteria) @ 2 kg/acre mixed with compost.'),
    tr(lang, 'Neem Cake: 100 kg/acre to repel subterranean termites and act as slow-release organic N.'),
    tr(lang, 'Jeevamrutha / Panchagavya: 200 Liters/acre via irrigation once every 15 days.'),
  ]

  const precautions = [
    tr(lang, 'Always broadcast or band-apply chemical fertilizers in moist soil conditions, never in completely bone-dry fields.'),
    tr(lang, 'Do not mix chemical Nitrogen/Urea directly with biofertilizers (Rhizobium/PSB) in the same container.'),
    tr(lang, 'Keep a minimum 5-7 cm distance between seeds and concentrated fertilizer bands during sowing.'),
    tr(lang, 'Wear protective gloves and face mask when handling chemical fertilizer dust.'),
  ]

  const disclaimer = tr(
    lang,
    'Disclaimer: These fertilizer dosage recommendations are generated based on standard agronomic practices and standard crop nutritional requirements. For high-precision fertilizer management, please obtain an official Soil Health Card (SHC) from your local Krishi Vigyan Kendra (KVK) or State Agricultural Department.'
  )

  const nutrientItems: NutrientSummaryItem[] = [
    { key: 'Nitrogen', label: tr(lang, 'Nitrogen'), rawLevel: input.nitrogenLevel, levelLabel: nLabel },
    { key: 'Phosphorus', label: tr(lang, 'Phosphorus'), rawLevel: input.phosphorusLevel, levelLabel: pLabel },
    { key: 'Potassium', label: tr(lang, 'Potassium'), rawLevel: input.potassiumLevel, levelLabel: kLabel },
  ]

  return {
    crop: translatedCrop,
    stage: translatedStage,
    soilType: translatedSoil,
    soilPh: input.soilPh,
    soilStatusSummary: nutrientItems.map((item) => `${item.label}: ${item.levelLabel}`).join(' • '),
    nutrientItems,
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
