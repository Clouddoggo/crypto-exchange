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

export default function UsdInput({
  value,
  onChange,
  onManualCalculate,
  loading,
  error,
  quickAmounts = [10, 50, 100],
}: UsdInputProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">Amount (USD)</label>

      <div className="flex items-center gap-3">
        <div className="border-border dark:border-border flex flex-1 items-center gap-3 rounded-lg border bg-white px-3 dark:bg-slate-800">
          <DollarSign className="h-5 w-5 opacity-80" />
          <Input
            type="number"
            placeholder="Please enter an amount to explore"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border-0 bg-transparent p-0 text-lg font-semibold text-black ring-0 placeholder:opacity-60 dark:text-white"
            inputMode="decimal"
          />
        </div>

        <Button
          onClick={onManualCalculate}
          disabled={loading}
          className="bg-gradient-to-r from-indigo-600 to-rose-500 px-4 text-white hover:from-indigo-500 hover:to-rose-400"
        >
          {loading ? 'Calculating...' : 'Explore'}
        </Button>
      </div>

      <div className="mt-2 flex gap-2">
        {quickAmounts.map((a) => (
          <button
            key={a}
            onClick={() => onChange(String(a))}
            className="bg-muted text-muted-foreground dark:bg-muted rounded-md px-2 py-1 text-sm text-xs transition"
            type="button"
          >
            ${a}
          </button>
        ))}
      </div>

      {error && <p className="text-destructive mt-2 text-xs">{error}</p>}
    </div>
  );
}
