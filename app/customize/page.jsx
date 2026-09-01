'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const IMG = 'https://raw.githubusercontent.com/belazzani/-ai-print-store/main/'

const products = [
  { id: 'tshirt-white', name: 'White Tee', img: 'tshirt-white.png', price: 24.99, apparel: true, area: { l: 38, t: 28, w: 24, h: 36 } },
  { id: 'tshirt-black', name: 'Black Tee', img: 'tshirt-black2.png', price: 24.99, apparel: true, area: { l: 38, t: 28, w: 24, h: 36 } },
  { id: 'tshirt-navy', name: 'Navy Tee', img: 'tshirt-navy.png', price: 24.99, apparel: true, area: { l: 38, t: 28, w: 24, h: 36 } },
  { id: 'hoodie', name: 'Hoodie', img: 'hoodie-gray.png', price: 44.99, apparel: true, area: { l: 37, t: 32, w: 26, h: 30 } },
  { id: 'sweatshirt', name: 'Sweatshirt', img: 'sweatshirt-dark.png', price: 39.99, apparel: true, area: { l: 36, t: 30, w: 28, h: 34 } },
  { id: 'tank', name: 'Tank Top', img: 'tank-white.png', price: 19.99, apparel: true, area: { l: 40, t: 28, w: 20, h: 36 } },
  { id: 'longsleeve', name: 'Long Sleeve', img: 'longsleeve-white.png', price: 27.99, apparel: true, area: { l: 39, t: 26, w: 22, h: 36 } },
  { id: 'kids', name: 'Kids Tee', img: 'kids-tee.png', price: 18.99, apparel: true, area: { l: 37, t: 32, w: 26, h: 32 } },
  { id: 'onesie', name: 'Baby Onesie', img: 'baby-onesie.png', price: 16.99, apparel: true, area: { l: 40, t: 25, w: 20, h: 28 } },
  { id: 'mug11', name: 'Mug 11oz', img: 'mug-15.png', price: 14.99, apparel: false, area: { l: 35, t: 28, w: 28, h: 45 } },
  { id: 'mug15', name: 'Mug 15oz', img: 'mug-15.png', price: 17.99, apparel: false, area: { l: 35, t: 28, w: 28, h: 45 } },
  { id: 'phone', name: 'Mobile Cover', img: 'phone-case.png', price: 19.99, apparel: false, area: { l: 40, t: 28, w: 20, h: 60 } },
  { id: 'tote', name: 'Tote Bag', img: 'tote.png', price: 19.99, apparel: false, area: { l: 35, t: 38, w: 30, h: 40 } },
  { id: 'poster', name: 'Poster', img: 'poster.png', price: 12.99, apparel: false, area: { l: 40, t: 16, w: 24, h: 66 } },
  { id: 'canvas', name: 'Canvas', img: 'canvas.png', price: 34.99, apparel: false, area: { l: 36, t: 20, w: 30, h: 58 } },
  { id: 'pillow', name: 'Pillow', img: 'pillow.png', price: 24.99, apparel: false, area: { l: 33, t: 22, w: 34, h: 55 } },
  { id: 'blanket', name: 'Blanket', img: 'blanket.png', price: 49.99, apparel: false, area: { l: 25, t: 25, w: 50, h: 25 } },
  { id: 'towel', name: 'Towel', img: 'towel.png', price: 29.99, apparel: false, area: { l: 30, t: 28, w: 40, h: 28 } },
  { id: 'stickers', name: 'Stickers', img: 'stickers.png', price: 4.99, apparel: false, area: { l: 36, t: 22, w: 26, h: 55 } },
  { id: 'cap', name: 'Cap', img: 'cap.png', price: 22.99, apparel: false, area: { l: 38, t: 28, w: 16, h: 14 } },
  { id: 'beanie', name: 'Beanie', img: 'beanie.png', price: 20.99, apparel: false, area: { l: 40, t: 44, w: 18, h: 14 } },
  { id: 'socks', name: 'Socks', img: 'socks.png', price: 12.99, apparel: false, area: { l: 35, t: 25, w: 30, h: 35 } },
]

const sizes = ['S', 'M', 'L', 'XL', '2XL']
const fonts = ['Arial', 'Georgia', 'Impact', 'Courier New', 'Comic Sans MS']
const emptyLayer = { url: null, x: 20, y: 15, w: 60, text: '', textSize: 16, textColor: '#ffffff', font: 'Arial', tx: 25, ty: 80 }

export default function CustomizePage() {
  const [productId, setProductId] = useState('tshirt-black')
  const [size, setSize] = useState('M')
  const [layers, setLayers] = useState({})
  const [selected, setSelected] = useState('design')
  const [added, setAdded] = useState(false)
  const [calibrate, setCalibrate] = useState(false)
  const [areas, setAreas] = useState(() => {
    const base = {}
    try {
      const saved = JSON.parse(localStorage.getItem('aiprint_areas') || '{}')
      products.forEach((p) => { base[p.id] = saved[p.id] || p.area })
    } catch (e) {
      products.forEach((p) => { base[p.id] = p.area })
    }
    return base
  })

  const printRef = useRef(null)
  const drag = useRef(null)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('aiprint_design') || 'null')
      if (saved && saved.designUrl) {
        setLayers((prev) => ({ ...prev, 'tshirt-black': { ...(prev['tshirt-black'] || emptyLayer), url: saved.designUrl } }))
      }
    } catch (e) {}
  }, [])

  const product = products.find((p) => p.id === productId)
  const area = areas[productId] || product.area
  const layer = layers[productId] || emptyLayer

  const setLayer = (patch) => setLayers((prev) => ({ ...prev, [productId]: { ...(prev[productId] || emptyLayer), ...patch } }))

  const setArea = (key, value) => {
    setAreas((prev) => {
      const next = { ...prev, [productId]: { ...prev[productId], [key]: value } }
      try { localStorage.setItem('aiprint_areas', JSON.stringify(next)) } catch (e) {}
      return next
    })
  }

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
    cart.push({ id: product.id, name: product.name, price: product.price, size: product.apparel ? size : 'One size', designUrl: layer.url, text: layer.text })
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

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {products.map((p) => (
            <button key={p.id} onClick={() => setProductId(p.id)} className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold ${productId === p.id ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'}`}>
              <img src={IMG + p.img} alt={p.name} className="w-7 h-7 rounded-full object-cover" />
              {p.name}
            </button>
          ))}
        </div>

        <div className="relative bg-white rounded-2xl shadow-lg aspect-square mb-4 overflow-hidden" onPointerMove={onMove} onPointerUp={endDrag}>
          <img src={IMG + product.img} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
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
          <button onClick={() => setCalibrate(!calibrate)} className={`w-full py-2 rounded-lg text-sm font-semibold ${calibrate ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-600'}`}>⚙️ {calibrate ? 'Calibration Mode: ON' : 'Calibrate Print Area'}</button>

          {calibrate && (
            <div className="bg-cyan-50 rounded-xl p-4 space-y-2">
              <p className="text-xs text-cyan-700 font-semibold mb-1">حرّك المنزلقات حتى يطابق الإطار المتقطع سطح الطباعة — يُحفظ تلقائياً 💾</p>
              <div><p className="text-xs text-gray-600">Left: {area.l}</p><input type="range" min="0" max="80" value={area.l} onChange={(e) => setArea('l', Number(e.target.value))} className="w-full accent-cyan-500" /></div>
              <div><p className="text-xs text-gray-600">Top: {area.t}</p><input type="range" min="0" max="80" value={area.t} onChange={(e) => setArea('t', Number(e.target.value))} className="w-full accent-cyan-500" /></div>
              <div><p className="text-xs text-gray-600">Width: {area.w}</p><input type="range" min="5" max="80" value={area.w} onChange={(e) => setArea('w', Number(e.target.value))} className="w-full accent-cyan-500" /></div>
              <div><p className="text-xs text-gray-600">Height: {area.h}</p><input type="range" min="5" max="80" value={area.h} onChange={(e) => setArea('h', Number(e.target.value))} className="w-full accent-cyan-500" /></div>
            </div>
          )}

          {product.apparel && (
            <div className="flex gap-2">
              {sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${size === s ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}</button>
              ))}
            </div>
          )}

          <label className="inline-block bg-purple-50 text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer">📤 Upload design
            <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
          </label>

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
