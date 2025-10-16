export type AdType = 'banner' | 'video-instream' | 'inpage' | 'native' | 'popunder' | 'web-push' | 'notification' | 'other';

export interface AdUnit {
  id: string;                 // UUID
  name: string;               // e.g. "Homepage Hero Banner"
  type: AdType;               // one of AdType
  placementKey: string;       // e.g. 'home.header', 'home.sidebar.1'
  scriptSrc: string | null;   // e.g. "https://js.onclckmn.com/static/onclicka.js"
  dataAdmpid?: string | null; // e.g. "381867"
  html?: string | null;       // optional raw HTML fallback for banner/native
  meta?: Record<string, any>; // custom meta
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}
