'use client';
import type { TokenRequest } from '@/types/token';

interface ResultsProps {
  fromAmount: string | null;
  toAmount: string | null;
  usdAmount: string;
  fromToken: TokenRequest;
  toToken: TokenRequest;
  lastUpdated?: number | null;
}

export default function Results({
  fromAmount,
  toAmount,
  usdAmount,
  fromToken,
  toToken,
  lastUpdated,
}: ResultsProps) {
  const showCrossRate =
    fromAmount && toAmount && fromAmount !== '-' && toAmount !== '-';
  const timestamp = lastUpdated ? new Date(lastUpdated).toLocaleString() : null;

  return (
    <div className="border-border dark:border-border mt-2 rounded-lg border bg-white p-4 text-black shadow-sm transition-colors duration-150 dark:bg-slate-800 dark:text-white">
      <p className="text-sm">
        {usdAmount || 0} USD ≈ <strong>{fromAmount ?? '-'}</strong>{' '}
        {fromToken.symbol}
      </p>
      <p className="text-sm">
        {usdAmount || 0} USD ≈ <strong>{toAmount ?? '-'}</strong>{' '}
        {toToken.symbol}
      </p>
      {showCrossRate && (
        <p className="mt-2 text-xs opacity-80">
          1 {fromToken.symbol} ≈
          {(Number(toAmount) / Number(fromAmount)).toFixed(6)} {toToken.symbol}
        </p>
      )}
      {timestamp && (
        <p className="mt-1 text-xs opacity-60">
          Last calculated at: {timestamp}
        </p>
      )}
    </div>
  );
}
