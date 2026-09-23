import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, ActiveTab } from './components/BottomNav';
import { PhotoCompressor } from './components/PhotoCompressor';
import { PdfCompressor } from './components/PdfCompressor';
import { BatchCompressor } from './components/BatchCompressor';
import { FaqSection } from './components/FaqSection';
import { AdBanner } from './components/AdBanner';
import { MONETIZATION_CONFIG } from './config/monetization';
import { Sparkles, ShieldCheck, Zap, Heart } from 'lucide-react';
import './styles/app.css';

interface RouteConfig {
  tab: ActiveTab;
  targetKb: number;
  badgeText: string;
  title: string;
}

const getRouteConfig = (): RouteConfig => {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('compress-signature-to-20kb')) {
    return {
      tab: 'photo',
      targetKb: 20,
      badgeText: '✍️ Signature Mode: 20 KB',
      title: 'Compress Signature to 20KB Online (UPSC, SSC, IBPS) — Shrinker',
    };
  }
  if (path.includes('compress-photo-to-50kb')) {
    return {
      tab: 'photo',
      targetKb: 50,
      badgeText: '📸 Passport Photo Mode: 50 KB',
      title: 'Compress Photo to 50KB for Exam & Passport Forms — Shrinker',
    };
  }
  if (path.includes('compress-image-to-100kb')) {
    return {
      tab: 'photo',
      targetKb: 100,
      badgeText: '🎯 Target: 100 KB Mode',
      title: 'Compress Image to 100KB Online (Free & Private) — Shrinker',
    };
  }
  if (path.includes('compress-pdf')) {
    return {
      tab: 'pdf',
      targetKb: 100,
      badgeText: '📄 PDF Compression Mode',
      title: 'Compress PDF to 100KB / 200KB Online (100% Offline) — Shrinker',
    };
  }
  return {
    tab: 'photo',
    targetKb: 50,
    badgeText: 'Target 20KB, 50KB, 100KB',
    title: 'Shrinker — Photo & PDF Compressor to Exact KB (20KB, 50KB, 100KB)',
  };
};

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const routeConfig = getRouteConfig();
  const [activeTab, setActiveTab] = useState<ActiveTab>(routeConfig.tab);
  const [targetKb] = useState<number>(routeConfig.targetKb);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.title = routeConfig.title;
  }, [routeConfig.title]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-container">
      {/* Top Bar */}
      <Header theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Content View */}
      <main className="app-content">
        {/* Quick Highlights Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '2px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap',
              background: 'var(--bg-surface-elevated)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <Zap size={13} color="#38bdf8" />
            <span>{routeConfig.badgeText}</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap',
              background: 'var(--bg-surface-elevated)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <ShieldCheck size={13} color="#10b981" />
            <span>Zero Data Stored</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap',
              background: 'var(--bg-surface-elevated)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <Sparkles size={13} color="#c084fc" />
            <span>No Watermark</span>
          </div>
        </div>

        {/* Top Monetization Ad Slot */}
        <AdBanner slot={MONETIZATION_CONFIG.topBannerSlot} format="horizontal" />

        {/* Tab Views */}
        {activeTab === 'photo' && <PhotoCompressor initialTargetKb={targetKb} />}
        {activeTab === 'pdf' && <PdfCompressor />}
        {activeTab === 'batch' && <BatchCompressor />}

        {/* Bottom Monetization Ad Slot */}
        <AdBanner slot={MONETIZATION_CONFIG.downloadSlot} format="auto" />

        {/* Informative FAQ & User Guide Section (AdSense Content Anchor) */}
        <FaqSection />

        {/* Web App Footer & Links */}
        <footer
          style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
            <a
              href="/privacy-policy.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
            >
              Privacy Policy & Terms
            </a>
            <span>•</span>
            <a
              href="mailto:support@shrinkr.app"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
            >
              Contact Support
            </a>
            <span>•</span>
            <span style={{ color: 'var(--text-secondary)' }}>100% Free Client-Side</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Built with</span>
            <Heart size={12} color="#ec4899" fill="#ec4899" />
            <span>for privacy & speed</span>
          </div>

          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            &copy; 2026 Shrinker. All files processed locally.
          </div>
        </footer>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />
    </div>
  );
};

export default App;
