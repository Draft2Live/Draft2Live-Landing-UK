'use client';

import { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { getTranslations } from '@/lib/translations';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';

type PlanId = 'free' | 'connect' | 'team' | 'enterprise';

interface PlanFeature {
  text: string;
}

interface Plan {
  id: PlanId;
  name: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: PlanFeature[];
  ctaText: string;
  featured?: boolean;
  ctaVariant: 'primary' | 'secondary';
  isContactSales?: boolean;
}

const planMeta: {
  id: PlanId;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  featured?: boolean;
  ctaVariant: 'primary' | 'secondary';
  hasBadge?: boolean;
  isContactSales?: boolean;
}[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    ctaVariant: 'secondary',
  },
  {
    id: 'connect',
    name: 'Connect',
    monthlyPrice: 49,
    annualPrice: 41,
    featured: true,
    ctaVariant: 'primary',
    hasBadge: true,
  },
  {
    id: 'team',
    name: 'Team',
    monthlyPrice: 149,
    annualPrice: 124,
    ctaVariant: 'secondary',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 0, // not rendered — shown as "Custom" via customPriceLabel
    annualPrice: 0,
    ctaVariant: 'secondary',
    isContactSales: true,
  },
];

function getCtaHref(planId: PlanId, isAnnual: boolean): string {
  const period = isAnnual ? 'annual' : 'monthly';
  if (planId === 'free') return 'https://draft2live.ai/en/register';
  if (planId === 'enterprise') return 'https://draft2live.ai/en?plan=enterprise';
  return `https://draft2live.ai/en/register?plan=${planId}&period=${period}`;
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function Pricing() {
  const t = getTranslations('pricing');
  const [isAnnual, setIsAnnual] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const plans: Plan[] = planMeta.map((meta, i) => ({
    id: meta.id,
    name: meta.name,
    monthlyPrice: meta.monthlyPrice,
    annualPrice: meta.annualPrice,
    ctaVariant: meta.ctaVariant,
    featured: meta.featured,
    isContactSales: meta.isContactSales,
    badge: meta.hasBadge ? t(`plans.${i}.badge`) : undefined,
    description: t(`plans.${i}.description`),
    features: (t.raw(`plans.${i}.features`) as string[]).map((text) => ({ text })),
    ctaText: t(`plans.${i}.ctaText`),
  }));

  return (
    <section id="pricing" className="relative py-28 md:py-40 overflow-hidden section-accent">
      <div className="max-w-[1640px] mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <SectionHeader
            badge={t('header.badge')}
            title={t('header.title')}
          />

          {/* Billing toggle */}
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mt-8 mb-12">
            <span
              className={`text-sm font-normal transition-colors ${
                !isAnnual ? 'text-white' : 'text-text-muted'
              }`}
            >
              {t('billing.monthly')}
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 rounded-full bg-surface border border-border transition-colors hover:border-primary/30 cursor-pointer"
              aria-label={t('billing.toggleAriaLabel')}
            >
              <motion.div
                className="absolute top-0.5 w-6 h-6 rounded-full bg-teal-500"
                animate={{ left: isAnnual ? '30px' : '2px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span
              className={`text-sm font-normal transition-colors flex items-center gap-2 ${
                isAnnual ? 'text-white' : 'text-text-muted'
              }`}
            >
              {t('billing.annual')}
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-hot/10 text-hot border border-hot/20">
                {t('billing.discount')}
              </span>
            </span>
          </motion.div>

          {/* Pricing cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            {plans.map((plan) => (
              <motion.div key={plan.name} variants={fadeInUp} className={`pt-4 ${plan.featured ? 'scale-[1.03] z-10' : ''}`}>
                <div
                  className={`relative h-full flex flex-col rounded-2xl ${
                    plan.featured
                      ? 'pricing-featured p-8 md:p-10'
                      : 'glass-card p-6 md:p-8'
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                      <span className="px-4 py-1.5 text-xs font-bold rounded-full bg-teal-600 text-white whitespace-nowrap shadow-lg shadow-teal-500/20">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Plan header — fixed height for alignment */}
                  <div className="mb-6 min-h-[72px]">
                    <h3 className="text-lg font-heading font-bold text-white" style={{ letterSpacing: '-0.01em' }}>{plan.name}</h3>
                    <p className="text-text-muted text-sm mt-1" style={{ textWrap: 'pretty' }}>{plan.description}</p>
                  </div>

                  {/* Price — Enterprise shows "Custom" instead of € amount */}
                  <div className="mb-6">
                    {plan.isContactSales ? (
                      <div className="flex items-baseline gap-1">
                        <span
                          className="text-4xl font-heading font-black text-white"
                          style={{ letterSpacing: '-0.03em' }}
                        >
                          {t('customPriceLabel')}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={isAnnual ? 'annual' : 'monthly'}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="text-4xl font-heading font-black text-white"
                            style={{ letterSpacing: '-0.03em' }}
                          >
                            €{isAnnual ? plan.annualPrice : plan.monthlyPrice}
                          </motion.span>
                        </AnimatePresence>
                        <span className="text-text-muted text-sm">{t('perMonth')}</span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-2.5">
                        <CheckIcon />
                        <span className="text-text-secondary text-sm">{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA — product is live, route directly to register.
                      EarlyAccessModal is reserved for non-ready flows; Pricing
                      goes to the actual app. URL responds to isAnnual. */}
                  <Button
                    href={getCtaHref(plan.id, isAnnual)}
                    rel="noopener"
                    variant={plan.ctaVariant}
                    className="w-full justify-center"
                  >
                    {plan.ctaText}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Translations are counted as articles; say so before the limit does. */}
          <motion.p variants={fadeInUp} className="mt-10 text-center text-text-muted text-sm">
            {t('note')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
