import { useState, useEffect } from 'react';

interface TokenData {
  marketCap: string;
  priceUsd: string;
  error?: string;
}

export function useTokenPrice(tokenAddress: string, chainId: string = 'ethereum') {
  const [tokenData, setTokenData] = useState<TokenData>({
    marketCap: 'N/A',
    priceUsd: 'N/A'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenData = async () => {
      if (!tokenAddress || !chainId) {
        setTokenData({
          marketCap: 'N/A',
          priceUsd: 'N/A'
        });
        setIsLoading(false);
        setError(null);
        return;
      }

      try {
        const chainPrefix = chainId === 'ethereum' ? 'ethereum' : chainId;
        const response = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${chainPrefix}/${tokenAddress}`
        );
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          const mcap = pair.fdv || pair.mcap;
          setTokenData({
            marketCap: formatMarketCap(mcap),
            priceUsd: pair.priceUsd || 'N/A'
          });
          setError(null);
        } else {
          setTokenData({
            marketCap: 'N/A',
            priceUsd: 'N/A',
            error: 'No trading pairs found'
          });
          setError('No trading pairs found');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setError(errorMessage);
        setTokenData({
          marketCap: 'N/A',
          priceUsd: 'N/A',
          error: 'Failed to fetch token data'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchTokenData, 30000);

    return () => clearInterval(interval);
  }, [tokenAddress, chainId]);

  return {
    marketCap: tokenData.marketCap,
    priceUsd: tokenData.priceUsd,
    isLoading,
    error
  };
}

function formatMarketCap(value: string | undefined): string {
  if (!value) return 'N/A';
  
  const num = parseFloat(value);
  if (isNaN(num)) return 'N/A';
  
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(2)}B`;
  }
  if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(2)}M`;
  }
  if (num >= 1e3) {
    return `$${(num / 1e3).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
}