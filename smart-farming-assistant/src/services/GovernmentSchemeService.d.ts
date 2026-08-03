export interface GovernmentScheme {
  id?: number | string
  title?: string
  name?: string
  description?: string
  benefits?: string
  eligibility?: string
  category?: string
  state?: string
  status?: string
  [key: string]: any
}

export declare function getAllSchemes(): Promise<GovernmentScheme[]>
export declare function getSchemeById(id: number | string): Promise<GovernmentScheme>
export declare function searchSchemes(query: string): Promise<GovernmentScheme[]>
export declare function getSchemesByCategory(category: string): Promise<GovernmentScheme[]>
export declare function getSchemesByState(state: string): Promise<GovernmentScheme[]>
