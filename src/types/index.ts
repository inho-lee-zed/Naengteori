export interface Ingredient {
  id: string
  name: string
  category: string
  confidence: number // AI recognition confidence 0-1
}

export interface Recipe {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  cookingTime: number // minutes
  calories: number
  ingredients: Ingredient[]
  steps: CookingStep[]
  imageUrl?: string
}

export interface CookingStep {
  order: number
  instruction: string
  duration?: number // seconds
  tip?: string
}

export interface User {
  id: string
  nickname: string
  favorites: string[] // recipe IDs
  cookingHistory: CookingRecord[]
}

export interface CookingRecord {
  recipeId: string
  cookedAt: string // ISO date
  rating?: number // 1-5
}
