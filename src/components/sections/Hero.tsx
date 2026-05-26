'use client';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getTranslations } from '@/lib/translations';
import { staggerContainer } from '@/lib/animations';

const GRID_COLS = 28;
const GRID_ROWS = 14;
const TOTAL = GRID_COLS * GRID_ROWS;

function StaggerGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLDivElement[]>([]);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Precompute distances from center for stagger
  const distances = useMemo(() => {
    const centerCol = GRID_COLS / 2;
    const centerRow = GRID_ROWS / 2;
    const maxDist = Math.sqrt(centerCol * centerCol + centerRow * centerRow);
    const result: number[] = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const dx = col - centerCol;
        const dy = row - centerRow;
        result.push(Math.sqrt(dx * dx + dy * dy) / maxDist);
      }
    }
    return result;
  }, []);

  useEffect(() => {
    const cells = cellsRef.current;
    if (!cells.length) return;

    startTimeRef.current = performance.now();

    function animate(now: number) {
      const elapsed = (now - startTimeRef.current) / 1000;

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (!cell) continue;

        const dist = distances[i];
        // Ripple wave: sin based on distance + time
        const wave = Math.sin(dist * 8 - elapsed * 2.5);
        // Normalize to 0..1
        const opacity = 0.03 + (wave + 1) / 2 * 0.12;
        const scale = 0.6 + (wave + 1) / 2 * 0.4;

        cell.style.opacity = String(opacity);
        cell.style.transform = `scale(${scale})`;
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [distances]);

  return (
    <div ref={gridRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
          gap: '2px',
          padding: '2rem',
        }}
      >
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { if (el) cellsRef.current[i] = el; }}
            className="rounded-sm bg-teal-400"
            style={{ opacity: 0.03, transition: 'none' }}
          />
        ))}
      </div>
      {/* Radial fade at edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-dark)_70%)]" />
    </div>
  );
}

function VideoPoster() {
  const t = getTranslations('hero');
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = `/videos/demo-uk.mp4`;

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  if (playing) {
    return (
      <video
        ref={videoRef}
        className="w-full aspect-video bg-darker"
        controls
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    );
  }

  return (
    <button
      onClick={handlePlay}
      className="relative w-full aspect-video bg-[#031931] flex items-center justify-center group cursor-pointer overflow-hidden"
      aria-label={t('videoAriaLabel')}
    >
      {/* === FAKE UI BACKGROUND === */}
      <div className="absolute inset-0 flex opacity-90 group-hover:opacity-70 transition-opacity duration-500">
        {/* Sidebar */}
        <div className="w-[160px] shrink-0 bg-[#002365] border-r border-white/[0.06] p-4 hidden sm:flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-lg bg-teal-500/30" />
            <div className="h-3 w-20 bg-white/10 rounded" />
          </div>
          {['w-24', 'w-20', 'w-28', 'w-16', 'w-22'].map((w, i) => (
            <div key={i} className={`flex items-center gap-2 ${i === 1 ? 'bg-teal-500/10 -mx-2 px-2 py-1.5 rounded-lg' : 'py-1'}`}>
              <div className="w-4 h-4 rounded bg-white/[0.06]" />
              <div className={`h-2.5 ${w} rounded ${i === 1 ? 'bg-teal-500/30' : 'bg-white/[0.08]'}`} />
            </div>
          ))}
          <div className="mt-auto flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-teal-500/20" />
            <div className="h-2.5 w-16 bg-white/[0.06] rounded" />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
          {/* Top bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-8 sm:h-9 bg-white/[0.04] border border-white/[0.06] rounded-lg flex items-center px-3">
              <div className="w-4 h-4 rounded bg-white/[0.06] mr-2" />
              <div className="h-2 w-24 sm:w-32 bg-white/[0.08] rounded" />
            </div>
            <div className="h-8 sm:h-9 w-24 sm:w-28 bg-white/[0.04] border border-white/[0.06] rounded-lg flex items-center px-3">
              <div className="h-2 w-16 bg-white/[0.08] rounded" />
            </div>
            <div className="h-8 sm:h-9 px-4 sm:px-5 bg-teal-600/40 rounded-lg flex items-center">
              <div className="h-2 w-16 sm:w-20 bg-teal-300/30 rounded" />
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3 bg-teal-500/[0.06] border border-teal-500/10 rounded-lg px-3 sm:px-4 py-2">
            <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full border-2 border-teal-500/40 border-t-teal-500" />
            <div className="h-2 w-28 sm:w-36 bg-teal-500/20 rounded" />
            <div className="ml-auto h-2 w-10 sm:w-12 bg-teal-500/30 rounded" />
          </div>

          {/* Article preview */}
          <div className="flex-1 bg-white/[0.02] border border-white/[0.04] rounded-xl p-4 sm:p-5 flex flex-col gap-2.5 sm:gap-3">
            <div className="h-3 sm:h-4 w-3/4 bg-white/[0.08] rounded" />
            <div className="flex gap-2">
              <div className="h-2 w-14 sm:w-16 bg-teal-500/20 rounded" />
              <div className="h-2 w-16 sm:w-20 bg-white/[0.06] rounded" />
              <div className="h-2 w-10 sm:w-12 bg-white/[0.06] rounded" />
            </div>
            <div className="flex flex-col gap-1.5 sm:gap-2 mt-1 sm:mt-2">
              <div className="h-2 w-full bg-white/[0.05] rounded" />
              <div className="h-2 w-[95%] bg-white/[0.05] rounded" />
              <div className="h-2 w-[88%] bg-white/[0.05] rounded" />
              <div className="h-2 w-full bg-white/[0.05] rounded" />
              <div className="h-2 w-[70%] bg-white/[0.05] rounded" />
            </div>
            <div className="mt-auto flex items-center gap-3">
              <div className="flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-3 py-1">
                <div className="w-3 h-3 rounded-full bg-teal-500/50" />
                <div className="h-2 w-14 sm:w-16 bg-teal-500/30 rounded" />
              </div>
              <div className="h-2 w-20 sm:w-24 bg-white/[0.06] rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* === DARKENING OVERLAY === */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#031931]/90 via-[#031931]/30 to-[#031931]/20" />

      {/* === PLAY BUTTON === */}
      <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal-500/15 rounded-full blur-2xl" />
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-600 flex items-center justify-center group-hover:bg-teal-500 group-hover:scale-110 transition-all duration-300 shadow-[0_0_40px_rgba(4,184,183,0.3)]">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="text-white font-heading font-bold text-sm sm:text-lg">{t('videoTitle')}</p>
          <p className="text-text-muted text-xs sm:text-sm mt-1">{t('videoSubtitle')}</p>
        </div>
      </div>

      {/* Pulse ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-teal-500/20 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
    </button>
  );
}

export default function Hero() {
  const t = getTranslations('hero');
  const words = t.raw('typingWords') as string[];
  const chipExamples = t.raw('chipExamples') as string[];
  const trustStats = t.raw('trustStats') as { value: string; label: string }[];
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  // Keyword input is decorative for now — submit always navigates to the
  // free-plan register page; the typed value is not currently passed through.
  const [userKeyword, setUserKeyword] = useState('');

  const tick = useCallback(() => {
    const current = words[wordIndex];
    if (!isDeleting) {
      setText(current.substring(0, text.length + 1));
      if (text.length + 1 === current.length) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      setText(current.substring(0, text.length - 1));
      if (text.length === 0) {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
        return;
      }
    }
  }, [text, wordIndex, isDeleting, words]);

  useEffect(() => {
    const timer = setTimeout(tick, isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Animated stagger grid background */}
      <StaggerGrid />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="inline-block px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-normal uppercase tracking-wider sm:tracking-widest rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-300">
              {t('badge')}
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading leading-[1.08]"
            style={{ letterSpacing: '-0.03em' }}
          >
            <span className="block">{t('titleLine1')}</span>
            {/* LOCK the height (h-, not min-h) so this line never grows beyond the
                reserved space regardless of which word the typewriter is on.
                overflow:hidden prevents any spillover, so the form below stays still.
                Mobile: 2.6em (fits worst-case wrap to 2 lines + buffer).
                Desktop: 1.15em (everything fits on 1 line at sm: and up). */}
            <span className="block min-h-[2.4em] sm:min-h-[1.15em]">
              <span className="inline-block text-left" style={{ minWidth: '14ch' }}>
                {t('titleLine2Prefix')}{' '}
                <span className="gradient-text">{text}</span>
                <span className="typing-cursor" />
              </span>
            </span>
            <span className="block text-white">{t('titleLine3')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
            style={{ textWrap: 'pretty' }}
          >
            {t('subtitle')}
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-xl mx-auto"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = 'https://draft2live.ai/en/register';
              }}
              className="w-full flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl p-1.5 bg-white/40 border border-white/50 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.2),0_0_40px_rgba(4,184,183,0.1),inset_0_1px_0_rgba(255,255,255,0.3)]"
            >
              <input
                type="text"
                value={userKeyword}
                onChange={(e) => setUserKeyword(e.target.value)}
                placeholder={t('searchPlaceholder')}
                aria-label={t('searchAriaLabel')}
                className="flex-1 min-w-0 bg-transparent px-4 sm:px-5 py-3.5 sm:py-4 text-white placeholder:text-white/70 outline-none text-sm sm:text-base"
              />
              <motion.a
                href="https://draft2live.ai/en/register"
                rel="noopener"
                whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(4,184,183,0.3)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold rounded-xl bg-teal-600 text-white whitespace-nowrap hover:bg-teal-500 transition-colors shrink-0 cursor-pointer"
              >
                {t('searchCta')}
              </motion.a>
            </form>

            {/* Example chips — link to the free-plan register page. */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-text-muted text-xs sm:text-sm">{t('exampleLabel')}</span>
              {chipExamples.map((chip, i) => (
                <a
                  key={i}
                  href="https://draft2live.ai/en/register"
                  rel="noopener"
                  className="px-4 py-2 text-sm text-text-secondary bg-white/[0.04] border border-white/10 rounded-full hover:bg-teal-500/10 hover:border-teal-500/20 hover:text-teal-300 transition-all cursor-pointer"
                >
                  {chip}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Microcopy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-sm text-text-muted"
          >
            {t('microcopy')}
          </motion.p>
        </div>
      </div>

      {/* Demo video */}
      <div id="hero-video" className="relative z-10 w-full max-w-5xl mx-auto px-6 mt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
        >
          <div className="glass-card !p-2 !rounded-2xl overflow-hidden relative bg-[#031931]">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white/5 rounded-lg px-3 py-1 text-xs text-text-muted text-center">
                  app.draft2live.ai
                </div>
              </div>
            </div>
            {/* Video with custom poster */}
            <VideoPoster />
          </div>
        </motion.div>

        {/* Trust stats under video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
          className="mt-8 grid grid-cols-3 gap-4 sm:gap-8"
        >
          {trustStats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-white font-heading font-bold text-xl sm:text-2xl md:text-3xl">{stat.value}</div>
              <div className="text-text-muted text-xs sm:text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
