import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "窗户价格计算器",
  description: "计算窗户的总价格",
  icons: "/favicon.webp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
