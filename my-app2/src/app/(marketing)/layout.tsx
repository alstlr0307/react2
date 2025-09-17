export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>shop Footer</header>
        <main>{children}</main>
        <header>marketing Footer</header>
      </body>
    </html>
  )
}