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
  'from-indigo-400 via-purple-400 to-pink-400',
  'from-rose-400 via-fuchsia-400 to-indigo-400',
]

const emojis = ['🎨', '✨', '🌟', '']

export default function AIDesignerPage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [designs, setDesigns] = useState(null)
  const [selected, setSelected] = useState(null)
  const [added, setAdded] = useState(false)

  const generate = () => {
    if (!prompt.trim()) return
    setLoading(true)
    setDesigns(null)
    setSelected(null)
    setAdded(false)
    setTimeout(() => {
      const seed = prompt.length
      setDesigns(
        [0, 1, 2, 3].map((i) => ({
          id: i,
          gradient: gradients[(seed + i) % gradients.length],
          emoji: emojis[i],
        }))
      )
      setLoading(false)
    }, 2000)
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
            disabled={loading || !prompt.trim()}
            className="w-full bg-purple-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300"
          >
            {loading ? 'AI is creating your designs...' : 'Generate Designs'}
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="text-6xl animate-bounce mb-4">🎨</div>
            <p className="text-gray-600">AI is painting your idea...</p>
          </div>
        )}

        {designs && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Your AI Designs</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {designs.map((d) => (
                <button
                  key={d.id}
                  onClick={() => { setSelected(d.id); setAdded(false) }}
                  className={`bg-gradient-to-br ${d.gradient} aspect-square rounded-2xl flex items-center justify-center text-6xl transition ${
                    selected === d.id ? 'ring-4 ring-purple-600 scale-95' : 'hover:scale-105'
                  }`}
                >
                  {d.emoji}
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
