'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const products = [
  { id: 'tshirt', name: 'Classic T-Shirt', price: 24.99, type: 'tee', sizes: true },
  { id: 'hoodie', name: 'Hoodie', price: 44.99, type: 'hoodie', sizes: true },
  { id: 'mug', name: 'Ceramic Mug', price: 14.99, type: 'mug', sizes: false },
  { id: 'phone', name: 'Mobile Cover', price: 19.99, type: 'phone', sizes: false },
  { id: 'poster', name: 'Poster', price: 12.99, type: 'poster', sizes: false },
  { id: 'tote', name: 'Tote Bag', price: 19.99, type: 'tote', sizes: true },
]

const colors = [
  { name: 'White', hex: '#ffffff' },
  { name: 'Black', hex: '#1f2937' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Green', hex: '#16a34a' },
  { name: 'Yellow', hex: '#facc15' },
  { name: 'Purple', hex: '#9333ea' },
  { name: 'Pink', hex: '#ec4899' },
]

const sizes = ['S', 'M', 'L', 'XL', '2XL']

const printAreas = {
  tee: { x: 105, y: 105, w: 90, h: 110 },
  hoodie: { x: 105, y: 125, w: 90, h: 95 },
  mug: { x: 95, y: 110, w: 110, h: 100 },
  phone: { x: 110, y: 80, w: 80, h: 150 },
  poster: { x: 60, y: 50, w: 180, h: 200 },
  tote: { x: 100, y: 110, w: 100, h: 110 },
}

function ProductBase({ type, color }) {
  const stroke = '#00000030'
  if (type === 'tee') return <path d="M95 45 L65 58 L28 92 L52 120 L75 102 L75 275 L225 275 L225 102 L248 120 L272 92 L235 58 L205 45 C205 45 192 62 150 62 C108 62 95 45 95 45 Z" fill={color} stroke={stroke} strokeWidth="2" />
  if (type === 'hoodie') return (
    <g>
      <path d="M95 50 L65 62 L28 96 L52 124 L75 106 L75 275 L225 275 L225 106 L248 124 L272 96 L235 62 L205 50 C205 50 192 66 150 66 C108 66 95 50 95 50 Z" fill={color} stroke={stroke} strokeWidth="2" />
      <path d="M110 50 C110 25 190 25 190 50 C190 62 170 70 150 70 C130 70 110 62 110 50 Z" fill={color} stroke={stroke} strokeWidth="2" />
      <rect x="115" y="225" width="70" height="40" rx="8" fill="#00000015" />
    </g>
  )
  if (type === 'mug') return (
    <g>
      <path d="M215 120 C258 120 258 200 215 200" fill="none" stroke={color} strokeWidth="16" />
      <rect x="80" y="90" width="140" height="150" rx="14" fill={color} stroke={stroke} strokeWidth="2" />
      <ellipse cx="150" cy="90" rx="70" ry="12" fill="#00000020" />
    </g>
  )
  if (type === 'phone') return (
    <g>
      <rect x="100" y="40" width="100" height="210" rx="20" fill={color} stroke={stroke} strokeWidth="2" />
      <circle cx="150" cy="62" r="7" fill="#00000035" />
    </g>
  )
  if (type === 'poster') return <rect x="50" y="40" width="200" height="220" fill={color} stroke={stroke} strokeWidth="2" />
  return (
    <g>
      <path d="M115 95 C115 60 185 60 185 95" fill="none" stroke={color} strokeWidth="10" />
      <rect x="90" y="95" width="120" height="140" rx="10" fill={color} stroke={stroke} strokeWidth="2" />
    </g>
  )
}

export default function CustomizePage() {
  const [productId, setProductId] = useState('tshirt')
  const [colorHex, setColorHex] = useState('#ffffff')
  const [size, setSize] = useState('M')
  const [scale, setScale] = useState(0.7)
  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)
  const [text, setText] = useState('')
  const [textColor, setTextColor] = useState('#1f2937')
  const [textSize, setTextSize] = useState(14)
  const [designUrl, setDesignUrl] = useState(null)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('aiprint_design') || 'null')
      if (saved && saved.designUrl) setDesignUrl(saved.designUrl)
    } catch (e) {}
  }, [])

  const product = products.find((p) => p.id === productId)
  const pa = printAreas[product.type]
  const dw = pa.w * scale
  const dx = pa.x + pa.w / 2 - dw / 2 + (posX / 100) * pa.w
  const dy = pa.y + pa.h / 2 - dw / 2 + (posY / 100) * pa.h

  const onUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setDesignUrl(reader.result)
    reader.readAsDataURL(file)
  }

  const addToCart = () => {
    let cart = []
    try { cart = JSON.parse(localStorage.getItem('aiprint_cart') || '[]') } catch (e) {}
    cart.push({ id: product.id, name: product.name, price: product.price, color: colors.find((c) => c.hex === colorHex).name, size: product.sizes ? size : 'One size', designUrl: designUrl, text: text })
    try { localStorage.setItem('aiprint_cart', JSON.stringify(cart)) } catch (e) {}
    setAdded(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-600">AI-Print</Link>
          <Link href="/ai-designer" className="text-purple-600 font-semibold text-sm">Design Studio</Link>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Product Customizer</h1>

        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <svg viewBox="0 0 300 300" className="w-full">
            <defs>
              <clipPath id="printClip">
                <rect x={pa.x} y={pa.y} width={pa.w} height={pa.h} />
              </clipPath>
            </defs>
            <ProductBase type={product.type} color={colorHex} />
            <rect x={pa.x} y={pa.y} width={pa.w} height={pa.h} fill="none" stroke="#00000030" strokeDasharray="4 3" />
            <g clipPath="url(#printClip)">
              {designUrl && <image href={designUrl} x={dx} y={dy} width={dw} height={dw} preserveAspectRatio="xMidYMid slice" />}
              {text && <text x={pa.x + pa.w / 2} y={pa.y + pa.h - 6} textAnchor="middle" fontSize={textSize} fill={textColor} fontWeight="bold">{text}</text>}
            </g>
          </svg>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
          <div>
            <p className="font-bold mb-2">Product</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {products.map((p) => (
                <button key={p.id} onClick={() => setProductId(p.id)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold ${productId === p.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{p.name}</button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold mb-2">Product Color</p>
            <div className="flex gap-2 flex-wrap">
              {colors.map((c) => (
                <button key={c.name} onClick={() => setColorHex(c.hex)} className={`w-9 h-9 rounded-full border-2 ${colorHex === c.hex ? 'border-purple-600 scale-110' : 'border-gray-300'}`} style={{ backgroundColor: c.hex }} title={c.name}></button>
              ))}
            </div>
          </div>

          {product.sizes && (
            <div>
              <p className="font-bold mb-2">Size</p>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${size === s ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="font-bold mb-2">Design</p>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-purple-600 cursor-pointer">
                <span className="bg-purple-50 px-3 py-2 rounded-lg">📤 Upload design</span>
                <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
              </label>
              <div>
                <p className="text-sm text-gray-600 mb-1">Size: {Math.round(scale * 100)}%</p>
                <input type="range" min="0.2" max="1" step="0.05" value={scale} onChange={(e) => setScale(Number(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Move left / right</p>
                <input type="range" min="-50" max="50" value={posX} onChange={(e) => setPosX(Number(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Move up / down</p>
                <input type="range" min="-50" max="50" value={posY} onChange={(e) => setPosY(Number(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <button onClick={() => setDesignUrl(null)} className="text-red-500 text-sm font-semibold">🗑️ Remove design</button>
            </div>
          </div>

          <div>
            <p className="font-bold mb-2">Add Text</p>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Your text here..." className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-purple-500 outline-none" />
            <div className="flex gap-2 mt-2 flex-wrap">
              {['#1f2937', '#ffffff', '#dc2626', '#2563eb', '#facc15', '#ec4899'].map((c) => (
                <button key={c} onClick={() => setTextColor(c)} className={`w-8 h-8 rounded-full border-2 ${textColor === c ? 'border-purple-600 scale-110' : 'border-gray-300'}`} style={{ backgroundColor: c }}></button>
              ))}
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Text size: {textSize}</p>
              <input type="range" min="8" max="28" value={textSize} onChange={(e) => setTextSize(Number(e.target.value))} className="w-full accent-purple-600" />
            </div>
          </div>

          <div className="border-t pt-4 flex items-center justify-between">
            <div>
              <p className="font-bold">{product.name}</p>
              <p className="text-purple-600 font-bold">${product.price}</p>
            </div>
            <button onClick={addToCart} className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700">{added ? '✓ Added' : '🛒 Add to Cart'}</button>
          </div>
        </div>
      </section>
    </div>
  )
    }
