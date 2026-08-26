import Link from 'next/link'

const IMG = 'https://raw.githubusercontent.com/belazzani/-ai-print-store/main/'

const products = [
  { id: 1, name: 'Classic T-Shirt', img: 'tshirt-white.png', price: 24.99, badge: 'Best Seller' },
  { id: 2, name: 'Black T-Shirt', img: '1787774395.png', price: 24.99, badge: 'Best Seller' },
  { id: 3, name: 'Navy T-Shirt', img: 'tshirt-navy.png', price: 24.99, badge: null },
  { id: 4, name: 'Hoodie', img: 'hoodie-gray.png', price: 44.99, badge: 'Best Seller' },
  { id: 5, name: 'Sweatshirt', img: 'sweatshirt-dark.png', price: 39.99, badge: null },
  { id: 6, name: 'Tank Top', img: 'tank-white.png', price: 19.99, badge: null },
  { id: 7, name: 'Long Sleeve Tee', img: 'longsleeve-white.png', price: 27.99, badge: null },
  { id: 8, name: 'Kids Tee', img: 'kids-tee.png', price: 18.99, badge: null },
  { id: 9, name: 'Baby Onesie', img: 'baby-onesie.png', price: 16.99, badge: null },
  { id: 10, name: 'Ceramic Mug 11oz', img: 'mug-15.png', price: 14.99, badge: 'Best Seller' },
  { id: 11, name: 'Large Mug 15oz', img: 'mug-15.png', price: 17.99, badge: null },
  { id: 12, name: 'Mobile Cover', img: 'phone-case.png', price: 19.99, badge: 'Best Seller' },
  { id: 13, name: 'Tote Bag', img: 'tote.png', price: 19.99, badge: null },
  { id: 14, name: 'Poster', img: 'poster.png', price: 12.99, badge: null },
  { id: 15, name: 'Canvas Print', img: 'canvas.png', price: 34.99, badge: null },
  { id: 16, name: 'Throw Pillow', img: 'pillow.png', price: 24.99, badge: null },
  { id: 17, name: 'Blanket', img: 'blanket.png', price: 49.99, badge: null },
  { id: 18, name: 'Towel', img: 'towel.png', price: 29.99, badge: null },
  { id: 19, name: 'Stickers Pack', img: 'stickers.png', price: 4.99, badge: null },
  { id: 20, name: 'Cap', img: 'cap.png', price: 22.99, badge: null },
  { id: 21, name: 'Beanie', img: 'beanie.png', price: 20.99, badge: null },
  { id: 22, name: 'Socks', img: 'socks.png', price: 12.99, badge: null },
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
                <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full z-10">🔥 {p.badge}</span>
              )}
              <div className="aspect-square bg-gray-100">
                <img src={IMG + p.img} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{p.name}</h3>
                <p className="text-purple-600 font-bold mb-3">${p.price}</p>
                <Link href="/customize" className="block text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 text-sm font-semibold">Customize</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
