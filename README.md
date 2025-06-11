# Notion Blog

Notion을 CMS로 활용하는 개인 블로그 프로젝트입니다. Next.js 15와 React 19를 기반으로 구축되었으며, Notion API를 통해 콘텐츠를 관리합니다.

## 주요 기능

- Notion을 CMS로 활용한 블로그 포스트 관리
- MDX를 통한 마크다운 지원
- 다크 모드 지원
- 코드 하이라이팅
- 반응형 디자인
- 댓글 시스템 (Giscus)

## 기술 스택

- **프레임워크**: Next.js 15
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **상태 관리**: React Query
- **폼 관리**: React Hook Form
- **타입 검증**: Zod
- **데이터베이스**: Supabase
- **CMS**: Notion API

## 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- pnpm (권장) 또는 npm
- Notion API 키
- Supabase 프로젝트 설정

### 설치

```bash
# 저장소 클론
git clone [repository-url]

# 의존성 설치
pnpm install

# 환경 변수 설정
cp .env.example .env.local
```

`.env.local` 파일에 다음 환경 변수를 설정하세요:

```env
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_database_id
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 개발 서버 실행

```bash
pnpm dev
```

개발 서버는 [http://localhost:3001](http://localhost:3001)에서 실행됩니다.

### 빌드

```bash
pnpm build
```

### 프로덕션 서버 실행

```bash
pnpm start
```

## 프로젝트 구조

```
├── app/              # Next.js 앱 라우터
├── components/       # React 컴포넌트
├── lib/             # 유틸리티 함수 및 설정
├── public/          # 정적 파일
├── types/           # TypeScript 타입 정의
└── ...
```

## 스크립트

- `pnpm dev`: 개발 서버 실행
- `pnpm build`: 프로덕션 빌드
- `pnpm start`: 프로덕션 서버 실행
- `pnpm lint`: ESLint 실행
- `pnpm lint:fix`: ESLint 자동 수정
- `pnpm format`: Prettier 포맷팅

## 라이선스

MIT
