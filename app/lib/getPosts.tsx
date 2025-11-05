export default function getPosts(url: string) {
  const res = fetch(url);
  const json = res.then((r) => r.json());
  // const foo = fetch(url).then((res) => res.json())
  return json;
}
