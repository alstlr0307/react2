import Posts from '../blog/posts'
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
