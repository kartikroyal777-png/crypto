import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 mt-12">
      <div className="w-full h-px bg-gray-200 dark:bg-gray-800 mb-8"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; 2025 CryptoFin Software. All Rights Reserved.</p>
          <p className="mt-1">A Dualite Alpha Demonstration Project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
