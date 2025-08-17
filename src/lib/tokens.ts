import type { TokenRequest } from '@/types/token';

export const TOKENS: TokenRequest[] = [
  { symbol: 'USDC', chainId: '1' },
  { symbol: 'USDT', chainId: '137' },
  { symbol: 'ETH', chainId: '8453' },
  { symbol: 'WBTC', chainId: '1' },
];

export const tokenKey = (t: TokenRequest) => `${t.chainId}:${t.symbol}`;

export const TOKEN_LOGO_MAP: Record<string, string> = {
  USDC: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=040',
  USDT: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=040',
  ETC: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=040',
  WBTC: 'https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.svg?v=040'
};
