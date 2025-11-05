import Link from "next/link";
import ThemeProvider from "../components/theme_provider";
import ThemeStatus from "@/components/theme-status";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <header>
            <p>🌐 Root Layout Header ---</p>
            <nav>
              <Link href="/">Home</Link> | <Link href="/counter">Counter</Link>
              <br />
              SSG / SSR Example:&nbsp;
              <Link href="/nextjs">NextJS</Link>&nbsp;&nbsp;
              <Link href="/routing">Routing</Link>&nbsp;&nbsp;
              <Link href="/ssr-ssg">SSR-SSG</Link>
              <br />
              <Link href="/dynamic-routes">Dynamic Routes</Link>&nbsp;|
              &nbsp;
              <Link href="/interleaved">Interleaving 예제</Link>
            </nav>
            <ThemeStatus />
          </header>

          <main>  {children}</main>

          <footer>
            <p>📄 Root Layout Footer ---</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
