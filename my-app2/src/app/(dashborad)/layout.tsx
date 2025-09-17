export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>Root Dash Header</header>
        <main>{children}</main>
        <header>Root Dash Footer</header>
      </body>
    </html>
  )
}