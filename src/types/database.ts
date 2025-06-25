export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          age: number | null
          gender: string | null
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          age?: number | null
          gender?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          age?: number | null
          gender?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          user_id: string
          assessment_type: string
          responses: Record<string, any>
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          assessment_type: string
          responses: Record<string, any>
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          assessment_type?: string
          responses?: Record<string, any>
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          shopify_id: string | null
          name: string
          category: string
          sub_category: string | null
          description: string | null
          price: number
          image_url: string | null
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          shopify_id?: string | null
          name: string
          category: string
          sub_category?: string | null
          description?: string | null
          price: number
          image_url?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          shopify_id?: string | null
          name?: string
          category?: string
          sub_category?: string | null
          description?: string | null
          price?: number
          image_url?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      recommendation_rules: {
        Row: {
          id: string
          condition_type: string
          condition_value: string
          product_id: string
          priority: number
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          condition_type: string
          condition_value: string
          product_id: string
          priority: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          condition_type?: string
          condition_value?: string
          product_id?: string
          priority?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_routines: {
        Row: {
          id: string
          user_id: string
          assessment_id: string
          routine_type: string
          products: Record<string, any>
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          assessment_id: string
          routine_type: string
          products: Record<string, any>
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          assessment_id?: string
          routine_type?: string
          products?: Record<string, any>
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}