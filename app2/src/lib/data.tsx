// src/lib/data.tsx
type Post = {
  id: string;
  title: string;
  content: string;
  likes: number;
};

const posts: Post[] = [
  { id: 'nextjs', title: 'Next.js', content: 'Next.js is great.', likes: 5 },
  { id: 'routing', title: 'Routing', content: 'Routes in App Router.', likes: 3 },
];

export async function getPost(id: string): Promise<Post> {
  // 데이터 fetch 시뮬레이션 (100ms 대기)
  await new Promise((r) => setTimeout(r, 100));
  const post = posts.find((p) => p.id === id);
  if (!post) throw new Error('Post not found');
  return post;
}

export async function getPosts(): Promise<Post[]> {
  // 전체 게시글 fetch 시뮬레이션 (50ms 대기)
  await new Promise((r) => setTimeout(r, 50));
  return posts;
}

export { posts };
