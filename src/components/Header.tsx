import { Wallet } from 'lucide-react';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Wallet className="h-8 w-8 text-indigo-500" />
            <span className="text-xl font-bold tracking-tight">CryptoFin Software</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">News</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Analysis</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Dev Tools</a>
          </nav>
        </div>
      </div>
      <div className="w-full h-px bg-gray-200 dark:bg-gray-800"></div>
    </header>
  );
};

export default Header;
