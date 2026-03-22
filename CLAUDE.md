# Naengteori (냉털이)

## 프로젝트 개요
냉털이 - 냉장고 사진 → AI 재료 인식 → 레시피 추천 React Native 앱

## 기술 스택
- React Native (Expo)
- TypeScript
- Cloudflare Pages (웹 배포)

## 코딩 규칙
- 모든 함수에 TypeScript 타입을 명시하세요
- 새 기능에는 반드시 테스트를 작성하세요
- 커밋 메시지는 Conventional Commits 형식
- 컴포넌트는 함수형 컴포넌트 + hooks 사용

## 명령어
- `npx expo start` — 개발 서버
- `npx expo export --platform web` — 웹 빌드
- `npm test` — 테스트
- `npm run lint` — 린트
- `npm run typecheck` — 타입 체크

## 디렉토리 구조
```
src/
  components/   # 재사용 가능한 UI 컴포넌트
  screens/      # 화면 컴포넌트
  hooks/        # 커스텀 훅
  utils/        # 유틸리티 함수
  types/        # TypeScript 타입 정의
  services/     # API 및 외부 서비스
  constants/    # 상수 값
```
