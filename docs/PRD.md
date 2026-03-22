# 냉털이 (Naengteori) - Product Requirements Document

> "냉장고를 털다"의 줄임말. 냉장고 사진 한 장으로 오늘의 레시피를 찾아주는 AI 요리 비서.

---

## 1. 서비스 비전 & 미션

### 비전
"모든 냉장고에는 한 끼가 숨어있다" — 냉장고에 뭐가 있든, 맛있는 한 끼를 만들 수 있도록 돕는 앱.

### 미션
냉장고 사진 한 장만으로 재료를 인식하고, 지금 당장 만들 수 있는 레시피를 추천하여 음식물 낭비를 줄이고 요리의 즐거움을 되찾아준다.

### 타겟 유저
| 페르소나 | 설명 | 핵심 니즈 |
|---------|------|----------|
| 🏠 자취생 민수 (24) | 요리 초보, 배달비 부담 | "냉장고에 있는 걸로 뭐 해먹지?" |
| 👩‍💼 직장인 지은 (29) | 바쁜 일상, 건강한 식사 | "간단하고 빠른 레시피 없나?" |
| 👨‍👩‍👧 신혼부부 현우 (32) | 식비 절약, 다양한 메뉴 | "매일 뭐 해먹을지 고민" |

---

## 2. 핵심 기능 (MVP)

### F1. 냉장고 사진 촬영 & AI 재료 인식
- 카메라로 냉장고 내부 촬영 또는 갤러리에서 사진 선택
- Claude Vision API로 재료 자동 인식
- 인식 신뢰도(confidence) 표시
- 인식 결과 편집 (재료 추가/삭제/수정)

### F2. 레시피 추천
- 인식된 재료 기반 레시피 매칭
- 필터: 난이도(쉬움/보통/어려움), 소요시간, 칼로리
- 부족한 재료 1-2개로도 만들 수 있는 레시피 표시 ("양파만 있으면!")
- Claude API로 개인 맞춤 레시피 생성

### F3. 레시피 상세 & 조리 모드
- 단계별 조리법 (스텝 바이 스텝)
- 각 단계별 타이머 기능
- 화면 자동 꺼짐 방지 (조리 중)
- 완료 후 별점 & 메모

### F4. 즐겨찾기 & 조리 기록
- 레시피 즐겨찾기 저장
- 조리 기록 히스토리
- 자주 사용하는 재료 통계

### F5. 프로필 & 설정
- 닉네임, 프로필 이미지
- 알레르기/비선호 재료 설정
- 다크모드 토글

---

## 3. 사용자 여정 (User Flow)

```
[앱 열기]
    ↓
[홈 화면] — 큰 카메라 버튼 "냉장고 털기!"
    ↓
[카메라/갤러리] — 냉장고 사진 촬영
    ↓
[AI 분석 중] — "냉장고를 살펴보는 중..." 애니메이션
    ↓
[재료 확인] — 인식된 재료 목록 (편집 가능)
    ↓
[레시피 목록] — 추천 레시피 카드 리스트
    ↓
[레시피 상세] — 재료, 단계별 조리법
    ↓
[조리 모드] — 스텝 바이 스텝 + 타이머
    ↓
[완료!] — 별점 & 메모 → 기록 저장
```

---

## 4. 기술 아키텍처

### 클라이언트
- **Framework**: React Native (Expo SDK 52+)
- **Language**: TypeScript (strict mode)
- **Routing**: expo-router (file-based)
- **State Management**: Zustand
- **Styling**: NativeWind (Tailwind for RN)
- **Camera**: expo-camera + expo-image-picker
- **Animation**: react-native-reanimated

### 백엔드
- **Runtime**: Cloudflare Workers
- **Framework**: Hono
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (이미지 저장)
- **AI**: Claude API (Vision + Text Generation)
- **Auth**: Clerk (소셜 로그인)

### 인프라
- **CI/CD**: GitHub Actions
- **Hosting (Web)**: Cloudflare Pages
- **Monitoring**: Sentry
- **Analytics**: PostHog

### 아키텍처 다이어그램
```
┌─────────────┐     ┌──────────────────┐     ┌─────────────┐
│  React Native│────→│ Cloudflare Workers│────→│  Claude API  │
│  (Expo)      │←────│ (Hono API)       │←────│  (Vision+Text)│
└─────────────┘     └──────────────────┘     └─────────────┘
                           │
                    ┌──────┴──────┐
                    │             │
               ┌────▼───┐  ┌────▼───┐
               │  D1 DB  │  │  R2    │
               │(SQLite) │  │(Images)│
               └─────────┘  └────────┘
```

---

## 5. 화면 목록 (Screen List)

| # | 화면 | 경로 | 설명 |
|---|------|------|------|
| 1 | Splash | `/` | 앱 로딩 스크린 |
| 2 | Onboarding | `/onboarding` | 최초 사용자 가이드 (3 스텝) |
| 3 | Home | `/home` | 메인 화면, 카메라 버튼 중심 |
| 4 | Camera | `/camera` | 카메라 촬영 화면 |
| 5 | Gallery Picker | `/gallery` | 갤러리 사진 선택 |
| 6 | Analyzing | `/analyzing` | AI 분석 중 로딩 |
| 7 | Ingredients | `/ingredients` | 인식된 재료 목록 (편집) |
| 8 | Recipe List | `/recipes` | 추천 레시피 목록 |
| 9 | Recipe Detail | `/recipes/[id]` | 레시피 상세 |
| 10 | Cooking Mode | `/recipes/[id]/cook` | 단계별 조리 모드 |
| 11 | Favorites | `/favorites` | 즐겨찾기 목록 |
| 12 | History | `/history` | 조리 기록 |
| 13 | Profile | `/profile` | 프로필 & 설정 |
| 14 | Allergy Settings | `/profile/allergies` | 알레르기 설정 |

---

## 6. 데이터 모델

### User
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  nickname TEXT NOT NULL,
  profile_image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Allergy
```sql
CREATE TABLE user_allergies (
  user_id TEXT REFERENCES users(id),
  ingredient_name TEXT NOT NULL,
  PRIMARY KEY (user_id, ingredient_name)
);
```

### Scan (사진 스캔 기록)
```sql
CREATE TABLE scans (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  image_url TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Recognized Ingredient
```sql
CREATE TABLE recognized_ingredients (
  id TEXT PRIMARY KEY,
  scan_id TEXT REFERENCES scans(id),
  name TEXT NOT NULL,
  category TEXT,
  confidence REAL NOT NULL,
  confirmed BOOLEAN DEFAULT FALSE
);
```

### Recipe
```sql
CREATE TABLE recipes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK(difficulty IN ('easy', 'medium', 'hard')),
  cooking_time INTEGER, -- minutes
  calories INTEGER,
  image_url TEXT,
  is_ai_generated BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### CookingStep
```sql
CREATE TABLE cooking_steps (
  id TEXT PRIMARY KEY,
  recipe_id TEXT REFERENCES recipes(id),
  step_order INTEGER NOT NULL,
  instruction TEXT NOT NULL,
  duration INTEGER, -- seconds
  tip TEXT
);
```

### Favorite
```sql
CREATE TABLE favorites (
  user_id TEXT REFERENCES users(id),
  recipe_id TEXT REFERENCES recipes(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, recipe_id)
);
```

### CookingHistory
```sql
CREATE TABLE cooking_history (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  recipe_id TEXT REFERENCES recipes(id),
  rating INTEGER CHECK(rating BETWEEN 1 AND 5),
  memo TEXT,
  cooked_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 7. API 엔드포인트

### 인증
| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/auth/signup` | 회원가입 |
| POST | `/api/auth/login` | 로그인 |
| GET | `/api/auth/me` | 내 정보 조회 |

### 재료 인식
| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/scan` | 사진 업로드 & AI 재료 인식 |
| GET | `/api/scan/:id` | 스캔 결과 조회 |
| PATCH | `/api/scan/:id/ingredients` | 인식 재료 수정 |

### 레시피
| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/recipes/recommend` | 재료 기반 레시피 추천 |
| GET | `/api/recipes/:id` | 레시피 상세 조회 |
| POST | `/api/recipes/generate` | AI 커스텀 레시피 생성 |

### 즐겨찾기 & 기록
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/favorites` | 즐겨찾기 목록 |
| POST | `/api/favorites/:recipeId` | 즐겨찾기 추가 |
| DELETE | `/api/favorites/:recipeId` | 즐겨찾기 삭제 |
| GET | `/api/history` | 조리 기록 목록 |
| POST | `/api/history` | 조리 기록 저장 |

### 프로필
| Method | Endpoint | 설명 |
|--------|----------|------|
| PATCH | `/api/profile` | 프로필 수정 |
| GET | `/api/profile/allergies` | 알레르기 목록 |
| PUT | `/api/profile/allergies` | 알레르기 설정 |

---

## 8. 로드맵

### Sprint 1 (2주) — 기반 구축 + 카메라 + AI 인식
- [ ] Expo 프로젝트 셋업 & 네비게이션
- [ ] 홈 화면 UI
- [ ] 카메라/갤러리 사진 촬영
- [ ] Cloudflare Workers API 셋업
- [ ] Claude Vision API 연동 (재료 인식)
- [ ] 재료 인식 결과 화면

### Sprint 2 (2주) — 레시피 추천 + 상세
- [ ] 레시피 추천 API (Claude Text)
- [ ] 레시피 목록 화면
- [ ] 레시피 상세 화면
- [ ] 조리 모드 (스텝 바이 스텝 + 타이머)
- [ ] D1 데이터베이스 연동

### Sprint 3 (2주) — 사용자 기능
- [ ] 회원가입/로그인 (Clerk)
- [ ] 즐겨찾기 기능
- [ ] 조리 기록 & 별점
- [ ] 프로필 & 알레르기 설정
- [ ] 자주 사용하는 재료 통계

### Sprint 4 (2주) — 폴리싱 & 배포
- [ ] 온보딩 화면
- [ ] 다크모드
- [ ] 애니메이션 & 마이크로 인터랙션
- [ ] 성능 최적화
- [ ] Cloudflare Pages 배포
- [ ] 앱스토어/플레이스토어 빌드 준비

---

## 9. 비기능 요구사항

### 성능
- 앱 시작 시간: < 2초
- AI 재료 인식 응답: < 5초
- 레시피 추천 응답: < 3초
- 이미지 업로드: < 2초 (압축 후 1MB 이하)

### 보안
- API 키는 서버사이드에서만 사용 (클라이언트에 노출 금지)
- 이미지 업로드 시 MIME 타입 검증
- Rate limiting: 스캔 요청 분당 10회 제한
- HTTPS 전용

### 접근성
- WCAG AA 준수 (명암비 4.5:1 이상)
- 최소 터치 타겟 44x44pt
- 스크린 리더 지원 (accessibilityLabel)
- 최소 본문 폰트 14px

---

## 10. 경쟁 분석

| 항목 | 만개의 레시피 | 해먹남녀 | 냉털이 (우리) |
|------|-------------|---------|-------------|
| 재료 입력 | 수동 텍스트 | 수동 검색 | **AI 사진 인식** |
| 레시피 소스 | 유저 작성 | 유저 작성 | **AI 생성 + 큐레이션** |
| UX | 복잡한 메뉴 | 소셜 피드형 | **카메라 원탭** |
| 타겟 | 전 연령 | 전 연령 | **MZ 자취생** |
| 차별점 | 방대한 DB | 커뮤니티 | **냉장고→레시피 원스텝** |

### 핵심 차별점
1. **Zero Input**: 사진 한 장이면 끝. 재료를 일일이 입력할 필요 없음
2. **AI Personalization**: 가진 재료에 최적화된 맞춤 레시피 실시간 생성
3. **MZ 감성 UX**: 심플하고 직관적인 인터페이스, 재치있는 카피
4. **음식물 낭비 방지**: "이 재료 유통기한 임박!" 알림 (향후)
