import React, { useEffect, useRef } from 'react';
import AdSlot from '../components/AdSlot';
import VideoAd from '../components/VideoAd';
import { getAdByPlacement } from '../data/demoAds';

const HomePage: React.FC = () => {
  // Existing Ads
  const heroAd = getAdByPlacement('home.hero');
  const inlineContentAd = getAdByPlacement('home.content.1');
  const inlineVideoAd = getAdByPlacement('home.content.2');
  const sidebarAd1 = getAdByPlacement('home.sidebar.1');
  const sidebarAd2 = getAdByPlacement('home.sidebar.2');
  const footerAd = getAdByPlacement('home.footer');

  // New Ads
  const postHeroAd = getAdByPlacement('home.post-hero');
  const postHeroAd2 = getAdByPlacement('home.post-hero.2');
  const midContentAd = getAdByPlacement('home.mid-content.1');
  const postArticleAd = getAdByPlacement('home.post-article.1');
  const sidebarAd3 = getAdByPlacement('home.sidebar.3');
  const sidebarAd4 = getAdByPlacement('home.sidebar.4');
  const preFooterAd1 = getAdByPlacement('home.pre-footer.1');
  const preFooterAd2 = getAdByPlacement('home.pre-footer.2');

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

      <section className="my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <AdSlot ad={postHeroAd} placement="home.post-hero" className="w-full h-32" />
        <AdSlot ad={postHeroAd2} placement="home.post-hero.2" className="w-full h-32" />
      </section>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-3">Latest: Market Movers</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Bitcoin rallies after on-chain upgrades as developers push new L2 tooling. Layer 2 networks reported a 28% increase in daily transactions; we analyze implications for liquidity providers and audit requirements.
            </p>
          </article>

          <AdSlot ad={inlineContentAd} placement="home.content.1" className="w-full h-24" />
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

          <AdSlot ad={midContentAd} placement="home.mid-content.1" className="w-full h-48" />
        </div>

        <aside className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="font-bold mb-4">Sponsored Tools</h4>
            <AdSlot ad={sidebarAd1} placement="home.sidebar.1" className="w-full h-60" />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="font-bold mb-4">Another Sponsor</h4>
            <AdSlot ad={sidebarAd3} placement="home.sidebar.3" className="w-full h-48" />
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
