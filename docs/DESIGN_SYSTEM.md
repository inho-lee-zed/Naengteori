# 냉털이 (Naengteori) 디자인 시스템

> 버전 1.0.0 | React Native (Expo) + TypeScript + NativeWind

---

## 목차

1. [브랜드 아이덴티티](#1-브랜드-아이덴티티)
2. [컬러 팔레트](#2-컬러-팔레트)
3. [타이포그래피](#3-타이포그래피)
4. [아이콘 & 일러스트](#4-아이콘--일러스트)
5. [컴포넌트 스타일](#5-컴포넌트-스타일)
6. [스페이싱 & 레이아웃](#6-스페이싱--레이아웃)
7. [애니메이션 & 인터랙션](#7-애니메이션--인터랙션)
8. [다크모드](#8-다크모드)

---

## 1. 브랜드 아이덴티티

### 앱 개요

**냉털이**는 "냉장고를 털다"의 줄임말로, 냉장고 사진 한 장으로 AI가 재료를 인식하고 딱 맞는 레시피를 추천해주는 서비스입니다.

### 브랜드 퍼소나

| 속성 | 설명 |
|------|------|
| **캐릭터** | 주방을 잘 아는 친한 친구. 요리 전문가지만 거리감 없이 친근한 MZ 세대 |
| **성격** | 재치있고 유쾌함. 실패해도 같이 웃어넘길 수 있는 유머 감각 |
| **말투** | 캐주얼하고 짧고 임팩트 있게. 줄임말, 이모지, 유행어 자연스럽게 사용 |
| **가치관** | 요리는 거창한 게 아님. 있는 재료로 뭐든 만들 수 있다는 실용주의 |
| **관계** | 사용자의 냉장고 상황을 이해하고 판단하지 않는 친구 |

### 톤앤매너

**캐주얼 + 따뜻함 + 유머러스**

```
좋은 예:
- "냉장고가 텅텅? 걱정마! 계란 두 개면 충분해 🥚"
- "오늘 뭐 먹지 고민? 냉털이한테 맡겨봐"
- "냉장고 사진 찍어봐. 내가 다 알아서 해줄게"
- "아, 이거 조합 진짜 맛있겠다 👍"
- "재료 인식 중... 잠깐만, 거의 다 됐어!"

나쁜 예:
- "재료를 분석하고 있습니다. 잠시 기다려 주십시오."
- "최적의 레시피를 추천해 드립니다."
- "오류가 발생했습니다. 다시 시도해 주세요."
```

### 슬로건 후보

1. **"있는 거로 뭐든 만들어줄게"** — 실용성과 친근함 강조. 냉털이의 핵심 가치를 직관적으로 전달
2. **"냉장고 열기 전, 냉털이 먼저"** — 습관화 유도. 앱 사용을 일상의 첫 번째 행동으로 포지셔닝
3. **"남은 재료? 그게 오늘의 레시피"** — 업사이클링/알뜰함 감성. 식재료 낭비 없이 활용하는 가치 소구

### 브랜드 보이스 예시 (UI 문구)

| 상황 | 딱딱한 표현 (X) | 냉털이 스타일 (O) |
|------|----------------|------------------|
| 앱 첫 실행 | 카메라 권한이 필요합니다 | 사진 찍으려면 카메라 권한 줘야 해! |
| 분석 중 | 이미지를 분석 중입니다 | 냉장고 탈탈 털어보는 중... 🔍 |
| 분석 완료 | 분석이 완료되었습니다 | 완료! 이 재료들로 뭐 만들 수 있는지 봐봐 |
| 재료 없음 | 인식된 재료가 없습니다 | 음... 냉장고가 비어있네. 장보고 오자! |
| 오류 | 오류가 발생했습니다 | 앗, 뭔가 잘못됐어. 다시 찍어볼래? |
| 레시피 저장 | 저장되었습니다 | 찜해뒀어! 나중에 해먹어봐 🔖 |

---

## 2. 컬러 팔레트

### 설계 원칙

- **Primary**: 식욕을 자극하는 따뜻한 오렌지-코랄 계열 → 에너지, 식욕, 활기
- **Secondary**: 신선한 재료를 연상시키는 민트-그린 계열 → 신선함, 건강, 자연
- **Accent**: 강렬한 임팩트를 위한 선명한 포인트 컬러
- **Neutral**: 정보 가독성을 위한 체계적인 그레이스케일
- WCAG AA 기준 (일반 텍스트 4.5:1 이상, 대형 텍스트 3:1 이상) 준수

---

### Primary — 오렌지 코랄 (Orange Coral)

| 토큰 | Hex | RGB | NativeWind 클래스 | 용도 |
|------|-----|-----|-------------------|------|
| `primary-50` | `#FFF4ED` | 255, 244, 237 | `bg-orange-50` | 배경 틴트 |
| `primary-100` | `#FFE8D5` | 255, 232, 213 | `bg-orange-100` | 호버 배경 |
| `primary-200` | `#FFCFAA` | 255, 207, 170 | `bg-orange-200` | 비활성 상태 |
| `primary-300` | `#FFB07A` | 255, 176, 122 | `bg-orange-300` | 보조 강조 |
| `primary-400` | `#FF8C47` | 255, 140, 71 | `bg-orange-400` | 밝은 Primary |
| **`primary-500`** | **`#FF6B1A`** | 255, 107, 26 | `bg-orange-500` | **메인 Primary** |
| `primary-600` | `#E55A0D` | 229, 90, 13 | `bg-orange-600` | 눌림 상태 |
| `primary-700` | `#BF4A08` | 191, 74, 8 | `bg-orange-700` | 진한 강조 |
| `primary-800` | `#993B06` | 153, 59, 6 | `bg-orange-800` | 텍스트 강조 |
| `primary-900` | `#7A2E05` | 122, 46, 5 | `bg-orange-900` | 다크 텍스트 |

**대비율 (WCAG AA):**
- `primary-500` (#FF6B1A) on White (#FFFFFF): **3.1:1** — 대형 텍스트/아이콘 OK
- `primary-700` (#BF4A08) on White (#FFFFFF): **5.7:1** — 일반 텍스트 OK (AA 통과)
- White on `primary-500` (#FF6B1A): **3.1:1** — 버튼 텍스트는 Bold 사용 권장

---

### Secondary — 민트 그린 (Mint Green)

| 토큰 | Hex | RGB | NativeWind 클래스 | 용도 |
|------|-----|-----|-------------------|------|
| `secondary-50` | `#EDFCF4` | 237, 252, 244 | `bg-emerald-50` | 배경 틴트 |
| `secondary-100` | `#D3F8E6` | 211, 248, 230 | `bg-emerald-100` | 태그 배경 |
| `secondary-200` | `#A8F0CD` | 168, 240, 205 | `bg-emerald-200` | 뱃지 배경 |
| `secondary-300` | `#6BE2AE` | 107, 226, 174 | `bg-emerald-300` | 보조 강조 |
| **`secondary-400`** | **`#34CFA0`** | 52, 207, 160 | `bg-emerald-400` | **메인 Secondary** |
| `secondary-500` | `#1AB887` | 26, 184, 135 | `bg-emerald-500` | 진한 Secondary |
| `secondary-600` | `#14956C` | 20, 149, 108 | `bg-emerald-600` | 눌림 상태 |
| `secondary-700` | `#0F7254` | 15, 114, 84 | `bg-emerald-700` | 텍스트 강조 |

**대비율 (WCAG AA):**
- `secondary-400` (#34CFA0) on White: **2.3:1** — 배경/장식용만 사용
- `secondary-700` (#0F7254) on White: **5.9:1** — 일반 텍스트 OK (AA 통과)

---

### Accent — 레몬 옐로우 (Lemon Yellow)

| 토큰 | Hex | RGB | NativeWind 클래스 | 용도 |
|------|-----|-----|-------------------|------|
| `accent-300` | `#FFF176` | 255, 241, 118 | `bg-yellow-300` | 하이라이트 |
| **`accent-400`** | **`#FFE01A`** | 255, 224, 26 | `bg-yellow-400` | **메인 Accent** |
| `accent-500` | `#F5CB00` | 245, 203, 0 | `bg-yellow-500` | 강조 아이콘 |

> Accent는 주로 뱃지, 새 기능 표시, 중요 하이라이트에 사용. 배경에는 Dark 텍스트(`neutral-900`)와 함께 사용.

---

### Neutral — 그레이스케일

| 토큰 | Hex | RGB | NativeWind 클래스 | 용도 |
|------|-----|-----|-------------------|------|
| `neutral-0` | `#FFFFFF` | 255, 255, 255 | `bg-white` | 카드 배경 |
| `neutral-50` | `#F9FAFB` | 249, 250, 251 | `bg-gray-50` | 앱 배경 |
| `neutral-100` | `#F3F4F6` | 243, 244, 246 | `bg-gray-100` | 입력 배경 |
| `neutral-200` | `#E5E7EB` | 229, 231, 235 | `bg-gray-200` | 구분선 |
| `neutral-300` | `#D1D5DB` | 209, 213, 219 | `bg-gray-300` | 비활성 테두리 |
| `neutral-400` | `#9CA3AF` | 156, 163, 175 | `bg-gray-400` | 플레이스홀더 |
| `neutral-500` | `#6B7280` | 107, 114, 128 | `bg-gray-500` | 보조 텍스트 |
| `neutral-600` | `#4B5563` | 75, 85, 99 | `bg-gray-600` | 부제목 |
| `neutral-700` | `#374151` | 55, 65, 81 | `bg-gray-700` | 본문 텍스트 |
| `neutral-800` | `#1F2937` | 31, 41, 55 | `bg-gray-800` | 제목 |
| `neutral-900` | `#111827` | 17, 24, 39 | `bg-gray-900` | 강조 제목 |

---

### Semantic 컬러

| 역할 | 토큰 | Hex | NativeWind | 사용 |
|------|------|-----|------------|------|
| **Success** | `success-500` | `#22C55E` | `bg-green-500` | 분석 완료, 저장 성공 |
| **Success Light** | `success-100` | `#DCFCE7` | `bg-green-100` | 성공 배경 |
| **Warning** | `warning-500` | `#F59E0B` | `bg-amber-500` | 유통기한 임박 |
| **Warning Light** | `warning-100` | `#FEF3C7` | `bg-amber-100` | 경고 배경 |
| **Error** | `error-500` | `#EF4444` | `bg-red-500` | 인식 실패, 에러 |
| **Error Light** | `error-100` | `#FEE2E2` | `bg-red-100` | 에러 배경 |
| **Info** | `info-500` | `#3B82F6` | `bg-blue-500` | 도움말, 안내 |
| **Info Light** | `info-100` | `#DBEAFE` | `bg-blue-100` | 정보 배경 |

---

### 컬러 토큰 TypeScript 파일

```typescript
// src/constants/colors.ts
export const Colors = {
  // Primary - Orange Coral
  primary: {
    50:  '#FFF4ED',
    100: '#FFE8D5',
    200: '#FFCFAA',
    300: '#FFB07A',
    400: '#FF8C47',
    500: '#FF6B1A',  // 메인
    600: '#E55A0D',
    700: '#BF4A08',
    800: '#993B06',
    900: '#7A2E05',
  },

  // Secondary - Mint Green
  secondary: {
    50:  '#EDFCF4',
    100: '#D3F8E6',
    200: '#A8F0CD',
    300: '#6BE2AE',
    400: '#34CFA0',  // 메인
    500: '#1AB887',
    600: '#14956C',
    700: '#0F7254',
  },

  // Accent - Lemon Yellow
  accent: {
    300: '#FFF176',
    400: '#FFE01A',  // 메인
    500: '#F5CB00',
  },

  // Neutral
  neutral: {
    0:   '#FFFFFF',
    50:  '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Semantic
  success: {
    100: '#DCFCE7',
    500: '#22C55E',
    700: '#15803D',
  },
  warning: {
    100: '#FEF3C7',
    500: '#F59E0B',
    700: '#B45309',
  },
  error: {
    100: '#FEE2E2',
    500: '#EF4444',
    700: '#B91C1C',
  },
  info: {
    100: '#DBEAFE',
    500: '#3B82F6',
    700: '#1D4ED8',
  },
} as const;

// 의미론적 별칭 (사용 권장)
export const ColorTokens = {
  // 브랜드
  brandPrimary:   Colors.primary[500],
  brandSecondary: Colors.secondary[400],
  brandAccent:    Colors.accent[400],

  // 텍스트
  textPrimary:    Colors.neutral[900],
  textSecondary:  Colors.neutral[600],
  textTertiary:   Colors.neutral[400],
  textDisabled:   Colors.neutral[300],
  textOnPrimary:  Colors.neutral[0],      // primary 배경 위 텍스트

  // 배경
  bgBase:         Colors.neutral[50],
  bgSurface:      Colors.neutral[0],
  bgSurfaceAlt:   Colors.neutral[100],
  bgOverlay:      'rgba(17, 24, 39, 0.5)',

  // 테두리
  borderDefault:  Colors.neutral[200],
  borderFocus:    Colors.primary[500],
  borderStrong:   Colors.neutral[400],
} as const;
```

---

## 3. 타이포그래피

### 폰트 패밀리

| 역할 | 폰트 | 이유 |
|------|------|------|
| **한글 (메인)** | **Pretendard** | 가독성 최상위. 현대적이고 깔끔한 한글 전용 폰트. MZ 세대 감성에 최적. 무료 오픈소스 |
| **영문/숫자** | **Inter** | 기술적이면서 친근한 느낌. 숫자 가독성 우수 (레시피 시간, 칼로리 표기용) |
| **Fallback** | `-apple-system`, `sans-serif` | iOS/Android 시스템 폰트 |

### Expo 폰트 로딩 설정

```typescript
// app/_layout.tsx
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Thin':       require('../assets/fonts/Pretendard-Thin.otf'),
    'Pretendard-Light':      require('../assets/fonts/Pretendard-Light.otf'),
    'Pretendard-Regular':    require('../assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-Medium':     require('../assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-SemiBold':   require('../assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Bold':       require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-ExtraBold':  require('../assets/fonts/Pretendard-ExtraBold.otf'),
    'Inter-Regular':         require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium':          require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold':        require('../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold':            require('../assets/fonts/Inter-Bold.ttf'),
  });

  if (!fontsLoaded) return null;
  // ...
}
```

---

### 타입 스케일

| 토큰 | 크기 | 행간 | 자간 | 폰트 | 굵기 | 용도 |
|------|------|------|------|------|------|------|
| `H1` | 32px | 40px | -0.5px | Pretendard | ExtraBold (800) | 앱 타이틀, 대형 히어로 |
| `H2` | 26px | 34px | -0.3px | Pretendard | Bold (700) | 섹션 제목 |
| `H3` | 22px | 30px | -0.2px | Pretendard | Bold (700) | 카드 제목 |
| `H4` | 18px | 26px | -0.1px | Pretendard | SemiBold (600) | 서브 제목 |
| `H5` | 16px | 24px | 0px | Pretendard | SemiBold (600) | 리스트 헤더 |
| `H6` | 14px | 20px | 0px | Pretendard | SemiBold (600) | 소제목, 레이블 |
| `Body1` | 16px | 26px | 0px | Pretendard | Regular (400) | 메인 본문 |
| `Body2` | 14px | 22px | 0px | Pretendard | Regular (400) | 보조 본문 |
| `Body2M` | 14px | 22px | 0px | Pretendard | Medium (500) | 강조 본문 |
| `Caption` | 12px | 18px | 0.2px | Pretendard | Regular (400) | 부가 정보, 날짜 |
| `CaptionM` | 12px | 18px | 0.2px | Pretendard | Medium (500) | 강조 캡션 |
| `Button` | 15px | 20px | 0.3px | Pretendard | SemiBold (600) | 버튼 레이블 |
| `ButtonSm` | 13px | 18px | 0.3px | Pretendard | SemiBold (600) | 소형 버튼 |
| `Number` | — | — | -0.5px | Inter | Bold (700) | 숫자 (시간, 칼로리) |

### React Native StyleSheet 타이포그래피 시스템

```typescript
// src/styles/typography.ts
import { StyleSheet, TextStyle } from 'react-native';

const fontFamily = {
  pretendard: {
    thin:       'Pretendard-Thin',
    light:      'Pretendard-Light',
    regular:    'Pretendard-Regular',
    medium:     'Pretendard-Medium',
    semiBold:   'Pretendard-SemiBold',
    bold:       'Pretendard-Bold',
    extraBold:  'Pretendard-ExtraBold',
  },
  inter: {
    regular:  'Inter-Regular',
    medium:   'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold:     'Inter-Bold',
  },
} as const;

export const typography = StyleSheet.create({
  h1: {
    fontFamily:     fontFamily.pretendard.extraBold,
    fontSize:       32,
    lineHeight:     40,
    letterSpacing:  -0.5,
  } as TextStyle,
  h2: {
    fontFamily:     fontFamily.pretendard.bold,
    fontSize:       26,
    lineHeight:     34,
    letterSpacing:  -0.3,
  } as TextStyle,
  h3: {
    fontFamily:     fontFamily.pretendard.bold,
    fontSize:       22,
    lineHeight:     30,
    letterSpacing:  -0.2,
  } as TextStyle,
  h4: {
    fontFamily:     fontFamily.pretendard.semiBold,
    fontSize:       18,
    lineHeight:     26,
    letterSpacing:  -0.1,
  } as TextStyle,
  h5: {
    fontFamily:     fontFamily.pretendard.semiBold,
    fontSize:       16,
    lineHeight:     24,
    letterSpacing:  0,
  } as TextStyle,
  h6: {
    fontFamily:     fontFamily.pretendard.semiBold,
    fontSize:       14,
    lineHeight:     20,
    letterSpacing:  0,
  } as TextStyle,
  body1: {
    fontFamily:     fontFamily.pretendard.regular,
    fontSize:       16,
    lineHeight:     26,
    letterSpacing:  0,
  } as TextStyle,
  body2: {
    fontFamily:     fontFamily.pretendard.regular,
    fontSize:       14,
    lineHeight:     22,
    letterSpacing:  0,
  } as TextStyle,
  body2Medium: {
    fontFamily:     fontFamily.pretendard.medium,
    fontSize:       14,
    lineHeight:     22,
    letterSpacing:  0,
  } as TextStyle,
  caption: {
    fontFamily:     fontFamily.pretendard.regular,
    fontSize:       12,
    lineHeight:     18,
    letterSpacing:  0.2,
  } as TextStyle,
  captionMedium: {
    fontFamily:     fontFamily.pretendard.medium,
    fontSize:       12,
    lineHeight:     18,
    letterSpacing:  0.2,
  } as TextStyle,
  button: {
    fontFamily:     fontFamily.pretendard.semiBold,
    fontSize:       15,
    lineHeight:     20,
    letterSpacing:  0.3,
  } as TextStyle,
  buttonSm: {
    fontFamily:     fontFamily.pretendard.semiBold,
    fontSize:       13,
    lineHeight:     18,
    letterSpacing:  0.3,
  } as TextStyle,
  // 숫자 전용 (Inter 사용)
  numberLg: {
    fontFamily:     fontFamily.inter.bold,
    fontSize:       24,
    lineHeight:     30,
    letterSpacing:  -0.5,
  } as TextStyle,
  numberMd: {
    fontFamily:     fontFamily.inter.bold,
    fontSize:       18,
    lineHeight:     24,
    letterSpacing:  -0.3,
  } as TextStyle,
  numberSm: {
    fontFamily:     fontFamily.inter.semiBold,
    fontSize:       14,
    lineHeight:     18,
    letterSpacing:  -0.2,
  } as TextStyle,
});

// NativeWind 클래스 대응 (tailwind.config.js 확장 필요)
/*
  font-pretendard-regular → fontFamily: 'Pretendard-Regular'
  font-pretendard-medium  → fontFamily: 'Pretendard-Medium'
  font-pretendard-semibold → fontFamily: 'Pretendard-SemiBold'
  font-pretendard-bold    → fontFamily: 'Pretendard-Bold'
  font-pretendard-extrabold → fontFamily: 'Pretendard-ExtraBold'
  font-inter-regular      → fontFamily: 'Inter-Regular'
  font-inter-bold         → fontFamily: 'Inter-Bold'
*/
```

### NativeWind tailwind.config.js 폰트 확장

```javascript
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'pretendard':          ['Pretendard-Regular'],
        'pretendard-medium':   ['Pretendard-Medium'],
        'pretendard-semibold': ['Pretendard-SemiBold'],
        'pretendard-bold':     ['Pretendard-Bold'],
        'pretendard-extrabold':['Pretendard-ExtraBold'],
        'inter':               ['Inter-Regular'],
        'inter-medium':        ['Inter-Medium'],
        'inter-semibold':      ['Inter-SemiBold'],
        'inter-bold':          ['Inter-Bold'],
      },
      colors: {
        primary: {
          50:  '#FFF4ED',
          100: '#FFE8D5',
          200: '#FFCFAA',
          300: '#FFB07A',
          400: '#FF8C47',
          500: '#FF6B1A',
          600: '#E55A0D',
          700: '#BF4A08',
          800: '#993B06',
          900: '#7A2E05',
        },
        secondary: {
          50:  '#EDFCF4',
          100: '#D3F8E6',
          200: '#A8F0CD',
          300: '#6BE2AE',
          400: '#34CFA0',
          500: '#1AB887',
          600: '#14956C',
          700: '#0F7254',
        },
        accent: {
          300: '#FFF176',
          400: '#FFE01A',
          500: '#F5CB00',
        },
      },
      borderRadius: {
        'xs':  '4px',
        'sm':  '8px',
        'md':  '12px',
        'lg':  '16px',
        'xl':  '20px',
        '2xl': '24px',
        'full': '9999px',
      },
      spacing: {
        'xs':  '4px',
        'sm':  '8px',
        'md':  '16px',
        'lg':  '24px',
        'xl':  '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
    },
  },
  plugins: [],
};
```

---

## 4. 아이콘 & 일러스트

### 아이콘 스타일 가이드

| 속성 | 값 | 비고 |
|------|-----|------|
| **라이브러리** | `@expo/vector-icons` (Ionicons + MaterialCommunityIcons) | Expo 기본 제공 |
| **스타일** | 라인 아이콘 (Outlined) | 기본 상태 |
| **스타일 (활성)** | 필드 아이콘 (Filled) | 탭바 활성, 선택된 상태 |
| **기본 크기** | 24px | 일반 UI |
| **소형 크기** | 16px | 인라인, 캡션 옆 |
| **대형 크기** | 32px | 히어로, 빈 상태 |
| **초대형 크기** | 48~64px | 온보딩, 성공 화면 |
| **색상** | `neutral-700` (기본) | |
| **색상 (비활성)** | `neutral-400` | |
| **색상 (활성/브랜드)** | `primary-500` (#FF6B1A) | |
| **색상 (on-dark)** | `neutral-0` (#FFFFFF) | |
| **터치 타겟** | 최소 44×44pt | 아이콘 주변 패딩 포함 |

### 핵심 아이콘 목록

```typescript
// src/constants/icons.ts
// Ionicons 기반

export const AppIcons = {
  // 핵심 기능
  camera:         { outline: 'camera-outline',         filled: 'camera' },
  fridge:         { outline: 'cube-outline',           filled: 'cube' },          // 냉장고
  search:         { outline: 'search-outline',         filled: 'search' },
  recipe:         { outline: 'restaurant-outline',     filled: 'restaurant' },

  // 요리 관련
  fire:           { outline: 'flame-outline',          filled: 'flame' },         // 불꽃/칼로리
  timer:          { outline: 'timer-outline',          filled: 'timer' },         // 조리 시간
  bookmark:       { outline: 'bookmark-outline',       filled: 'bookmark' },      // 레시피 저장
  star:           { outline: 'star-outline',           filled: 'star' },          // 즐겨찾기
  leaf:           { outline: 'leaf-outline',           filled: 'leaf' },          // 채소/건강

  // AI/분석
  scan:           { outline: 'scan-outline',           filled: 'scan' },          // AI 스캔
  sparkles:       { outline: 'sparkles-outline',       filled: 'sparkles' },      // AI 기능 표시
  checkmark:      { outline: 'checkmark-circle-outline', filled: 'checkmark-circle' },

  // 네비게이션
  home:           { outline: 'home-outline',           filled: 'home' },
  heart:          { outline: 'heart-outline',          filled: 'heart' },         // 찜한 레시피
  person:         { outline: 'person-outline',         filled: 'person' },        // 프로필
  settings:       { outline: 'settings-outline',       filled: 'settings' },

  // 공통 UI
  back:           { outline: 'chevron-back-outline',   filled: 'chevron-back' },
  close:          { outline: 'close-outline',          filled: 'close' },
  add:            { outline: 'add-circle-outline',     filled: 'add-circle' },
  share:          { outline: 'share-social-outline',   filled: 'share-social' },
  more:           { outline: 'ellipsis-horizontal-outline', filled: 'ellipsis-horizontal' },
  warning:        { outline: 'warning-outline',        filled: 'warning' },
  info:           { outline: 'information-circle-outline', filled: 'information-circle' },
  gallery:        { outline: 'images-outline',         filled: 'images' },        // 갤러리에서 선택
  refresh:        { outline: 'refresh-outline',        filled: 'refresh' },       // 재분석
} as const;

// 사용 예시
// import { Ionicons } from '@expo/vector-icons';
// <Ionicons name={AppIcons.camera.outline} size={24} color={Colors.neutral[700]} />
```

### 일러스트레이션 가이드

냉털이는 브랜드 일러스트를 빈 상태(Empty State), 온보딩, 성공 화면에 활용합니다.

| 장면 | 파일명 | 설명 |
|------|--------|------|
| 온보딩 1 | `illust_onboard_camera.svg` | 냉장고를 향해 카메라를 들고 있는 손 |
| 온보딩 2 | `illust_onboard_ai.svg` | 식재료 위에 반짝이는 AI 스캔 |
| 온보딩 3 | `illust_onboard_recipe.svg` | 레시피 카드가 팡팡 뜨는 장면 |
| 빈 냉장고 | `illust_empty_fridge.svg` | 텅 빈 냉장고 (Empty State) |
| 분석 완료 | `illust_success_scan.svg` | 재료 인식 완료 체크마크 |
| 오류 | `illust_error_generic.svg` | 삐뚤어진 냉장고 (오류 화면) |

**일러스트 스타일 원칙:**
- 두꺼운 선 (stroke-width: 2~3px), 심플하고 플랫한 형태
- 컬러: Primary (#FF6B1A), Secondary (#34CFA0), Accent (#FFE01A) 조합
- 배경 없음 (투명) — 다크모드 호환
- 캐릭터 없음 (사람 형태 지양) — 재료와 음식 중심

---

## 5. 컴포넌트 스타일

### 기본 원칙

- 최소 터치 타겟: **44×44pt** (iOS HIG / Android Material 기준)
- 모든 인터랙티브 요소는 `activeOpacity={0.7}` 또는 `Pressable` 피드백 제공
- 그림자: iOS `shadow*` + Android `elevation` 동시 적용

---

### Button 컴포넌트

#### 스펙 테이블

| 속성 | Primary | Secondary | Ghost | Danger |
|------|---------|-----------|-------|--------|
| **배경** | `#FF6B1A` | `#EDFCF4` | 투명 | `#FEE2E2` |
| **텍스트** | `#FFFFFF` | `#0F7254` | `#FF6B1A` | `#B91C1C` |
| **테두리** | 없음 | 없음 | `#FF6B1A` 1px | `#EF4444` 1px |
| **눌림 배경** | `#E55A0D` | `#D3F8E6` | `rgba(255,107,26,0.08)` | `#FECACA` |
| **비활성 배경** | `#FFCFAA` | `#F3F4F6` | 투명 | `#F3F4F6` |
| **비활성 텍스트** | `#FFFFFF` | `#9CA3AF` | `#9CA3AF` | `#9CA3AF` |
| **높이 (Large)** | 52pt | 52pt | 52pt | 52pt |
| **높이 (Medium)** | 44pt | 44pt | 44pt | 44pt |
| **높이 (Small)** | 36pt | 36pt | 36pt | 36pt |
| **border-radius** | 12pt | 12pt | 12pt | 12pt |
| **수평 패딩** | 24pt | 24pt | 20pt | 20pt |

#### Button 구현 코드

```typescript
// src/components/ui/Button.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { typography } from '@/styles/typography';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize    = 'lg' | 'md' | 'sm';

interface ButtonProps {
  label:      string;
  onPress:    () => void;
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  disabled?:  boolean;
  loading?:   boolean;
  fullWidth?: boolean;
  leftIcon?:  React.ReactNode;
}

export function Button({
  label,
  onPress,
  variant   = 'primary',
  size      = 'md',
  disabled  = false,
  loading   = false,
  fullWidth = false,
  leftIcon,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        styles[`variant_${variant}`],
        styles[`size_${size}`],
        isDisabled && styles[`disabled_${variant}`],
        fullWidth && styles.fullWidth,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      accessibilityLabel={label}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.neutral[0] : Colors.primary[500]}
          size="small"
        />
      ) : (
        <>
          {leftIcon}
          <Text
            style={[
              styles.label,
              styles[`labelSize_${size}`],
              styles[`labelVariant_${variant}`],
              isDisabled && styles[`labelDisabled_${variant}`],
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    borderRadius:   12,
    gap:            8,
  },
  fullWidth: {
    width: '100%',
  },

  // Variants
  variant_primary: {
    backgroundColor: Colors.primary[500],
  },
  variant_secondary: {
    backgroundColor: Colors.secondary[50],
  },
  variant_ghost: {
    backgroundColor: 'transparent',
    borderWidth:     1,
    borderColor:     Colors.primary[500],
  },
  variant_danger: {
    backgroundColor: Colors.error[100],
    borderWidth:     1,
    borderColor:     Colors.error[500],
  },

  // Sizes
  size_lg: { height: 52, paddingHorizontal: 24 },
  size_md: { height: 44, paddingHorizontal: 20 },
  size_sm: { height: 36, paddingHorizontal: 16 },

  // Disabled states
  disabled_primary:   { backgroundColor: Colors.primary[200] },
  disabled_secondary: { backgroundColor: Colors.neutral[100] },
  disabled_ghost:     { borderColor: Colors.neutral[300] },
  disabled_danger:    { backgroundColor: Colors.neutral[100], borderColor: Colors.neutral[300] },

  // Label base
  label: {
    ...typography.button,
  },
  labelSize_lg: { ...typography.button },
  labelSize_md: { ...typography.button },
  labelSize_sm: { ...typography.buttonSm },

  // Label colors
  labelVariant_primary:   { color: Colors.neutral[0] },
  labelVariant_secondary: { color: Colors.secondary[700] },
  labelVariant_ghost:     { color: Colors.primary[500] },
  labelVariant_danger:    { color: Colors.error[700] },

  // Label disabled colors
  labelDisabled_primary:   { color: Colors.neutral[0] },
  labelDisabled_secondary: { color: Colors.neutral[400] },
  labelDisabled_ghost:     { color: Colors.neutral[400] },
  labelDisabled_danger:    { color: Colors.neutral[400] },
});
```

---

### Card 컴포넌트

#### Recipe Card 스펙

| 속성 | 값 |
|------|-----|
| **배경** | `#FFFFFF` |
| **border-radius** | 16pt |
| **그림자 (iOS)** | `shadowColor: #000`, `shadowOffset: {0,4}`, `shadowOpacity: 0.08`, `shadowRadius: 12` |
| **그림자 (Android)** | `elevation: 4` |
| **이미지 비율** | 16:9 (가로형), 4:3 (정사각형 변형) |
| **이미지 border-radius** | 상단 16pt, 하단 0pt |
| **내부 패딩** | 12pt |
| **카드 간 여백** | 12pt |

#### Ingredient Card 스펙

| 속성 | 값 |
|------|-----|
| **배경** | `#F9FAFB` |
| **테두리** | `#E5E7EB` 1px |
| **border-radius** | 12pt |
| **크기** | 80×96pt (세로형 그리드용) |
| **아이콘 크기** | 32pt |
| **패딩** | 8pt |

```typescript
// src/components/cards/RecipeCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { typography } from '@/styles/typography';

interface RecipeCardProps {
  title:        string;
  imageUri:     string;
  cookTime:     number;   // 분
  difficulty:   'easy' | 'medium' | 'hard';
  calories?:    number;
  matchRate?:   number;   // 재료 일치율 0~100
  onPress:      () => void;
  onBookmark?:  () => void;
  isBookmarked?: boolean;
}

const difficultyLabel = { easy: '쉬움', medium: '보통', hard: '어려움' };
const difficultyColor = {
  easy:   Colors.success[500],
  medium: Colors.warning[500],
  hard:   Colors.error[500],
};

export function RecipeCard({
  title, imageUri, cookTime, difficulty, calories,
  matchRate, onPress, onBookmark, isBookmarked = false,
}: RecipeCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title} 레시피`}
    >
      {/* 이미지 영역 */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
        {matchRate !== undefined && (
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>{matchRate}% 일치</Text>
          </View>
        )}
        {onBookmark && (
          <Pressable
            style={styles.bookmarkBtn}
            onPress={onBookmark}
            hitSlop={8}
            accessibilityLabel={isBookmarked ? '북마크 해제' : '북마크 추가'}
          >
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={isBookmarked ? Colors.primary[500] : Colors.neutral[0]}
            />
          </Pressable>
        )}
      </View>

      {/* 정보 영역 */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <View style={styles.metaRow}>
          {/* 조리 시간 */}
          <View style={styles.metaItem}>
            <Ionicons name="timer-outline" size={14} color={Colors.neutral[500]} />
            <Text style={styles.metaText}>{cookTime}분</Text>
          </View>
          {/* 난이도 */}
          <View style={styles.metaItem}>
            <View style={[styles.dot, { backgroundColor: difficultyColor[difficulty] }]} />
            <Text style={styles.metaText}>{difficultyLabel[difficulty]}</Text>
          </View>
          {/* 칼로리 */}
          {calories && (
            <View style={styles.metaItem}>
              <Ionicons name="flame-outline" size={14} color={Colors.neutral[500]} />
              <Text style={styles.metaText}>{calories}kcal</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.neutral[0],
    borderRadius:    16,
    overflow:        'hidden',
    shadowColor:     '#000000',
    shadowOffset:    { width: 0, height: 4 },
    shadowOpacity:   0.08,
    shadowRadius:    12,
    elevation:       4,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  imageWrapper: {
    position: 'relative',
    aspectRatio: 16 / 9,
    width: '100%',
  },
  image: {
    width:  '100%',
    height: '100%',
  },
  matchBadge: {
    position:        'absolute',
    bottom:          8,
    left:            8,
    backgroundColor: Colors.primary[500],
    borderRadius:    6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  matchText: {
    ...typography.captionMedium,
    color: Colors.neutral[0],
  },
  bookmarkBtn: {
    position:        'absolute',
    top:             8,
    right:           8,
    width:           36,
    height:          36,
    borderRadius:    18,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems:      'center',
    justifyContent:  'center',
  },
  info: {
    padding: 12,
    gap:     6,
  },
  title: {
    ...typography.h5,
    color: Colors.neutral[900],
  },
  metaRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           12,
    flexWrap:      'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           4,
  },
  metaText: {
    ...typography.caption,
    color: Colors.neutral[500],
  },
  dot: {
    width:        6,
    height:       6,
    borderRadius: 3,
  },
});
```

---

### Badge 컴포넌트

#### Badge 스펙

| 타입 | 배경 | 텍스트 | border-radius | 패딩 |
|------|------|--------|--------------|------|
| **쉬움 (Easy)** | `#DCFCE7` | `#15803D` | 6pt | 4×10pt |
| **보통 (Medium)** | `#FEF3C7` | `#B45309` | 6pt | 4×10pt |
| **어려움 (Hard)** | `#FEE2E2` | `#B91C1C` | 6pt | 4×10pt |
| **시간** | `#F3F4F6` | `#4B5563` | 6pt | 4×10pt |
| **칼로리** | `#FFF4ED` | `#BF4A08` | 6pt | 4×10pt |
| **재료 일치** | `#FF6B1A` | `#FFFFFF` | 6pt | 4×10pt |
| **New** | `#FFE01A` | `#111827` | 6pt | 4×10pt |

```typescript
// src/components/ui/Badge.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { typography } from '@/styles/typography';

type BadgeType = 'difficulty-easy' | 'difficulty-medium' | 'difficulty-hard'
               | 'time' | 'calories' | 'match' | 'new';

interface BadgeProps {
  type:   BadgeType;
  label:  string;
  icon?:  string; // Ionicons name
  style?: ViewStyle;
}

const badgeTheme: Record<BadgeType, { bg: string; text: string }> = {
  'difficulty-easy':   { bg: Colors.success[100],  text: Colors.success[700] },
  'difficulty-medium': { bg: Colors.warning[100],  text: Colors.warning[700] },
  'difficulty-hard':   { bg: Colors.error[100],    text: Colors.error[700]   },
  'time':              { bg: Colors.neutral[100],  text: Colors.neutral[600] },
  'calories':          { bg: Colors.primary[50],   text: Colors.primary[700] },
  'match':             { bg: Colors.primary[500],  text: Colors.neutral[0]   },
  'new':               { bg: Colors.accent[400],   text: Colors.neutral[900] },
};

export function Badge({ type, label, icon, style }: BadgeProps) {
  const theme = badgeTheme[type];
  return (
    <View style={[styles.badge, { backgroundColor: theme.bg }, style]}>
      {icon && (
        <Ionicons name={icon as never} size={12} color={theme.text} />
      )}
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection:    'row',
    alignItems:       'center',
    gap:              4,
    borderRadius:     6,
    paddingHorizontal: 10,
    paddingVertical:  4,
    alignSelf:        'flex-start',
  },
  label: {
    ...typography.captionMedium,
  },
});

// 사용 예시
// <Badge type="difficulty-easy" label="쉬움" />
// <Badge type="time" label="25분" icon="timer-outline" />
// <Badge type="calories" label="320kcal" icon="flame-outline" />
// <Badge type="match" label="85% 일치" />
```

---

## 6. 스페이싱 & 레이아웃

### 8pt 그리드 시스템

모든 간격과 크기는 **8의 배수** 원칙을 따릅니다. 예외적으로 세밀한 조정이 필요한 경우 4pt(xs)를 사용합니다.

### 스페이싱 스케일

```typescript
// src/constants/spacing.ts
export const Spacing = {
  xs:   4,   // 아이콘-텍스트 간격, 뱃지 내부
  sm:   8,   // 관련 요소 간 최소 간격, 인라인 갭
  md:   16,  // 컴포넌트 내부 패딩, 카드 내부
  lg:   24,  // 섹션 간 여백, 화면 수평 패딩
  xl:   32,  // 대형 섹션 간격
  xxl:  48,  // 히어로 영역 여백
  xxxl: 64,  // 온보딩 등 대형 여백
} as const;

// 화면 레이아웃 상수
export const Layout = {
  screenPaddingH:   Spacing.lg,   // 화면 좌우 패딩 = 24pt
  screenPaddingTop: Spacing.md,   // 상단 여백 = 16pt
  cardGap:          Spacing.sm + 4,  // 카드 간 여백 = 12pt
  sectionGap:       Spacing.xl,   // 섹션 간 여백 = 32pt
  bottomTabHeight:  80,           // 하단 탭바 높이
  headerHeight:     56,           // 헤더 높이
} as const;
```

### NativeWind 스페이싱 클래스 대응

| 토큰 | 값 | NativeWind | 사용 예 |
|------|-----|------------|---------|
| `xs` | 4pt | `p-1`, `gap-1`, `m-1` | 뱃지 내부 패딩, 아이콘 간격 |
| `sm` | 8pt | `p-2`, `gap-2`, `m-2` | 카드 내부 소형 간격 |
| `md` | 16pt | `p-4`, `gap-4`, `m-4` | 카드 패딩, 섹션 내부 |
| `lg` | 24pt | `p-6`, `gap-6`, `m-6` | 화면 여백, 섹션 간격 |
| `xl` | 32pt | `p-8`, `gap-8`, `m-8` | 대형 여백 |
| `2xl` | 48pt | `p-12`, `gap-12` | 온보딩 요소 간격 |

### 그리드 레이아웃 패턴

```typescript
// 2열 레시피 그리드
// src/components/layout/RecipeGrid.tsx
import { View, FlatList, Dimensions } from 'react-native';
import { Spacing } from '@/constants/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - Spacing.lg * 2 - 12) / 2;
// = (390 - 48 - 12) / 2 ≈ 165pt (iPhone 14 기준)

// FlatList 설정
// numColumns={2}
// columnWrapperStyle={{ gap: 12 }}
// contentContainerStyle={{ padding: 24, gap: 12 }}
```

### 화면 레이아웃 템플릿

```typescript
// src/components/layout/ScreenLayout.tsx
import React from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';

interface ScreenLayoutProps {
  children:    React.ReactNode;
  scrollable?: boolean;
  noPadding?:  boolean;
}

export function ScreenLayout({
  children,
  scrollable = true,
  noPadding  = false,
}: ScreenLayoutProps) {
  const content = (
    <View style={[styles.content, noPadding && styles.noPadding]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {scrollable ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: Colors.neutral[50],
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex:            1,
    paddingHorizontal: Spacing.lg,   // 24pt
    paddingTop:      Spacing.md,     // 16pt
  },
  noPadding: {
    paddingHorizontal: 0,
    paddingTop:        0,
  },
});
```

---

## 7. 애니메이션 & 인터랙션

### 애니메이션 원칙

- **목적성**: 모든 애니메이션은 사용자의 이해를 돕는 역할. 장식만을 위한 애니메이션은 최소화
- **빠르게**: 응답 피드백은 100~200ms 이내
- **자연스럽게**: 선형(linear) 타이밍보다 easing 함수 사용 (`easeOut`, `spring`)
- **줄이기**: `AccessibilityInfo.isReduceMotionEnabled`로 접근성 배려

### 애니메이션 타이밍 상수

```typescript
// src/constants/animation.ts
import { Easing } from 'react-native';

export const AnimDuration = {
  instant:    100,   // 탭 피드백, 토글
  fast:       200,   // 버튼 눌림, 모달 작은 것
  normal:     300,   // 화면 전환, 카드 등장
  slow:       500,   // 로딩 완료 애니메이션
  verySlow:   800,   // 온보딩 히어로 등장
} as const;

export const AnimEasing = {
  out:       Easing.out(Easing.cubic),
  in:        Easing.in(Easing.cubic),
  inOut:     Easing.inOut(Easing.cubic),
  spring:    Easing.elastic(1),
  bounce:    Easing.bounce,
} as const;

// Spring 설정 (react-native-reanimated withSpring)
export const SpringConfig = {
  snappy:  { damping: 20, stiffness: 400 },  // 버튼, 작은 요소
  bouncy:  { damping: 12, stiffness: 200 },  // 카드 팝인
  gentle:  { damping: 30, stiffness: 150 },  // 모달, 시트
} as const;
```

### 1. 화면 전환 애니메이션 (Expo Router)

```typescript
// app/_layout.tsx — Expo Router Stack 설정
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        animation:          'slide_from_right',  // iOS 기본
        animationDuration:  300,
        gestureEnabled:     true,
        gestureDirection:   'horizontal',
        headerShown:        false,
      }}
    />
  );
}

// 모달 화면은 별도 설정
// animation: 'slide_from_bottom'
// presentation: 'modal'
```

### 2. 카드 탭 피드백 (Scale + Opacity)

```typescript
// src/hooks/usePressAnimation.ts
import { useRef } from 'react';
import { Animated } from 'react-native';
import { AnimDuration, AnimEasing } from '@/constants/animation';

export function usePressAnimation() {
  const scale   = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.parallel([
      Animated.timing(scale,   { toValue: 0.96, duration: AnimDuration.instant, useNativeDriver: true, easing: AnimEasing.out }),
      Animated.timing(opacity, { toValue: 0.85, duration: AnimDuration.instant, useNativeDriver: true }),
    ]).start();
  };

  const onPressOut = () => {
    Animated.parallel([
      Animated.spring(scale,   { toValue: 1, useNativeDriver: true, ...{ damping: 20, stiffness: 400 } }),
      Animated.timing(opacity, { toValue: 1, duration: AnimDuration.fast, useNativeDriver: true }),
    ]).start();
  };

  return { scale, opacity, onPressIn, onPressOut };
}

// 사용 예시
// const { scale, opacity, onPressIn, onPressOut } = usePressAnimation();
// <Animated.View style={{ transform: [{ scale }], opacity }}>
//   <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
//     ...
//   </Pressable>
// </Animated.View>
```

### 3. AI 분석 로딩 애니메이션

냉털이의 핵심 기능. 사용자가 "AI가 정말 열심히 분석 중"임을 느낄 수 있도록 시각적으로 풍부하게 연출합니다.

```typescript
// src/components/ai/ScanningOverlay.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Easing } from 'react-native';
import { Colors } from '@/constants/colors';
import { typography } from '@/styles/typography';

const SCAN_MESSAGES = [
  '냉장고 탈탈 털어보는 중... 🔍',
  '재료들 하나하나 확인 중이야!',
  '어떤 레시피가 나올지 기대돼? 😆',
  '거의 다 됐어, 잠깐만!',
];

export function ScanningOverlay() {
  const scanLine  = useRef(new Animated.Value(0)).current;
  const pulse     = useRef(new Animated.Value(1)).current;
  const [msgIdx, setMsgIdx] = React.useState(0);

  useEffect(() => {
    // 스캔 라인 왕복 애니메이션
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLine, { toValue: 1, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(scanLine, { toValue: 0, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();

    // 펄스 애니메이션
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.12, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1,    duration: 700, useNativeDriver: true }),
      ])
    ).start();

    // 메시지 순환
    const interval = setInterval(() => {
      setMsgIdx(prev => (prev + 1) % SCAN_MESSAGES.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const translateY = scanLine.interpolate({
    inputRange:  [0, 1],
    outputRange: [0, 220],  // 이미지 높이에 맞게 조정
  });

  return (
    <View style={styles.overlay}>
      {/* 스캔 라인 */}
      <Animated.View
        style={[styles.scanLine, { transform: [{ translateY }] }]}
      />
      {/* 코너 마커 */}
      <View style={[styles.corner, styles.cornerTL]} />
      <View style={[styles.corner, styles.cornerTR]} />
      <View style={[styles.corner, styles.cornerBL]} />
      <View style={[styles.corner, styles.cornerBR]} />
      {/* 로딩 텍스트 */}
      <View style={styles.messageContainer}>
        <Animated.View style={{ transform: [{ scale: pulse }] }}>
          <Text style={styles.messageText}>{SCAN_MESSAGES[msgIdx]}</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems:     'center',
    borderRadius:   16,
    overflow:       'hidden',
  },
  scanLine: {
    position:        'absolute',
    top:             0,
    left:            0,
    right:           0,
    height:          2,
    backgroundColor: Colors.primary[400],
    shadowColor:     Colors.primary[400],
    shadowOffset:    { width: 0, height: 0 },
    shadowOpacity:   0.9,
    shadowRadius:    8,
  },
  corner: {
    position:   'absolute',
    width:      24,
    height:     24,
    borderColor: Colors.primary[400],
    borderWidth: 3,
  },
  cornerTL: { top: 12, left: 12,  borderRightWidth: 0, borderBottomWidth: 0 },
  cornerTR: { top: 12, right: 12, borderLeftWidth: 0,  borderBottomWidth: 0 },
  cornerBL: { bottom: 12 + 48, left: 12,  borderRightWidth: 0, borderTopWidth: 0 },
  cornerBR: { bottom: 12 + 48, right: 12, borderLeftWidth: 0,  borderTopWidth: 0 },
  messageContainer: {
    position:        'absolute',
    bottom:          16,
    left:            16,
    right:           16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius:    10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  messageText: {
    ...typography.body2Medium,
    color:     Colors.neutral[0],
    textAlign: 'center',
  },
});
```

### 4. 재료 인식 결과 팝인 (Staggered List)

```typescript
// src/hooks/useStaggeredEntrance.ts
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function useStaggeredEntrance(
  count:     number,
  stagger:   number = 60,   // ms
  delay:     number = 100,  // 초기 지연
) {
  const anims = useRef(
    Array.from({ length: count }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    Animated.stagger(
      stagger,
      anims.map(anim =>
        Animated.spring(anim, {
          toValue:       1,
          damping:       18,
          stiffness:     300,
          delay,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  return anims.map(anim => ({
    opacity:   anim,
    transform: [{
      translateY: anim.interpolate({
        inputRange:  [0, 1],
        outputRange: [16, 0],
      }),
    }],
  }));
}
```

---

## 8. 다크모드

### 다크모드 설계 원칙

- iOS/Android 시스템 다크모드를 자동 감지 (`useColorScheme`)
- 색상을 하드코딩하지 않고 항상 **semantic token**으로 참조
- 배경은 순수 검정(`#000000`) 대신 따뜻한 다크 계열 사용 (눈 피로 감소)

### 다크모드 컬러 매핑

| Semantic Token | 라이트 모드 | 다크 모드 | 설명 |
|----------------|------------|-----------|------|
| `textPrimary` | `#111827` | `#F9FAFB` | 주요 텍스트 |
| `textSecondary` | `#4B5563` | `#9CA3AF` | 보조 텍스트 |
| `textTertiary` | `#9CA3AF` | `#6B7280` | 3차 텍스트 |
| `textDisabled` | `#D1D5DB` | `#374151` | 비활성 텍스트 |
| `bgBase` | `#F9FAFB` | `#0F1117` | 앱 배경 |
| `bgSurface` | `#FFFFFF` | `#1C1E26` | 카드/시트 배경 |
| `bgSurfaceAlt` | `#F3F4F6` | `#262831` | 입력/섹션 배경 |
| `bgOverlay` | `rgba(17,24,39,0.5)` | `rgba(0,0,0,0.65)` | 모달 오버레이 |
| `borderDefault` | `#E5E7EB` | `#2D3142` | 기본 테두리 |
| `borderFocus` | `#FF6B1A` | `#FF8C47` | 포커스 테두리 |
| `brandPrimary` | `#FF6B1A` | `#FF8C47` | Primary (밝기 조정) |
| `brandSecondary` | `#34CFA0` | `#4BDBB0` | Secondary (밝기 조정) |
| `success` | `#22C55E` | `#4ADE80` | 성공 |
| `warning` | `#F59E0B` | `#FCD34D` | 경고 |
| `error` | `#EF4444` | `#F87171` | 에러 |
| `info` | `#3B82F6` | `#60A5FA` | 정보 |

### 다크모드 훅 구현

```typescript
// src/hooks/useTheme.ts
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/colors';

type ThemeColors = {
  textPrimary:    string;
  textSecondary:  string;
  textTertiary:   string;
  textDisabled:   string;
  bgBase:         string;
  bgSurface:      string;
  bgSurfaceAlt:   string;
  bgOverlay:      string;
  borderDefault:  string;
  borderFocus:    string;
  brandPrimary:   string;
  brandSecondary: string;
  success:        string;
  warning:        string;
  error:          string;
  info:           string;
};

const lightTheme: ThemeColors = {
  textPrimary:    '#111827',
  textSecondary:  '#4B5563',
  textTertiary:   '#9CA3AF',
  textDisabled:   '#D1D5DB',
  bgBase:         '#F9FAFB',
  bgSurface:      '#FFFFFF',
  bgSurfaceAlt:   '#F3F4F6',
  bgOverlay:      'rgba(17,24,39,0.5)',
  borderDefault:  '#E5E7EB',
  borderFocus:    '#FF6B1A',
  brandPrimary:   '#FF6B1A',
  brandSecondary: '#34CFA0',
  success:        '#22C55E',
  warning:        '#F59E0B',
  error:          '#EF4444',
  info:           '#3B82F6',
};

const darkTheme: ThemeColors = {
  textPrimary:    '#F9FAFB',
  textSecondary:  '#9CA3AF',
  textTertiary:   '#6B7280',
  textDisabled:   '#374151',
  bgBase:         '#0F1117',
  bgSurface:      '#1C1E26',
  bgSurfaceAlt:   '#262831',
  bgOverlay:      'rgba(0,0,0,0.65)',
  borderDefault:  '#2D3142',
  borderFocus:    '#FF8C47',
  brandPrimary:   '#FF8C47',
  brandSecondary: '#4BDBB0',
  success:        '#4ADE80',
  warning:        '#FCD34D',
  error:          '#F87171',
  info:           '#60A5FA',
};

export function useTheme() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return {
    colors: isDark ? darkTheme : lightTheme,
    isDark,
  };
}

// Context 기반 전역 제공 (권장)
// src/context/ThemeContext.tsx
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext<ReturnType<typeof useTheme> | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within ThemeProvider');
  return ctx;
}
```

### 다크모드 NativeWind 설정

```javascript
// tailwind.config.js — darkMode 추가
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',  // NativeWind v4: 'media' 또는 'class'
  theme: {
    extend: {
      // ... (이전 섹션과 동일)
    },
  },
};

// 사용 예시 (NativeWind v4)
// <View className="bg-white dark:bg-[#1C1E26]">
//   <Text className="text-gray-900 dark:text-gray-50">제목</Text>
// </View>
```

### 다크모드 컴포넌트 패턴

```typescript
// RecipeCard 다크모드 적용 예시
import { useAppTheme } from '@/context/ThemeContext';

export function RecipeCard({ ... }: RecipeCardProps) {
  const { colors, isDark } = useAppTheme();

  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: colors.bgSurface,
          shadowColor: isDark ? '#000000' : '#000000',
          shadowOpacity: isDark ? 0.4 : 0.08,
        }
      ]}
    >
      {/* ... */}
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        {title}
      </Text>
      <Text style={[styles.metaText, { color: colors.textTertiary }]}>
        {cookTime}분
      </Text>
    </Pressable>
  );
}
```

---

## 부록 A. 파일 구조 권장안

```
src/
├── assets/
│   └── fonts/
│       ├── Pretendard-*.otf   (7 weights)
│       └── Inter-*.ttf        (4 weights)
├── constants/
│   ├── colors.ts              # 컬러 토큰
│   ├── spacing.ts             # 스페이싱 & 레이아웃
│   ├── animation.ts           # 애니메이션 상수
│   └── icons.ts               # 아이콘 맵핑
├── styles/
│   └── typography.ts          # 타입 스케일 StyleSheet
├── context/
│   └── ThemeContext.tsx        # 테마 컨텍스트
├── hooks/
│   ├── useTheme.ts             # 다크모드 훅
│   ├── usePressAnimation.ts    # 탭 애니메이션 훅
│   └── useStaggeredEntrance.ts # 목록 등장 애니메이션
└── components/
    ├── ui/
    │   ├── Button.tsx
    │   └── Badge.tsx
    ├── cards/
    │   ├── RecipeCard.tsx
    │   └── IngredientCard.tsx
    ├── ai/
    │   └── ScanningOverlay.tsx
    └── layout/
        ├── ScreenLayout.tsx
        └── RecipeGrid.tsx
```

---

## 부록 B. 컴포넌트 체크리스트

새 컴포넌트 작성 시 반드시 확인:

- [ ] 터치 타겟 최소 44×44pt 확보
- [ ] `accessibilityRole` 및 `accessibilityLabel` 지정
- [ ] `disabled` 상태 시각적 표현 구현
- [ ] `loading` 상태 처리 (해당 시)
- [ ] 다크모드 `useAppTheme()` 적용
- [ ] 하드코딩 컬러 없음 (모든 색은 토큰에서)
- [ ] 하드코딩 폰트 없음 (모든 텍스트는 `typography.*`)
- [ ] `AccessibilityInfo.isReduceMotionEnabled` 확인 (애니메이션 있을 시)
- [ ] 긴 텍스트 `numberOfLines` + `ellipsizeMode` 처리

---

*냉털이 디자인 시스템 v1.0.0 — 2025년 3월 작성*
*업데이트 시 버전 번호 및 날짜 함께 갱신할 것*
