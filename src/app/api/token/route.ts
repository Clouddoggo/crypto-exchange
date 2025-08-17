import { NextRequest, NextResponse } from "next/server";
import { Erc20AssetInfo, getAssetErc20ByChainAndSymbol, getAssetPriceInfo, GetAssetPriceInfoResponse } from "@funkit/api-base";
import { TokenRequest, TokenResponse } from "@/types/token";

// Simple in-memory caches
const tokenInfoCache = new Map<string, { timstamp: number; data: Erc20AssetInfo }>();
const priceCache = new Map<string, { timstamp: number; data: GetAssetPriceInfoResponse }>();

const TOKEN_INFO_TTL = 1000 * 60 * 60 * 24; // 24 hours
const PRICE_TTL = 1000 * 30; // 30 seconds

export async function POST(req: NextRequest) {
  try {
    const body: TokenRequest[] | TokenRequest = await req.json();
    const apiKey = process.env.FUNKIT_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    const tokens: TokenRequest[] = Array.isArray(body) ? body : [body];

    const results: TokenResponse[] = await Promise.all(
      tokens.map(async ({ chainId, symbol }) => {
        const cacheKey = `${chainId}:${symbol}`;

        try {
          let tokenInfo = tokenInfoCache.get(cacheKey);
          if (!tokenInfo || Date.now() - tokenInfo.timstamp > TOKEN_INFO_TTL) {
            const info = await getAssetErc20ByChainAndSymbol({
              chainId,
              symbol,
              apiKey,
            });
            tokenInfo = { timstamp: Date.now(), data: info };
            tokenInfoCache.set(cacheKey, tokenInfo);
          }

          const infoData = tokenInfo.data;

          if (!infoData?.address) {
            return { symbol, chainId, error: "Token not found" };
          }

          let price = priceCache.get(infoData.address);
          if (!price || Date.now() - price.timstamp > PRICE_TTL) {
            const priceInfo = await getAssetPriceInfo({
              chainId,
              assetTokenAddress: infoData.address,
              apiKey,
            });
            price = { timstamp: Date.now(), data: priceInfo };
            priceCache.set(infoData.address, price);
          }

          return {
            symbol,
            chainId,
            address: infoData.address,
            decimals: infoData.decimals,
            priceUsd: price.data.unitPrice,
          };
        } catch (err) {
          console.error(`Error fetching ${symbol} on chain ${chainId}:`, err);
          return { symbol, chainId, error: "Fetch error" };
        }
      })
    );

    return NextResponse.json(results);
  } catch (err) {
    console.error("Error in /api/token:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
