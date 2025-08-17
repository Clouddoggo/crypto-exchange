import type { TokenRequest } from "@/types/token";

export const TOKENS: TokenRequest[] = [
    { symbol: "USDC", chainId: "1" },
    { symbol: "USDT", chainId: "137" },
    { symbol: "ETH", chainId: "8453" },
    { symbol: "WBTC", chainId: "1" },
];

export const tokenKey = (t: TokenRequest) => `${t.chainId}:${t.symbol}`;