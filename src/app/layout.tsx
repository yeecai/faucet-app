import './globals.css'

export const metadata = {
  title: 'USDC faucet',
  description: 'to request usdc',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
