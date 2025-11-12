export default async function getArtist(username: string) {
  // jsonplaceholder의 users 엔드포인트를 username으로 조회하여 아티스트(유저) 정보 가져오기
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users?username=${encodeURIComponent(
      username
    )}`,
    { next: { revalidate: 60 } } // 서버 캐시 옵션(선택)
  )

  const users = await res.json()
  const user = Array.isArray(users) ? users[0] : undefined

  if (!user) {
    throw new Error(`Artist not found: ${username}`)
  }

  return {
    id: String(user.id),
    name: user.name ?? user.username,
  }
}
