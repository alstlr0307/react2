import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1 className="text-2xl font-bold p-4 bg-gray-200">
            My Website Header
          </h1>
          <nav className="p-4 bg-gray-100">
            <Link href="/" className="mr-4 text-blue-500">
              Home
            </Link>
            <Link href="/blog" className="mr-4 text-blue-500">
              Blog
            </Link>
            <Link href="/blog2" className="text-blue-500">
              Blog2
            </Link>
            <Link href="/blog3" className="ml-4 text-blue-500">
              Blog3
            </Link>
            <Link href="/blog4" className="ml-4 text-blue-500">
              Blog4
            </Link>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
