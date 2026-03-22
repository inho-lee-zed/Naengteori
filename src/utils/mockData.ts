import type { Ingredient, Recipe, CookingStep } from '../types'

export const mockIngredients: Ingredient[] = [
  { id: '1', name: '계란', category: '축산', confidence: 0.95 },
  { id: '2', name: '양파', category: '채소', confidence: 0.92 },
  { id: '3', name: '대파', category: '채소', confidence: 0.88 },
  { id: '4', name: '두부', category: '가공식품', confidence: 0.85 },
  { id: '5', name: '고추장', category: '양념', confidence: 0.78 },
  { id: '6', name: '김치', category: '반찬', confidence: 0.91 },
]

const dubuSteps: CookingStep[] = [
  { order: 1, instruction: '두부를 한입 크기로 썰어주세요', duration: 120, tip: '키친타올로 물기를 빼면 더 바삭해요' },
  { order: 2, instruction: '팬에 기름을 두르고 두부를 노릇하게 구워주세요', duration: 300 },
  { order: 3, instruction: '김치를 먹기 좋은 크기로 잘라 함께 볶아주세요', duration: 180 },
  { order: 4, instruction: '고추장 1큰술, 간장 1큰술을 넣고 양념해주세요', duration: 60 },
  { order: 5, instruction: '대파를 송송 썰어 마무리하면 완성!', duration: 30 },
]

const gyeranSteps: CookingStep[] = [
  { order: 1, instruction: '양파를 잘게 다져주세요', duration: 120 },
  { order: 2, instruction: '계란 3개를 풀어 소금 한 꼬집 넣어주세요', duration: 60 },
  { order: 3, instruction: '팬에 기름을 두르고 양파를 볶아주세요', duration: 120, tip: '양파가 투명해질 때까지' },
  { order: 4, instruction: '계란물을 부어 젓가락으로 저으며 익혀주세요', duration: 90 },
  { order: 5, instruction: '대파를 올려 마무리!', duration: 15 },
]

const kimchiSteps: CookingStep[] = [
  { order: 1, instruction: '김치를 먹기 좋게 썰어주세요', duration: 60 },
  { order: 2, instruction: '두부를 납작하게 썰어 팬에 구워주세요', duration: 300 },
  { order: 3, instruction: '냄비에 물 2컵, 김치, 고추장을 넣고 끓여주세요', duration: 180 },
  { order: 4, instruction: '끓어오르면 두부와 대파를 넣어주세요', duration: 120 },
  { order: 5, instruction: '계란을 톡 깨뜨려 넣고 1분 더 끓이면 완성!', duration: 60, tip: '계란은 반숙이 맛있어요' },
]

export const mockRecipes: Recipe[] = [
  {
    id: 'r1',
    title: '김치두부볶음',
    description: '매콤하고 고소한 김치와 두부의 환상 조합! 밥 도둑이에요 🍚',
    difficulty: 'easy',
    cookingTime: 15,
    calories: 280,
    ingredients: mockIngredients.filter((i) => ['김치', '두부', '대파', '고추장'].includes(i.name)),
    steps: dubuSteps,
  },
  {
    id: 'r2',
    title: '양파계란볶음밥',
    description: '냉장고 단골 메뉴! 간단하지만 맛은 최고 👨‍🍳',
    difficulty: 'easy',
    cookingTime: 10,
    calories: 350,
    ingredients: mockIngredients.filter((i) => ['계란', '양파', '대파'].includes(i.name)),
    steps: gyeranSteps,
  },
  {
    id: 'r3',
    title: '김치찌개',
    description: '추운 날엔 역시 뜨끈한 김치찌개! 🔥',
    difficulty: 'medium',
    cookingTime: 25,
    calories: 320,
    ingredients: mockIngredients.filter((i) => ['김치', '두부', '대파', '고추장', '계란'].includes(i.name)),
    steps: kimchiSteps,
  },
]

export interface MockRecipeCard {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  cookingTime: number
  calories: number
  matchRate: number
  missingIngredients: string[]
}

export const mockRecipeCards: MockRecipeCard[] = [
  { id: 'r1', title: '김치두부볶음', description: '매콤하고 고소한 김치와 두부의 환상 조합!', difficulty: 'easy', cookingTime: 15, calories: 280, matchRate: 100, missingIngredients: [] },
  { id: 'r2', title: '양파계란볶음밥', description: '냉장고 단골 메뉴! 간단하지만 맛은 최고', difficulty: 'easy', cookingTime: 10, calories: 350, matchRate: 100, missingIngredients: [] },
  { id: 'r3', title: '김치찌개', description: '추운 날엔 역시 뜨끈한 김치찌개!', difficulty: 'medium', cookingTime: 25, calories: 320, matchRate: 95, missingIngredients: [] },
  { id: 'r4', title: '순두부찌개', description: '부드러운 순두부에 매콤한 양념', difficulty: 'medium', cookingTime: 20, calories: 290, matchRate: 80, missingIngredients: ['순두부'] },
  { id: 'r5', title: '계란말이', description: '도시락 반찬 1등! 부드럽고 촉촉한', difficulty: 'easy', cookingTime: 8, calories: 180, matchRate: 90, missingIngredients: [] },
]
