'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { getTranslations } from '@/lib/translations';
import { staggerContainer, fadeInUp, easeOutExpo } from '@/lib/animations';

interface MetricProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  triggered: boolean;
}

function AnimatedCounter({ target, prefix = '', suffix = '', label, triggered }: MetricProps) {
  const [value, setValue] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!triggered) return;
    const duration = 2000;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setFinished(true);
      }
    }
    requestAnimationFrame(animate);
  }, [triggered, target]);

  return (
    <motion.div variants={fadeInUp} className="text-center">
      <motion.div
        animate={finished ? { scale: [1, 1.12, 1] } : {}}
        transition={finished ? { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } : {}}
        className="text-4xl sm:text-5xl md:text-6xl font-black font-mono gradient-text"
      >
        {prefix}{value.toLocaleString()}{suffix}
      </motion.div>
      <div className="mt-2 text-xs uppercase tracking-widest text-text-muted">{label}</div>
    </motion.div>
  );
}

export default function Metrics() {
  const t = getTranslations('metrics');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const metrics = [
    { target: 5000, suffix: '+', label: t('items.0.label') },
    { target: 10, suffix: '+', label: t('items.1.label') },
    { target: 45, label: t('items.2.label') },
    { target: 0, label: t('items.3.label') },
  ];

  return (
    <section className="relative py-12 md:py-16 section-glow-divider section-darker">
      <div className="mx-auto max-w-[1640px] px-6">
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((m, i) => (
            <AnimatedCounter key={i} {...m} triggered={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
