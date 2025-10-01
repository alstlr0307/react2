import { posts } from "../posts";

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return <h1>404 Not Found</h1>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}