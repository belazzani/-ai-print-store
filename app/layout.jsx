import './globals.css'

export const metadata = {
  title: 'AI-Print | Custom Products with AI',
  description: 'Create custom t-shirts, mugs, posters and more with AI-powered designs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-white">
        {children}
      </body>
    </html>
  )
}
