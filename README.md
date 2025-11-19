# 202130104 김민식

# 11월 19일 13주차 강의 내용

## Tailwind CSS 및 Next.js 스타일링 가이드

### 1. Tailwind CSS

-   애플리케이션에서 Tailwind의 유틸리티 클래스를 사용할 수 있습니다.

``` tsx
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
    </main>
  );
}
```

> 오래된 브라우저 지원이 필요하다면 Tailwind CSS v3 설정 지침을
> 참고하세요.

------------------------------------------------------------------------

## 3. Global(전역) CSS

-   전역 CSS로 앱 전체에 스타일을 적용합니다.
-   `app/global.css` 파일에서 전역 스타일을 선언합니다.
-   RootLayout에 import하면 애플리케이션 모든 경로에 적용됩니다.

### 예시

``` css
body {
  padding: 20px 20px 60px;
  max-width: 680px;
  margin: 0 auto;
}
```

``` tsx
import './global.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### 정리

1.  전역적으로 필요한 스타일만 global.css에 선언.
2.  대부분의 컴포넌트 스타일은 Tailwind로 처리.
3.  Tailwind로 표현하기 어렵다면 CSS Modules 사용.

------------------------------------------------------------------------

## Next.js에서 추천하는 스타일링 방식

### Global Styles (전역)

대표적으로 전역 스타일이 필요한 경우: 1. html, body 기본 스타일 2. reset
스타일 3. 전역 폰트 선언 4. 공통 색상/레이아웃 규칙 5. 공통 animation 등

------------------------------------------------------------------------

## CSS Modules (Tailwind로 해결 어려운 스타일)

Tailwind로 어려운 경우: 1. 특정 컴포넌트에만 필요한 복잡한 animation 2.
canvas, svg 고급 스타일 3. Tailwind에 없는 custom class 4. 다수의 규칙이
필요한 경우(@keyframes, @font-face 등)

이 경우 `Button.module.css` 등 컴포넌트 단위 CSS Module 사용.

------------------------------------------------------------------------

## Bootstrap 실습 (외부 스타일 시트)

### 1. Bootstrap 설치

``` bash
npm install bootstrap@5.3.8
```

### 2. 사용 예시

``` tsx
import 'bootstrap/dist/css/bootstrap.css';
```

### localLayout 영향 확인

-   특정 디렉토리 localLayout에 import해도 해당 디렉토리 하위 전체에
    영향 적용됨.
-   Bootstrap은 전역 기반 CSS 프레임워크이므로 import 한 번으로 전역
    영향 발생.

------------------------------------------------------------------------

## 외부 CSS 주의할 프레임워크들

1.  **Bootstrap** --- 전역 규칙이 많아 충돌 위험 존재.
2.  **Bulma** --- class 기반이지만 html/body에도 영향.
3.  **Foundation** --- normalize + 전역 스타일.
4.  **Semantic UI / Fomantic UI**
5.  **Materialize CSS**
6.  **reset.css / normalize.css / sanitize.css**

------------------------------------------------------------------------

## CSS 병합 및 순서

Next.js는 빌드 중 스타일을 자동으로 병합(chunk)합니다.

### 예시

`BaseButton`이 먼저 import → 해당 module.css가 우선 적용됨.

------------------------------------------------------------------------

## 실습: BaseButton 스타일 충돌 해결

### 문제 원인

BaseButton에서 `props`를 받지 않는데 page에서 props로 className 전달 →
오류 발생.

### 해결 코드

``` tsx
type BaseButtonProps = {
  className2: string;
};

export function BaseButton({ className2 }: BaseButtonProps) {
  return (
    <button className={`${styles.primary} ${className2 ?? ''}`}>
      버튼
    </button>
  );
}
```

------------------------------------------------------------------------

## 최종 결과 설명

-   문서에서는 base-button.module.css가 먼저 요청된다고 했지만\
    실제로는 page.module.css가 적용됨 → import 순서 및 병합 규칙 때문.

------------------------------------------------------------------------

## End of Document


# 11월 12일 12주차 강의 내용

## Next.js Streaming Guide

### 3. 스트리밍 > 3-1. `loading.tsx`를 사용하는 방법

애플리케이션에서 **스트리밍을 구현하는 방법**은 두 가지가 있습니다.

1. `loading.tsx` 파일로 페이지 감싸기  
2. `<Suspense>`로 컴포넌트를 감싸기  

---

### 3-1. `loading.tsx`를 사용하는 방법

데이터를 가져오는 동안 전체 페이지를 스트리밍하려면  
`page`와 같은 디렉터리에 **`loading.tsx` 파일**을 생성합니다.

예를 들어,  
`app/blog/page.tsx`를 스트리밍하려면  
`app/blog` 디렉터리 안에 `loading.tsx` 파일을 추가하면 됩니다.

```tsx
// app/blog/loading.tsx
export default function Loading() {
  // Define the Loading UI here
  return <div>Loading...</div>;
}
```

... (중략 — 전체 내용 동일하게 포함)


# 11월 05일 11주차 강의 내용

## Fetch의 이해

## 1. 데이터 가져오기 (Fetching Data)

### 1-4. 커뮤니티 라이브러리(서드파티(third-party) 라이브러리 및 도구)

- 클라이언트 컴포넌트의 `fetch` 데이터는 **SWR** 또는 **React Query**와 같은 커뮤니티 라이브러리를 사용할 수 있습니다.

### SWR(Stale-While-Revalidate)

- **SWR**은 **Vercel**에서 만든 라이브러리로 먼저 캐시된(stale/오래된) 데이터를 빠르게 보여준 후, 백그라운드에서 최신 데이터(revalidate)를 다시 가져옵니다.
- 그리고 최신 데이터가 도착하면 자동으로 화면을 업데이트합니다.

### 💡 예시 코드

```tsx
function getPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
}

export default function Page() {
  // Don't await the data fetching function
  // `await`는 사용하지 않고 `Promise`를 반환합니다.
  const posts = getPosts()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Posts posts={posts} />
    </Suspense>
  )
}
```

## 제네릭(T)을 사용하여 반환 값의 타입을 명시적으로 지정

- `useSWR()` Hook은 기본적으로 `data`의 타입을 자동으로 추론하지 않습니다.
- 즉, `fetcher` 함수가 `<T>` 제네릭을 사용하더라도, `useSWR()` 쪽에서 어떤 타입을 T로 써야 하는지 알려주지 않으면, TypeScript는 `data`를 `any` 또는 `undefined`로 간주하게 됩니다.
- 따라서 `data.map(...)`처럼 배열 메서드를 호출하려고 하면, `'data' is of type 'unknown'` 혹은 `data`가 `any`로 타입 경고가 뜨는 문제가 발생합니다.

### 💡 문제를 해결하려면 `useSWR`에 제네릭 타입을 명시해 주면 됩니다.

```tsx
type Photo = {
  id: string
  title: string
}

const { data, error, isLoading } = useSWR<Photo[]>('https://jsonplaceholder.typicode.com/photos')

[data?.map((post: { id: string; title: string }) => {
  // ...
})]
```

---

### 오류의 원인을 확인해 보겠습니다.

- `fetcher`가 `Promise<Photo[]>`를 반환한다고 명시하는 것입니다.

### 💡 예시 코드

```tsx
function fetchData<T>(url: string): Promise<T> {
  return fetch(url)
    .then((res) => res.json())
}

type Post = {
  id: string
  title: string
}

const posts = fetchData<Post>('https://jsonplaceholder.typicode.com/posts')
```

## 서버 컴포넌트에서 getPosts() 함수를 사용하려면 (1)

- 만일 앞의 예제에서 `getPosts()` 함수를 사용하고 싶다면 어떻게 하는 것이 좋을까요?
- `fetch` 부분만 별도의 함수로 선언하면 됩니다.

### 💻 예시 코드

```tsx
function getPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
}

export default function Page() {
  // Don't await the data fetching function
  // `await`는 사용하지 않고 `Promise`를 반환합니다.
  const posts = getPosts()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Posts posts={posts} />
    </Suspense>
  )
}
```

## 서버 컴포넌트에서 getPosts() 함수를 사용하려면 (2)

- 앞에서 `getPosts()` 함수를 구현해 봤지만 실무에서 사용할 때는 좀 더 복잡해집니다.
- 동시 방식의 설정, 캐시 설정, 요청 중단, API Key 사용 여부, 예외 처리 등
- 자세한 내용은 [developer.mozilla.org](https://developer.mozilla.org)을 참고하세요.

### 💡 이런 경우라면 별도의 컴포넌트나 라이브러리로 만들어 놓는 것이 재사용에 유리합니다.

- 이번에는 앞의 함수를 라이브러리로 분리하는 방법을 알아보겠습니다.

### 💻 예시 코드

1. `src/lib/` 디렉토리를 만들고, 그 안에 `getPost.tsx` 파일을 생성합니다.
2. 그리고 다음과 같이 함수를 작성합니다. 설명을 위해 `fetch`는 두 개로 분할했습니다.
3. 이 라이브러리는 범용으로 재사용할 목적으로 작성하기 때문에 URL이나 각종 설정은 매개변수로 받아서 처리합니다.

```tsx
// src/lib/getPosts.tsx
export default function getPosts(url: string) {
  const res = fetch(url)
  const json = res.then((r) => r.json())

  return json
}
```

## 중복된 요청 제거 및 데이터 캐시

- **Next.js**의 **데이터 캐시**를 사용하여 `fetch` 중복을 제거할 수도 있습니다. 예를 들어, `fetch` 옵션에서 `cache: 'force-cache'`를 설정합니다.

### 데이터 캐시 활용

- 데이터 캐시를 사용하면 현재 렌더 패스와 수신 요청에서 데이터를 공유할 수 있습니다.

---

### 💡 Fetch를 사용하지 않고 대신 ORM이나 데이터베이스를 직접 사용하는 경우 `React 캐시` 함수를 통해 데이터 액세스를 캐싱할 수 있습니다.

- 문서의 예제를 실행해 보기 위해서는 **데이터베이스 연결**이 필요합니다.

### 💻 예시 코드

```tsx
import { cache } from 'react'
import { db, posts, eq } from '@lib/db'

export const getPost = cache(async (id: string) => {
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, parseInt(id)),
  })
})
```

## 스트리밍

### 경고(Warning):

- 아래 내용은 애플리케이션에서 `cacheComponents` 구성 옵션이 활성화되어 있다고 가정합니다. 이 플래그는 **Next.js 15 Canary**에서 도입되었습니다.
- **Next.js**의 변경은 `latest`와 `canary` 두 가지가 있습니다. `latest`는 현재 가장 최신 안정 버전, `canary`는 안정화 직전의 최신 개발 버전을 의미합니다.

### 동적 렌더링

- 서버 컴포넌트에서 `async/await`를 사용하는 경우 **Next.js**는 동적 렌더링을 선택합니다.
- 즉, 모든 사용자 요청에 대해 서버에서 데이터를 가져와서 렌더링합니다.

### 데이터 요청 속도

- 데이터 요청 속도가 느리면 모든 데이터를 가져올 때까지 **전체 경로의 렌더링**이 차단됩니다.

### 초기에 로드 시간과 사용자 경험 개선

- 초기에 로드 시간을 개선하려면 **스트리밍**을 사용하여 페이지의 **HTML**을 더 작은 단위의 블록으로 나누고, 점진적으로 서버에서 클라이언트로 해당 블록을 전송할 수 있습니다.


# 10월 29일 10주차 강의 내용

## Next.js 16 및 데이터 패칭 / Context / 외부 컴포넌트 / 환경 변수 종합 정리

---

## 🌀 Next.js 16 개요

**출시일:** 2025년 10월 21일  
**개선 내용:** 개발자 경험, 라우팅 및 캐싱 기능 강화

### 주요 변경점

- **캐시 컴포넌트 (Cache Components)**  
  부분 사전 렌더링(PPR) 및 use cache 기반의 새로운 프로그래밍 모델

- **Turbopack (stable)**  
  모든 앱에 대한 기본 번들러

- **Turbopack 파일 시스템 캐싱 (beta)**  
  더 빠른 시작 및 컴파일 시간

- **React 컴파일러 지원 (stable)**  
  자동 메모이제이션 기능 통합

- **향상된 라우팅**  
  최적화된 네비게이션 및 prefetch 지원

- **어댑터 API 빌드 (alpha)**  
  사용자 정의 빌드 프로세스 지원

- **개선된 캐싱 API**  
  `updateTag()`, `refresh()`, `revalidateTag()` 등 제공

---

## 🧩 Context Provider 실습 코드 설명

### 1️⃣ Context 생성 (theme-provider.tsx)

```tsx
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () =>
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dataset.theme = theme
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

---

### 2️⃣ Consumer 사용 (theme-status.tsx)

```tsx
'use client'
import { useContext } from 'react'
import { ThemeContext } from './theme-provider'

export default function ThemeStatus() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
```

---

### 3️⃣ RootLayout 수정 (layout.tsx)

```tsx
import ThemeProvider from '@/components/theme-provider'
import ThemeStatus from '@/components/theme-status'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <header>
            <ThemeStatus />
          </header>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

## 🌐 외부(서드 파티) Component 실습

### 📦 acme-carousel 라이브러리 적용 예시

```tsx
'use client'
import { Carousel } from 'acme-carousel'

export default function Gallery() {
  const items = [
    { id: '1', src: 'https://picsum.photos/id/1015/800/600', alt: 'Landscape 1' },
    { id: '2', src: 'https://picsum.photos/id/1016/800/600', alt: 'Landscape 2' },
    { id: '3', src: 'https://picsum.photos/id/1018/800/600', alt: 'Landscape 3' },
  ]
  return <Carousel items={items} />
}
```

- 자동 전환, 반응형, 스와이프, lazy loading 등 다양한 기능 제공

---

## 🔒 환경 변수 노출 예방

```js
import 'server-only'

export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: { authorization: process.env.API_KEY },
  })
  return res.json()
}
```

> `server-only`를 사용해 클라이언트로 환경변수 노출 방지

```bash
npm install server-only
```

---

## 📡 데이터 가져오기 (Fetching Data)

### 서버 컴포넌트에서 ORM 또는 데이터베이스 사용

```tsx
import { db, posts } from '@/lib/db'

export default async function Page() {
  const allPosts = await db.select().from(posts)
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

---

### 클라이언트 컴포넌트에서 데이터 가져오기

```tsx
import Posts from '@/ui/posts'
import { Suspense } from 'react'

export default function Page() {
  const posts = fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Posts posts={posts} />
    </Suspense>
  )
}
```

| 항목 | 설명 |
|------|------|
| `await` 생략 | 스트리밍 렌더링을 위해 Promise 유지 |
| `Suspense` | 로딩 중 임시 UI 표시 |
| `use()` Hook | Promise 데이터 수신 |

---

> **작성자:** DeveloperN  
> **용도:** VS Code 학습 및 실습용 README.md


# 10월 22일 9주차 강의 내용

## 📘 전체 개요
이 문서는 Next.js에서 **Server / Client Component의 Interleaving 개념**과  
**React Context Provider 실습 코드**를 정리한 학습 문서입니다.

---

### 3-4. Server 및 Client Component 인터리빙

### 🧩 인터리빙(Interleaving) 개념
- 여러 데이터 블록이나 비트를 섞어서 전송하거나 처리하여 오류 발생 시 영향을 최소화하는 기술.
- 데이터 통신에서 **버스트 오류(연속적 오류)** 를 줄이고 오류 정정 코드의 효율을 높이기 위해 사용됨.
- 프로그래밍에서는 **Server와 Client 컴포넌트가 섞여 동작**하는 것을 의미.

### 일반적인 패턴
```tsx
'use client'

export default function Modal({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```
→ `<ClientComponent>` 내부에 공간(slot)을 만들고 `children`을 삽입하는 패턴이 일반적.

---

## 📡 예제 심화
Server Component와 Client Component를 혼합하여 사용하는 예:
```tsx
// app/page.tsx
import Modal from './ui/modal'
import Cart from './ui/cart'

export default function Page() {
  return (
    <Modal>
      <Cart />
    </Modal>
  )
}
```

📘 **핵심 요약**
- Client는 state와 UI 제어, Server는 데이터 제공.
- Server → Client 간 props 전달 가능.
- Server Component는 서버에서 미리 렌더링됨.
- Client Component에서 Server UI를 시각적으로 중첩.

---

## 🧪 실습
Next.js는 기본적으로
- Server Component → 서버 렌더링 (데이터 패칭 가능)
- Client Component → 브라우저 렌더링 (상호작용 가능)

즉, Server Component 안에는 Client Component를 포함할 수 있지만, 그 반대는 직접적으로 불가능.

이를 해결하기 위한 아이디어가 **interleaving**.

> 클라이언트의 children 슬롯에 서버 컴포넌트를 끼워 넣는 방식.

---

## 3-5. Context란 무엇인가?

## 🧠 Context의 정의
- React의 Context API를 사용하여 컴포넌트 간 데이터를 공유.
- 부모 → 자식 간 props 전달 없이도 데이터 접근 가능.

### 주요 특징
1. **전역 상태 관리**: 전 애플리케이션에서 공유 가능한 데이터 중앙관리.
2. **Props Drilling 해결**: 깊은 트리 구조에서도 props 전달 없이 데이터 접근 가능.
3. **React 기능 기반**: Next.js에서도 동일한 방식으로 동작.

### 기본 예제
```tsx
const MyContext = React.createContext();

function MyComponent() {
  const value = useContext(MyContext);
  return <div>{value}</div>;
}

function App() {
  return (
    <MyContext.Provider value="Hello from Context">
      <MyComponent />
    </MyContext.Provider>
  );
}
```

---

## 3-5. Context Provider (컨텍스트 제공자)

## 🧱 ThemeProvider 예제
```tsx
'use client'
import { createContext } from 'react'

export const ThemeContext = createContext({})

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}
```

- Context Provider는 Client Component여야 함.
- Provider를 통해 하위 컴포넌트로 데이터 전파.

---

## ⚙️ Layout에서 적용
```tsx
import ThemeProvider from './theme-provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```
- Server Component에서도 Provider를 감싸 전체 앱에 Context 제공 가능.

---

## 🧪 Context Provider 실습

### ThemeProvider 구조
1. `useState`로 theme 상태 관리 (`'light' | 'dark'`)
2. `useEffect`로 HTML에 data-theme 속성 반영
3. CSS에서 속성 선택자로 테마 스타일 제어
4. `ThemeStatus` Client Component로 토글 버튼 구현

---

### useEffect 코드
```tsx
useEffect(() => {
  if (typeof window !== 'undefined') {
    document.documentElement.dataset.theme = theme
  }
}, [theme])
```
- 클라이언트 환경에서만 실행.
- HTML의 `data-theme` 값 업데이트.
- CSS에서 `[data-theme='light']`, `[data-theme='dark']`로 스타일 지정.

---

### ThemeStatus.tsx
```tsx
'use client'
import { useContext } from 'react'
import { ThemeContext } from './theme-provider'

export default function ThemeStatus() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? 'Dark → Light' : 'Light → Dark'}
    </button>
  )
}
```
- Context 구독(`useContext`)
- 버튼 클릭 시 테마 전환 실행.

---

## 🧩 RootLayout 수정 (최종 구조)
```tsx
import ThemeProvider from '@/components/theme-provider'
import ThemeStatus from '@/components/theme-status'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <header><ThemeStatus /></header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```
- `ThemeStatus`를 헤더에 배치해 전역 테마 전환 구현.
- `ThemeProvider`가 전역 Context 제공.

---

## 📘 핵심 정리
- Server Component는 렌더링 기반, Client Component는 상호작용 담당.
- Context는 React의 전역 데이터 공유 메커니즘.
- ThemeProvider + ThemeStatus로 Context 기반 상태 관리 구현.
- Next.js에서 SSR + CSR + Context가 통합된 예제 구조.


# 10월 17일 7주차-보강 강의내용

## 1. Server 및 Client Component를 언제 사용해야 하나요?

- **client 환경과 server 환경**은 서로 다른 기능을 가지고 있습니다.  
- `server` 및 `client component`를 사용하면, **각 환경에서 필요한 로직을 분리 실행**할 수 있습니다.

---

### ✅ Client Component를 사용하는 경우

- **state 및 event handler** — 예: `onClick`, `onChange`  
- **Lifecycle Logic** — 예: `useEffect`  
- **브라우저 전용 API** — 예: `localStorage`, `window`, `Navigator.geolocation`  
- **사용자 정의 Hook**

---

### 🧩 Server Component를 사용하는 경우

- **데이터 fetching** — 서버 DB나 API에서 데이터를 가져올 때  
- **보안 유지** — API key, token 등 노출 방지  
- **JS 전송량 감소** — 클라이언트로 불필요한 JS 전송 최소화  
- **FCP(First Contentful Paint)** 개선 — 콘텐츠를 서버에서 미리 렌더링

---

> ✍️ **정리 요약**
>
> - Client: 사용자 상호작용, 상태 관리, 브라우저 전용 기능  
> - Server: 데이터 fetching, 보안 유지, 초기 렌더링 최적화

---

## 1-2. 예시 — Server와 Client Component 협업

```tsx
// app/[id]/page.tsx
import LikeButton from "@/app/ui/like-button";
import { getPost } from "@/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  return (
    <div>
      <h1>{post.title}</h1>
      <LikeButton likes={post.likes} />
    </div>
  );
}
```

```tsx
// app/ui/like-button.tsx
"use client";
import { useState } from "react";

export default function LikeButton({ likes }: { likes: number }) {
  const [count, setCount] = useState(likes);
  return <button onClick={() => setCount(count + 1)}>👍 {count}</button>;
}
```

---

## 1-3. getPost 함수의 구현

```tsx
type Post = { id: string; title: string; content: string; likes: number };

const posts: Post[] = [
  { id: "nextjs", title: "Next.js", content: "Next.js is great!", likes: 5 },
  { id: "routing", title: "Routing", content: "Routes in App Router", likes: 3 },
];

export async function getPost(id: string): Promise<Post> {
  await new Promise((r) => setTimeout(r, 100));
  const post = posts.find((p) => p.id === id);
  if (!post) throw new Error("Post not found");
  return post;
}
```

---

## 1-4. LikeButton과 Optimistic Update

```tsx
"use client";
import { useState } from "react";

export default function LikeButton({ likes }: { likes: number }) {
  const [count, setCount] = useState(likes);
  const [isLiking, setIsLiking] = useState(false);

  const handleClick = async () => {
    setIsLiking(true);
    setCount((c) => c + 1);
    setTimeout(() => setIsLiking(false), 300);
  };

  return (
    <button onClick={handleClick} disabled={isLiking}>
      ❤️ {count}
    </button>
  );
}
```

> **Optimistic Update**: 서버 응답을 기다리지 않고 UI를 즉시 변경하여 더 빠른 반응을 보이는 UX 최적화 기법.

---

## 2. Next.js에서 Server / Client Component 작동 원리

### 2-1. Server Component의 작동

- **React API**를 활용해 서버에서 렌더링을 조정
- **Chunk 단위**로 라우팅 구조를 분리 (`layout`, `page`)

**RSC Payload (React Server Component Payload)**를 통해 HTML을 미리 렌더링(prerender)

#### React Server Component Payload(RSC)
- 렌더링된 서버 컴포넌트 트리의 압축된 바이너리 표현
- client에서 DOM 갱신에 활용됨

---

### 2-2. Client Component의 작동 (첫 번째 Load)

1. **HTML**은 사용자에게 미리보기 형태로 즉시 표시됩니다.
2. **RSC Payload**는 client가 server component 트리를 조정하는 데 사용됩니다.
3. **Hydration**은 이벤트 핸들러를 DOM에 연결하여 정적 HTML을 인터랙티브하게 만듭니다.

---

### 2-3. 후속 탐색

- **RSC Payload**는 prefetch 및 cache 되어, 후속 탐색 시 빠르게 로드됩니다.  
- **Client Component**는 server에서 렌더링된 HTML 없이, 클라이언트에서 전적으로 렌더링됩니다.

---

## 3. Example

### 3-1. Client Component 사용

```tsx
"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count} likes</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

> - 파일 상단에 `"use client"` 선언 시, 파일 전체가 client 범위로 작동  
> - 모든 하위 컴포넌트는 자동으로 client로 간주되어 중복 선언 불필요

---

### 3-1. Client Component 실습

```tsx
// app/counter/page.tsx
import Counter from "@/components/Counter";

export default function CounterPage() {
  return (
    <div>
      <h1>Counter Page</h1>
      <Counter />
    </div>
  );
}
```

> ✅ 실습: slug 페이지(like-button)와 counter 페이지를 연결하여 라우팅 확인

---

### 3-2. JS Bundle 크기 줄이기

```tsx
// app/layout.tsx
import Search from "./search"; // Client Component
import Logo from "./logo";     // Server Component

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <nav>
      <Logo />
      <Search />
    </nav>
    <main>{children}</main>
  );
}
```

```tsx
// app/ui/search.tsx
"use client";

export default function Search() {
  // 검색 입력 로직
}
```

> 🔍 Search는 대화형 요소이므로 Client Component로, Logo는 정적 요소이므로 Server Component로 유지

---

### 3-3. Server → Client 데이터 전달

```tsx
// app/[id]/page.tsx
import LikeButton from "@/app/ui/like-button";
import { getPost } from "@/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  return (
    <div>
      <main>
        <h1>{post.title}</h1>
        <LikeButton likes={post.likes} />
      </main>
    </div>
  );
}
```

```tsx
// app/ui/like-button.tsx
"use client";
export default function LikeButton({ likes }: { likes: number }) {
  // 클라이언트에서 likes 활용
}
```

---

### 직렬화(Serialization)

- React에서는 서버에서 클라이언트로 넘길 때 **직렬화 가능한 데이터**만 허용됩니다.
- 문자열, 숫자, 배열, 순수 객체(JSON)는 가능하지만, 함수, Date, Symbol 등은 불가능합니다.

> React/Next.js는 서버에서 Component 트리의 상태를 직렬화하여 전송하고,
> 클라이언트에서 역직렬화 후 다시 렌더링합니다.

---

✅ **전체 요약**

| 구분 | Server Component | Client Component |
|------|------------------|------------------|
| 실행 위치 | Node.js (서버) | 브라우저 |
| 목적 | 데이터 Fetch, 보안, 초기 렌더링 | 상태, 이벤트, UI 상호작용 |
| 데이터 전달 | props 직렬화 필요 | 서버 데이터 수신 후 렌더링 |
| 예시 | layout, page | button, form, input |

---

> ✨ **정리:**
>
> Next.js App Router는 Server와 Client Component를 분리하여 성능과 UX를 극대화합니다.  
> Server는 데이터를 처리하고, Client는 상호작용을 담당하는 구조로 구성하는 것이 이상적입니다.


# 10월 15일 8주차 (중간고사)

# 10월 8일 7주차 (추석 연휴)

# 10월 1일 6주차 강의내용

## Next.js 네비게이션 & 전환 정리 (App Router)

## 1-4. Client-side transitions (클라이언트 측 전환)

- 일반적으로 서버 렌더링 페이지로 이동하면 전체 페이지가 **로드**됩니다.  
  → 이로 인해 `state`가 삭제되고, 스크롤 위치가 재설정되며, 상호작용이 차단됩니다.  

- **Next.js의 `<Link>` 컴포넌트**를 사용하면 클라이언트 측 전환을 통해 이를 방지합니다.  
  - 페이지를 다시 로딩하는 대신, 다음과 같은 방법으로 **콘텐츠를 동적으로 업데이트**합니다:  
    - 공유 레이아웃과 UI를 유지  
    - 현재 페이지를 **미리 가져오기(prefetching)** → 로딩 상태 또는 사용 가능한 경우 새 페이지로 빠르게 전환  

### 핵심 포인트
- 클라이언트 측 전환은 서버에서 **렌더링된 앱**을 클라이언트에서 **렌더링된 앱처럼 느껴지게 하는 요소**입니다.  
- **프리페칭 + 스트리밍**과 함께 사용하면 동적 경로에서도 빠른 전환이 가능합니다.

---

## 1절 네비게이션 작동 방식 실습

- 앞에서 배운 내용을 다시 확인합니다.  
- 디렉토리 구조는 다음과 같습니다.  
- 디렉토리 이름(`blog`)은 다르게 해도 괜찮습니다.  

```plaintext
app/
 ├─ page.tsx       // Root Page
 ├─ layout.tsx     // RootLayout
 └─ blog/
     ├─ page.tsx   // 블로그 목록
     └─ loading.tsx // 로딩 스켈톤
```

### 실습 과정
- **Root Page**를 간단히 작성합니다.  
- `blog` 디렉토리를 만들고, 간단한 `page`와 **로딩 스켈톤**을 만듭니다.  
- `RootLayout`에 **Link 컴포넌트**를 이용하여 `blog`의 네비게이션을 구성합니다.  
- 로딩 스켈톤의 동작을 확인하기 위해 `blog/page`에 **time delay**를 줍니다.  
- 문서에서는 `RootLayout`에 `<a>` 태그를 이용해서 `blog` 네비게이션을 만드는 예제가 존재합니다.  

### 주의사항 (`<a>` vs `<Link>`)
- 내부 페이지(`blog`)로 이동할 때는 `<a>` 태그를 사용하지 말고 반드시 `<Link>`를 사용해야 합니다.  
- 외부 링크를 사용할 때만 `<a>` 태그를 활용할 수 있으며, `target`과 같은 속성을 추가하는 경우에 한해 사용 가능합니다.  
- 그 외에는 항상 `<Link>`를 사용해야 합니다.  

> 예시 오류 메시지:
```plaintext
Do not use an <a> element to navigate to '/blog'. Use <Link /> from 'next/link' instead.
```

---

## 2. 전환을 느리게 만드는 요인

- Next.js는 **최적화**를 통해 네비게이션 속도가 빠르고 반응성이 뛰어납니다.  
- 하지만 특정 조건에서는 전환 속도가 느릴 수 있습니다.  
- 아래는 일반적인 원인과 개선 방법입니다.  

### 2-1. 동적 경로 없는 `loading.tsx`
- **동적 경로**로 이동 시 서버 응답을 기다리는 동안 UX가 멈춘 것처럼 보일 수 있습니다.  
- 해결: 부분 **프리페칭** + 경로 **렌더링 중 로딩 UI**를 표시하기 위해 해당 경로에 `loading.tsx` 추가.

```tsx
// app/blog/[id]/loading.tsx
export default function Loading() {
  return <LoadingSkeleton />;
}
```

#### DevIndicators (Next.js 15.2.0~)
- 개발 모드에서 경로가 정적/동적인지 확인 가능.  
- `position` 옵션 새로 추가, `appIsrStatus`, `buildActivity`, `buildActivityPosition`은 **폐지**.

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: { position: "bottom-left" },
};

export default nextConfig;
```

### 2-2. `generateStaticParams`

- 동적 세그먼트가 있어도 `generateStaticParams`가 **없으면** 요청 시점에 **동적 렌더링**으로 대체됩니다.  
- `generateStaticParams`를 **추가하면** 빌드 시점에 정적 경로가 생성되어 정적 HTML을 제공.

```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch("https://.../posts").then((res) => res.json());
  return posts.map((post: any) => ({ slug: post.slug }));
}
```

#### 실습 구조(없을 때)
```plaintext
app/
 └─ blog2/
     ├─ page.tsx      // 블로그 목록
     ├─ posts.tsx     // 더미 데이터
     └─ [slug]/page.tsx  // 개별 포스트(런타임 처리)
```

```tsx
// app/blog2/[slug]/page.tsx
import { posts } from "../posts";

export default async function PostPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <h1>포스트를 찾을 수 없습니다.</h1>;
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

#### 실습 구조(있을 때)
```plaintext
app/
 └─ blog3/
     ├─ page.tsx
     ├─ posts.tsx
     └─ [slug]/page.tsx  // generateStaticParams 사용
```

```tsx
// app/blog3/[slug]/page.tsx
import { posts } from "../posts";

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return <h1>404 Not Found</h1>;
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

#### 빌드 시 동작 요약
```ts
// generateStaticParams() 결과 예
[ { slug: "hello" }, { slug: "world" }, { slug: "nextjs" } ]
```
→ Next.js가 각 슬러그로 `page.tsx`를 실행하여 **정적 HTML** 생성  
(예: `/blog/hello/index.html`, `/blog/world/index.html`, `/blog/nextjs/index.html`)

#### 선택 기준
- **자주 변하지 않는 페이지** → `generateStaticParams` 권장(SSG, 빠름/SEO 유리)  
- **사용자 입력/DB 조회 등 실시간 데이터** → 런타임 처리 권장(SSR/ISR)

### 2-2-보충. `await`이 없어도 `async`를 붙여 두는 이유
1) **일관성**: 프로젝트 전반의 함수 형태 통일(공식 문서도 `async` 예시 다수)  
2) **확장성**: 나중에 `fetch/DB`로 바꿔도 시그니처 변경 없이 수용  
3) **RSC 호환**: Server Component는 `Promise` 반환 패턴에 최적화

### 2-3. 느린 네트워크
- 느린/불안정 네트워크에서는 **클릭 전에 프리페칭이 끝나지 않을 수 있음** → 로딩 지연 체감.  
- `useLinkStatus`로 전환 중 **시각적 피드백(스피너/텍스트 로더)** 제공.

```tsx
// app/ui/Loading-indicator.tsx
'use client'
import { useLinkStatus } from 'next/link'

export default function LoadingIndicator() {
  const { pending } = useLinkStatus()
  return pending ? (
    <div role="status" aria-label="Loading" className="spinner" />
  ) : null
}
```

- **디바운스형 로딩 표시**: 짧은 지연(예: 100ms) 후에만 나타나도록 해서 불필요한 깜빡임 방지.

```css
/* CSS 예시 */
.spinner {
  opacity: 0;
  animation:
    fadeIn 500ms 100ms forwards,
    rotate 1s linear infinite;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes rotate { to { transform: rotate(360deg); } }
```

### 2-4. 프리페칭 비활성화
- `<Link prefetch={false} />`로 **자동 프리페칭을 끄기** 가능 → 대량 링크 렌더링 시 유용.

```tsx
<Link prefetch={false} href="/blog">Blog</Link>
```

- **호버 시에만 프리페칭**하도록 커스텀 컴포넌트 사용:

```tsx
// app/ui/hover-prefetch-link.tsx
'use client'
import Link from 'next/link'
import { useState } from 'react'

function HoverPrefetchLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [active, setActive] = useState(false)
  return (
    <Link href={href} prefetch={active ? null : false} onMouseEnter={() => setActive(true)}>
      {children}
    </Link>
  )
}
export default HoverPrefetchLink
```

### 2-5. Hydration이 완료되지 않음
- `<Link>`는 **클라이언트 컴포넌트** → 프리페칭 전 **Hydration 선행** 필요.  
- 초기 대용량 번들로 Hydration이 지연될 수 있음.  
- 개선: **선택적 Hydration**, `@next/bundle-analyzer`로 번들 축소, 가능 시 **서버 컴포넌트로 이전**.

---

## Hydration이란?
- 서버에서 생성된 **정적 HTML**에 클라이언트의 **JavaScript 로직을 연결**하여
  **상호작용 가능** 상태로 만드는 과정. (SSR과 상호 보완)

---

## Shared layouts remain interactive / Navigation is interruptible

### Shared layouts remain interactive
- App Router의 `layout.tsx`는 여러 페이지 간 **공유**되며, 페이지 전환 시 **리렌더링 없이 유지**.  
- 사이드바/네비 메뉴/플레이어 등은 **로딩 중에도 동작 지속**.

### Navigation is interruptible
- 사용자가 전환 중 다른 링크를 클릭하면 **이전 요청 취소** 후 새 요청으로 전환.  
- 결과: 끊기지 않는 UI + 인터럽트 가능한 네비게이션.

---

## 3. Examples – 네이티브 히스토리 API

- Next.js는 `window.history.pushState` / `window.history.replaceState`를 활용해
  **리로드 없이** 기록 스택을 갱신하며, `usePathname`, `useSearchParams`와 동기화.

### pushState
- 기록 스택에 **새 항목 추가** → 뒤로가기 **가능**.  
- 예: 제품 목록 정렬 상태 반영.

### replaceState
- **현재 항목 교체** → 뒤로가기 **불가능**.  
- 예: 애플리케이션 **Locale 전환**.

---

## 부록: 비교 요약 (generateStaticParams 유무)

| 항목 | 없음 (SSR/ISR) | 있음 (SSG) |
|---|---|---|
| 페이지 생성 시점 | 요청 시 서버 생성 | 빌드 타임 생성 |
| 초기 로딩 속도 | 상대적으로 느림 | 매우 빠름 |
| SEO | 가능하나 요청 시 생성 | 매우 유리(즉시 크롤링) |
| 유연성 | 무한정 slug 지원(DB 등) | 미리 정의된 slug만 |

---

# 9월 24일 5주차 강의내용

---

#### 용어 정의

- `route(라우트)`: 경로.  
- `routing(라우팅)`: 경로를 찾아가는 과정.  
- `path`: URL 경로 문자열.  
- `segment`: 경로를 구성하는 한 구간.  
- `searchParams`: URL의 쿼리 문자열을 의미.  

---

#### searchParams란?

- URL의 쿼리 문자열(Query String)을 읽는 방법.  

예시:
```
/products?category=shoes&page=2
```

- 여기서 `category=shoes`, `page=2`가 search parameters.  

```tsx
// app/products/page.js
export default function ProductsPage({ searchParams }) {
  return <p>카테고리: {searchParams.category}</p>;
}
```

- 특징: `searchParams`는 컴포넌트의 props로 전달되며, `URLSearchParams`처럼 작동.

---

#### 왜 동적 렌더링이 되는가?

- `searchParams`는 요청 시점에만 알 수 있음.  
- 따라서 미리 정적으로 만들 수 없고, Next.js는 해당 페이지를 **동적 렌더링** 처리.

| 구분 | 정적 렌더링 | 동적 렌더링 |
|------|-------------|-------------|
| 예시 | `/about` | `/products?page=2` |
| 장점 | 빠름, 캐시 | 유연, 쿼리 응답 가능 |
| searchParams | ❌ | ✅ |

---

#### searchParams 실습

폴더 구조:
```
app/
 └─ products/
     └─ page.tsx
```

코드 예시:
```tsx
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; name?: string }>
}) {
  const { id = "non id", name = "non name" } = await searchParams;
  return (
    <div>
      <h1>Products Page</h1>
      <p>id: {id}</p>
      <p>name: {name}</p>
    </div>
  );
}
```

---

#### [slug]의 이해 (동적 라우팅)

- 대괄호 폴더는 **동적 세그먼트**.  
- 데이터에서 해당 key(slug)를 찾아 매핑.

```tsx
// app/blog/[slug]/page.tsx
import { posts } from "../posts";

export default async function Posts({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <h1>게시글을 찾을 수 없습니다!</h1>;
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

- 데이터가 커지면 `.find` 대신 DB 쿼리 사용 권장.

---

#### searchParams 코드 설명

```tsx
const { id = "non id", name = "non name" } = await searchParams;
```

- `await`: Promise에서 실제 값 추출.  
- 비구조화 할당: `{id, name}` 형태로 꺼냄.  
- 초기값 지정 가능.

---

#### Linking between pages (페이지 간 연결)

- `<Link>`는 HTML `<a>`를 확장하여 **prefetching**과 **클라이언트 전환**을 지원.

```tsx
import Link from 'next/link';

export default async function Post() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
```

---

#### Link 컴포넌트 실습

예시 출력:
```
=== Root Layout Header ===
*** Blog Layout Header ***

블로그 목록
- Next.js 소개
- App Router 알아보기
- SSR vs SSG
- 동적 렌더링

*** Blog Layout Footer ***
--- Root Layout Footer ---
```

추가 실습: 모든 페이지에 `Home`, `Blog` 메뉴 추가.

---

#### Route 방식 비교 (React vs Next.js)

| 항목 | React | Next.js |
|------|-------|---------|
| 라우팅 방식 | 수동 | 자동 |
| 라우터 도구 | react-router-dom 필요 | 내장 |
| 정의 방식 | `<Route>` 코드 작성 | 파일/폴더 기반 자동 매핑 |

---

#### Route 방식 비교 (Pages Router vs App Router)

| 항목 | Pages Router | App Router |
|------|--------------|------------|
| 도입 | 초기(1~12) | 13+ |
| 디렉토리 | `pages/` | `app/` |
| 권장 | 유지보수 중 | 권장 방식 |

---

#### App Router 구조 예시

```
app/
 ├─ layout.tsx
 ├─ page.tsx
 ├─ about/page.tsx
 └─ blog/[slug]/page.tsx
```

- layout: 공통 UI  
- 추가 파일: `loading.tsx`, `error.tsx`, `not-found.tsx` 등

---

#### App Router 강력한 기능

- 중첩 레이아웃  
- 서버 컴포넌트 (RSC)  
- 로딩 UI  
- 에러 UI  
- 병렬 라우팅  

---

#### Prefetching (프리페칭)

- 사용자가 클릭하기 전, 백그라운드에서 미리 데이터 로드.  
- `<Link>`는 자동 prefetch 지원.  

```tsx
<Link href="/about">About</Link>
```

- 정적 경로: 전체 프리페치  
- 동적 경로: 부분/건너뜀  

---

#### Streaming (스트리밍)

- 전체 페이지가 준비되기 전, 일부 UI 먼저 전송.  
- `loading.tsx`를 활용하여 로딩 스켈레톤 표시.  
- `<Suspense>`로 중첩 로딩 UI 작성 가능.  

---

#### Shared Layouts & Navigation

- **Shared layouts remain interactive**: 페이지 이동 시에도 공통 레이아웃은 유지.  
- **Navigation is interruptible**: 요청 진행 중 새 요청이 들어오면 이전 요청 취소.




# 9월 17일 4주차 강의내용

---

#### 용어 정의

- `route(라우트)`: 경로. `routing(라우팅)`: 경로를 찾아가는 과정.
- `path`: URL 경로 문자열.
- `directory / folder`: 라우팅 맥락에서 폴더는 URL 세그먼트에 대응.
- `segment`: 라우팅과 매핑되는 폴더(경로의 한 구간).

---

#### Creating a page (페이지 만들기)

- Next.js는 **파일 시스템 기반 라우팅**을 사용합니다.
- 특정 경로의 UI는 해당 위치의 `page.tsx`로 정의하고 **default export** 합니다.

```tsx
// app/page.tsx
export default function Page() {
  return <h1>Hello Next.js!</h1>;
}
```

---

#### Creating a layout (레이아웃 만들기)

- **Layout**은 여러 페이지에서 공유되는 UI입니다.
- 레이아웃은 네비게이션 시 상태/상호작용을 유지하며 다시 렌더링되지 않습니다.
- 레이아웃 컴포넌트는 반드시 `children`을 받아 하위 UI를 감쌉니다.

```tsx
// app/layout.tsx (Root Layout: 필수, html/body 포함)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>Root Layout Header</header>
        <main>{children}</main>
        <footer>Root Layout Footer</footer>
      </body>
    </html>
  );
}
```

- 필요 시 하위 경로에 별도 레이아웃을 추가할 수 있습니다.

```tsx
// app/blog/layout.tsx
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>*** Blog Layout Header ***</header>
        <main>{children}</main>
        <footer>*** Blog Layout Footer ***</footer>
      </body>
    </html>
  );
}
```

```tsx
// app/blog/[slug]/layout.tsx
export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>^^^ Slug Layout Header ^^^</header>
        <main>{children}</main>
        <footer>^^^ Slug Layout Footer ^^^</footer>
      </body>
    </html>
  );
}
```

- **레이आ웃 적용 순서**: Root → Blog → Slug → Page

---

#### Creating a nested route (중첩 라우트 만들기)

- **폴더 = URL 세그먼트**, **파일(`page.tsx`, `layout.tsx`) = UI** 입니다.
- `/blog` 경로 예시:

```tsx
// app/blog/page.tsx
import { getPosts } from "@/lib/posts";
import { Post } from "@/ui/post";

export default async function Page() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}
```

- 폴더 중첩으로 `/blog/[slug]` 경로를 구성할 수 있습니다.

---

#### Understanding `[slug]` (동적 라우팅)

- 대괄호 폴더는 **동적 세그먼트**를 의미합니다.
- 데이터에 해당 key(`slug`)가 있어야 매핑됩니다.

```tsx
// app/blog/[slug]/page.tsx
import { posts } from "../posts";

export default async function Posts({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;                   // 최신 App Router: params가 Promise일 수 있음
  const post = posts.find((p) => p.slug === slug); // O(n): 더미 데이터 수준에서 사용

  if (!post) return <h1>게시글을 찾을 수 없습니다!</h1>; // 예외 처리
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

- 참고: 데이터가 커지면 `.find` 대신 **DB 쿼리** 사용을 권장합니다.

---

#### `/blog/page.tsx` 수정 (리스트/상세 분리)

- `/blog/page.tsx` → 포스트 목록
- `/blog/[slug]/page.tsx` → 포스트 상세

```tsx
// app/blog/page.tsx
import { posts } from "./posts";

export default async function Page() {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          {post.title} / {post.content}
        </li>
      ))}
    </ul>
  );
}
```

---

#### Nesting layouts (중첩 레이아웃)

- 레이아웃은 상위 → 하위로 중첩 적용되어 공통 UI를 단계별로 재사용합니다.
- 출력 순서 예: Root Header → Blog Header → Slug Header → Post → Slug Footer → Blog Footer → Root Footer.

---

#### Rendering with search params (검색 매개변수)

- **서버 컴포넌트**에서는 `searchParams` prop으로 쿼리 문자열을 읽습니다.
- **클라이언트 컴포넌트**에서는 `useSearchParams` 훅을 사용합니다.

```tsx
// app/products/page.tsx (Server Component)
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  return <p>카테고리: {params.category}</p>;
}
```

```tsx
// (Client Component) 예시
"use client";
import { useSearchParams } from "next/navigation";

export default function Filters() {
  const sp = useSearchParams();
  const filter = sp.get("filter");
  return <p>필터: {filter ?? "없음"}</p>;
}
```

- 비교: `params`는 **path 세그먼트**(`/blog/[slug]`), `searchParams`는 **query string**(`/products?page=2`).

---

#### Why Dynamic Rendering? (동적 렌더링인 이유)

- `searchParams` 값은 **요청 시점**에만 확정 → 정적 생성 불가.
- `searchParams`를 사용하면 해당 페이지는 자동으로 **동적 렌더링** 처리됩니다.

| 구분 | 정적 렌더링 (Static) | 동적 렌더링 (Dynamic) |
|---|---|---|
| 예시 | `/about`, `/blog` | `/products?page=2` |
| 장점 | 빠름, 캐시 용이 | 유연, 쿼리 기반 응답 |
| `searchParams` | 사용 불가 | 사용 가능 |

---

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

