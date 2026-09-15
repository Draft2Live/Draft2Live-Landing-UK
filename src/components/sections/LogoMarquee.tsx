'use client';
import { getTranslations } from '@/lib/translations';

const logos = ['WordPress', 'Drupal', 'Shopify', 'Google', 'Claude', 'Flux', 'Google Search Console'];

export default function LogoMarquee() {
  const t = getTranslations('logoMarquee');
  return (
    <section className="relative py-12 md:py-16 border-y border-border overflow-hidden">
      <p className="text-center text-xs uppercase tracking-widest text-text-muted mb-6">
        {t('heading')}
      </p>
      <div className="relative flex overflow-hidden group">
        <div className="flex gap-16 animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]">
          {[...logos, ...logos].map((name, i) => (
            <span key={i} className="text-2xl font-bold text-white/15 hover:text-white/40 transition-colors whitespace-nowrap select-none">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
