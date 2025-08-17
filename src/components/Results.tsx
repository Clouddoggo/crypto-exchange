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

export default function Results({ fromAmount, toAmount, usdAmount, fromToken, toToken, lastUpdated }: ResultsProps) {
  const showCrossRate = fromAmount && toAmount && fromAmount !== "-" && toAmount !== "-";
  const timestamp = lastUpdated 
    ? new Date(lastUpdated).toLocaleString() 
    : null;

  return (
    <div className="p-4 rounded-lg mt-2 bg-white dark:bg-slate-800 text-black dark:text-white border border-border dark:border-border shadow-sm transition-colors duration-150">
      <p className="text-sm">
        {usdAmount || 0} USD ≈ <strong>{fromAmount ?? "-"}</strong> {fromToken.symbol}
      </p>
      <p className="text-sm">
        {usdAmount || 0} USD ≈ <strong>{toAmount ?? "-"}</strong> {toToken.symbol}
      </p>
      {showCrossRate && (
        <p className="text-xs opacity-80 mt-2">
          1 {fromToken.symbol} ≈ 
          {(Number(toAmount) / Number(fromAmount)).toFixed(6)} {toToken.symbol}
        </p>
      )}
      {timestamp && <p className="text-xs opacity-60 mt-1">Last calculated at: {timestamp}</p>}
    </div>
  );
}