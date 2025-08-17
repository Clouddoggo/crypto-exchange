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
        className={'flex items-center justify-center rounded-full bg-gradient-to-br from-white/10 via-white/5 to-white/0 dark:from-black/10 dark:via-black/5 w-7 h-7 text-sm ring-1 ring-inset ring-border'}
        aria-hidden
      >
        <Avatar className="rounded-sm">
          {logoUrl && <AvatarImage
            src={logoUrl}
            alt="@evilrabbit"
          />}
          <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      </div>

      <div className="flex flex-col leading-tight">
        <span className="font-medium text-sm">{symbol}</span>
        {name && <small className="text-xs opacity-70 -mt-0.5">{name}</small>}
      </div>
    </div>
  );
}
