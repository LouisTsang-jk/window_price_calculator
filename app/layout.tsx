import { Metadata } from 'next'
import Providers from './components/Providers'

export const metadata: Metadata = {
  title: "窗户总价计算器",
  description: "计算窗户的总价格",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
