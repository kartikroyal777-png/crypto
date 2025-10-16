import React, { useEffect } from 'react';
import { getAdsByType } from '../data/demoAds';
import { loadScriptOnce } from '../utils/scriptLoader';
import { htmlAdSnippets } from '../data/htmlAds';

// User-specified "video slider" and other global ads from onclckmn.com
const onclckmnAdmpids = [
  "383037", // video slider
  "383035", // video slider
  "383033", // video slider
  "381877", // video slider
  "382319", // video slider / popunder
];

const GlobalAdScripts: React.FC = () => {
  useEffect(() => {
    let isCancelled = false;

    // --- Load Global Ads from demoAds.ts ---
    const popunderAds = getAdsByType('popunder');
    const webPushAds = getAdsByType('web-push');
    const globalAdsFromData = [...popunderAds, ...webPushAds];

    globalAdsFromData.forEach(ad => {
      if (ad.scriptSrc && !isCancelled) {
        const attrs: Record<string, string> = {};
        if (ad.dataAdmpid) attrs['data-admpid'] = ad.dataAdmpid;
        loadScriptOnce(ad.scriptSrc, attrs)
            .then(() => console.log(`Global ad script loaded: ${ad.type} (${ad.dataAdmpid})`))
            .catch(() => {}); // Errors are already logged by the loader
      }
    });
    
    // --- Load User-specified "Video Slider" Ads ---
    onclckmnAdmpids.forEach(admpid => {
        if (!isCancelled) {
            loadScriptOnce("https://js.onclckmn.com/static/onclicka.js", { 'data-admpid': admpid })
                .then(() => console.log(`onclckmn.com ad loaded for admpid: ${admpid}`))
                .catch(() => {});
        }
    });

    // --- Load other global scripts from HTML snippets ---
    const socialAdFragment = document.createRange().createContextualFragment(htmlAdSnippets.social_effective_gate);
    const socialAdScript = socialAdFragment.querySelector('script');
    if (socialAdScript && !isCancelled) {
        loadScriptOnce(socialAdScript.src).catch(() => {});
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  return null; // This component doesn't render anything
};

export default GlobalAdScripts;
