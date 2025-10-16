import React, { useEffect, useState } from 'react';
import type { AdUnit } from '../types/ads';
import { loadScriptOnce } from '../utils/scriptLoader';

interface AdSlotProps { 
  ad?: AdUnit | null; 
  placement: string; 
  className?: string; 
  children?: React.ReactNode;
}

export default function AdSlot({ ad, placement, className, children }: AdSlotProps) {
  const [loadState, setLoadState] = useState<'idle' | 'loading' | 'loaded' | 'failed'>('idle');

  useEffect(() => {
    let isCancelled = false;

    setLoadState('idle');

    if (!ad || !ad.scriptSrc) {
      return;
    }

    setLoadState('loading');
    const attrs: Record<string,string> = {};
    if (ad.dataAdmpid) attrs['data-admpid'] = ad.dataAdmpid;
    
    loadScriptOnce(ad.scriptSrc, attrs)
      .then(() => {
        if (!isCancelled) {
          console.log(`Ad script loaded for placement: ${placement}`);
          setLoadState('loaded');
        }
      })
      .catch(() => { // Error logging is now handled by the scriptLoader
        if (!isCancelled) {
          setLoadState('failed');
        }
      });
    
    return () => {
      isCancelled = true;
    };
  }, [ad, placement]);

  const getMessage = () => {
    switch (loadState) {
      case 'failed':
        return <span className="text-sm text-red-500 dark:text-red-400 p-4">Ad failed to load</span>;
      case 'loading':
        return <span className="text-sm text-gray-500 dark:text-gray-400 p-4">Loading ad...</span>;
      case 'loaded':
         return <span className="text-sm text-green-500 dark:text-green-400 p-4">Ad Container: {placement}</span>;
      default:
        return <span className="text-sm text-gray-500 dark:text-gray-400 p-4">Ad Slot: {placement}</span>;
    }
  };

  return (
    <div className={`border border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center bg-gray-200/50 dark:bg-gray-800/50 ${className ?? ''}`} data-placement={placement}>
      {children || getMessage()}
    </div>
  );
}
