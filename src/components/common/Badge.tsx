import React from 'react';
import clsx from 'clsx';

export type BadgeVariant = 
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'emergency'
  | 'offline'
  | 'neutral'
  | 'coming-soon';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className,
  dot = false,
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-polar-blue-light text-navy-DEFAULT border border-blue-200/60',
    primary: 'bg-polar-blue text-white font-medium',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200/80',
    emergency: 'bg-rose-50 text-rose-700 border border-rose-200/80',
    offline: 'bg-orange-50 text-orange-700 border border-orange-200/80',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    'coming-soon': 'bg-slate-100/80 text-slate-500 border border-slate-200/60 text-[10px] uppercase tracking-wider',
  };

  const dotColors: Record<BadgeVariant, string> = {
    default: 'bg-polar-blue',
    primary: 'bg-white',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    emergency: 'bg-rose-500',
    offline: 'bg-orange-500',
    neutral: 'bg-slate-400',
    'coming-soon': 'bg-slate-400',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-md font-medium tracking-tight whitespace-nowrap',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
};
