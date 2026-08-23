import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-purple-600">AI-Print</div>
            <div className="hidden md:flex space-x-8">
              <Link href="/products" className="text-gray-700 hover:text-purple-600">Products</Link>
              <Link href="/ai-designer" className="text-gray-700 hover:text-purple-600">AI Designer</Link>
              <Link href="/about" className="text-gray-700 hover:text-purple-600">About</Link>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-700 hover:text-purple-600">Sign In</button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Get Started</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Create Custom Products with AI</h1>
              <p className="text-xl text-gray-600 mb-8">Describe your design idea and let AI bring it to life. Print on t-shirts, mugs, posters and more.</p>
              <div className="flex space-x-4">
                <Link href="/ai-designer" className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 shadow-lg">Start Designing</Link>
                <Link href="/products" className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-50">Browse Products</Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-4">
                <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold">✨ AI-Powered Design</span>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <p className="text-gray-600 italic">"A cute cat wearing sunglasses in space"</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg aspect-square"></div>
                <div className="bg-gradient-to-br from-pink-400 to-red-500 rounded-lg aspect-square"></div>
                <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg aspect-square"></div>
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg aspect-square"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose AI-Print?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon="🤖" title="AI-Powered Design" description="Describe your idea in words and let AI create stunning designs for you" />
            <FeatureCard icon="🚀" title="Fast Worldwide Shipping" description="Get your custom products delivered to your doorstep globally" />
            <FeatureCard icon="🎨" title="20+ Products" description="T-shirts, mugs, posters, phone cases and much more" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Something Amazing?</h2>
          <p className="text-xl text-purple-100 mb-8">Start designing with AI today and get your custom products</p>
          <Link href="/ai-designer" className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 shadow-lg">Try AI Designer Free</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">AI-Print</h3>
          <p className="text-gray-400 mb-8">Create custom products with the power of AI</p>
          <p className="text-gray-500 text-sm">© 2026 AI-Print. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
            }
