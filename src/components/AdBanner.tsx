import React, { useEffect } from 'react';
import { MONETIZATION_CONFIG } from '../config/monetization';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
}

export const AdBanner: React.FC<AdBannerProps> = ({ slot, format = 'auto' }) => {
  useEffect(() => {
    if (MONETIZATION_CONFIG.enabled) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.warn('AdSense push failed', err);
      }
    }
  }, []);

  if (!MONETIZATION_CONFIG.enabled) {
    return (
      <div
        style={{
          margin: '12px 0',
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px dashed var(--border-subtle)',
          textAlign: 'center',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <span>⚡ 100% Free & Unlimited</span>
        <span>•</span>
        <span>No Subscription Required</span>
      </div>
    );
  }

  return (
    <div style={{ margin: '14px 0', minHeight: '90px', overflow: 'hidden', textAlign: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={MONETIZATION_CONFIG.adsenseClientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};
