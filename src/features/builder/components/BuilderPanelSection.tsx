import type { ReactNode } from 'react';

interface BuilderPanelSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function BuilderPanelSection({ eyebrow, title, description, children }: BuilderPanelSectionProps) {
  return (
    <section className="rounded-[30px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#111111]">
      {eyebrow ? <p className="text-xs font-medium uppercase tracking-[0.3em] text-rose-500 dark:text-rose-300">{eyebrow}</p> : null}
      <div className="mt-2">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
