'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from '@/lib/translations';

const navLinkHrefs = [
  { key: 'features', href: '#features' },
  { key: 'howItWorks', href: '#how-it-works' },
  { key: 'pricing', href: '#pricing' },
  { key: 'faq', href: '#faq' },
];

export default function Navigation() {
  const t = getTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navLinks = navLinkHrefs.map((l) => ({ ...l, label: t(`links.${l.key}`) }));
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  // Track active section via IntersectionObserver.
  // rootMargin: top -80px accounts for the fixed h-20 header; bottom -50% means a
  // section becomes "active" when its top crosses below the header AND its body
  // still occupies the upper half of the viewport. Only nav-linked sections are
  // observed; bento/compare are intentionally excluded so they never trigger the spy.
  useEffect(() => {
    const ids = navLinkHrefs.map(l => l.href.replace('#', ''));
    const elements = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        if (visible.size === 0) {
          setActiveSection('');
          return;
        }
        // Pick the section closest to the top of the active band (matches DOM order).
        let best: string = '';
        let bestTop = Infinity;
        for (const id of visible.keys()) {
          const el = document.getElementById(id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top;
          if (top < bestTop) {
            bestTop = top;
            best = id;
          }
        }
        setActiveSection(best);
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: [0, 0.01, 0.5, 1] }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveSection(href.replace('#', ''));
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-bold">
        {t('skipToContent')}
      </a>
      <motion.header
        animate={{
          backgroundColor: scrolled ? 'rgba(0, 35, 101, 0.8)' : 'rgba(0, 35, 101, 0)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
          boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.1)' : '0 0 0 transparent',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
      <nav aria-label={t('ariaLabel')} className="mx-auto max-w-[1640px] px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <Image src="/logo-white.svg" alt="Draft2Live" width={150} height={28} priority />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 relative">
          {navLinks.map(link => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a key={link.href} href={link.href} onClick={e => handleClick(e, link.href)}
                className={`relative text-sm transition-colors py-1 ${isActive ? 'text-white' : 'text-text-secondary hover:text-white'}`}>
                {link.label}
                <span className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-teal-500 opacity-100' : 'bg-transparent opacity-0'
                }`} />
              </a>
            );
          })}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4">
          <motion.a href="https://draft2live.ai/en/register" rel="noopener"
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(4,184,183,0.3)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="px-5 py-2.5 text-sm font-bold rounded-xl bg-teal-600 text-white shadow-lg shadow-teal-500/20 hover:bg-teal-500 transition-colors cursor-pointer">
            {t('cta')}
          </motion.a>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden relative z-10 w-8 h-8 flex flex-col justify-center gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)} aria-label={t('menu')} aria-expanded={mobileOpen} aria-controls="mobile-menu">
          <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-full h-0.5 bg-white origin-center transition-colors" />
          <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-full h-0.5 bg-white" />
          <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-full h-0.5 bg-white origin-center transition-colors" />
        </button>

        {/* Mobile overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div id="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a key={link.href} href={link.href}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={e => handleClick(e, link.href)}
                  className="text-2xl font-heading font-bold text-white">
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://draft2live.ai/en/register" rel="noopener"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-8 py-4 text-lg font-bold rounded-xl bg-teal-600 text-white hover:bg-teal-500 transition-colors cursor-pointer">
                {t('cta')}
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="h-[2px] bg-gradient-to-r from-teal-500 via-teal-400 to-teal-300"
      />
    </motion.header>
    </>
  );
}
