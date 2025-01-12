import { Inter } from 'next/font/google'
 
const inter = Inter({ subsets: ['latin'] })
 
export const metadata = {
  title: '地方観光AIマッチングプラットフォーム',
  description: 'AIを活用した新しい旅行体験',
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
