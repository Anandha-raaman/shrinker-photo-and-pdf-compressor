import React from 'react';
import { Moon, Sun, Share2 } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  const handleShareWebsite = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Shrinker: Free Photo & PDF Compressor',
          text: 'Compress photos & PDFs to exact KB (20KB, 50KB, 100KB) 100% offline & free!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Website link copied to clipboard!');
      }
    } catch (e) {
      console.warn('Share cancelled or not supported', e);
    }
  };

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
        <div className="offline-pill" title="100% On-Device Processing. No files leave your computer.">
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
          onClick={handleShareWebsite}
          title="Share Website"
          aria-label="Share Website"
        >
          <Share2 size={16} />
        </button>
      </div>
    </header>
  );
};
