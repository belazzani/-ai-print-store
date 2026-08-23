'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const products = [
  { id: 'tshirt', name: 'T-Shirt', price: 24.99, type: 'tee', apparel: true },
  { id: 'hoodie', name: 'Hoodie', price: 44.99, type: 'hoodie', apparel: true },
  { id: 'mug', name: 'Mug', price: 14.99, type: 'mug', apparel: false },
  { id: 'phone', name: 'Mobile Cover', price: 19.99, type: 'phone', apparel: false },
  { id: 'poster', name: 'Poster', price: 12.99, type: 'poster', apparel: false },
]

const colors = [
  { name: 'White', hex: '#ffffff' },
  { name: 'Black', hex: '#1f2937' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Green', hex: '#16a34a' },
  { name: 'Yellow', hex: '#facc15' },
]

const sizes = ['S', 'M', 'L', 'XL', '2XL']
const fonts = ['Arial', 'Georgia', 'Impact', 'Courier New', 'Comic Sans MS']

const areas = {
  'tee-front': { l: 35, t: 35, w: 30, h: 37 },
  'tee-back': { l: 35, t: 33, w: 30, h: 40 },
  'hoodie-front': { l: 35, t: 42, w: 30, h: 30 },
  'hoodie-back': { l: 35, t: 40, w: 30, h: 33 },
  'mug': { l: 32, t: 37, w: 37, h: 33 },
  'phone': { l: 37, t: 27, w: 27, h: 50 },
  'poster': { l: 20, t: 17, w: 60, h: 66 },
}

const emptyLayer = { url: null, x: 20, y: 15, w: 60, text: '', textSize: 16, textColor: '#ffffff', font: 'Arial', tx: 25, ty: 80 }

function Mock({ type, back, color }) {
  const s = '#00000030'
  if (type === 'tee' || type === 'hoodie') {
    return (
      <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full">
        <path d="M95 45 L65 58 L28 92 L52 120 L75 102 L75 275 L225 275 L225 102 L248 120 L272 92 L235 58 L205 45 C205 45 192 62 150 62 C108 62 95 45 95 45 Z" fill={color} stroke={s} strokeWidth="2" />
        {type === 'hoodie' && <path d="M110 48 C110 22 190 22 190 48 C190 60 170 68 150 68 C130 68 110 60 110 48 Z" fill={color} stroke={s} strokeWidth="2" />}
        {!back && type === 'tee' && <path d="M125 45 C125 58 175 58 175 45" fill="none" stroke={s} strokeWidth="3" />}
        {type === 'hoodie' && <rect x="115" y="225" width="70" height="40" rx="8" fill="#00000015" />}
      </svg>
    )
  }
  if (type === 'mug') return (
    <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full">
      <path d="M215 120 C258 120 258 200 215 200" fill="none" stroke={color} strokeWidth="16" />
      <rect x="80" y="90" width="140" height="150" rx="14" fill={color} stroke={s} strokeWidth="2" />
      <ellipse cx="150" cy="90" rx="70" ry="12" fill="#00000020" />
    </svg>
  )
  if (type === 'phone') return (
    <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full">
      <rect x="100" y="40" width="100" height="210" rx="20" fill={color} stroke={s} strokeWidth="2" />
      <circle cx="150" cy="62" r="7" fill="#00000035" />
    </svg>
  )
  return (
    <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full">
      <rect x="50" y="40" width="200" height="220" fill={color} stroke={s} strokeWidth="2" />
    </svg>
  )
}

export default function CustomizePage() {
  const [productId, setProductId] = useState('tshirt')
  const [colorHex, setColorHex] = useState('#1f2937')
  const [size, setSize] = useState('M')
  const [back, setBack] = useState(false)
  const [layers, setLayers] = useState({})
  const [selected, setSelected] = useState('design')
  const [added, setAdded] = useState(false)

  const printRef = useRef(null)
  const drag = useRef(null)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('aiprint_design') || 'null')
      if (saved && saved.designUrl) {
        setLayers((prev) => ({ ...prev, 'tee-front': { ...(prev['tee-front'] || emptyLayer), url: saved.designUrl } }))
      }
    } catch (e) {}
  }, [])

  const product = products.find((p) => p.id === productId)
  const areaKey = product.apparel ? product.type + (back ? '-back' : '-front') : product.type
  const area = areas[areaKey] || areas['poster']
  const layer = layers[areaKey] || emptyLayer

  const setLayer = (patch) => setLayers((prev) => ({ ...prev, [areaKey]: { ...(prev[areaKey] || emptyLayer), ...patch } }))

  const startDrag = (e, kind) => {
    e.stopPropagation()
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch (err) {}
    const rect = printRef.current.getBoundingClientRect()
    drag.current = { kind, sx: e.clientX, sy: e.clientY, ox: kind === 'design' ? layer.x : layer.tx, oy: kind === 'design' ? layer.y : layer.ty, rect }
    setSelected(kind)
  }

  const startResize = (e) => {
    e.stopPropagation()
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch (err) {}
    const rect = printRef.current.getBoundingClientRect()
    drag.current = { kind: 'resize', sx: e.clientX, ow: layer.w, rect }
  }

  const onMove = (e) => {
    const d = drag.current
    if (!d) return
    const dx = ((e.clientX - d.sx) / d.rect.width) * 100
    const dy = ((e.clientY - d.sy) / d.rect.height) * 100
    if (d.kind === 'design') setLayer({ x: d.ox + dx, y: d.oy + dy })
    else if (d.kind === 'text') setLayer({ tx: d.ox + dx, ty: d.oy + dy })
    else setLayer({ w: Math.min(100, Math.max(10, d.ow + dx * 1.5)) })
  }

  const endDrag = () => { drag.current = null }

  const onUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setLayer({ url: reader.result })
    reader.readAsDataURL(file)
  }

  const addToCart = () => {
    let cart = []
    try { cart = JSON.parse(localStorage.getItem('aiprint_cart') || '[]') } catch (e) {}
    cart.push({ id: product.id, name: product.name, price: product.price, color: colors.find((c) => c.hex === colorHex).name, size: product.apparel ? size : 'One size', designUrl: layer.url, text: layer.text })
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

      <section className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-center mb-4">Product Customizer</h1>

        {product.apparel && (
          <div className="flex gap-2 justify-center mb-4">
            <button onClick={() => setBack(false)} className={`px-6 py-2 rounded-full text-sm font-semibold ${!back ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'}`}>Front print</button>
            <button onClick={() => setBack(true)} className={`px-6 py-2 rounded-full text-sm font-semibold ${back ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'}`}>Back print</button>
          </div>
        )}

        <div className="relative bg-white rounded-2xl shadow-lg aspect-square mb-4 overflow-hidden" onPointerMove={onMove} onPointerUp={endDrag}>
          <Mock type={product.type} back={back} color={colorHex} />
          <div ref={printRef} className="absolute border-2 border-dashed border-cyan-400 overflow-hidden" style={{ left: area.l + '%', top: area.t + '%', width: area.w + '%', height: area.h + '%' }}>
            {layer.url && (
              <div className="absolute touch-none cursor-move select-none" style={{ left: layer.x + '%', top: layer.y + '%', width: layer.w + '%' }} onPointerDown={(e) => startDrag(e, 'design')}>
                <img src={layer.url} alt="design" className="w-full pointer-events-none" draggable={false} />
                {selected === 'design' && (
                  <>
                    <button onPointerDown={(e) => e.stopPropagation()} onClick={() => setLayer({ url: null })} className="absolute -top-3 -right-3 w-7 h-7 bg-red-500 text-white rounded-full text-sm font-bold">✕</button>
                    <div onPointerDown={startResize} className="absolute -bottom-2 -right-2 w-5 h-5 bg-cyan-400 rounded-full touch-none"></div>
                  </>
                )}
              </div>
            )}
            {layer.text && (
              <div className="absolute touch-none cursor-move select-none whitespace-nowrap font-bold" style={{ left: layer.tx + '%', top: layer.ty + '%', color: layer.textColor, fontSize: layer.textSize, fontFamily: layer.font }} onPointerDown={(e) => startDrag(e, 'text')}>
                {layer.text}
                {selected === 'text' && <button onPointerDown={(e) => e.stopPropagation()} onClick={() => setLayer({ text: '' })} className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold">✕</button>}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {products.map((p) => (
              <button key={p.id} onClick={() => setProductId(p.id)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold ${productId === p.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{p.name}</button>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            {colors.map((c) => (
              <button key={c.name} onClick={() => setColorHex(c.hex)} className={`w-9 h-9 rounded-full border-2 ${colorHex === c.hex ? 'border-purple-600 scale-110' : 'border-gray-300'}`} style={{ backgroundColor: c.hex }}></button>
            ))}
            {product.apparel && (
              <div className="flex gap-1 ml-auto">
                {sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`px-3 py-1 rounded-lg text-xs font-semibold ${size === s ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}</button>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            <label className="bg-purple-50 text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer">📤 Upload design
              <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
            </label>
          </div>

          <div>
            <p className="font-bold mb-1">Add Text</p>
            <input value={layer.text} onChange={(e) => setLayer({ text: e.target.value })} placeholder="Type your text..." className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-purple-500 outline-none" />
            <div className="flex gap-2 mt-2 flex-wrap items-center">
              <select value={layer.font} onChange={(e) => setLayer({ font: e.target.value })} className="border-2 border-gray-200 rounded-lg p-2 text-sm">
                {fonts.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
              <input type="range" min="10" max="32" value={layer.textSize} onChange={(e) => setLayer({ textSize: Number(e.target.value) })} className="flex-1 accent-purple-600" />
              {['#ffffff', '#111111', '#dc2626', '#facc15', '#2563eb'].map((c) => (
                <button key={c} onClick={() => setLayer({ textColor: c })} className={`w-7 h-7 rounded-full border-2 ${layer.textColor === c ? 'border-purple-600' : 'border-gray-300'}`} style={{ backgroundColor: c }}></button>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 flex items-center justify-between">
            <div>
              <p className="font-bold">{product.name} {product.apparel ? '- ' + size : ''}</p>
              <p className="text-purple-600 font-bold">${product.price}</p>
            </div>
            <button onClick={addToCart} className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700">{added ? '✓ Added' : '🛒 Add to Cart'}</button>
          </div>
        </div>
      </section>
    </div>
  )
}
