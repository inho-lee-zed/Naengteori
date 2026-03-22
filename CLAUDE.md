# Naengteori (냉털이)

## 프로젝트 개요
냉털이 - 냉장고 사진 → AI 재료 인식 → 레시피 추천 React Native 앱

## 기술 스택
- React Native (Expo SDK 55)
- TypeScript
- Cloudflare Workers (Hono) + D1 + Workers AI
- Cloudflare R2 (이미지 저장, 활성화 대기 중)

## 개발 워크플로우 (필수)
모든 코드 변경은 반드시 아래 워크플로우를 따라야 합니다. main 브랜치에 직접 커밋하지 마세요.

1. **GitHub Issue 생성** — 작업 내용을 이슈로 정의 (라벨: agent, frontend/backend, easy/medium/hard)
2. **Feature Branch 생성** — `feat/issue-번호-설명` 또는 `fix/issue-번호-설명`
3. **개발 + 커밋** — Conventional Commits 형식으로 커밋
4. **PR 생성** — 이슈 링크 포함 (`Closes #N`), 테스트/타입체크 통과 확인
5. **리뷰 + 머지** — CI 통과 후 머지

여러 작업을 병렬로 진행할 때도 각각 이슈를 만들고 브랜치를 분리합니다.

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
- `npx tsc --noEmit` — 타입 체크
- `npm run build:dev` — EAS 개발 빌드
- `npm run build:ios` — iOS 프로덕션 빌드
- `npm run build:android` — Android 프로덕션 빌드
- `cd workers && npm run dev` — Workers 로컬 개발
- `cd workers && npm run deploy` — Workers 배포

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
