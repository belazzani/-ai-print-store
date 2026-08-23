import Link from 'next/link'

const products = [
  { id: 1, name: 'Classic T-Shirt', emoji: '👕', price: 24.99, badge: 'Best Seller', gradient: 'from-purple-200 to-pink-200' },
  { id: 2, name: 'Ceramic Mug 11oz', emoji: '☕', price: 14.99, badge: 'Best Seller', gradient: 'from-orange-200 to-yellow-200' },
  { id: 3, name: 'Mobile Cover (Phone Case)', emoji: '📱', price: 19.99, badge: 'Best Seller', gradient: 'from-blue-200 to-cyan-200' },
  { id: 4, name: 'Poster', emoji: '🖼️', price: 12.99, badge: null, gradient: 'from-green-200 to-teal-200' },
  { id: 5, name: 'Hoodie', emoji: '🧥', price: 44.99, badge: 'Best Seller', gradient: 'from-gray-200 to-slate-300' },
  { id: 6, name: 'Tote Bag', emoji: '👜', price: 19.99, badge: null, gradient: 'from-amber-200 to-orange-200' },
  { id: 7, name: 'Large Mug 15oz', emoji: '🍵', price: 17.99, badge: null, gradient: 'from-red-200 to-pink-200' },
  { id: 8, name: 'Stickers Pack', emoji: '✨', price: 4.99, badge: null, gradient: 'from-fuchsia-200 to-purple-200' },
  { id: 9, name: 'Throw Pillow', emoji: '🛋️', price: 24.99, badge: null, gradient: 'from-indigo-200 to-blue-200' },
  { id: 10, name: 'Canvas Print', emoji: '🎨', price: 34.99, badge: null, gradient: 'from-rose-200 to-red-200' },
  { id: 11, name: 'Sweatshirt', emoji: '👚', price: 39.99, badge: null, gradient: 'from-lime-200 to-green-200' },
  { id: 12, name: 'Tank Top', emoji: '🎽', price: 19.99, badge: null, gradient: 'from-cyan-200 to-teal-200' },
  { id: 13, name: 'Long Sleeve Tee', emoji: '👕', price: 27.99, badge: null, gradient: 'from-violet-200 to-purple-200' },
  { id: 14, name: 'Baby Onesie', emoji: '👶', price: 16.99, badge: null, gradient: 'from-pink-200 to-rose-200' },
  { id: 15, name: 'Kids Tee', emoji: '🧒', price: 18.99, badge: null, gradient: 'from-yellow-200 to-amber-200' },
  { id: 16, name: 'Cap & Beanie', emoji: '🧢', price: 22.99, badge: null, gradient: 'from-slate-200 to-gray-300' },
  { id: 17, name: 'Socks', emoji: '🧦', price: 12.99, badge: null, gradient: 'from-teal-200 to-emerald-200' },
  { id: 18, name: 'Backpack', emoji: '🎒', price: 39.99, badge: null, gradient: 'from-blue-200 to-indigo-200' },
  { id: 19, name: 'Blanket', emoji: '🧶', price: 49.99, badge: null, gradient: 'from-orange-200 to-red-200' },
  { id: 20, name: 'Towel', emoji: '🏖️', price: 29.99, badge: null, gradient: 'from-sky-200 to-blue-200' },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-600">AI-Print</Link>
          <Link href="/ai-designer" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm font-semibold">✨ AI Designer</Link>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Best Selling Products</h1>
        <p className="text-center text-gray-600 mb-12">Choose a product and create your custom design with AI</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition relative">
              {p.badge && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full z-10">
                  🔥 {p.badge}
                </span>
              )}
              <div className={`bg-gradient-to-br ${p.gradient} aspect-square flex items-center justify-center`}>
                <span className="text-7xl">{p.emoji}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{p.name}</h3>
                <p className="text-purple-600 font-bold mb-3">${p.price}</p>
                <Link href="/ai-designer" className="block text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 text-sm font-semibold">
                  Customize with AI
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
   }
