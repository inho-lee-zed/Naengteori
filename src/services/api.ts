const API_BASE = 'https://naengteori-api.naengteori.workers.dev/api'

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error((error as { error: string }).error || res.statusText)
  }
  return res.json() as Promise<T>
}

// Scan API
export interface ScanResult {
  id: string
  imageUrl: string
  ingredients: Array<{
    name: string
    category: string
    confidence: number
  }>
  createdAt: string
}

export async function scanImage(imageUri: string): Promise<ScanResult> {
  const formData = new FormData()
  const filename = imageUri.split('/').pop() || 'photo.jpg'
  formData.append('image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: filename,
  } as unknown as Blob)

  const res = await fetch(`${API_BASE}/scan`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) throw new Error('Scan failed')
  return res.json() as Promise<ScanResult>
}

export async function getScanResult(id: string): Promise<ScanResult> {
  return request<ScanResult>(`/scan/${id}`)
}

// Recipe API
export interface RecipeRecommendation {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  cookingTime: number
  calories: number
  matchRate: number
  missingIngredients: string[]
  imageUrl?: string
}

export interface RecipeDetail {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  cookingTime: number
  calories: number
  ingredients: Array<{ name: string; amount: string }>
  steps: Array<{
    order: number
    instruction: string
    duration?: number
    tip?: string
  }>
}

export async function recommendRecipes(
  ingredients: string[]
): Promise<RecipeRecommendation[]> {
  return request<RecipeRecommendation[]>('/recipes/recommend', {
    method: 'POST',
    body: JSON.stringify({ ingredients }),
  })
}

export async function getRecipeDetail(id: string): Promise<RecipeDetail> {
  return request<RecipeDetail>(`/recipes/${id}`)
}

// Favorites API
export async function getFavorites(): Promise<RecipeRecommendation[]> {
  return request<RecipeRecommendation[]>('/profile/favorites')
}

export async function addFavorite(recipeId: string): Promise<void> {
  await request(`/profile/favorites/${recipeId}`, { method: 'POST' })
}

export async function removeFavorite(recipeId: string): Promise<void> {
  await request(`/profile/favorites/${recipeId}`, { method: 'DELETE' })
}

// History API
export interface CookingHistoryItem {
  id: string
  recipeId: string
  recipeTitle: string
  rating?: number
  memo?: string
  cookedAt: string
}

export async function getHistory(): Promise<CookingHistoryItem[]> {
  return request<CookingHistoryItem[]>('/profile/history')
}

export async function saveHistory(data: {
  recipeId: string
  rating?: number
  memo?: string
}): Promise<void> {
  await request('/profile/history', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
