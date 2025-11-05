import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link> | <Link href="/blog">Blog</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
