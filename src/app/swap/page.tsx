"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TokenRequest, TokenResponse } from "@/types/token";

const TOKENS: TokenRequest[] = [
  { symbol: "USDC", chainId: "1" },
  { symbol: "USDT", chainId: "137" },
  { symbol: "ETH", chainId: "8453" },
  { symbol: "WBTC", chainId: "1" },
];

export default function TokenSwapPage() {
  const [fromToken, setFromToken] = useState<TokenRequest>(TOKENS[0]);
  const [toToken, setToToken] = useState<TokenRequest>(TOKENS[2]);
  const [usdAmount, setUsdAmount] = useState<string>("");
  const [fromAmount, setFromAmount] = useState<string | null>(null);
  const [toAmount, setToAmount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

const fetchTokenBatch = async (tokens: TokenRequest[]): Promise<TokenResponse[]> => {
  const res = await fetch("/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tokens),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch token data");
  }

  return res.json();
};


const handleCalculate = async () => {
  if (!usdAmount) return;
  setLoading(true);

  try {
    const [fromData, toData] = await fetchTokenBatch([
      { chainId: fromToken.chainId, symbol: fromToken.symbol },
      { chainId: toToken.chainId, symbol: toToken.symbol },
    ]);

    const fromTokens = fromData.priceUsd ? (parseFloat(usdAmount) / fromData.priceUsd).toFixed(4) : '-';
    const toTokens = toData.priceUsd ? (parseFloat(usdAmount) / toData.priceUsd).toFixed(4): '-';

    setFromAmount(fromTokens);
    setToAmount(toTokens);
  } catch (error) {
    console.error("Error calculating swap:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-lg mx-auto mt-12">
      <Card className="bg-gray-900 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Token Price Explorer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* From Token */}
          <div>
            <label className="block mb-1 text-sm">From Token</label>
            <Select
              value={fromToken.symbol}
              onValueChange={(val) =>
                setFromToken(TOKENS.find((t) => t.symbol === val)!)
              }
            >
              <SelectTrigger className="bg-gray-800 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TOKENS.map((t) => (
                  <SelectItem key={t.symbol} value={t.symbol}>
                    {t.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* To Token */}
          <div>
            <label className="block mb-1 text-sm">To Token</label>
            <Select
              value={toToken.symbol}
              onValueChange={(val) =>
                setToToken(TOKENS.find((t) => t.symbol === val)!)
              }
            >
              <SelectTrigger className="bg-gray-800 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TOKENS.map((t) => (
                  <SelectItem key={t.symbol} value={t.symbol}>
                    {t.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* USD Input */}
          <div>
            <label className="block mb-1 text-sm">Enter USD Amount</label>
            <Input
              type="number"
              placeholder="100"
              value={usdAmount}
              onChange={(e) => setUsdAmount(e.target.value)}
              className="bg-gray-800 text-white"
            />
          </div>

          {/* Button */}
          <Button
            onClick={handleCalculate}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-400 text-black font-semibold"
          >
            {loading ? "Calculating..." : "Explore Swap"}
          </Button>

          {/* Results */}
          {fromAmount && toAmount && (
            <div className="bg-gray-800 p-4 rounded-lg mt-4">
              <p>
                {usdAmount} USD ≈ {fromAmount} {fromToken.symbol}
              </p>
              <p>
                {usdAmount} USD ≈ {toAmount} {toToken.symbol}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
