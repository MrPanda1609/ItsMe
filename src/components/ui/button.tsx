import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type ButtonVariant = 'default' | 'outline' | 'ghost';
type ButtonSize = 'default' | 'sm';

const variantClasses: Record<ButtonVariant, string> = {
  default: 'border-transparent bg-slate-950 text-white shadow-sm hover:bg-slate-800 active:translate-y-px dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100',
  outline: 'border-gray-200 bg-white text-slate-700 shadow-sm hover:border-gray-300 hover:bg-gray-50 active:translate-y-px dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]',
  ghost: 'border-transparent bg-transparent text-slate-600 hover:bg-rose-50 hover:text-rose-700 active:translate-y-px dark:text-slate-300 dark:hover:bg-rose-500/10 dark:hover:text-rose-200',
};

const sizeClasses: Record<ButtonSize, string> = {
  default: 'h-11 px-4 text-sm',
  sm: 'h-9 px-3 text-xs',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ className, type = 'button', variant = 'default', size = 'default', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-2xl border font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
