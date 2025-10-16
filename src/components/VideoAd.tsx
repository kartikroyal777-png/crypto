import React, { useEffect, useRef, useState } from 'react';
import { loadScriptOnce } from '../utils/scriptLoader';

interface VideoAdProps {
  scriptSrc: string;
  dataAdmpid?: string;
  autoPlay?: boolean;
}

export default function VideoAd({ scriptSrc, dataAdmpid, autoPlay = true }: VideoAdProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loadState, setLoadState] = useState<'idle' | 'loading' | 'loaded' | 'failed'>('idle');

  useEffect(() => {
    let isCancelled = false;
    setLoadState('loading');
    const attrs: Record<string,string> = {};
    if (dataAdmpid) attrs['data-admpid'] = dataAdmpid;

    loadScriptOnce(scriptSrc, attrs)
      .then(() => {
        if (!isCancelled) {
          setLoadState('loaded');
          console.log(`Video ad script loaded for admpid: ${dataAdmpid}`);
          // @ts-ignore
          if (window.onClicka && typeof window.onClicka.attachToVideo === 'function' && videoRef.current) {
            try {
              // @ts-ignore
              window.onClicka.attachToVideo(videoRef.current, { admpid: dataAdmpid });
            } catch (e) {
              console.warn('Vendor attachToVideo API failed', e);
            }
          }
        }
      })
      .catch(() => { // Error logging is now handled by the scriptLoader
        if (!isCancelled) {
          setLoadState('failed');
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [scriptSrc, dataAdmpid]);

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg relative">
      <video ref={videoRef} controls autoPlay={autoPlay} muted playsInline className="w-full h-full">
        <source src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {loadState === 'failed' && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center pointer-events-none">
            <p className="text-red-400 font-semibold">Video ad failed to load.</p>
        </div>
      )}
    </div>
  );
}
