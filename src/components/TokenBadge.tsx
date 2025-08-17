// src/app/swap/components/TokenBadge.tsx
'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface TokenBadgeProps {
  symbol: string;
  name?: string;
  logoUrl?: string | null;
}

export default function TokenBadge({ symbol, name, logoUrl }: TokenBadgeProps) {
  const initials = symbol.slice(0, 3).toUpperCase();

  return (
    <div className={'inline-flex items-center gap-3 py-0.5'}>
      <div
        className={
          'ring-border flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-white/10 via-white/5 to-white/0 text-sm ring-1 ring-inset dark:from-black/10 dark:via-black/5'
        }
        aria-hidden
      >
        <Avatar className="rounded-sm">
          {logoUrl && <AvatarImage src={logoUrl} alt="@evilrabbit" />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col leading-tight">
        <span className="text-sm font-medium">{symbol}</span>
        {name && <small className="-mt-0.5 text-xs opacity-70">{name}</small>}
      </div>
    </div>
  );
}
