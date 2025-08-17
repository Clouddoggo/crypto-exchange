'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import type { TokenRequest, TokenResponse } from '@/types/token';
import { tokenKey, TOKENS } from '@/lib/tokens';
import { useMemo } from 'react';

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
          {token.symbol} 
          <div className="text-xs opacity-80">
            {badge?.priceUsd ? `${Number(badge.priceUsd).toFixed(4)} USD/unit` : '—'}
          </div>
        </SelectTrigger>

        <SelectContent>
          {TOKENS.map((token) => (
            <SelectItem key={token.symbol} value={token.symbol}>
              <div className="flex items-center justify-between">
                {token.symbol}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
