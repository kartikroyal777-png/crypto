import React from 'react';
import { getAdByPlacement } from '../data/demoAds';
import AdSlot from './AdSlot';

const StickyFooterAd: React.FC = () => {
  const stickyAd = getAdByPlacement('global.sticky-footer');

  if (!stickyAd) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 bg-gray-200/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-2xl shadow-black">
      <AdSlot
        ad={stickyAd}
        placement="global.sticky-footer"
        className="w-full max-w-4xl mx-auto h-24"
      />
    </div>
  );
};

export default StickyFooterAd;
