export interface GovernmentScheme {
  id: string
  title: string
  description: string
  benefits: string
  eligibility: string
  category: string
  state: string
  status: string
  officialLink: string
}

const SCHEMES: GovernmentScheme[] = [
  {
    id: '1',
    title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    description: 'Direct income support of ₹6,000/year to all landholding farmer families in three equal installments.',
    benefits: '₹6,000/year directly to bank account',
    eligibility: 'All landholding farmer families',
    category: 'Financial Support',
    state: 'All India',
    status: 'Active',
    officialLink: 'https://pmkisan.gov.in',
  },
  {
    id: '2',
    title: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
    description: 'Crop insurance scheme protecting farmers against natural disasters, pests, and bad weather.',
    benefits: 'Full crop loss compensation at low premium',
    eligibility: 'All farmers growing notified crops',
    category: 'Crop Insurance',
    state: 'All India',
    status: 'Active',
    officialLink: 'https://pmfby.gov.in',
  },
  {
    id: '3',
    title: 'Kisan Credit Card (KCC)',
    description: 'Provides short-term credit to farmers for seeds, fertilizers, pesticides, and allied activities.',
    benefits: 'Credit up to ₹3 lakh at 4% interest',
    eligibility: 'All farmers, sharecroppers, tenant farmers',
    category: 'Agricultural Loans',
    state: 'All India',
    status: 'Active',
    officialLink: 'https://www.nabard.org/content1.aspx?id=572',
  },
  {
    id: '4',
    title: 'PM-KUSUM (Solar Pump Scheme)',
    description: 'Financial assistance to install solar water pumps and solar power plants on farm land.',
    benefits: '60% subsidy on solar pump installation',
    eligibility: 'Individual farmers with agricultural land',
    category: 'Subsidies',
    state: 'All India',
    status: 'Active',
    officialLink: 'https://mnre.gov.in/solar/schemes',
  },
  {
    id: '5',
    title: 'SMAM (Sub-Mission on Agricultural Mechanisation)',
    description: 'Subsidies to purchase farm machinery like tractors, harvesters, and other modern equipment.',
    benefits: 'Up to 80% subsidy on farm equipment',
    eligibility: 'Small & marginal farmers',
    category: 'Subsidies',
    state: 'All India',
    status: 'Active',
    officialLink: 'https://agrimachinery.nic.in',
  },
  {
    id: '6',
    title: 'Soil Health Card Scheme',
    description: 'Free soil testing and nutrient recommendations to help farmers use the right fertilizers.',
    benefits: 'Free soil health card with crop-wise recommendations',
    eligibility: 'All farmers',
    category: 'Financial Support',
    state: 'All India',
    status: 'Active',
    officialLink: 'https://soilhealth.dac.gov.in',
  },
  {
    id: '7',
    title: 'e-NAM (National Agriculture Market)',
    description: 'Online trading platform connecting local farm markets for better price discovery.',
    benefits: 'Better price, transparent trading, digital payments',
    eligibility: 'Registered farmers with produce',
    category: 'Financial Support',
    state: 'All India',
    status: 'Active',
    officialLink: 'https://enam.gov.in',
  },
  {
    id: '8',
    title: 'PM Kisan MaanDhan Yojana (PM-KMY)',
    description: 'Pension scheme providing ₹3,000/month after age 60 to small and marginal farmers.',
    benefits: '₹3,000/month pension after 60 years',
    eligibility: 'Small & marginal farmers aged 18–40',
    category: 'Financial Support',
    state: 'All India',
    status: 'Active',
    officialLink: 'https://maandhan.in/shramyogi',
  },
  {
    id: '9',
    title: 'PMKSY (Pradhan Mantri Krishi Sinchayee Yojana)',
    description: 'Ensures water availability to every farm through micro-irrigation and watershed development.',
    benefits: 'Subsidy on drip & sprinkler irrigation systems',
    eligibility: 'All farmers with agricultural land',
    category: 'Subsidies',
    state: 'All India',
    status: 'Active',
    officialLink: 'https://pmksy.gov.in',
  },
  {
    id: '10',
    title: 'Gujarat Wire Fencing Scheme',
    description: 'Financial support to build protective wire fences around fields to protect crops from wild animals.',
    benefits: 'Up to ₹30,000 subsidy for fencing',
    eligibility: 'Farmers in Gujarat with agricultural land',
    category: 'Subsidies',
    state: 'Maharashtra',
    status: 'Active',
    officialLink: 'https://agri.gujarat.gov.in',
  },
  {
    id: '11',
    title: 'Kisan Parivahan Yojana (Gujarat)',
    description: 'Financial aid to purchase small transport vehicles and tractor trailers for moving farm produce.',
    benefits: 'Subsidy on transport vehicle purchase',
    eligibility: 'Farmers in Gujarat',
    category: 'Subsidies',
    state: 'Maharashtra',
    status: 'Active',
    officialLink: 'https://agri.gujarat.gov.in',
  },
  {
    id: '12',
    title: 'National Food Security Mission (NFSM)',
    description: 'Increases production of rice, wheat, pulses, and coarse cereals through area expansion and productivity enhancement.',
    benefits: 'Free seeds, training, and technical support',
    eligibility: 'Farmers in identified districts',
    category: 'Financial Support',
    state: 'All India',
    status: 'Active',
    officialLink: 'https://nfsm.gov.in',
  },
]

export const getAllSchemes = async (): Promise<GovernmentScheme[]> => SCHEMES

export const getSchemeById = async (id: string): Promise<GovernmentScheme | undefined> =>
  SCHEMES.find(s => s.id === id)

export const searchSchemes = async (query: string): Promise<GovernmentScheme[]> => {
  const q = query.toLowerCase()
  return SCHEMES.filter(s =>
    s.title.toLowerCase().includes(q) ||
    s.description.toLowerCase().includes(q) ||
    s.category.toLowerCase().includes(q)
  )
}

export const getSchemesByCategory = async (category: string): Promise<GovernmentScheme[]> =>
  SCHEMES.filter(s => s.category === category)

export const getSchemesByState = async (state: string): Promise<GovernmentScheme[]> =>
  SCHEMES.filter(s => s.state === state || s.state === 'All India')
