import React, { useState, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Camera,
  Copy,
  Check,
  Sparkles,
  Share2,
  ShieldCheck,
  Film,
  ArrowRight,
  Info,
} from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

export default function HomePage() {
  const navigate = useNavigate()
  const inputId = useId()
  const [rawInput, setRawInput] = useState('')
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [copiedMessage, setCopiedMessage] = useState(false)

  // Ekstrak slug dari URL our-wedding.link atau kode langsung
  const extractSlug = (input: string): string => {
    const trimmed = input.trim()
    if (!trimmed) return ''

    // Match pola https://our-wedding.link/kamera/:slug atau /kamera/:slug
    const urlMatch = trimmed.match(/\/kamera\/([a-zA-Z0-9_-]+)/i)
    if (urlMatch && urlMatch[1]) {
      return urlMatch[1]
    }

    // Match jika input adalah URL camera.galerinadillaar.com/:slug
    const galeriMatch = trimmed.match(/galerinadillaar\.com\/([a-zA-Z0-9_-]+)/i)
    if (galeriMatch && galeriMatch[1]) {
      return galeriMatch[1]
    }

    // Match jika input adalah URL github.io/camera-galeri-nadillaar/:slug
    const githubMatch = trimmed.match(/camera-galeri-nadillaar\/([a-zA-Z0-9_-]+)/i)
    if (githubMatch && githubMatch[1]) {
      return githubMatch[1]
    }

    // Jika user langsung memasukkan kode unik (misal: 3dpudegf)
    const cleaned = trimmed.replace(/[^a-zA-Z0-9_-]/g, '')
    return cleaned
  }

  const getBrandedUrl = (s: string) => {
    if (!s) return ''
    if (typeof window !== 'undefined') {
      const origin = window.location.origin
      const base = import.meta.env.BASE_URL.replace(/\/$/, '')
      if (origin.includes('github.io') || origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return `${origin}${base}/${s}`
      }
    }
    return `https://camera.galerinadillaar.com/${s}`
  }

  const slug = extractSlug(rawInput)
  const brandedUrl = getBrandedUrl(slug)

  const handleOpenLive = (e: React.FormEvent) => {
    e.preventDefault()
    if (slug) {
      navigate(`/${slug}`)
    }
  }

  const handleCopyUrl = async () => {
    if (!brandedUrl) return
    try {
      await navigator.clipboard.writeText(brandedUrl)
      setCopiedUrl(true)
      setTimeout(() => setCopiedUrl(false), 2200)
    } catch {
      // Fallback
    }
  }

  const handleCopyWhatsapp = async () => {
    if (!brandedUrl) return
    const text = `Halo! Yuk abadikan momen spesial pernikahan kami dengan Kamera Disposable Galeri Nadillaar. Ambil foto unikmu sekarang melalui link ini:\n\n📸 ${brandedUrl}\n\n(Foto akan otomatis tersimpan ke album mempelai!)`
    try {
      await navigator.clipboard.writeText(text)
      setCopiedMessage(true)
      setTimeout(() => setCopiedMessage(false), 2200)
    } catch {
      // Fallback
    }
  }

  const handleUseDemo = (demoSlug: string) => {
    setRawInput(`https://our-wedding.link/kamera/${demoSlug}`)
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.15),rgba(255,255,255,0))] text-[#f4efe6] px-4 py-8 sm:py-16 flex flex-col justify-between">
      <div className="max-w-3xl mx-auto w-full">
        {/* Brand Header */}
        <header className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f5d77f] text-xs font-medium tracking-wider uppercase mb-5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Official Disposable Camera Service</span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-3">
            <img
              src={`${import.meta.env.BASE_URL}icon.png`}
              alt="Galeri Nadillaar Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-contain shadow-lg border border-[#d4af37]/30 p-1 bg-black/40"
            />
            <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight gold-gradient-text">
              Galeri Nadillaar
            </h1>
          </div>

          <p className="text-sm sm:text-base text-[#a8a398] max-w-lg mx-auto font-light leading-relaxed">
            Generator Link Kamera Tamu Branded — Ubah link default kamera menjadi URL eksklusif{' '}
            <span className="text-[#f5d77f] font-medium">camera.galerinadillaar.com</span> dalam hitungan detik.
          </p>
        </header>

        {/* Generator Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden gold-border-glow mb-10">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

          <form onSubmit={handleOpenLive} className="space-y-6">
            <div>
              <label
                htmlFor={inputId}
                className="block text-xs font-semibold text-[#d4af37] tracking-wider uppercase mb-2 flex items-center gap-2"
              >
                <Film className="w-4 h-4" />
                <span>Masukkan Link / Kode Kamera Our-Wedding</span>
              </label>

              <div className="relative">
                <input
                  id={inputId}
                  type="text"
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  placeholder="https://our-wedding.link/kamera/3dpudegf atau ketik 3dpudegf"
                  className="w-full bg-[#12151b]/90 border border-[#d4af37]/30 rounded-2xl px-4 py-3.5 sm:py-4 text-sm sm:text-base text-[#fdfaf5] placeholder-[#6b675e] focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all font-mono"
                />
              </div>

              {/* Demo chip */}
              <div className="mt-2.5 flex items-center justify-between text-xs text-[#8f8a7e]">
                <span>Pola link: <code className="text-[#d4af37]/90 font-mono">/kamera/:slug</code></span>
                <button
                  type="button"
                  onClick={() => handleUseDemo('3dpudegf')}
                  className="text-[#d4af37] hover:text-[#fce59f] underline underline-offset-4 transition-colors font-medium cursor-pointer"
                >
                  Coba Demo Kode (3dpudegf)
                </button>
              </div>
            </div>

            {/* Generated Output Preview */}
            {slug ? (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#171b22]/90 border border-[#d4af37]/35 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between gap-2 border-b border-[#d4af37]/15 pb-3">
                  <span className="text-xs font-semibold text-[#8a8579] uppercase tracking-wide">
                    Hasil Link Branded
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Siap Digunakan
                  </span>
                </div>

                <div className="bg-[#0b0d11] p-3 sm:p-3.5 rounded-xl border border-white/5 flex items-center justify-between gap-3 overflow-hidden">
                  <span className="font-mono text-sm sm:text-base text-[#f7df94] truncate">
                    {brandedUrl}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    className="shrink-0 p-2 text-xs font-medium text-[#f7df94] hover:bg-[#d4af37]/15 rounded-lg transition-colors cursor-pointer"
                    title="Salin Link"
                  >
                    {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c768] to-[#c49a26] text-black font-semibold text-sm hover:brightness-110 active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Buka Kamera Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyWhatsapp}
                    className="w-full py-3.5 px-5 rounded-xl border border-[#d4af37]/40 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#f5d77f] font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copiedMessage ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Pesan Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-[#d4af37]" />
                        <span>Salin Format WhatsApp Tamu</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                disabled
                className="w-full py-3.5 px-5 rounded-xl bg-white/5 text-[#5e5b54] font-semibold text-sm cursor-not-allowed flex items-center justify-center gap-2 border border-white/5"
              >
                <span>Masukkan Link atau Kode Terlebih Dahulu</span>
              </button>
            )}
          </form>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] mb-3">
              <Camera className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-[#f5d77f]">100% Dynamic Routing</h2>
            <p className="text-xs text-[#8f8a7e] leading-relaxed">
              Tidak perlu build halaman baru setiap klien. Cukup akses <code className="text-[#d4af37]">/:slug</code>, kamera langsung aktif detik itu juga.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-[#f5d77f]">Branded Masking Bar</h2>
            <p className="text-xs text-[#8f8a7e] leading-relaxed">
              Dilengkapi floating header eksklusif Galeri Nadillaar dan splash screen elegan untuk pengalaman visual yang prestisius.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-[#f5d77f]">Camera Permissions</h2>
            <p className="text-xs text-[#8f8a7e] leading-relaxed">
              Dikonfigurasi khusus dengan izin penuh akses kamera & mikrofon browser seluler agar tamu dapat langsung mengambil foto.
            </p>
          </div>
        </div>

        {/* Instruction Note */}
        <div className="p-4 rounded-xl bg-[#12151b]/70 border border-[#d4af37]/20 flex items-start gap-3 text-xs text-[#9d978b] mb-12">
          <Info className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Link kamera dapat dibagikan langsung kepada tamu undangan melalui pesan WhatsApp atau dicetak sebagai QR Code di meja resepsi / photobooth acara pernikahan Anda.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center pt-8 border-t border-white/5 text-xs text-[#6e695f] space-y-2">
        <p>
          Bagian dari ekosistem digital{' '}
          <a
            href="https://invitation.galerinadillaar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#d4af37] hover:underline font-medium"
          >
            invitation.galerinadillaar.com
          </a>
        </p>
        <p>© {CURRENT_YEAR} Galeri Nadillaar. All rights reserved.</p>
      </footer>
    </div>
  )
}
