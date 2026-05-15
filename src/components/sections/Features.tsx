'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { getTranslations } from '@/lib/translations';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';

interface Feature {
  title: string;
  desc: string;
  details: string[];
  icon: React.ReactNode;
  visual: {
    gradient: string;
    label: string;
    stat?: string;
  };
}

const featureMeta: { icon: React.ReactNode; gradient: string }[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
      </svg>
    ),
    gradient: 'from-teal-500/20 to-teal-500/10',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 10a4 4 0 0 0-8 0v6a4 4 0 0 0 8 0Z"/><path d="M22 10a4 4 0 0 0-8 0v6a4 4 0 0 0 8 0Z"/><path d="M2 14h4"/><path d="M18 14h4"/>
      </svg>
    ),
    gradient: 'from-teal-500/20 to-teal-400/10',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>
      </svg>
    ),
    gradient: 'from-teal-400/20 to-teal-500/10',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
        <path d="M12 12v9"/><path d="m16 16-4-4-4 4"/>
      </svg>
    ),
    gradient: 'from-teal-400/20 to-teal-500/10',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/>
        <path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>
      </svg>
    ),
    gradient: 'from-teal-300/20 to-teal-400/10',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
        <path d="M7 7h.01"/>
      </svg>
    ),
    gradient: 'from-teal-500/15 to-teal-400/10',
  },
];

const AUTO_INTERVAL = 5000;

/* ── SERP Analysis Visual ── */
function SerpVisual() {
  const t = getTranslations('features.visuals.serp');
  const results = (t.raw('results') as { title: string; domain: string }[]).map((r, i) => ({
    pos: i + 1,
    title: r.title,
    domain: r.domain,
  }));
  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden bg-surface/50 border border-border/40 p-5 md:p-6">
      <div className="absolute w-48 h-48 rounded-full bg-teal-500/10 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="relative space-y-2.5">
        {/* Search bar mockup */}
        <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 mb-4">
          <svg className="w-4 h-4 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <span className="text-teal-400 text-xs font-mono">{t('query')}</span>
          <span className="ml-auto text-[10px] text-text-muted bg-white/5 px-1.5 py-0.5 rounded">{t('countryBadge')}</span>
        </div>
        {results.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, duration: 0.3 }}
            className="flex items-start gap-2.5 bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2"
          >
            <span className="text-teal-400 font-mono text-xs font-bold mt-0.5 shrink-0 w-4">{r.pos}</span>
            <div className="min-w-0">
              <p className="text-white text-xs font-normal truncate">{r.title}</p>
              <p className="text-text-muted text-[10px] truncate">{r.domain}</p>
            </div>
          </motion.div>
        ))}
        <div className="text-center pt-1">
          <span className="text-teal-400/60 text-[10px]">{t('done')}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Tone of Voice Visual ── */
function BrandVoiceVisual() {
  const t = getTranslations('features.visuals.brandVoice');
  const rawMetrics = t.raw('metrics') as { label: string; value: string }[];
  // Percentages are static design values, not translated.
  const pctByIndex = [85, 62, 48, 78];
  const metrics = rawMetrics.map((m, i) => ({ ...m, pct: pctByIndex[i] ?? 50 }));
  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden bg-surface/50 border border-border/40 p-5 md:p-6">
      <div className="absolute w-48 h-48 rounded-full bg-teal-500/10 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="relative space-y-3">
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-3">{t('title')}</div>
        {/* Voice metrics */}
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-text-secondary">{m.label}</span>
              <span className="text-white font-normal">{m.value}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-teal-400/60 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${m.pct}%` }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
        {/* Sample text comparison */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5">
            <div className="text-[10px] text-text-muted mb-1.5">{t('yourText')}</div>
            <div className="space-y-1">
              <div className="h-1 bg-teal-400/30 rounded-full w-full" />
              <div className="h-1 bg-teal-400/20 rounded-full w-4/5" />
              <div className="h-1 bg-teal-400/25 rounded-full w-11/12" />
            </div>
          </div>
          <div className="bg-white/[0.03] border border-teal-500/10 rounded-lg p-2.5">
            <div className="text-[10px] text-teal-400 mb-1.5">{t('aiResult')}</div>
            <div className="space-y-1">
              <div className="h-1 bg-teal-400/30 rounded-full w-full" />
              <div className="h-1 bg-teal-400/20 rounded-full w-4/5" />
              <div className="h-1 bg-teal-400/25 rounded-full w-11/12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SEO Audit Visual ── */
function SeoAuditVisual() {
  const t = getTranslations('features.visuals.seoAudit');
  const names = t.raw('metrics') as string[];
  // Scores + ok flags are static design values.
  const scoresAndOk: [number, boolean][] = [[92, true], [88, true], [95, true], [84, false], [90, true], [78, false], [91, true], [96, true]];
  const metrics = names.map((name, i) => ({ name, score: scoresAndOk[i][0], ok: scoresAndOk[i][1] }));
  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden bg-surface/50 border border-border/40 p-5 md:p-6">
      <div className="absolute w-48 h-48 rounded-full bg-teal-500/10 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="relative">
        {/* Score circle */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/5" />
              <motion.circle
                cx="40" cy="40" r="34" fill="none" strokeWidth="4" strokeLinecap="round"
                className="text-teal-400"
                stroke="currentColor"
                strokeDasharray={`${2 * Math.PI * 34}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - 0.89) }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold font-mono text-lg">89</span>
            </div>
          </div>
        </div>
        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-1.5">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.06 }}
              className="flex items-center gap-1.5 bg-white/[0.03] rounded-md px-2 py-1.5"
            >
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${m.ok ? 'bg-teal-400' : 'bg-[#e1e1e1]'}`} />
              <span className="text-[10px] text-text-secondary truncate">{m.name}</span>
              <span className={`text-[10px] font-mono ml-auto ${m.ok ? 'text-teal-400' : 'text-[#e1e1e1]'}`}>{m.score}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── CMS Publish Visual ── */
function CmsPublishVisual() {
  const t = getTranslations('features.visuals.cmsPublish');
  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden bg-surface/50 border border-border/40 p-4 md:p-5">
      <div className="absolute w-48 h-48 rounded-full bg-teal-500/10 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="relative">
        {/* Browser mockup */}
        <div className="bg-white/[0.03] border border-white/10 rounded-lg overflow-hidden">
          {/* Browser bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>
            <div className="flex-1 mx-2 bg-white/5 rounded px-2 py-0.5 text-[9px] text-text-muted text-center">
              {t('url')}
            </div>
          </div>
          {/* Article page - light theme like a real published blog */}
          <div className="bg-white p-3 sm:p-4 text-left">
            {/* Site nav */}
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
              <div className="w-4 h-4 rounded bg-[#002365] flex items-center justify-center">
                <span className="text-[5px] text-white font-bold">W</span>
              </div>
              <span className="text-[7px] text-gray-500 font-normal">{t('siteName')}</span>
              <div className="ml-auto flex gap-2">
                <span className="text-[6px] text-gray-400">{t('nav.home')}</span>
                <span className="text-[6px] text-gray-400">{t('nav.blog')}</span>
                <span className="text-[6px] text-gray-400">{t('nav.contacts')}</span>
              </div>
            </div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-0.5 mb-2">
              <span className="text-[6px] text-gray-400">{t('breadcrumb.home')}</span>
              <span className="text-[6px] text-gray-300">›</span>
              <span className="text-[6px] text-gray-400">{t('breadcrumb.blog')}</span>
              <span className="text-[6px] text-gray-300">›</span>
              <span className="text-[6px] text-teal-500">{t('breadcrumb.category')}</span>
            </div>
            {/* Article title */}
            <p className="text-[9px] sm:text-[10px] font-bold text-gray-900 leading-tight mb-1">
              {t('article.title')}
            </p>
            {/* Meta */}
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-3.5 h-3.5 rounded-full bg-teal-100 flex items-center justify-center">
                <span className="text-[5px] text-teal-600 font-bold">{t('article.authorInitial')}</span>
              </div>
              <span className="text-[6px] text-gray-400">{t('article.author')}</span>
              <span className="text-[5px] text-gray-300">•</span>
              <span className="text-[6px] text-gray-400">{t('article.date')}</span>
              <span className="text-[5px] text-gray-300">•</span>
              <span className="text-[6px] text-gray-400">{t('article.readTime')}</span>
            </div>
            {/* Hero image */}
            <div className="h-12 sm:h-14 bg-gradient-to-br from-teal-50 via-teal-50 to-teal-50 rounded mb-2 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-2 left-3 w-8 h-5 bg-teal-200/60 rounded" />
                <div className="absolute top-1 right-4 w-6 h-6 bg-teal-200/40 rounded-full" />
                <div className="absolute bottom-1 left-6 w-10 h-3 bg-teal-200/50 rounded" />
              </div>
              <svg className="w-4 h-4 text-gray-300/60 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
            </div>
            {/* Article body */}
            <p className="text-[6px] sm:text-[7px] text-gray-600 leading-relaxed mb-1.5">
              {t('article.body')}
            </p>
            {/* H2 */}
            <p className="text-[7px] sm:text-[8px] font-bold text-gray-800 mb-1">
              {t('article.h2')}
            </p>
            <p className="text-[6px] sm:text-[7px] text-gray-600 leading-relaxed">
              {t('article.bodyH2')}
            </p>
          </div>
        </div>
        {/* CMS badges */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/10 rounded-lg px-2.5 py-1.5">
            {/* WordPress official logo */}
            <svg className="w-4 h-4 text-[#21759B]" viewBox="0 0 24 24" fill="currentColor"><path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.539.82-2.771.82-3.864 0-.405-.027-.78-.07-1.109m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.66.855-.075.885 0 0 .554.06 1.14.09l1.687 4.627-2.37 7.11L5.88 6.93c.645-.03 1.23-.105 1.23-.105.585-.075.516-.93-.065-.899 0 0-1.755.135-2.88.135-.202 0-.44-.005-.69-.015C5.55 3.22 8.55 1.5 12 1.5c2.58 0 4.935.99 6.69 2.595-.045-.003-.075-.015-.12-.015-1.065 0-1.82.93-1.82 1.92 0 .9.51 1.65 1.065 2.55.42.72.9 1.65.9 2.97 0 .93-.36 2.01-.84 3.495l-1.11 3.69zm-2.49 5.245l-2.73 7.935c.81.24 1.665.375 2.565.375 1.05 0 2.07-.18 3.015-.51-.03-.045-.045-.09-.06-.135zm-6.84-5.23L1.83 13.58C1.575 13.08 1.5 12.555 1.5 12c0-3.15 1.695-5.895 4.23-7.41l2.655 7.83c.03.06.045.12.075.18l-.315-.655zM12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0m0 23.46C5.71 23.46.54 18.29.54 12 .54 5.71 5.71.54 12 .54c6.29 0 11.46 5.17 11.46 11.46 0 6.29-5.17 11.46-11.46 11.46"/></svg>
            <span className="text-[10px] text-white">WordPress</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/10 rounded-lg px-2.5 py-1.5">
            {/* Drupal official logo */}
            <svg className="w-4 h-4 text-[#0678BE]" viewBox="0 0 24 24" fill="currentColor"><path d="M15.78 5.113C14.09 3.425 12.48 1.815 11.998 0c-.48 1.815-2.09 3.425-3.778 5.113-2.534 2.53-5.405 5.4-5.405 9.702a9.184 9.184 0 1018.368 0c0-4.303-2.871-7.171-5.405-9.702M6.72 16.954c-.216-.212-3.391-3.393-1.263-6.83l3.346 3.345a.442.442 0 010 .627l-1.456 1.457a.443.443 0 01-.627-.002zm5.282 3.637a3.053 3.053 0 01-3.05-3.05 3.053 3.053 0 013.05-3.05 3.053 3.053 0 013.05 3.05 3.053 3.053 0 01-3.05 3.05zm4.485-3.63a.44.44 0 01-.627 0l-1.46-1.46a.444.444 0 010-.628l3.344-3.345c2.132 3.44-1.043 6.219-1.257 6.433z"/></svg>
            <span className="text-[10px] text-white">Drupal</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/10 rounded-lg px-2.5 py-1.5">
            {/* Shopify official logo (shopping bag with S) */}
            <svg className="w-4 h-4 text-[#95BF47]" viewBox="0 0 24 24" fill="currentColor"><path d="M15.337 4.32c-.083-.604-.117-.939-.84-.989-.563-.039-.71.094-.71.094-.094-.604-.402-1.005-.84-1.005-.041 0-.082.005-.122.014-.013-.03-.026-.06-.04-.088C12.553 1.737 12.071 1.5 11.49 1.5c-1.96 0-2.886 2.451-3.176 3.694C7.531 5.443 6.769 5.682 6.7 5.704c-.444.139-.458.153-.514.572-.044.319-1.193 9.225-1.193 9.225L13.06 17.5l4.385-.95s-1.97-12.06-1.985-12.146-.02-.061-.123-.084zm-3.232.245c-.402.124-.85.262-1.337.412-.001-.701-.085-1.677-.412-2.519.755.143 1.346.96 1.749 2.107zM10.07 2.836c.299.852.382 1.835.382 2.55-.622.193-1.298.402-1.978.612.382-1.474 1.108-2.187 1.596-3.162zm3.094 14.273l-1.04-7.05s1.46.026 2.054.064c.38.025.395.198.385.39-.018.323-.404 4.51-.404 4.51l-.995 2.086z"/></svg>
            <span className="text-[10px] text-white">Shopify</span>
          </div>
        </div>
        {/* Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-1.5 mt-3"
        >
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-teal-400 text-xs">{t('status')}</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Knowledge Base Visual ── */
function KnowledgeBaseVisual() {
  const t = getTranslations('features.visuals.knowledgeBase');
  // Filenames stay universal (extensions are international)
  const docs = [
    { name: 'product-specs.pdf', size: '2.4 MB', type: 'PDF' },
    { name: 'pricing-2026.docx', size: '840 KB', type: 'DOCX' },
    { name: 'faq-answers.txt', size: '120 KB', type: 'TXT' },
  ];
  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden bg-surface/50 border border-border/40 p-5 md:p-6">
      <div className="absolute w-48 h-48 rounded-full bg-teal-500/10 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="relative space-y-3">
        <div className="text-[10px] text-text-muted uppercase tracking-wider">{t('title')}</div>
        {docs.map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2.5"
          >
            <div className={`w-8 h-8 rounded-md flex items-center justify-center text-[9px] font-bold shrink-0 ${
              d.type === 'PDF' ? 'bg-teal-500/15 text-teal-400 border border-teal-500/20' :
              d.type === 'DOCX' ? 'bg-teal-500/15 text-teal-400 border border-teal-500/20' :
              'bg-white/10 text-text-muted border border-white/10'
            }`}>{d.type}</div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-xs font-normal truncate">{d.name}</p>
              <p className="text-text-muted text-[10px]">{d.size}</p>
            </div>
            <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </motion.div>
        ))}
        {/* Connection lines */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
          <span className="text-[10px] text-text-muted">{t('indexed')}</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}

/* ── White-label Visual ── */
function WhiteLabelVisual() {
  const t = getTranslations('features.visuals.whiteLabel');
  // Brand names are locale-aware — UA suffix belongs on UK landing only.
  // Styling (colors) stays in code; only the name/URL varies per locale.
  const names = t.raw('brands') as string[];
  const styles = [
    { color: 'bg-teal-500', accent: 'border-teal-500/30' },
    { color: 'bg-[#002365]', accent: 'border-[#002365]/30' },
    { color: 'bg-[#e1e1e1]', accent: 'border-[#e1e1e1]/30' },
  ];
  const brands = names.map((name, i) => ({ name, ...styles[i % styles.length] }));
  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden bg-surface/50 border border-border/40 p-5 md:p-6">
      <div className="absolute w-48 h-48 rounded-full bg-teal-500/10 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="relative space-y-3">
        <div className="text-[10px] text-text-muted uppercase tracking-wider">{t('title')}</div>
        {/* Brand cards */}
        {brands.map((brand, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`bg-white/[0.03] border ${brand.accent} rounded-lg p-3`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-lg ${brand.color}/20 flex items-center justify-center`}>
                <div className={`w-3 h-3 rounded ${brand.color}`} />
              </div>
              <div>
                <p className="text-white text-xs font-normal">{brand.name}</p>
                <p className="text-text-muted text-[10px]">app.{brand.name.toLowerCase().replace(/\s/g, '')}.com</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const featureVisuals = [SerpVisual, BrandVoiceVisual, SeoAuditVisual, CmsPublishVisual, KnowledgeBaseVisual, WhiteLabelVisual];

function FeatureVisual({ index }: { index: number }) {
  const Visual = featureVisuals[index];
  return <Visual />;
}

function CheckSmall() {
  return (
    <svg className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function Features() {
  const t = getTranslations('features');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const [active, setActive] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });

  const features: Feature[] = featureMeta.map((meta, i) => ({
    icon: meta.icon,
    title: t(`items.${i}.title`),
    desc: t(`items.${i}.desc`),
    details: t.raw(`items.${i}.details`) as string[],
    visual: {
      gradient: meta.gradient,
      label: t(`items.${i}.visual.label`),
      stat: t(`items.${i}.visual.stat`),
    },
  }));

  // Update indicator position
  useEffect(() => {
    const el = itemRefs.current[active];
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicatorStyle({
      top: elRect.top - parentRect.top,
      height: elRect.height,
    });
  }, [active]);

  // Auto-cycle
  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % featureMeta.length);
  }, []);

  // Track viewport so we ONLY auto-cycle on desktop (lg+ has tab layout with
  // a fixed-height right panel; mobile uses an accordion where each expand/collapse
  // would push the page below up and down — bad UX).
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return; // No auto-cycle on mobile/tablet — user controls accordion.
    if (userInteracted) {
      const reset = setTimeout(() => setUserInteracted(false), 10000);
      return () => clearTimeout(reset);
    }
    const timer = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [next, userInteracted, isDesktop]);

  const handleClick = (i: number) => {
    setActive(i);
    setUserInteracted(true);
  };

  return (
    <section id="features" className="relative py-20 md:py-28 overflow-hidden section-glow-divider section-darker">
      <div className="mx-auto max-w-[1640px] px-4 sm:px-6">
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <SectionHeader
            badge={t('header.badge')}
            title={t('header.title')}
            subtitle={t('header.subtitle')}
          />

          <motion.div variants={fadeInUp} className="mt-16 flex flex-col lg:flex-row gap-6 lg:gap-10 lg:min-h-[640px]">
            {/* Accordion stack */}
            <div className="lg:w-[55%] relative lg:min-h-[640px]">
              {/* Active indicator */}
              <motion.div
                className="absolute left-0 top-0 w-0.5 bg-teal-500 rounded-full z-10 hidden lg:block"
                animate={{ top: indicatorStyle.top, height: indicatorStyle.height }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />

              <div className="space-y-2 lg:pl-5">
                {features.map((f, i) => {
                  const isActive = active === i;
                  return (
                    <div
                      key={i}
                      ref={(el) => { itemRefs.current[i] = el; }}
                    >
                      {/* Collapsed bar */}
                      <button
                        onClick={() => handleClick(i)}
                        className={`w-full flex items-center gap-3 sm:gap-4 py-3.5 sm:py-4 px-4 sm:px-5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-white/[0.06] border border-teal-500/20'
                            : 'bg-transparent border border-transparent hover:bg-white/[0.03]'
                        }`}
                      >
                        {/* Number */}
                        <span className={`font-mono text-xs transition-colors ${
                          isActive ? 'text-teal-400' : 'text-text-muted'
                        }`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>

                        {/* Icon */}
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isActive
                            ? 'bg-teal-500/15 border border-teal-500/25 text-teal-300'
                            : 'bg-white/5 border border-white/10 text-text-muted'
                        }`}>
                          {f.icon}
                        </div>

                        {/* Title */}
                        <h3 className={`font-bold font-heading flex-1 text-sm sm:text-base transition-colors ${
                          isActive ? 'text-white' : 'text-text-secondary'
                        }`}>
                          {f.title}
                        </h3>

                        {/* Chevron */}
                        <motion.svg
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive ? 'text-teal-400' : 'text-text-muted'
                          }`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>

                      {/* Expanded content — MOBILE ONLY (inline accordion) */}
                      <div className="lg:hidden">
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 sm:px-5 pb-4 pt-1">
                                <p className="text-text-secondary text-sm leading-relaxed mb-3 pl-[52px] sm:pl-[60px]">
                                  {f.desc}
                                </p>
                                <ul className="space-y-1.5 pl-[52px] sm:pl-[60px]">
                                  {f.details.map((d, j) => (
                                    <li key={j} className="flex items-start gap-2 text-text-secondary text-sm">
                                      <CheckSmall />
                                      <span>{d}</span>
                                    </li>
                                  ))}
                                </ul>

                                {/* Mobile visual */}
                                <div className="mt-4 ml-[52px] sm:ml-[60px] h-48 rounded-xl overflow-hidden">
                                  <FeatureVisual index={i} />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Auto-play progress bar — desktop only (no auto-cycle on mobile) */}
              {isDesktop && !userInteracted && (
                <div className="hidden lg:block mt-4 lg:ml-5 h-0.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    key={active}
                    className="h-full bg-teal-500/40 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: AUTO_INTERVAL / 1000, ease: 'linear' }}
                  />
                </div>
              )}

              {/* Desktop expanded content — fixed-height zone below tabs */}
              <div className="hidden lg:block lg:ml-5 mt-6 min-h-[160px] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <p className="text-text-secondary text-sm leading-relaxed mb-3">
                      {features[active].desc}
                    </p>
                    <ul className="space-y-1.5">
                      {features[active].details.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-text-secondary text-sm">
                          <CheckSmall />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Illustration panel (desktop only) */}
            <div className="hidden lg:block lg:w-[45%] lg:sticky lg:top-32 lg:self-start aspect-[4/3] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                >
                  <FeatureVisual index={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
