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

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<ActiveTab>('photo');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
            <span>Target 20KB, 50KB, 100KB</span>
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
        {activeTab === 'photo' && <PhotoCompressor />}
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
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <a
              href="/privacy-policy.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
            >
              Privacy Policy
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
