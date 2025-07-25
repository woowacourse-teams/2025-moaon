# Frontend 코드 컨벤션

본 문서는 프론트엔드 개발 시 일관된 코드 품질과 가독성을 위한 코딩 스타일 가이드입니다.

## 📌 명명 규칙 (Naming Convention)

### 기본 명명 규칙

| 항목 | 규칙 | 예시 |
|------|------|------|
| 변수명 | `camelCase` | `userName`, `isActive` |
| 상수명 | `SNAKE_CASE` | `MAX_LENGTH`, `API_URL` |
| 함수명 | `camelCase` | `handleClick`, `fetchData` |
| 컴포넌트명 | `PascalCase` | `UserCard`, `LoginForm` |

### 파일명 규칙

| 파일 유형 | 규칙 | 예시 |
|-----------|------|------|
| 컴포넌트 파일 | `PascalCase` | `Button.tsx` |
| 일반 TypeScript 파일 | `camelCase` | `useFetch.ts` |
| 이미지 파일 | `kebab-case` | `logo-main.svg` |

### 폴더명 규칙

| 폴더 유형 | 규칙 | 예시 |
|-----------|------|------|
| 컴포넌트 폴더 | `PascalCase` | `UserList/` |
| 일반 폴더 | `camelCase` | `utils/`, `hooks/` |

## 🧱 코드 작성 스타일

### 컴포넌트 선언

- **컴포넌트는 `function` 키워드 사용**

```typescript
function MyComponent() {
  const handleClick = () => {};
  return <div />;
}
```

### 일반 함수 선언

- **일반 함수는 화살표 함수 사용**

```typescript
const calculateSum = (a: number, b: number) => {
  return a + b;
};
```

> **컴포넌트와 일반 함수 선언 방식을 구분하는 이유**  
> 컴포넌트와 일반 함수의 차이를 명확히 하여 가독성을 높이기 위함

### 타입 정의

- **`interface` 우선 사용**
- `interface`로 불가능한 경우에만 `type` 사용

```typescript
// 권장
interface UserData {
  id: number;
  name: string;
}

// interface로 불가능한 경우에만 사용
type Status = 'loading' | 'success' | 'error';
```

### 단위 사용

- **`rem` 단위 사용 (px 사용 금지)**

```css
/* 권장 */
font-size: 1.6rem;
margin: 2rem;

/* 금지 */
font-size: 16px;
margin: 20px;
```

## 📁 폴더 구조 전략

- **목적 중심 폴더링 적용**
- 기능별로 폴더 구성 (예: `auth`, `user`, `product`)
- 관련된 컴포넌트, 훅, 스타일은 해당 기능 폴더 내부에 배치

```
src/
├── auth/
│   ├── components/
│   ├── hooks/
│   └── styles/
├── user/
│   ├── components/
│   ├── hooks/
│   └── styles/
└── product/
    ├── components/
    ├── hooks/
    └── styles/
```

## 🎨 스타일링 규칙 (Emotion)

### Styled 컴포넌트 네이밍

- **`Styled` 또는 `S.` 접두어 사용** (컨벤션 일관성 확보 목적)

```typescript
import * as S from './Login.styled';

return <S.LoginContainer />;
```

### 파일 위치

- **이미지**: `assets/` 폴더에서 관리 (`public` 사용 지양)
- **스타일 파일**: `.styled.ts` 형태로 작성

## 📥 Import 순서

- 가능하면 `biome`에서 자동 정렬 설정 활용
- 자동 정렬이 불가능한 경우에는 정렬 규칙을 명시적으로 정의하지 않음

## 🔐 환경 변수 관리

### 파일 구성

| 파일명 | 용도 | 설명 |
|--------|------|------|
| `.env` | 기본 환경 변수 | 공통 설정 |
| `.env.development` | 개발 환경 전용 변수 | 개발 시에만 사용 |
| `.env.production` | 배포 환경 전용 변수 | 프로덕션 환경에서만 사용 |
| `.env.local` | 개인 PC 전용 변수 | Git에 포함하지 않음 |

### Git 관리

**Git에 올리면 안 되는 파일**

```gitignore
.env
.env.*
!.env.example
```

**`.env.example` 파일 예시**  
실제 값은 포함하지 않고 형식만 명시

```env
API_BASE_URL=https://your-api.example.com
FIREBASE_API_KEY=YOUR_FIREBASE_KEY
```

### 🚨 보안 유의 사항

- `.env` 파일 커밋 금지
- **배포 시 사용되는 환경변수는 배포 플랫폼(AWS, Vercel, Netlify 등)의 환경 설정에 직접 입력**

## ✅ 기타 개발 규칙

| 항목 | 규칙 | 비고 |
|------|------|------|
| 상태 관리 | Context 또는 TanStack Query 사용 | 필요 시에만 적용 |
| 스타일 도구 | Emotion 사용 | 조건부 스타일링 시 유리 |
| 테스트 | 우선순위 낮음 | 유틸/핵심 기능부터 도입 |
| 배포 방식 | AWS 기준 | - |
| 문서 유지 | 변경 사항 발생 시 팀원 합의 후 즉시 반영 | - |
| 협업 도구 | Notion 기반 통합 관리 | 개발 관련 모든 정보 |
