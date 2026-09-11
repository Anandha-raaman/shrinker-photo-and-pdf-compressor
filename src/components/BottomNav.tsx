import React from 'react';
import { Image as ImageIcon, FileText, Layers, Rocket } from 'lucide-react';

export type ActiveTab = 'photo' | 'pdf' | 'batch' | 'storekit';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${activeTab === 'photo' ? 'active' : ''}`}
        onClick={() => onSelectTab('photo')}
      >
        <div className="nav-icon-wrapper">
          <ImageIcon size={19} />
        </div>
        <span className="nav-label">Photo</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'pdf' ? 'active' : ''}`}
        onClick={() => onSelectTab('pdf')}
      >
        <div className="nav-icon-wrapper">
          <FileText size={19} />
        </div>
        <span className="nav-label">PDF</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'batch' ? 'active' : ''}`}
        onClick={() => onSelectTab('batch')}
      >
        <div className="nav-icon-wrapper">
          <Layers size={19} />
        </div>
        <span className="nav-label">Batch</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'storekit' ? 'active' : ''}`}
        onClick={() => onSelectTab('storekit')}
      >
        <div className="nav-icon-wrapper">
          <Rocket size={19} />
        </div>
        <span className="nav-label">Play Store Kit</span>
      </button>
    </nav>
  );
};
