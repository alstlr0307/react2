import { React } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints"
export default function blogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>=== Blog Layout ===</header>
        <main>{children}</main>
        <footer>=== Blog Layout ===</footer>
      </body>
    </html>
  )
}