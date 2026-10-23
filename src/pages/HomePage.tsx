import { useEffect } from 'react'

const REDIRECT_TARGET = 'https://invitation.galerinadillaar.com'

export default function HomePage() {
  useEffect(() => {
    // Redirect langsung ke website utama Galeri Nadillaar
    window.location.replace(REDIRECT_TARGET)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#f4efe6] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl p-1 bg-black/60 border border-[#d4af37]/40 shadow-2xl flex items-center justify-center animate-pulse">
          <img
            src={`${import.meta.env.BASE_URL}icon.png`}
            alt="Galeri Nadillaar"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
      </div>
      <h1 className="font-display text-xl font-bold gold-gradient-text tracking-wide mb-2">
        Galeri Nadillaar
      </h1>
      <p className="text-xs text-stone-400 mb-6">Mengarahkan ke website resmi...</p>
      <a
        href={REDIRECT_TARGET}
        className="text-xs text-[#d4af37] underline underline-offset-4 hover:text-[#f5d77f] transition-colors"
      >
        Klik di sini jika tidak dialihkan secara otomatis
      </a>
    </div>
  )
}
