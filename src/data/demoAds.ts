import { AdUnit } from '../types/ads';

export const demoAdUnits: AdUnit[] = [
    { id: 'vid1', name: 'Hero Video Ad', type: 'video-instream', placementKey: 'home.hero', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '381867', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'vid2', name: 'Inline Content Video Ad', type: 'video-instream', placementKey: 'home.content.2', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '381877', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'pop1', name: 'Global Popunder', type: 'popunder', placementKey: 'global.popunder', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '382319', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'push1', name: 'Global Web Push', type: 'web-push', placementKey: 'global.web-push', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '382375', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'other1', name: 'Unknown Ad Type', type: 'other', placementKey: 'home.footer', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '383017', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'ban1', name: 'Sidebar Banner 1', type: 'banner', placementKey: 'home.sidebar.1', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '383019', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'inp1', name: 'In-Page Content Ad', type: 'inpage', placementKey: 'home.content.1', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '383021', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'vid3', name: 'Footer Video Ad', type: 'video-instream', placementKey: 'home.footer.video', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '383023', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'ban2', name: 'Sidebar Banner 2', type: 'banner', placementKey: 'home.sidebar.2', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '383025', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'vid4', name: 'Another Inline Video', type: 'video-instream', placementKey: 'home.content.3', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '383027', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    // New Ads
    { id: 'ban3', name: 'Post-Hero Banner', type: 'banner', placementKey: 'home.post-hero', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '383033', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'ban4', name: 'Mid-Content Banner', type: 'banner', placementKey: 'home.mid-content.1', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '383035', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'ban5', name: 'Sidebar Banner 3', type: 'banner', placementKey: 'home.sidebar.3', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '383037', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'ban6', name: 'Post-Article Banner', type: 'banner', placementKey: 'home.post-article.1', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '383039', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'ban7', name: 'Pre-Footer Banner 1', type: 'banner', placementKey: 'home.pre-footer.1', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '383041', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'ban8', name: 'Pre-Footer Banner 2', type: 'banner', placementKey: 'home.pre-footer.2', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '383045', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'ban9', name: 'Sticky Footer Banner', type: 'banner', placementKey: 'global.sticky-footer', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '383047', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'ban10', name: 'Post-Hero Banner 2', type: 'banner', placementKey: 'home.post-hero.2', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '383049', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
    { id: 'ban11', name: 'Sidebar Banner 4', type: 'banner', placementKey: 'home.sidebar.4', scriptSrc: 'https://js.onclckmn.com/static/onclicka.js', dataAdmpid: '383051', html: null, meta: {}, enabled: true, createdAt: '', updatedAt: '' },
];

export const getAdByPlacement = (placementKey: string): AdUnit | undefined => {
    return demoAdUnits.find(ad => ad.enabled && ad.placementKey === placementKey);
}

export const getAdsByType = (type: string): AdUnit[] => {
    return demoAdUnits.filter(ad => ad.enabled && ad.type === type);
}
