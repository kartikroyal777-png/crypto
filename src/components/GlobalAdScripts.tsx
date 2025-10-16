import React, { useEffect } from 'react';
import { getAdsByType } from '../data/demoAds';
import { loadScriptOnce } from '../utils/scriptLoader';

const GlobalAdScripts: React.FC = () => {
  useEffect(() => {
    let isCancelled = false;

    const popunderAds = getAdsByType('popunder');
    const webPushAds = getAdsByType('web-push');
    
    const globalAds = [...popunderAds, ...webPushAds];

    globalAds.forEach(ad => {
      if (ad.scriptSrc) {
        const attrs: Record<string, string> = {};
        if (ad.dataAdmpid) attrs['data-admpid'] = ad.dataAdmpid;
        
        loadScriptOnce(ad.scriptSrc, attrs)
          .then(() => {
            if (!isCancelled) {
              console.log(`Global ad script loaded: ${ad.type} (${ad.dataAdmpid})`);
            }
          })
          .catch(() => {
            // Error logging is now handled by the scriptLoader.
            // We can still log a less severe message here if needed, but for now, we'll keep it clean.
            if (!isCancelled) {
              console.warn(`Global ad script for ${ad.name} could not be initialized.`);
            }
          });
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  return null;
};

export default GlobalAdScripts;
