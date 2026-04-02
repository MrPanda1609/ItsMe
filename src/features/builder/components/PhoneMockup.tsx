import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PhoneMockupProps {
  children: ReactNode;
}

export function PhoneMockup({ children }: PhoneMockupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[390/844] h-full w-auto max-h-full max-w-[410px]"
    >
      <div className="absolute inset-0 rounded-[48px] bg-slate-200/10 blur-2xl" />
      <div className="relative h-full rounded-[48px] border border-white/10 bg-[#0b1120] p-[10px] shadow-[0_40px_100px_rgba(2,6,23,0.56)]">
        <div className="pointer-events-none absolute left-[-3px] top-[172px] h-16 w-[3px] rounded-r-full bg-white/18" />
        <div className="pointer-events-none absolute left-[-3px] top-[248px] h-10 w-[3px] rounded-r-full bg-white/14" />
        <div className="pointer-events-none absolute right-[-3px] top-[206px] h-20 w-[3px] rounded-l-full bg-white/14" />

        <div className="relative h-full overflow-hidden rounded-[38px] border border-white/10 bg-slate-950">
          <div className="pointer-events-none absolute left-1/2 top-0 z-30 h-7 w-36 -translate-x-1/2 rounded-b-[20px] bg-[#05070d] shadow-[0_4px_12px_rgba(0,0,0,0.35)]" />
          {children}
        </div>
      </div>
    </motion.div>
  );
}
