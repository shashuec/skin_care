export interface User {
  id: string
  email: string
  name?: string
  age?: number
  gender?: string
  location?: string
}

export interface Assessment {
  id: string
  user_id: string
  assessment_type: 'skin' | 'hair' | 'body'
  responses: AssessmentResponses
  created_at: string
}

export interface AssessmentResponses {
  // Personal Info
  name?: string
  age?: number
  gender?: string
  location?: string
  
  // Primary concern
  primary_concern?: 'skin' | 'hair' | 'body'
  
  // Skin specific
  skin_type?: string
  skin_concerns?: string[]
  skin_goals?: string[]
  skincare_options?: string[]
  
  // Hair specific
  hair_concerns?: string[]
  scalp_type?: string
  hair_type?: string
  hair_options?: string[]
  
  // Body specific
  body_concerns?: string[]
  body_skin_type?: string
  body_options?: string[]
  
  // General
  allergies?: string[]
  oral_supplements?: string[]
}

export interface Product {
  id: string
  shopify_id?: string
  name: string
  category: string
  sub_category?: string
  description?: string
  price: number
  image_url?: string
  active: boolean
}

export interface RecommendationRule {
  id: string
  condition_type: string
  condition_value: string
  product_id: string
  priority: number
  created_by?: string
}

export interface UserRoutine {
  id: string
  user_id: string
  assessment_id: string
  routine_type: 'AM' | 'PM'
  products: RoutineProduct[]
}

export interface RoutineProduct {
  product_id: string
  order: number
  frequency: string
  amount: string
  instructions?: string
}

export interface ProductRecommendation {
  product: Product
  priority: number
  reason: string
  usage: {
    frequency: string
    amount: string
    routine: ('AM' | 'PM')[]
  }
}