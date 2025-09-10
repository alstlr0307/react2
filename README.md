# 202130104 김민식

# 9월 10일 3주차 강의

---

#### 용어 정의

- 이 장부터 이후에 사용될 몇 가지 용어에 대한 설명입니다.  
- 원문에는 `route`라는 단어가 자주 등장하고, 사전적 의미로는 “경로”입니다.  
- `route(라우트)`는 “경로”를 의미하고, `routing(라우팅)`은 “경로를 찾아가는 과정”을 의미합니다.  
- 그러나 `path`도 “경로”로 번역하기 때문에, 의미 구별을 위해 대부분 `routing(라우팅)`으로 번역했습니다.  
- `directory`와 `folder`는 특별한 구분 없이 나옵니다.  
- 최상위 폴더의 경우 `directory`, 하위 폴더는 `folder`로 쓰는 경우가 많지만 꼭 그렇지는 않습니다.  
- 운영체제(OS)에 따라 구분되는 용어이므로, 같은 의미로 이해하면 됩니다.  
- `segment`는 routing과 관련이 있는 directory의 별칭 정도로 이해하면 됩니다.  

---

#### Open Graph Protocol

- 웹사이트나 페이스북, 인스타그램, X(트위터), 카카오톡 등에 링크를 전달할 때 ‘미리보기’를 생성하는 프로토콜입니다.  
- 대표적인 프로토콜: [Open Graph Protocol](https://ogp.me)  
- 페이스북이 주도하는 표준 규칙으로 대부분의 SNS 플랫폼에서 활용되고 있습니다.  
- 모든 플랫폼이 동일한 방식으로 오픈 그래프를 처리하지는 않습니다.  
- 웹페이지의 메타 태그에 선언합니다.  

```html
<head>
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://example.com/page.html" />
  <meta property="og:title" content="페이지 제목" />
  <meta property="og:description" content="페이지 설명 요약" />
  <meta property="og:image" content="https://example.com/image.jpg" />
  <meta property="og:site_name" content="사이트 이름" />
  <meta property="og:locale" content="ko_KR" />
</head>
```

---

### 2. Organizing your project (프로젝트 구성하기)

- Next.js는 프로젝트 파일을 어떻게 구성하고 어디에 배치할지에 대한 제약이 없습니다.  
- 하지만 프로젝트 구성에 도움이 되는 몇 가지 기능을 제공합니다.  

---

#### Component hierarchy (컴포넌트 계층 구조)

- 특정 파일에 정의된 컴포넌트는 특정 계층 구조로 렌더링됩니다.  

예:  
- `layout.js`  
- `template.js`  
- `error.js` (React 오류 경계)  
- `loading.js` (리액트 서스펜스 경계)  
- `not-found.js` (React 오류 경계)  
- `page.js` 또는 중첩 `layout.js`

---

#### 중첩 렌더링

- 컴포넌트는 중첩된 라우팅에서 재귀적으로 렌더링됩니다.  
- 라우팅 세그먼트의 컴포넌트는 부모 세그먼트의 컴포넌트 내부에 중첩됩니다.  

> 세그먼트(Segment): 나뉘어진 각 부분, 분할된 부분, 또는 특정 기준에 따라 분류된 그룹을 의미  

---

#### Colocation (코로케이션)

- **Colocation**: 파일 및 폴더를 기능별로 그룹화하여 프로젝트 구조를 명확하게 정의  
- `app` 디렉토리에서 중첩된 폴더는 라우팅 구조를 정의합니다.  
- 각 폴더는 URL 경로의 해당 세그먼트에 매핑됩니다.  
- 단, `page.js` 또는 `route.js` 파일이 추가되기 전까지는 액세스할 수 없습니다.  

---

#### 프로젝트 파일 배치

- 프로젝트 파일을 `app` 디렉토리 라우팅 세그먼트 내부에 안전하게 배치하여 실수로 라우팅되지 않도록 할 수 있습니다.  
- 단, 프로젝트 파일은 반드시 `app` 내부에 둘 필요는 없으며, 원한다면 `app` 외부에도 보관할 수 있습니다.  

---

#### 비공개 폴더 (Private folders)

- 비공개 폴더는 **폴더명 앞에 밑줄**(`_folderName`)을 붙여 만듭니다.  
- 해당 폴더와 모든 하위 폴더는 라우팅에서 제외됩니다.  

---

#### Private folders 추가 규칙

- 보통은 코로케이션에서 비공개 폴더는 불필요하지만, 특정 상황에서 유용할 수 있습니다.  
- 예: UI 로직과 라우팅 로직 분리, 내부 파일 그룹화, 이름 충돌 방지 등  

---

#### 라우팅 그룹 (Route groups)

- 폴더명을 괄호로 묶어 라우팅 그룹 생성 가능 → `(folderName)`  
- 해당 폴더는 라우터 URL 경로에 포함되지 않음  

활용 예:  
- 팀별 라우트 구성 (예: 마케팅 페이지, 관리 페이지)  
- 중첩 레이아웃을 활성화하기 위해 사용  

---

#### src 디렉토리

- Next.js는 애플리케이션 코드를 `src` 디렉토리 내부에 저장할 수 있도록 지원  
- 프로젝트 루트에 있는 설정 파일들과 애플리케이션 코드를 분리 가능  

---

### 3. 예제 (Examples)

- 일반적인 프로젝트 전략을 설명하는 섹션  
- 핵심: 팀과 자신에게 맞는 전략 선택 + 일관성 유지  

---

#### 프로젝트 생성

```bash
npx create-next-app@latest
```

- 8가지 선택 옵션 (TypeScript, ESLint, Tailwind, src, App Router, import alias 등)  

---

#### 서버 실행 전후

- `.next` 디렉토리가 생성됨 → 빌드 출력 및 캐시 산출물 저장  

---

#### src 디렉토리 선택

- `/src` 사용 권장: 코드와 설정 파일을 분리 가능  
- 미사용: 단순/작은 프로젝트에 적합  

---

#### Store project files outside of app

- 모든 애플리케이션 코드를 프로젝트 루트 공유 폴더에 저장하고, `app`은 라우팅 용도로만 사용  

---

#### Split project files by feature or route

- 공용 애플리케이션 코드는 `app` 루트에 저장  
- 구체적인 기능 단위 코드는 라우팅 세그먼트에 저장  

---

#### Organize routes without affecting the URL path

- URL에 영향을 주지 않고 라우트를 그룹화  
- 괄호 안 폴더 `(shop)` `(marketing)` → URL에 포함되지 않음  

---

#### layout의 기본 구성

- `app/layout.tsx`: 프로젝트 전체를 감싸는 루트 레이아웃  
- `children`: 라우트 전환 시 하위 레이아웃이 들어오는 자리  
- `metadata`: SEO 관련 정보 자동 삽입  

---

#### Opting specific segments into a layout

- 특정 라우트를 그룹화하여 동일한 레이아웃 공유 가능  

---

#### Opting for loading skeletons on a specific route

- `loading.js` 파일을 사용하여 스켈레톤 UI 제공  
- 사용자에게 로딩 중임을 시각적으로 안내  

---

#### Creating multiple root layouts

- 여러 개의 루트 레이아웃 생성 가능  
- 서로 다른 UI/UX 섹션으로 애플리케이션 분리  



# 9월 3일 2주차 강의

#### Installation — IDE 플러그인

- **Next.js**에는 **사용자 정의 TypeScript 플러그인**과 **유형 검사기(type checker)**가 포함되어 있어요.  
- VS Code 등 편집기에서 **고급 타입 검사**와 **자동완성(IntelliSense)**을 활용할 수 있습니다.  
- 다음 작업을 하기 전에 **TypeScript reference**를 참고하고 `next.config.js`를 먼저 작성하는 것을 권장합니다.

##### VS Code에서 TypeScript 플러그인 활성화
1. **명령 팔레트 열기** → `Ctrl/⌘ + Shift + P`  
2. **“TypeScript: TypeScript 버전 선택”** 검색  
3. **“Use Workspace Version”** 선택

##### 참고 자료
- TypeScript 설정 문서: [TypeScript reference](https://www.typescriptlang.org/tsconfig)

---

#### Installation — ESLint 설정

- **Next.js**에는 [ESLint](https://eslint.org/)가 내장되어 있습니다.  
- `create-next-app` 명령어를 사용하여 새 프로젝트를 생성하면 **필요한 패키지들이 자동 설치**되고, 적절한 기본 설정이 구성됩니다.  
- 기존 프로젝트에 ESLint를 **수동으로 추가**하려면 `package.json`에 다음과 같이 스크립트를 추가합니다.

```json
{
  "scripts": {
    "lint": "next lint"
  }
}
```

- 이후 `npm run lint` 명령을 실행하면 설치 및 구성 과정에 대한 안내를 확인할 수 있습니다.

---

#### Installation — ESLint 구성 옵션

```bash
? How would you like to configure ESLint?
  Strict (recommended)
  Base
  Cancel
```

- **Strict** : Next.js의 기본 [ESLint 구성](https://nextjs.org/docs/pages/building-your-application/configuring/eslint)과  
  더욱 엄격한 **Core Web Vitals 규칙 세트**를 포함합니다.  
- **Base** : Next.js의 **기본 ESLint 구성**만 포함합니다.  
- **Cancel** : 구성을 건너뜁니다.

- 선택 시 `eslint`, `eslint-config-next`가 자동 설치되고, `.eslintrc.json` 파일이 생성됩니다.  
- `next lint` 실행 시 ESLint가 오류를 탐지합니다.

---

#### Installation — import 및 모듈의 절대 경로 별칭 설정

- `tsconfig.json` 및 `jsconfig.json`에서 `"paths"`와 `"baseUrl"` 옵션을 사용하여 절대 경로 별칭을 설정할 수 있습니다.  

```ts
// Before
import { Button } from '../../../components/button'

// After
import { Button } from '@/components/button'
```

```json
{
  "compilerOptions": {
    "baseUrl": "src/"
  }
}
```

---

#### Installation — paths 옵션을 이용한 모듈 경로 별칭

- `"paths"` 옵션을 사용하면 모듈 경로를 별칭(alias)으로 사용할 수 있습니다.  

```json
{
  "compilerOptions": {
    "baseUrl": "src/",
    "paths": {
      "@/styles/*": ["styles/*"],
      "@/components/*": ["components/*"]
    }
  }
}
```

---

#### 자동 생성되는 항목

- `package.json` 스크립트 및 `public/` 디렉토리 생성  
- TypeScript 사용 시: `tsconfig.json`  
- ESLint 설정: `eslint.config.mjs`  
- Tailwind CSS (선택)  
- `src/` 디렉토리 (선택)  
- App Router: `app/layout.tsx`, `app/page.tsx`  
- Turbopack (선택)  
- import alias: `"paths"` 자동 생성  

---

#### Core Web Vitals

- **LCP**: 가장 큰 페이지 요소가 표시되는 시간  
- **FID**: 첫 상호작용에서 브라우저가 응답하기까지 걸리는 시간  
- **CLS**: 레이아웃 이동 빈도  

| 지표 | Good | Needs Improvement | Poor |
|------|------|-------------------|------|
| LCP  | ≤ 2.5s | 2.5 ~ 4.0s | ≥ 4.0s |
| FID  | ≤ 100ms | 100 ~ 300ms | ≥ 300ms |
| CLS  | ≤ 0.1 | 0.1 ~ 0.25 | ≥ 0.25 |

---

#### 실습에 사용할 프로젝트 생성

```bash
npx create-next-app@latest
```

- 이후 8가지 항목 선택 (TypeScript, ESLint, Tailwind, src 디렉토리, App Router, import alias 등)

---

#### .eslintrc.json vs eslint.config.mjs

| 항목       | .eslintrc.json         | eslint.config.mjs        |
|------------|-----------------------|--------------------------|
| 포맷       | JSON 형식             | JavaScript 모듈 (ESM)    |
| 실행       | 정적 설정             | 동적 설정 가능           |
| 호환성     | 구버전과 호환         | ESLint v9 공식 권장      |
| 특징       | 간단, 직관적          | 유연, 모듈화 가능        |
| 사용 여부  | 여전히 사용 가능       | 최신 Next.js 기본값      |

---

#### Next.js와 eslint.config.mjs

```json
// .eslintrc.json
{
  "extends": "next",
  "rules": {
    "no-console": "warn"
  }
}
```

```js
// eslint.config.mjs
import next from 'eslint-config-next';

export default [
  next(),
  {
    rules: {
      'no-console': 'warn',
    },
  },
];
```

---

#### pnpm

- **고성능 Node 패키지 매니저**  
- 하드 링크 기반 저장소 → 디스크 공간 효율적 사용  
- 빠른 설치 속도 (캐싱 및 재사용)  
- 효율적 종속성 관리  

---

#### pnpm 설치 및 기본 명령어

```bash
npm install -g pnpm

pnpm install          # node_modules 설치
pnpm add [package]    # 새 패키지 설치
pnpm remove [package] # 패키지 제거
pnpm update           # 최신 버전 업데이트
pnpm list             # 설치된 패키지 확인
```

---

#### pnpm으로 Next.js 프로젝트 생성

```bash
pnpm create next-app@latest
cd my-app
pnpm start
```

---

#### Hard link vs. Symbolic link

- **Hard link**: 원본과 완전히 동일한 파일, 사본(copy)의 개념 아님.  
- **inode** 기반으로 메타데이터(권한, 소유자, 크기 등)를 관리.  

---

#### Hard link (추가 설명)

- 하드링크를 생성하면 디렉터리 엔트리에 **매핑 정보**가 추가되어 동일한 파일을 가리키게 됩니다.  
- 따라서 **원본과 하드링크는 완전히 동일한 파일**입니다.  
- 즉, **원본과 사본(copy)의 개념이 아닙니다.**

---

# 8월 27일 1주차 강의

#### Next.js의 주요 특징

##### 1. **서버 사이드 렌더링**

* React 기본은 클라이언트 사이드 렌더링(CSR)이지만, Next.js는 서버에서 HTML을 미리 만들어 전달할 수 있음
* 이를 통해 \*\*검색 엔진 최적화(SEO)\*\*가 좋아지고, 초기 로딩 속도도 빨라짐

##### 2. **정적 사이트 생성**

* 빌드 시점에 미리 HTML 파일을 생성해두고, 클라이언트 요청 시 바로 제공하는 방식
* 블로그, 문서 사이트처럼 **변경이 적고 빠른 응답**이 필요한 경우 적합

##### 3. **하이브리드 렌더링**

* 한 프로젝트 안에서 **SSR + SSG + CSR**을 필요에 맞게 혼합해서 사용가능
* 예: 상품 목록은 SSG로, 상품 상세는 SSR로, 장바구니는 CSR로 처리

##### 4. **파일 기반 라우팅**

* `pages/` 폴더 안에 파일을 만들면 자동으로 라우팅이 설정
* 예: `pages/about.js` → `/about`

##### 5. **API Routes**

* `pages/api/` 디렉토리에 파일을 만들면 서버리스 API 엔드포인트가 됨
* 프론트엔드와 백엔드를 같은 프로젝트에서 다룰 수 있음

##### 6. **이미지 최적화**

* `<Image>` 컴포넌트를 사용하면 자동으로 **최적화된 이미지 사이즈, WebP 변환, Lazy Loading**을 제공

##### 7. **스타일링 자유도**

* CSS, Sass, CSS-in-JS(Styled Components, Emotion), Tailwind CSS 등 자유롭게 선택 가능

##### 8. **App Router (13버전 이상)**

* `pages/` 대신 `app/` 디렉토리를 이용한 **새로운 라우팅 시스템**을 지원
* 서버 컴포넌트, 레이아웃(Layout), 병렬 라우팅 등 기능 제공
* 서버-클라이언트 경계가 명확해져서 데이터 패칭이 훨씬 깔끔해짐

---

#### 새 프로젝트 만들기 (빠른 시작)

```bash
npx create-next-app@latest my-app --yes
cd my-app
npm run dev
```

* 기본 설정: **TypeScript, Tailwind, App Router, Turbopack, @/* import alias*\*

실행 후 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

##### 3. 설치 시 CLI 옵션 (선택 가능)

* 프로젝트 이름
* TypeScript 여부
* Linter (ESLint / Biome / None)
* Tailwind 사용 여부
* `src/` 디렉토리 사용 여부
* App Router 사용 여부
* Turbopack 사용 여부
* import alias 설정

---

##### 4. 수동 설치 (원하는 설정 직접 구성할 때)

```bash
npm i next@latest react@latest react-dom@latest
```

`package.json`에 scripts 추가:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

---

#### 5. 개발 서버 실행

```bash
npm run dev
```

* 브라우저에서 결과 확인
* 코드 수정 후 저장 → 자동 반영

---

