import React, { useState, useRef } from 'react';
import {
  Upload,
  Sparkles,
  Download,
  Share2,
  RefreshCw,
  CheckCircle2,
  Sliders,
  Target,
  Zap,
  ExternalLink,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  compressImage,
  compressToExactKB,
  formatBytes,
  CompressionResult,
} from '../services/imageCompressor';

const PRESETS = [
  { kb: 20, label: 'Sign / Thumb', desc: 'Govt Signature' },
  { kb: 50, label: 'Passport Photo', desc: 'Govt / Visa' },
  { kb: 100, label: 'Exam Portal', desc: 'Job Forms' },
  { kb: 200, label: 'Standard Form', desc: 'University / Tax' },
  { kb: 500, label: 'Social & Web', desc: 'Email / Chat' },
  { kb: 1024, label: '1 MB HD', desc: 'High Quality' },
];

interface PhotoCompressorProps {
  initialTargetKb?: number;
}

export const PhotoCompressor: React.FC<PhotoCompressorProps> = ({ initialTargetKb = 50 }) => {
  const [file, setFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(initialTargetKb);
  const [customKb, setCustomKb] = useState<string>('');
  const [mode, setMode] = useState<'preset' | 'manual'>('preset');

  React.useEffect(() => {
    if (initialTargetKb) {
      setSelectedPreset(initialTargetKb);
    }
  }, [initialTargetKb]);

  // Manual sliders
  const [quality, setQuality] = useState<number>(75);
  const [resolutionScale, setResolutionScale] = useState<number>(100);
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/jpeg');

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [autoDownload, setAutoDownload] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const getDownloadFilename = () => {
    if (!file || !result) return 'compressed_image.jpg';
    const ext = result.format.toLowerCase() === 'jpeg' ? 'jpg' : result.format.toLowerCase();
    const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    return `${originalName}_compressed.${ext}`;
  };

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP)');
      return;
    }
    setFile(selectedFile);
    setResult(null);
    setDownloaded(false);
    const url = URL.createObjectURL(selectedFile);
    setOriginalPreview(url);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const triggerDownloadFile = (blob: Blob, filename: string) => {
    try {
      // 1. Create dedicated blob URL
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);

      // Delay removal so browser doesn't cancel download stream
      setTimeout(() => {
        if (document.body.contains(a)) {
          document.body.removeChild(a);
        }
        URL.revokeObjectURL(blobUrl);
      }, 3000);
    } catch (e) {
      console.warn('Programmatic download failed, falling back to data URL', e);
      // 2. Base64 fallback for browsers blocking blob downloads
      const reader = new FileReader();
      reader.onload = () => {
        const a = document.createElement('a');
        a.href = reader.result as string;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => document.body.removeChild(a), 1000);
      };
      reader.readAsDataURL(blob);
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setLoading(true);
    setDownloaded(false);

    try {
      let compressionRes: CompressionResult;

      if (mode === 'preset') {
        const target = customKb ? parseFloat(customKb) : selectedPreset || 50;
        compressionRes = await compressToExactKB(file, target, 'image/jpeg');
      } else {
        let maxWidth: number | undefined = undefined;
        if (resolutionScale < 100) {
          const img = new Image();
          img.src = originalPreview!;
          await new Promise((res) => (img.onload = res));
          maxWidth = Math.round((img.naturalWidth * resolutionScale) / 100);
        }

        compressionRes = await compressImage(file, {
          quality: quality / 100,
          maxWidth,
          format,
        });
      }

      setResult(compressionRes);

      // Trigger celebratory confetti
      if (compressionRes.savingsPercent >= 30) {
        confetti({
          particleCount: 45,
          spread: 70,
          origin: { y: 0.75 },
          colors: ['#38bdf8', '#6366f1', '#10b981'],
        });
      }

      const filename = `${file.name.substring(0, file.name.lastIndexOf('.')) || file.name}_compressed.${(compressionRes.format || 'jpg').toLowerCase() === 'jpeg' ? 'jpg' : (compressionRes.format || 'jpg').toLowerCase()}`;

      // Auto-scroll to download button immediately
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);

      // Auto-download if user checked the option
      if (autoDownload) {
        setTimeout(() => {
          triggerDownloadFile(compressionRes.blob, filename);
        }, 300);
      }
    } catch (err: any) {
      console.error(err);
      alert('Compression error: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleManualDownloadClick = () => {
    if (!result || !file) return;
    triggerDownloadFile(result.blob, getDownloadFilename());
  };

  const handleShare = async () => {
    if (!result || !file) return;
    try {
      if (navigator.share) {
        const ext = result.format.toLowerCase();
        const shareFile = new File([result.blob], `compressed_${file.name}`, {
          type: result.blob.type,
        });
        await navigator.share({
          files: [shareFile],
          title: 'Compressed Image by Shrinker',
          text: `Compressed from ${formatBytes(result.originalSize)} to ${formatBytes(
            result.size
          )} (-${result.savingsPercent}%) using Shrinker`,
        });
      } else {
        handleManualDownloadClick();
      }
    } catch (err) {
      console.warn('Share cancelled or not supported', err);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setOriginalPreview(null);
    setCustomKb('');
    setDownloaded(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadFilename = getDownloadFilename();

  return (
    <div className="card">
      <div className="card-title">
        <Sparkles size={18} color="#38bdf8" />
        Photo Compressor
      </div>
      <p className="card-subtitle">
        Compress photos to exact KB limits for passport forms, job portals, and exams.
      </p>

      {/* Upload Zone */}
      {!file ? (
        <div
          className={`dropzone ${isDragOver ? 'dragover' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            accept="image/jpeg,image/png,image/webp,image/bmp"
            style={{ display: 'none' }}
          />
          <div className="dropzone-icon-box">
            <Upload size={28} />
          </div>
          <h3>Select or Drop Image</h3>
          <p>JPG, PNG, WebP supported • Instant on-device processing</p>
          <div className="browse-pill">Browse Photos</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* File Selected Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--bg-surface-elevated)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
              <img
                src={originalPreview!}
                alt="Selected"
                style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
              />
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {file.name}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Original: <span style={{ color: '#38bdf8', fontWeight: '700' }}>{formatBytes(file.size)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={reset}
              className="icon-btn"
              title="Change image"
              style={{ width: '32px', height: '32px' }}
            >
              <RefreshCw size={14} />
            </button>
          </div>

          {/* Mode Tabs */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-surface-elevated)',
              padding: '4px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <button
              onClick={() => setMode('preset')}
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                borderRadius: '8px',
                background: mode === 'preset' ? 'var(--accent-primary)' : 'transparent',
                color: mode === 'preset' ? '#fff' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 150ms ease',
              }}
            >
              <Target size={14} />
              Exact Target KB
            </button>
            <button
              onClick={() => setMode('manual')}
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                borderRadius: '8px',
                background: mode === 'manual' ? 'var(--accent-primary)' : 'transparent',
                color: mode === 'manual' ? '#fff' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 150ms ease',
              }}
            >
              <Sliders size={14} />
              Manual Quality
            </button>
          </div>

          {/* Target KB Presets */}
          {mode === 'preset' ? (
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                Popular Target Sizes:
              </div>
              <div className="presets-grid">
                {PRESETS.map((p) => (
                  <div
                    key={p.kb}
                    className={`preset-chip ${selectedPreset === p.kb && !customKb ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedPreset(p.kb);
                      setCustomKb('');
                    }}
                  >
                    <span className="preset-size">
                      {p.kb >= 1024 ? `${p.kb / 1024} MB` : `${p.kb} KB`}
                    </span>
                    <span className="preset-label">{p.label}</span>
                  </div>
                ))}
              </div>

              {/* Custom Target Size */}
              <div className="target-input-row">
                <div className="target-input-box">
                  <input
                    type="number"
                    placeholder="Or enter custom size (e.g. 40)"
                    value={customKb}
                    onChange={(e) => {
                      setCustomKb(e.target.value);
                      setSelectedPreset(null);
                    }}
                    min="5"
                    max="10000"
                  />
                  <span className="target-unit-pill">KB</span>
                </div>
              </div>
            </div>
          ) : (
            /* Manual Sliders */
            <div>
              <div className="slider-container">
                <div className="slider-header">
                  <span className="slider-title">Compression Quality</span>
                  <span className="slider-val">{quality}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="98"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="range-slider"
                />
              </div>

              <div className="slider-container">
                <div className="slider-header">
                  <span className="slider-title">Resolution Scale</span>
                  <span className="slider-val">{resolutionScale}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={resolutionScale}
                  onChange={(e) => setResolutionScale(Number(e.target.value))}
                  className="range-slider"
                />
              </div>

              {/* Format selection */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                {(['image/jpeg', 'image/webp', 'image/png'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setFormat(fmt)}
                    className="icon-btn"
                    style={{
                      flex: 1,
                      height: '36px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      background: format === fmt ? 'rgba(56, 189, 248, 0.2)' : 'var(--bg-surface-elevated)',
                      borderColor: format === fmt ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                      color: format === fmt ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    }}
                  >
                    {fmt.replace('image/', '').toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Auto-download Toggle */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              userSelect: 'none',
              padding: '4px 0',
            }}
          >
            <input
              type="checkbox"
              checked={autoDownload}
              onChange={(e) => setAutoDownload(e.target.checked)}
              style={{ cursor: 'pointer', accentColor: '#10b981' }}
            />
            <span>Auto-download file as soon as compression finishes</span>
          </label>

          {/* Compress Button */}
          <button
            className="btn-primary"
            onClick={handleCompress}
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                Compressing...
              </>
            ) : (
              <>
                <Zap size={18} />
                Compress Image Now
              </>
            )}
          </button>

          {/* Result Card */}
          {result && (
            <div className="result-card" ref={resultRef} style={{ animation: 'fadeIn 300ms ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="saved-badge">
                  <CheckCircle2 size={14} />
                  Saved {result.savingsPercent}% Space!
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Processed in {result.timeMs}ms
                </div>
              </div>

              {/* Preview Comparison */}
              <div className="preview-images-container">
                <div className="preview-box">
                  <span className="preview-badge">Original</span>
                  <img src={originalPreview!} alt="Original" />
                  <span className="preview-size" style={{ color: 'var(--text-secondary)' }}>
                    {formatBytes(result.originalSize)}
                  </span>
                </div>
                <div className="preview-box" style={{ borderColor: 'rgba(56, 189, 248, 0.4)' }}>
                  <span className="preview-badge" style={{ color: '#38bdf8' }}>Compressed</span>
                  <img src={result.previewUrl} alt="Compressed" />
                  <span className="preview-size" style={{ color: '#38bdf8' }}>
                    {formatBytes(result.size)}
                  </span>
                </div>
              </div>

              {/* Ready to Download Banner */}
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.82rem',
                }}
              >
                <span style={{ color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} />
                  {downloaded ? 'Downloaded Successfully!' : 'Ready to Download!'}
                </span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '800' }}>
                  {formatBytes(result.size)}
                </span>
              </div>

              {/* Primary Direct Download Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                {/* 1. Direct Native Anchor Download (100% Reliable across all browsers) */}
                <a
                  href={result.previewUrl}
                  download={downloadFilename}
                  onClick={handleManualDownloadClick}
                  className="btn-primary"
                  style={{
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
                    padding: '15px 20px',
                    fontSize: '1rem',
                  }}
                >
                  {downloaded ? <Check size={20} /> : <Download size={20} />}
                  <span>{downloaded ? 'Downloaded!' : `Download Image (${formatBytes(result.size)})`}</span>
                </a>

                {/* Secondary Actions: Open in Tab & Share */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a
                    href={result.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ flex: 1, textDecoration: 'none', fontSize: '0.82rem', padding: '10px' }}
                    title="View full image in new tab"
                  >
                    <ExternalLink size={15} />
                    Open Image
                  </a>

                  <button
                    className="btn-secondary"
                    onClick={handleShare}
                    style={{ flex: 1, fontSize: '0.82rem', padding: '10px' }}
                    title="Share file via other apps"
                  >
                    <Share2 size={15} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
