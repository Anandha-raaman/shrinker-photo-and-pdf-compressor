import React, { useRef } from 'react';
import { Download, Image as ImageIcon, Sparkles } from 'lucide-react';

export const StoreAssetsGenerator: React.FC = () => {
  const iconCanvasRef = useRef<HTMLCanvasElement>(null);
  const bannerCanvasRef = useRef<HTMLCanvasElement>(null);

  const generateAndDownloadIcon = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 512, 512);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(0.5, '#1e1b4b');
    bgGrad.addColorStop(1, '#311042');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 512, 512);

    // Glowing circle
    ctx.save();
    ctx.shadowColor = '#6366f1';
    ctx.shadowBlur = 40;
    ctx.beginPath();
    ctx.arc(256, 256, 150, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
    ctx.fill();
    ctx.restore();

    // Compressor Vice bars
    const barGrad = ctx.createLinearGradient(120, 130, 392, 380);
    barGrad.addColorStop(0, '#38bdf8');
    barGrad.addColorStop(0.5, '#6366f1');
    barGrad.addColorStop(1, '#ec4899');
    ctx.fillStyle = barGrad;

    // Top vice bar
    ctx.beginPath();
    ctx.roundRect(110, 120, 292, 56, 16);
    ctx.fill();

    // Top arrow pointing down
    ctx.beginPath();
    ctx.moveTo(256, 210);
    ctx.lineTo(220, 176);
    ctx.lineTo(292, 176);
    ctx.closePath();
    ctx.fill();

    // Bottom vice bar
    ctx.beginPath();
    ctx.roundRect(110, 336, 292, 56, 16);
    ctx.fill();

    // Bottom arrow pointing up
    ctx.beginPath();
    ctx.moveTo(256, 302);
    ctx.lineTo(220, 336);
    ctx.lineTo(292, 336);
    ctx.closePath();
    ctx.fill();

    // Central compact document box
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(160, 216, 192, 80, 16);
    ctx.fill();
    ctx.stroke();

    // Text "KB"
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 52px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('KB', 242, 256);

    // Sparkle symbol
    ctx.fillStyle = '#38bdf8';
    ctx.font = '900 32px system-ui, sans-serif';
    ctx.fillText('⚡', 310, 256);

    // Download PNG
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'GooglePlay_App_Icon_512x512.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const generateAndDownloadFeatureGraphic = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 500;
    const ctx = canvas.getContext('2d')!;

    // Rich dark gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 500);
    bgGrad.addColorStop(0, '#0a0e17');
    bgGrad.addColorStop(0.5, '#1e1b4b');
    bgGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 500);

    // Subtle background mesh circles
    ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
    ctx.beginPath();
    ctx.arc(850, 150, 220, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
    ctx.beginPath();
    ctx.arc(150, 350, 200, 0, Math.PI * 2);
    ctx.fill();

    // App Name Title
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 64px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Shrinkr', 80, 180);

    // Gradient accent on subtitle
    const textGrad = ctx.createLinearGradient(80, 0, 600, 0);
    textGrad.addColorStop(0, '#38bdf8');
    textGrad.addColorStop(0.5, '#a855f7');
    textGrad.addColorStop(1, '#ec4899');
    ctx.fillStyle = textGrad;
    ctx.font = '700 30px system-ui, -apple-system, sans-serif';
    ctx.fillText('PDF & Image Compressor to Exact KB', 80, 235);

    // Feature Badges
    const features = [
      '⚡ Compress to 20KB, 50KB, 100KB',
      '🔒 100% Offline & Private',
      '📄 Scanned PDF Shrink',
      '🎯 Form & Passport Ready',
    ];

    ctx.font = '600 20px system-ui, -apple-system, sans-serif';
    features.forEach((feat, idx) => {
      const y = 305 + idx * 36;
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(feat, 80, y);
    });

    // Right Side Visual Preview Card
    ctx.save();
    ctx.translate(680, 90);

    // Squeezed Card Visual
    ctx.fillStyle = '#111827';
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(0, 0, 260, 320, 24);
    ctx.fill();
    ctx.stroke();

    // Comparison pill
    ctx.fillStyle = 'rgba(16, 185, 129, 0.16)';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(40, 40, 180, 44, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '800 18px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('-85% SIZE REDUCED', 130, 68);

    // Sizes display
    ctx.fillStyle = '#64748b';
    ctx.font = '600 15px system-ui, sans-serif';
    ctx.fillText('4.8 MB  ➔  65 KB', 130, 120);

    // Quick preset buttons mockup
    const presets = ['20 KB', '50 KB', '100 KB'];
    presets.forEach((p, i) => {
      ctx.fillStyle = i === 1 ? '#6366f1' : '#1e293b';
      ctx.beginPath();
      ctx.roundRect(25 + i * 72, 160, 64, 40, 8);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 13px system-ui, sans-serif';
      ctx.fillText(p, 57 + i * 72, 185);
    });

    // Big Squeeze Button Mockup
    const btnGrad = ctx.createLinearGradient(30, 0, 230, 0);
    btnGrad.addColorStop(0, '#6366f1');
    btnGrad.addColorStop(1, '#ec4899');
    ctx.fillStyle = btnGrad;
    ctx.beginPath();
    ctx.roundRect(30, 235, 200, 46, 14);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 16px system-ui, sans-serif';
    ctx.fillText('Compress Now', 130, 264);

    ctx.restore();

    // Download PNG
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'GooglePlay_Feature_Graphic_1024x500.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div
        style={{
          background: 'var(--bg-surface-elevated)',
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontSize: '0.88rem', fontWeight: '700' }}>App Icon (512 x 512 px)</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Official PNG ready for Google Play Console
          </div>
        </div>
        <button
          onClick={generateAndDownloadIcon}
          className="btn-primary"
          style={{ width: 'auto', padding: '8px 14px', fontSize: '0.8rem' }}
        >
          <Download size={14} />
          Download Icon
        </button>
      </div>

      <div
        style={{
          background: 'var(--bg-surface-elevated)',
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontSize: '0.88rem', fontWeight: '700' }}>Feature Graphic (1024 x 500 px)</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            High-converting Google Play store banner PNG
          </div>
        </div>
        <button
          onClick={generateAndDownloadFeatureGraphic}
          className="btn-primary"
          style={{
            width: 'auto',
            padding: '8px 14px',
            fontSize: '0.8rem',
            background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
          }}
        >
          <Download size={14} />
          Download Banner
        </button>
      </div>
    </div>
  );
};
