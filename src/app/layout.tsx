import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tập Viết Chữ - Bảo Học Ngoan",
  description: "Web app hướng dẫn bé tập viết chữ dành riêng cho iPad A16.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Tập Viết"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <main className="app-container">
          {children}
        </main>
      </body>
    </html>
  );
}
