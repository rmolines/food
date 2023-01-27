export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          instagram: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          instagram?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          instagram?: string | null
          updated_at?: string | null
          username?: string | null
        }
      }
      restaurants: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string | null
          id: number
          instagram: string | null
          name: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string | null
          id?: number
          instagram?: string | null
          name?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string | null
          id?: number
          instagram?: string | null
          name?: string | null
        }
      }
      reviews: {
        Row: {
          category: string | null
          created_at: string | null
          creator_id: string | null
          id: number
          images_info: Json | null
          rating: number | null
          restaurant: Json | null
          review: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          creator_id?: string | null
          id?: number
          images_info?: Json | null
          rating?: number | null
          restaurant?: Json | null
          review?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          creator_id?: string | null
          id?: number
          images_info?: Json | null
          rating?: number | null
          restaurant?: Json | null
          review?: string | null
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
