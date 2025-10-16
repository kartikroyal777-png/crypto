import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GlobalAdScripts from './components/GlobalAdScripts';
import StickyFooterAd from './components/StickyFooterAd';

function App() {
    return (
        <>
            <GlobalAdScripts />
            <Header />
            <main className="pb-32"> {/* Add padding to bottom to avoid overlap with sticky ad */}
                <HomePage />
            </main>
            <Footer />
            <StickyFooterAd />
        </>
    );
}

export default App;
