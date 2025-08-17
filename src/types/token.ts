
export interface TokenRequest {
    chainId: string;
    symbol: string;
}

export interface TokenResponse {
    symbol: string;
    chainId: string;
    address?: string;
    decimals?: number;
    // unitPrice returned by @funkit/api-base is a number (USD per 1 token)
    priceUsd?: number | null;
    error?: string;
}
