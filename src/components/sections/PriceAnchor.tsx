'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { getTranslations } from '@/lib/translations';
import { fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';

// Monthly list prices checked on each vendor's pricing page in September
// 2026 (priceAnchor.priceNote says so on the page). Jasper sells in USD
// only — $69 is shown as ≈ €63. DeepL Pro (price not confirmable on its own
// page) and the WP SEO plugins (Draft2Live writes Yoast meta but does not
// replace the plugin) were dropped. Totals are computed from this list.
const competitorMeta = [
  { price: 134 },
  { price: 59 },
  { price: 63 },
];
const D2L_PRICE = 49;

export default function PriceAnchor() {
  const t = getTranslations('priceAnchor');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const competitors = competitorMeta.map((c, i) => ({
    ...c,
    name: t(`competitors.${i}.name`),
    desc: t(`competitors.${i}.desc`),
  }));
  const total = competitors.reduce((sum, c) => sum + c.price, 0);
  const savings = total - D2L_PRICE;
  const number = new Intl.NumberFormat('uk');

  return (
    <section className="relative py-20 md:py-28 section-teal" ref={ref}>
      <div className="mx-auto max-w-[1640px] px-6">
        <SectionHeader badge={t('header.badge')} title={t('header.title', { total: number.format(total) })} />

        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Competitors */}
          <motion.div variants={fadeInLeft} className="space-y-3">
            {competitors.map((c) => (
              <div key={c.name} className="glass-card !p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{c.name}</div>
                  <div className="text-sm text-text-muted">{c.desc}</div>
                </div>
                <div className="font-mono font-bold text-text-secondary">€{c.price}{t('perMonth')}</div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-text-secondary font-bold">{t('totalLabel')}</span>
              <span className="font-mono text-2xl font-bold text-[#e1e1e1] line-through">€{total}{t('perMonth')}</span>
            </div>
            <p className="text-xs text-text-muted">{t('priceNote')}</p>
          </motion.div>

          {/* Draft2Live */}
          <motion.div variants={fadeInRight} className="relative">
            <div className="pricing-featured rounded-2xl p-8 md:p-12 text-center">
              <div className="text-sm uppercase tracking-widest text-teal-300 mb-2">{t('d2l.eyebrow')}</div>
              <div className="text-6xl md:text-7xl font-black font-mono gradient-text" style={{ letterSpacing: '-0.04em' }}>€{D2L_PRICE}</div>
              <div className="text-text-secondary mt-1">{t('d2l.priceSuffix')}</div>
              <div className="mt-6 inline-block px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20">
                <span className="text-teal-300 font-bold text-sm">
                  {t('d2l.savings', { savings: number.format(savings), yearly: number.format(savings * 12) })}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
