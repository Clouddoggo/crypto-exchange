// src/app/swap/components/TokenSelect.tsx
'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { TokenRequest, TokenResponse } from '@/types/token';
import { TOKEN_LOGO_MAP, tokenKey, TOKENS } from '@/lib/tokens';
import { useMemo } from 'react';
import TokenBadge from './TokenBadge';

interface TokenSelectProps {
  token: TokenRequest;
  tokenDataMap: Record<string, TokenResponse | null>;
  onChange: (t: TokenRequest) => void;
  label?: string;
}

export default function TokenSelect({
  token,
  tokenDataMap,
  onChange,
  label,
}: TokenSelectProps) {
  const badge = useMemo(
    () => tokenDataMap[tokenKey(token)],
    [token, tokenDataMap],
  );

  return (
    <div>
      {label && (
        <label className="text-muted-foreground mb-1 block text-xs font-medium tracking-wide uppercase">
          {label}
        </label>
      )}
      <Select
        value={token.symbol}
        onValueChange={(val) => onChange(TOKENS.find((t) => t.symbol === val)!)}
      >
        <SelectTrigger className="border-border dark:border-border flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-black shadow-sm transition-colors duration-150 dark:bg-slate-800 dark:text-white">
          <div className="flex items-center gap-2">
            <TokenBadge
              symbol={token.symbol}
              logoUrl={TOKEN_LOGO_MAP[token.symbol]}
            />
          </div>

          <div className="text-xs opacity-80">
            {badge?.priceUsd ? `$${Number(badge.priceUsd).toFixed(4)}` : '—'}
          </div>
        </SelectTrigger>

        <SelectContent>
          {TOKENS.map((token) => (
            <SelectItem key={token.symbol} value={token.symbol}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TokenBadge
                    symbol={token.symbol}
                    logoUrl={TOKEN_LOGO_MAP[token.symbol]}
                  />
                </div>
                &nbsp;
                <small className="opacity-70">
                  {tokenDataMap[tokenKey(token)]?.priceUsd
                    ? `$${Number(tokenDataMap[tokenKey(token)]!.priceUsd).toFixed(4)}`
                    : 'loading...'}
                </small>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
