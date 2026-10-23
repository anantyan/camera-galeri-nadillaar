import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Camera,
  Share2,
  Check,
  RefreshCw,
  AlertCircle,
  ChevronUp,
} from 'lucide-react'

export default function CameraPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [minTimePassed, setMinTimePassed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  // State untuk Top App Bar masking (disembunyikan permanen saat logo di-tap)
  const [isBarHidden, setIsBarHidden] = useState(false)

  // Sanitasi slug
  const cleanSlug = (slug || '').trim().replace(/[^a-zA-Z0-9_-]/g, '')
  const targetUrl = cleanSlug ? `https://our-wedding.link/kamera/${cleanSlug}` : ''

  // Ubah document.title secara dinamis
  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Kamera Tamu | Galeri Nadillaar'
    return () => {
      document.title = originalTitle
    }
  }, [cleanSlug])

  // Timer splash screen minimum 2.2 detik untuk menyamarkan loading bawaan target
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimePassed(true)
    }, 2200)

    return () => clearTimeout(timer)
  }, [reloadKey])

  const isReady = iframeLoaded && minTimePassed

  // Muat ulang iframe dan reset tampilan
  const handleReload = () => {
    setIframeLoaded(false)
    setMinTimePassed(false)
    setIsBarHidden(false)
    setReloadKey((prev) => prev + 1)
  }

  // Bagikan link kamera
  const handleShare = async () => {
    const shareUrl = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Kamera Disposable Galeri Nadillaar',
          text: 'Yuk abadikan momen spesial pernikahan kami melalui Kamera Galeri Nadillaar!',
          url: shareUrl,
        })
        return
      } catch {
        // Fallback jika dibatalkan
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Ignore
    }
  }

  // Jika slug tidak valid
  if (!cleanSlug) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-4">
        <div className="glass-panel max-w-md w-full p-8 rounded-2xl text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold font-display gold-gradient-text">Link Tidak Valid</h2>
          <p className="text-sm text-stone-300">
            Kode kamera pernikahan tidak ditemukan atau format URL salah.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 rounded-xl bg-[#d4af37] text-black font-semibold hover:bg-[#e5c158] transition-colors cursor-pointer"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    )
  }

  return (
    <main
      aria-label="Kamera Pernikahan Galeri Nadillaar"
      className="relative w-screen h-[100dvh] bg-black overflow-hidden select-none"
    >
      {/* 1. BRANDED SPLASH SCREEN / LOADING MASK */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0c10] px-6 transition-all duration-700 ease-out ${
          isReady ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
      >
        <div className="absolute w-72 h-72 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none animate-pulse" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-xs">
          <div className="relative mb-6">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#d4af37] to-[#f5d77f] opacity-30 blur-md animate-pulse" />
            <div className="relative w-20 h-20 rounded-2xl p-1.5 bg-black/70 border border-[#d4af37]/40 shadow-2xl flex items-center justify-center">
              <img
                src={`${import.meta.env.BASE_URL}icon.png`}
                alt="Galeri Nadillaar"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
          </div>

          <h2 className="font-display text-2xl font-bold gold-gradient-text tracking-wide mb-1">
            Galeri Nadillaar
          </h2>
          <p className="text-xs font-medium text-[#f5d77f]/80 uppercase tracking-widest mb-6">
            Disposable Wedding Camera
          </p>

          <div className="flex items-center gap-2 mb-8">
            <div className="w-5 h-5 border-2 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin" />
            <span className="text-xs text-stone-300">Menyiapkan kamera...</span>
          </div>

          <div className="w-full p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-left flex items-start gap-2.5">
            <Camera className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed text-stone-300">
              Pastikan Anda menekan tombol <strong className="text-white">"Izinkan / Allow"</strong> saat browser meminta izin akses kamera.
            </p>
          </div>
        </div>
      </div>

      {/* 2. SOLID TOP APP BAR MASKING (Menutupi logo bawaan saat form input) */}
      <header
        aria-label="Header Masking Galeri Nadillaar"
        className={`fixed top-0 left-0 right-0 z-40 h-14 bg-[#0a0c10] border-b border-[#d4af37]/25 shadow-2xl px-3 sm:px-5 flex items-center justify-between transition-all duration-500 ease-in-out ${
          isBarHidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'
        }`}
      >
        {/* Tombol Logo di Top untuk Menyembunyikan Bar Secara Permanen */}
        <button
          onClick={() => setIsBarHidden(true)}
          title="Ketuk logo untuk membuka kamera penuh"
          className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="relative">
            <img
              src={`${import.meta.env.BASE_URL}icon.png`}
              alt="Logo Galeri Nadillaar"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain p-0.5 border border-[#d4af37]/40 bg-black/70 shadow-md group-hover:scale-105 group-hover:border-[#f5d77f] transition-all"
            />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#d4af37] flex items-center justify-center text-black shadow">
              <ChevronUp className="w-2.5 h-2.5 stroke-[3]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xs sm:text-sm font-semibold gold-gradient-text leading-tight group-hover:brightness-110">
              Galeri Nadillaar
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#d4af37]/80 flex items-center gap-1">
              <span>Buka Kamera</span>
              <span className="text-[8px] opacity-60">• tap logo</span>
            </span>
          </div>
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            title="Bagikan link kamera"
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all text-xs flex items-center gap-1 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline text-emerald-400 font-medium">Tersalin</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bagikan</span>
              </>
            )}
          </button>

          {/* Reload Button */}
          <button
            onClick={handleReload}
            title="Muat ulang kamera"
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 3. FULLSCREEN CAMERA IFRAME (Tidak ada tombol unhide lagi, 100% fullscreen bersih) */}
      <iframe
        key={reloadKey}
        src={targetUrl}
        title="Kamera Pernikahan Galeri Nadillaar"
        className="w-full h-full border-0 absolute inset-0 block bg-black"
        allow="camera; microphone; display-capture; autoplay; clipboard-write; web-share"
        allowFullScreen
        onLoad={() => setIframeLoaded(true)}
      />
    </main>
  )
}
