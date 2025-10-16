import React, { useEffect, useRef } from 'react';
import AdSlot from '../components/AdSlot';
import VideoAd from '../components/VideoAd';
import GenericAdSlot from '../components/GenericAdSlot';
import { getAdByPlacement } from '../data/demoAds';
import { htmlAdSnippets } from '../data/htmlAds';

const HomePage: React.FC = () => {
  // Existing Ads from demoAds.ts
  const heroAd = getAdByPlacement('home.hero');
  const inlineVideoAd = getAdByPlacement('home.content.2');
  const sidebarAd2 = getAdByPlacement('home.sidebar.2');
  const footerAd = getAdByPlacement('home.footer');
  const sidebarAd4 = getAdByPlacement('home.sidebar.4');
  const preFooterAd1 = getAdByPlacement('home.pre-footer.1');
  const preFooterAd2 = getAdByPlacement('home.pre-footer.2');
  const postArticleAd = getAdByPlacement('home.post-article.1');

  const scrollAnimationRef = useRef<number | null>(null);

  useEffect(() => {
    let userInteracted = false;

    const stopScrolling = () => {
      userInteracted = true;
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
      window.removeEventListener('wheel', stopScrolling);
      window.removeEventListener('touchstart', stopScrolling);
      window.removeEventListener('mousedown', stopScrolling);
    };
    
    window.addEventListener('wheel', stopScrolling);
    window.addEventListener('touchstart', stopScrolling);
    window.addEventListener('mousedown', stopScrolling);

    const startTimeout = setTimeout(() => {
      const scrollStep = () => {
        if (
          userInteracted ||
          window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
        ) {
          if (scrollAnimationRef.current) {
            cancelAnimationFrame(scrollAnimationRef.current);
          }
          return;
        }
        
        window.scrollBy(0, 2); 
        scrollAnimationRef.current = requestAnimationFrame(scrollStep);
      };

      if (!userInteracted) {
        scrollAnimationRef.current = requestAnimationFrame(scrollStep);
      }

    }, 1500);

    return () => {
      clearTimeout(startTimeout);
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
      window.removeEventListener('wheel', stopScrolling);
      window.removeEventListener('touchstart', stopScrolling);
      window.removeEventListener('mousedown', stopScrolling);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section id="hero" className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-4">
          The Future of Finance is Code
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mb-6">
          News, analysis, and developer tools for the decentralized economy.
        </p>
        {heroAd?.type === 'video-instream' && heroAd.scriptSrc && (
          <VideoAd scriptSrc={heroAd.scriptSrc} dataAdmpid={heroAd.dataAdmpid} />
        )}
      </section>

      {/* Leaderboard Banner Ad */}
      <section className="my-8 flex justify-center">
        <GenericAdSlot 
          htmlContent={htmlAdSnippets.banner_high_perf_728x90} 
          className="w-[728px] h-[90px] bg-gray-200/50 dark:bg-gray-800/50 flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700 rounded-lg" 
        />
      </section>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-3">Latest: Market Movers</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Bitcoin rallies after on-chain upgrades as developers push new L2 tooling. Layer 2 networks reported a 28% increase in daily transactions; we analyze implications for liquidity providers and audit requirements.
            </p>
          </article>

          {/* In-content Banner Ad */}
          <GenericAdSlot 
            htmlContent={htmlAdSnippets.banner_high_perf_468x60} 
            className="w-full max-w-[468px] h-[60px] mx-auto bg-gray-200/50 dark:bg-gray-800/50 flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700 rounded-lg" 
          />

          <AdSlot ad={postArticleAd} placement="home.post-article.1" className="w-full h-24" />

          <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Deep Dive: Building Secure DeFi Infra</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              A comprehensive tutorial with code samples for auditors and builders. Learn the best practices for creating robust and secure decentralized finance applications.
            </p>
            {inlineVideoAd?.type === 'video-instream' && inlineVideoAd.scriptSrc && (
              <VideoAd scriptSrc={inlineVideoAd.scriptSrc} dataAdmpid={inlineVideoAd.dataAdmpid} />
            )}
          </article>
        </div>

        <aside className="space-y-6">
          {/* Sidebar Banner Ad 1 (300x250) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="font-bold mb-4">Sponsored Tools</h4>
            <GenericAdSlot 
              htmlContent={htmlAdSnippets.banner_high_perf_300x250} 
              className="w-[300px] h-[250px] mx-auto bg-gray-200/50 dark:bg-gray-800/50 flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700 rounded-lg" 
            />
          </div>
          {/* Sidebar Banner Ad 2 (effectivegatecpm) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="font-bold mb-4">Another Sponsor</h4>
             <GenericAdSlot 
              htmlContent={htmlAdSnippets.banner_effective_gate} 
              className="w-full min-h-[100px] bg-gray-200/50 dark:bg-gray-800/50 flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700 rounded-lg" 
            />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Subscribe for weekly software and trading insights.</p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="font-bold mb-4">Promoted</h4>
            <AdSlot ad={sidebarAd2} placement="home.sidebar.2" className="w-full h-40" />
          </div>
           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="font-bold mb-4">Final Offer</h4>
            <AdSlot ad={sidebarAd4} placement="home.sidebar.4" className="w-full h-60" />
          </div>
        </aside>
      </main>

      <section className="mt-12">
        <h3 className="text-xl font-bold mb-4 text-center">More From Us</h3>
        <AdSlot ad={footerAd} placement="home.footer" className="w-full h-32" />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <AdSlot ad={preFooterAd1} placement="home.pre-footer.1" className="w-full h-40" />
            <AdSlot ad={preFooterAd2} placement="home.pre-footer.2" className="w-full h-40" />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
