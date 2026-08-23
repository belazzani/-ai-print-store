'use client'

import { useState } from 'react'
import Link from 'next/link'

const examplePrompts = [
  'Cute cat wearing sunglasses in space',
  'Vintage sunset with palm trees',
  'Minimalist mountain logo',
  'Funny coffee quote',
]

const gradients = [
  'from-purple-400 via-pink-400 to-red-400',
  'from-blue-400 via-cyan-400 to-teal-400',
  'from-green-400 via-lime-400 to-yellow-400',
  'from-orange-400 via-amber-400 to-yellow-400',
]

export default function AIDesignerPage() {
  const [prompt, setPrompt] = useState('')
  const [designs, setDesigns] = useState(null)
  const [selected, setSelected] = useState(null)
  const [added, setAdded] = useState(false)
  const [loadingImgs, setLoadingImgs] = useState(0)

  const generate = () => {
    if (!prompt.trim()) return
    const base = encodeURIComponent(prompt + ', high quality print design')
    setDesigns(
      [0, 1, 2, 3].map((i) => ({
        id: i,
        gradient: gradients[i],
        url: 'https://image.pollinations.ai/prompt/' + base + '?seed=' + (Date.now() % 100000 + i) + '&width=512&height=512&nologo=true',
      }))
    )
    setLoadingImgs(4)
    setSelected(null)
    setAdded(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-600">AI-Print</Link>
          <Link href="/products" className="text-purple-600 font-semibold text-sm">Browse Products</Link>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">AI Design Studio</h1>
        <p className="text-center text-gray-600 mb-8">Describe your idea and let AI create unique designs for your products</p>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your design... e.g. A cute cat wearing sunglasses in space"
            className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-purple-500 outline-none resize-none"
            rows={3}
          ></textarea>
          <div className="flex flex-wrap gap-2 mt-3 mb-4">
            {examplePrompts.map((ex) => (
              <button
                key={ex}
                onClick={() => setPrompt(ex)}
                className="text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded-full hover:bg-purple-100"
              >
                {ex}
              </button>
            ))}
          </div>
          <button
            onClick={generate}
            disabled={!prompt.trim()}
            className="w-full bg-purple-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300"
          >
            Generate Designs
          </button>
        </div>

        {designs && (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center">Your AI Designs</h2>
            <p className="text-center text-sm text-gray-500 mb-6">
              {loadingImgs > 0 ? 'AI is drawing... wait up to 30 seconds' : 'Tap a design to select it'}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {designs.map((d) => (
                <button
                  key={d.id}
                  onClick={() => { setSelected(d.id); setAdded(false) }}
                  className={`bg-gradient-to-br ${d.gradient} aspect-square rounded-2xl overflow-hidden relative transition ${
                    selected === d.id ? 'ring-4 ring-purple-600 scale-95' : 'hover:scale-105'
                  }`}
                >
                  <img
                    src={d.url}
                    alt="AI design"
                    onLoad={() => setLoadingImgs((n) => n - 1)}
                    onError={() => setLoadingImgs((n) => n - 1)}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {selected !== null && (
              <div className="text-center">
                <button
                  onClick={() => setAdded(true)}
                  className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700"
                >
                  {added ? 'Added to Cart (Demo)' : 'Add to Cart'}
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
