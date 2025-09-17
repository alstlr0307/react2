export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>Root shop Footer</header>
        <main>{children}</main>
        <header>Root marketing Footer</header>
      </body>
    </html>
  )
}