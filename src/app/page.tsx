// src/app/swap/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeftRight, ArrowRight } from 'lucide-react';
import TokenSelect from '@/components/TokenSelect';
import UsdInput from '@/components/UsdInput';
import Results from '@/components/Results';
import { TOKENS } from '@/lib/tokens';
import type { TokenRequest, TokenResponse } from '@/types/token';
import ThemeToggle from '@/components/ThemeToggle';

export default function TokenSwapPage() {
  const [fromToken, setFromToken] = useState<TokenRequest>(TOKENS[0]);
  const [toToken, setToToken] = useState<TokenRequest>(TOKENS[2]);
  const [usdAmount, setUsdAmount] = useState('');
  const [fromAmount, setFromAmount] = useState<string | null>(null);
  const [toAmount, setToAmount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenDataMap, setTokenDataMap] = useState<
    Record<string, TokenResponse | null>
  >({});
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const fetchTokenBatch = async (
    tokens: TokenRequest[],
  ): Promise<TokenResponse[]> => {
    const res = await fetch('/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tokens),
    });
    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      throw new Error(payload?.error || 'Failed to fetch token data');
    }
    return res.json();
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const resp = await fetchTokenBatch(TOKENS);
        if (cancelled) return;
        const map: Record<string, TokenResponse | null> = {};
        resp.forEach((r) => (map[`${r.chainId}:${r.symbol}`] = r));
        setTokenDataMap(map);
      } catch (err) {
        console.error('Unable to preload token data:', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const calculate = async (usd: number | null) => {
    if (usd === null || Number.isNaN(usd)) return;
    setLoading(true);
    setError(null);
    try {
      const [fromData, toData] = await fetchTokenBatch([
        { chainId: fromToken.chainId, symbol: fromToken.symbol },
        { chainId: toToken.chainId, symbol: toToken.symbol },
      ]);

      setTokenDataMap((prev) => ({
        ...prev,
        [`${fromData.chainId}:${fromData.symbol}`]: {
          ...fromData,
          lastUpdated: Date.now(),
        },
        [`${toData.chainId}:${toData.symbol}`]: {
          ...toData,
          lastUpdated: Date.now(),
        },
      }));

      setFromAmount(
        fromData.priceUsd ? (usd / fromData.priceUsd).toFixed(6) : '-',
      );
      setToAmount(toData.priceUsd ? (usd / toData.priceUsd).toFixed(6) : '-');
      setLastUpdated(Date.now());
    } catch (err) {
      console.error(err);
      setError((err as Error)?.message ?? 'Failed to calculate');
    } finally {
      setLoading(false);
    }
  };

  // debounce & clear results when input is empty
  useEffect(() => {
    const raw = usdAmount.trim();

    if (!raw) {
      // clear results and timestamp when input is blank
      setFromAmount(null);
      setToAmount(null);
      setLastUpdated(null);
      setError(null);
      return;
    }

    const n = Number(raw);
    if (Number.isNaN(n)) {
      setError('Please enter a valid number');
      return;
    }

    const t = setTimeout(() => calculate(n), 500);
    return () => clearTimeout(t);
  }, [usdAmount, fromToken, toToken]);

  const handleManualCalculate = async () => {
    const n = Number(usdAmount);

    if (!usdAmount || Number.isNaN(n)) {
      // Clear results if the input is invalid/empty, show the error
      setError('Enter a valid USD amount');
      setFromAmount(null);
      setToAmount(null);
      setLastUpdated(null);
      return;
    }

    await calculate(n);
  };

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    if (usdAmount) {
      const n = Number(usdAmount);
      if (!Number.isNaN(n)) calculate(n);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 text-black dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-2xl">
        <header className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Token Price Explorer</h1>
            <p className="text-muted-foreground mt-1 max-w-xl text-sm">
              Explore approximate token amounts for a USD value.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <Card className="border-border dark:border-border overflow-hidden rounded-2xl border bg-white shadow-xl dark:bg-slate-900">
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-12 items-end gap-4">
              <div className="col-span-5">
                <TokenSelect
                  token={fromToken}
                  tokenDataMap={tokenDataMap}
                  onChange={setFromToken}
                  label="From"
                />
              </div>

              <div className="col-span-2 flex justify-center">
                <button
                  onClick={handleSwap}
                  aria-label="swap tokens"
                  className="border-border dark:border-border rounded-full border bg-white p-2 shadow-sm transition-transform hover:scale-105 dark:bg-slate-800"
                >
                  <ArrowLeftRight className="h-5 w-5" />
                </button>
              </div>

              <div className="col-span-5">
                <TokenSelect
                  token={toToken}
                  tokenDataMap={tokenDataMap}
                  onChange={setToToken}
                  label="To"
                />
              </div>
            </div>

            <UsdInput
              value={usdAmount}
              onChange={setUsdAmount}
              onManualCalculate={handleManualCalculate}
              loading={loading}
              error={error}
            />

            {(fromAmount !== null || toAmount !== null) && (
              <Results
                fromAmount={fromAmount}
                toAmount={toAmount}
                usdAmount={usdAmount}
                fromToken={fromToken}
                toToken={toToken}
                lastUpdated={lastUpdated}
              />
            )}
          </CardContent>
        </Card>

        <footer className="text-muted-foreground mt-6 text-xs">
          Tip: Values are approximations — for swaps check a DEX aggregator for
          real quotes & slippage estimates.
        </footer>
      </div>
    </div>
  );
}
