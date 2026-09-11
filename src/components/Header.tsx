import React from 'react';
import { ShieldCheck, Moon, Sun, Sparkles, HelpCircle } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenStoreKit: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme, onOpenStoreKit }) => {
  return (
    <header className="app-header">
      <div className="brand-wrapper">
        <img src="/icon.svg" alt="Shrinker Logo" className="brand-icon" />
        <div className="brand-text">
          <h1>Shrinker</h1>
          <div className="tagline">PDF & Image Compressor</div>
        </div>
      </div>

      <div className="header-actions">
        <div className="offline-pill" title="100% On-Device Processing. No files leave your phone.">
          <span className="offline-dot"></span>
          <span>100% Offline</span>
        </div>

        <button
          className="icon-btn"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <button
          className="icon-btn"
          onClick={onOpenStoreKit}
          title="Play Store Publishing Kit"
          aria-label="Play Store Kit"
          style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', borderColor: 'rgba(99, 102, 241, 0.4)' }}
        >
          <Sparkles size={17} />
        </button>
      </div>
    </header>
  );
};
