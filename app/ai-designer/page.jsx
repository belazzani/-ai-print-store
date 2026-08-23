'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const products = [
  { id: 'tshirt', name: 'Classic T-Shirt', emoji: '👕', price: 24.99 },
  { id: 'hoodie', name: 'Hoodie', emoji: '🧥', price: 44.99 },
  { id: 'mug', name: 'Ceramic Mug', emoji: '☕', price: 14.99 },
  { id: 'phone', name: 'Mobile Cover', emoji: '📱', price: 19.99 },
  { id: 'poster', name: 'Poster', emoji: '🖼️', price: 12.99 },
  { id: 'tote', name: 'Tote Bag', emoji: '👜', price: 19.99 },
]

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

export default function DesignStudio() {
  const [tab, setTab] = useState('ai')
  const [prompt, setPrompt] = useState('')
  const [designs, setDesigns] = useState([])
  const [designUrl, setDesignUrl] = useState(null)
  const [productId, setProductId] = useState('tshirt')
  const [added, setAdded] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('aiprint_design') || 'null')
      if (saved) {
        setDesignUrl(saved.designUrl)
        setProductId(saved.productId || 'tshirt')
        setPrompt(saved.prompt || '')
      }
      const cart = JSON.parse(localStorage.getItem('aiprint_cart') || '[]')
      setCartCount(cart.length)
    } catch (e) {}
  }, [])

  const saveDesign = (url, pid, pr) => {
    setDesignUrl(url)
    setAdded(false)
    try {
      localStorage.setItem('aiprint_design', JSON.stringify({ designUrl: url, productId: pid, prompt: pr }))
    } catch (e) {}
  }

  const generate = () => {
    if (!prompt.trim()) return
    const base = encodeURIComponent(prompt + ', high quality print design')
    const keywords = prompt.split(' ').filter((w) => w.length > 3).slice(0, 3).join(',') || 'art'
    setDesigns(
      [0, 1, 2, 3].map((i) => ({
        id: i,
        gradient: gradients[i],
        url: 'https://image.pollinations.ai/prompt/' + base + '?seed=' + (Date.now() % 100000 + i) + '&width=512&height=512',
        fallback: 'https://loremflickr.com/512/512/' + keywords + '?lock=' + (i + 1),
      }))
    )
  }

  const onUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => saveDesign(reader.result, productId, prompt)
    reader.readAsDataURL(file)
  }

  const addToCart = () => {
    const item = products.find((p) => p.id === productId)
    let cart = []
    try { cart = JSON.parse(localStorage.getItem('aiprint_cart') || '[]') } catch (e) {}
    cart.push({ id: item.id, name: item.name, price: item.price, designUrl: designUrl })
    try { localStorage.setItem('aiprint_cart', JSON.stringify(cart)) } catch (e) {}
    setCartCount(cart.length)
    setAdded(true)
  }

  const product = products.find((p) => p.id === productId)

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-600">AI-Print</Link>
          <div className="flex items-center gap-4">
            <Link href="/products" className="text-purple-600 font-semibold text-sm">Browse Products</Link>
            <span className="relative text-2xl">🛒
              <span className="absolute -top-2 -right-3 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
            </span>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Design Studio</h1>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab('ai')} className={`flex-1 py-3 rounded-xl font-semibold ${tab === 'ai' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'}`}>✨ AI Generate</button>
          <button onClick={() => setTab('upload')} className={`flex-1 py-3 rounded-xl font-semibold ${tab === 'upload' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'}`}>📤 Upload Design</button>
        </div>

        {tab === 'ai' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your design..." className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-purple-500 outline-none resize-none" rows={2}></textarea>
            <div className="flex flex-wrap gap-2 mt-3 mb-4">
              {examplePrompts.map((ex) => (
                <button key={ex} onClick={() => setPrompt(ex)} className="text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded-full hover:bg-purple-100">{ex}</button>
              ))}
            </div>
            <button onClick={generate} disabled={!prompt.trim()} className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 disabled:bg-gray-300">Generate Designs</button>
          </div>
        )}

        {tab === 'ai' && designs.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {designs.map((d) => (
              <button key={d.id} onClick={() => saveDesign(d.url, productId, prompt)} className={`bg-gradient-to-br ${d.gradient} aspect-square rounded-xl overflow-hidden relative flex items-center justify-center ${designUrl === d.url ? 'ring-4 ring-purple-600' : ''}`}>
                <span className="absolute text-3xl animate-pulse">⏳</span>
                <img src={d.url} alt="AI design" onError={(e) => { if (e.currentTarget.src !== d.fallback) e.currentTarget.src = d.fallback }} className="relative w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {tab === 'upload' && (
          <label className="block cursor-pointer border-2 border-dashed border-purple-300 bg-white rounded-2xl p-8 text-center mb-6 hover:bg-purple-50">
            <span className="text-5xl block mb-2">📤</span>
            <span className="font-semibold text-purple-600 block">Upload your own design</span>
            <span className="text-sm text-gray-500">From your phone or computer (PNG, JPG)</span>
            <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
          </label>
        )}

        {designUrl && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Your Product Preview</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
              {products.map((p) => (
                <button key={p.id} onClick={() => { setProductId(p.id); saveDesign(designUrl, p.id, prompt) }} className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold ${productId === p.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{p.emoji} {p.name}</button>
              ))}
            </div>
            <div className="relative bg-gray-100 rounded-2xl aspect-square flex items-center justify-center overflow-hidden mb-4">
              <span className="text-[120px] opacity-40">{product.emoji}</span>
              <img src={designUrl} alt="Your design on product" className="absolute w-1/2 h-1/2 object-cover rounded-lg shadow-lg" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold">{product.name}</p>
                <p className="text-purple-600 font-bold">${product.price}</p>
              </div>
              <p className="text-xs text-green-600 font-semibold">✅ Saved - survives refresh</p>
            </div>
            <button onClick={addToCart} className="w-full bg-green-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-green-700">{added ? '✓ Added to Cart' : '🛒 Add to Cart'}</button>
          </div>
        )}
      </section>
    </div>
  )
}
