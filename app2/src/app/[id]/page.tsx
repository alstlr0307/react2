// src/app/[id]/page.tsx
import LikeButton from "../../ui/like-button";
import { posts } from "../../lib/data";
import { notFound } from "next/navigation";

// 개별 게시글 페이지
export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 해당 id의 게시글 찾기
  const post = posts.find((p) => p.id === id);

  if (!post) notFound();

  return (
    <div>
      <main>
        <h1>{post.title}</h1>
        <LikeButton likes={post.likes} />
      </main>
    </div>
  );
}
