// app/blog/page.tsx
import Link from "next/link";
import { posts } from "./posts";

export default function BlogPage2() {
  return (
    <div>
      <h1>블로그2 목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog2/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
