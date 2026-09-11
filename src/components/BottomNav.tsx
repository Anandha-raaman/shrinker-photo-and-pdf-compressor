import React from 'react';
import { Image as ImageIcon, FileText, Layers } from 'lucide-react';

export type ActiveTab = 'photo' | 'pdf' | 'batch';

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
        title="Compress Single Photo"
      >
        <div className="nav-icon-wrapper">
          <ImageIcon size={19} />
        </div>
        <span className="nav-label">Photo</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'pdf' ? 'active' : ''}`}
        onClick={() => onSelectTab('pdf')}
        title="Compress PDF Document"
      >
        <div className="nav-icon-wrapper">
          <FileText size={19} />
        </div>
        <span className="nav-label">PDF</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'batch' ? 'active' : ''}`}
        onClick={() => onSelectTab('batch')}
        title="Compress Multiple Photos in Bulk"
      >
        <div className="nav-icon-wrapper">
          <Layers size={19} />
        </div>
        <span className="nav-label">Batch Photos</span>
      </button>
    </nav>
  );
};
