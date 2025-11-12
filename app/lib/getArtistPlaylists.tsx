type Playlist = {
  id: string
  name: string
}

// 외부 응답 타입을 정의합니다.
type Album = {
  id: number
  title?: string
}

export default async function getArtistPlaylists(
  artistID: string
): Promise<Playlist[]> {
  // jsonplaceholder의 albums 엔드포인트를 userId(artistID)로 조회하여 플레이리스트처럼 사용
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/albums?userId=${encodeURIComponent(
      artistID
    )}`,
    { next: { revalidate: 60 } }
  )

  const albums = await res.json()

  if (!Array.isArray(albums)) return []

  // albums를 Album[]로 간주하고 매핑 (any 제거)
  return (albums as Album[]).map((a) => ({
    id: String(a.id),
    name: a.title ? `Playlist ${a.id}` : '',
  }))
}
