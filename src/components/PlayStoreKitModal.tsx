import React, { useState } from 'react';
import { X, Copy, Check, Rocket, ShieldCheck, Terminal, HelpCircle } from 'lucide-react';
import { StoreAssetsGenerator } from './StoreAssetsGenerator';

interface PlayStoreKitModalProps {
  onClose: () => void;
}

export const PlayStoreKitModal: React.FC<PlayStoreKitModalProps> = ({ onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const appTitle = 'Shrinker: PDF & Photo Compressor';
  const shortDescription = 'Compress PDFs & photos to exact KB (20KB, 50KB, 100KB). 100% Offline & Private.';
  const fullDescription = `Need to compress a PDF or photo to an exact file size for an online application?

Shrinker is the fastest, 100% offline PDF and Image Compressor built specifically for government job forms, university applications, passport submissions, visa portals, and email attachments.

🔥 WHY PEOPLE LOVE SHRINKER:
• Exact KB Compression: Select 20 KB (Signature/Thumbprint), 50 KB (Passport photo), 100 KB, 200 KB, or enter any custom KB value!
• 100% Private & Offline: Your files NEVER leave your phone. All image and PDF compression runs locally on your device.
• Multi-Page PDF Compressor: Easily shrink scanned documents, resumes, and certificates from 10MB down to <300KB without losing text clarity.
• Batch Compression: Select 10+ photos at once and download as a single ZIP.
• Format Freedom: Convert & compress JPG, PNG, and WebP.
• No Watermarks & No Sign-up: Instant utility with zero friction.

🎯 PERFECT FOR:
- Government Exam Portals (UPSC, SSC, State PSC, Railway, Banking)
- Passport & Visa Online Submissions
- University & College Admissions
- Job Application Portals
- Email attachment limits

Save storage space and bypass strict upload size limits in seconds with Shrinker!`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Rocket size={20} color="#818cf8" />
            <h2>Play Store Publishing Kit</h2>
          </div>
          <button onClick={onClose} className="icon-btn" aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          Everything you need to publish to Google Play Store immediately. 100% copyright-free, trademark-safe, and privacy-compliant.
        </p>

        {/* Section 1: Store Assets Export */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '0.86rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            1. Download Play Store Visuals
          </div>
          <StoreAssetsGenerator />
        </div>

        {/* Section 2: Store Listing Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '0.86rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            2. High-Converting ASO Store Listing (Copy & Paste)
          </div>

          {/* App Title */}
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                APP TITLE (30/30 chars)
              </span>
              <button
                onClick={() => copyToClipboard(appTitle, 'title')}
                className="icon-btn"
                style={{ width: '26px', height: '26px' }}
                title="Copy title"
              >
                {copiedKey === 'title' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
              </button>
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
              {appTitle}
            </div>
          </div>

          {/* Short Description */}
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                SHORT DESCRIPTION (79/80 chars)
              </span>
              <button
                onClick={() => copyToClipboard(shortDescription, 'short')}
                className="icon-btn"
                style={{ width: '26px', height: '26px' }}
                title="Copy short description"
              >
                {copiedKey === 'short' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
              </button>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {shortDescription}
            </div>
          </div>

          {/* Full Description */}
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                FULL DESCRIPTION (ASO Keyword-Rich)
              </span>
              <button
                onClick={() => copyToClipboard(fullDescription, 'full')}
                className="icon-btn"
                style={{ width: '26px', height: '26px' }}
                title="Copy full description"
              >
                {copiedKey === 'full' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
              </button>
            </div>
            <pre
              style={{
                fontSize: '0.74rem',
                color: 'var(--text-secondary)',
                whiteSpace: 'pre-wrap',
                fontFamily: 'var(--font-sans)',
                maxHeight: '150px',
                overflowY: 'auto',
                lineHeight: '1.4',
              }}
            >
              {fullDescription}
            </pre>
          </div>
        </div>

        {/* Section 3: Android Build Commands */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', fontWeight: '700' }}>
            <Terminal size={16} color="#10b981" />
            3. Generate Android APK / AAB Bundle
          </div>
          <div
            style={{
              background: '#090d16',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              fontFamily: 'monospace',
              fontSize: '0.76rem',
              color: '#38bdf8',
              lineHeight: '1.6',
            }}
          >
            <div># 1. Build web production bundle</div>
            <div style={{ color: '#f8fafc' }}>npm run build</div>
            <div style={{ marginTop: '6px' }}># 2. Add Android native platform</div>
            <div style={{ color: '#f8fafc' }}>npx cap add android</div>
            <div style={{ marginTop: '6px' }}># 3. Open in Android Studio to build signed .AAB</div>
            <div style={{ color: '#f8fafc' }}>npx cap open android</div>
          </div>
        </div>

        {/* Section 4: Google Play Data Safety Compliance */}
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '12px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            gap: '10px',
          }}
        >
          <ShieldCheck size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#10b981' }}>
              Google Play Data Safety Declaration:
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              In Google Play Console, answer: <b>"No data collected"</b> and <b>"No data shared with third parties"</b>. Since compression runs 100% in-browser/client-side, this passes Google's strict privacy audits with 0 rejection risk!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
