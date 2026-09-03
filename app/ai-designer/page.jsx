'use client'

import { useState } from 'react'
import Link from 'next/link'

const IMG = 'https://raw.githubusercontent.com/belazzani/-ai-print-store/main/'

const products = [
  { id: 'tshirt-black', name: 'Black Tee', img: 'tshirt-black2.png', area: { l: 38, t: 28, w: 24, h: 36 } },
  { id: 'tshirt-white', name: 'White Tee', img: 'tshirt-white.png', area: { l: 38, t: 28, w: 24, h: 36 } },
  { id: 'hoodie', name: 'Hoodie', img: 'hoodie-gray.png', area: { l: 37, t: 32, w: 26, h: 30 } },
  { id: 'mug15', name: 'Mug', img: 'mug-15.png', area: { l: 35, t: 28, w: 28, h: 45 } },
  { id: 'phone', name: 'Mobile Cover', img: 'phone-case.png', area: { l: 40, t: 28, w: 20, h: 60 } },
  { id: 'tote', name: 'Tote Bag', img: 'tote.png', area: { l: 35, t: 38, w: 30, h: 40 } },
  { id: 'poster', name: 'Poster', img: 'poster.png', area: { l: 40, t: 16, w: 24, h: 66 } },
  { id: 'pillow', name: 'Pillow', img: 'pillow.png', area: { l: 33, t: 22, w: 34, h: 55 } },
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

export default function StudioPage() {
  const [tab, setTab] = useState('ai')
  const [prompt, setPrompt] = useState('')
  const [designs, setDesigns] = useState([])
  const [designUrl, setDesignUrl] = useState(null)
  const [previewId, setPreviewId] = useState('tshirt-black')

  const preview = products.find((p) => p.id === previewId)

  const selectDesign = (url) => {
    setDesignUrl(url)
    try { localStorage.setItem('aiprint_design', JSON.stringify({ designUrl: url })) } catch (e) {}
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
    reader.onload = () => selectDesign(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-600">AI-Print</Link>
          <Link href="/products" className="text-purple-600 font-semibold text-sm">Browse Products</Link>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">AI Design Studio</h1>

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

        {tab === 'upload' && (
          <label className="block cursor-pointer border-2 border-dashed border-purple-300 bg-white rounded-2xl p-8 text-center mb-6 hover:bg-purple-50">
            <span className="text-5xl block mb-2">📤</span>
            <span className="font-semibold text-purple-600 block">Upload your own design</span>
            <span className="text-sm text-gray-500">From your phone or computer (PNG, JPG)</span>
            <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
          </label>
        )}

        {tab === 'ai' && designs.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {designs.map((d) => (
              <button key={d.id} onClick={() => selectDesign(d.url)} className={`bg-gradient-to-br ${d.gradient} aspect-square rounded-xl overflow-hidden relative flex items-center justify-center ${designUrl === d.url ? 'ring-4 ring-purple-600' : ''}`}>
                <span className="absolute text-3xl animate-pulse">⏳</span>
                <img src={d.url} alt="AI design" onError={(e) => { if (e.currentTarget.src !== d.fallback) e.currentTarget.src = d.fallback }} className="relative w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {designUrl && (
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h2 className="text-xl font-bold mb-3">ضعه على منتج</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
              {products.map((p) => (
                <button key={p.id} onClick={() => setPreviewId(p.id)} className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold ${previewId === p.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  <img src={IMG + p.img} alt={p.name} className="w-7 h-7 rounded-full object-cover" />
                  {p.name}
                </button>
              ))}
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
              <img src={IMG + preview.img} alt={preview.name} className="absolute inset-0 w-full h-full object-cover" />
              <img src={designUrl} alt="preview" className="absolute" style={{ left: preview.area.l + preview.area.w * 0.15 + '%', top: preview.area.t + preview.area.h * 0.15 + '%', width: preview.area.w * 0.7 + '%' }} />
            </div>
            <Link href="/customize" className="block text-center bg-purple-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-purple-700">🎨 فتح المحرر للتحكم الكامل</Link>
          </div>
        )}
      </section>
    </div>
  )
}
