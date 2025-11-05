import useSWR from 'swr'

const fetcher = <T,>(url: string): Promise<T> => fetch(url).then((r) => r.json())

type Photo = {
  id: string
  title: string
}

export default function Blog2Page() {
  const { data, error, isLoading } = useSWR<Photo[]>(
    'https://jsonplaceholder.typicode.com/photos',
    fetcher
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data?.map((post: { id: string; title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
