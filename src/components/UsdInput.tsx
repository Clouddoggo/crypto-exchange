// src/app/swap/components/UsdInput.tsx
'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';

interface UsdInputProps {
  value: string;
  onChange: (val: string) => void;
  onManualCalculate: () => void;
  loading: boolean;
  error?: string | null;
  quickAmounts?: number[]; // e.g. [10, 50, 100]
}

export default function UsdInput({ value, onChange, onManualCalculate, loading, error, quickAmounts = [10, 50, 100] }: UsdInputProps) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">Amount (USD)</label>

      <div className="flex gap-3 items-center">
        <div className="flex items-center gap-3 flex-1 bg-white dark:bg-slate-800 border border-border dark:border-border rounded-lg px-3">
          <DollarSign className="w-5 h-5 opacity-80" />
          <Input
            type="number"
            placeholder="Please enter an amount to explore"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent ring-0 border-0 p-0 text-lg font-semibold text-black dark:text-white placeholder:opacity-60"
            inputMode="decimal"
          />
        </div>

        <Button
          onClick={onManualCalculate}
          disabled={loading}
          className="bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-500 hover:to-rose-400 text-white px-4"
        >
          {loading ? 'Calculating...' : 'Explore'}
        </Button>
      </div>

      <div className="mt-2 flex gap-2">
        {quickAmounts.map((a) => (
          <button
            key={a}
            onClick={() => onChange(String(a))}
            className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground dark:bg-muted text-sm transition"
            type="button"
          >
            ${a}
          </button>
        ))}
      </div>

      {error && <p className="text-xs text-destructive mt-2">{error}</p>}
    </div>
  );
}
