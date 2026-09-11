import React, { useState, useRef } from 'react';
import {
  FileText,
  Upload,
  Download,
  Share2,
  RefreshCw,
  CheckCircle2,
  Zap,
  ExternalLink,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  compressPdf,
  PDF_PRESETS,
  PdfCompressionResult,
} from '../services/pdfCompressor';
import { formatBytes } from '../services/imageCompressor';

export const PdfCompressor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<'extreme' | 'balanced' | 'high_quality'>('balanced');
  const [loading, setLoading] = useState<boolean>(false);
  const [autoDownload, setAutoDownload] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);
  const [progress, setProgress] = useState<{ current: number; total: number; percent: number }>({
    current: 0,
    total: 0,
    percent: 0,
  });
  const [result, setResult] = useState<PdfCompressionResult | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const getDownloadFilename = () => {
    if (!file) return 'compressed_document.pdf';
    const originalName = file.name.replace(/\.pdf$/i, '');
    return `${originalName}_compressed.pdf`;
  };

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
      alert('Please select a valid PDF file');
      return;
    }
    setFile(selectedFile);
    setResult(null);
    setDownloaded(false);
    setProgress({ current: 0, total: 0, percent: 0 });
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
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);

      setTimeout(() => {
        if (document.body.contains(a)) {
          document.body.removeChild(a);
        }
        URL.revokeObjectURL(blobUrl);
      }, 3000);
    } catch (e) {
      console.warn('PDF programmatic download fallback', e);
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
    setProgress({ current: 0, total: 0, percent: 0 });

    try {
      const res = await compressPdf(file, {
        level,
        onProgress: (p) => setProgress(p),
      });

      setResult(res);

      if (res.savingsPercent >= 30) {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.75 },
          colors: ['#38bdf8', '#6366f1', '#10b981'],
        });
      }

      const filename = getDownloadFilename();

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);

      if (autoDownload) {
        setTimeout(() => {
          triggerDownloadFile(res.blob, filename);
        }, 300);
      }
    } catch (err: any) {
      console.error('PDF compression failed', err);
      alert('PDF compression error: ' + (err.message || 'Please try another file.'));
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
        const shareFile = new File([result.blob], `compressed_${file.name}`, {
          type: 'application/pdf',
        });
        await navigator.share({
          files: [shareFile],
          title: 'Compressed PDF by Shrinkr',
          text: `Compressed from ${formatBytes(result.originalSize)} to ${formatBytes(
            result.size
          )} (-${result.savingsPercent}%) using Shrinkr`,
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
    setDownloaded(false);
    setProgress({ current: 0, total: 0, percent: 0 });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadFilename = getDownloadFilename();

  return (
    <div className="card">
      <div className="card-title">
        <FileText size={18} color="#a855f7" />
        PDF Compressor
      </div>
      <p className="card-subtitle">
        Compress PDF files 100% on your device. Shrink multi-page scans and documents.
      </p>

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
            accept="application/pdf"
            style={{ display: 'none' }}
          />
          <div
            className="dropzone-icon-box"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
              borderColor: 'rgba(168, 85, 247, 0.3)',
              color: '#c084fc',
            }}
          >
            <Upload size={28} />
          </div>
          <h3>Select or Drop PDF File</h3>
          <p>Scanned documents, resumes, certificates • 100% Private</p>
          <div className="browse-pill">Browse PDF</div>
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
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'rgba(168, 85, 247, 0.15)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#c084fc',
                  flexShrink: 0,
                }}
              >
                <FileText size={20} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {file.name}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Original Size: <span style={{ color: '#c084fc', fontWeight: '700' }}>{formatBytes(file.size)}</span>
                </div>
              </div>
            </div>
            <button onClick={reset} className="icon-btn" title="Change PDF" style={{ width: '32px', height: '32px' }}>
              <RefreshCw size={14} />
            </button>
          </div>

          {/* Compression Presets */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Select Compression Level:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(['extreme', 'balanced', 'high_quality'] as const).map((lvl) => {
                const p = PDF_PRESETS[lvl];
                const isSelected = level === lvl;
                return (
                  <div
                    key={lvl}
                    onClick={() => setLevel(lvl)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(168, 85, 247, 0.12)' : 'var(--bg-surface-elevated)',
                      border: `1px solid ${isSelected ? '#a855f7' : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                      transition: 'all 150ms ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: '700', color: isSelected ? '#ffffff' : 'var(--text-primary)' }}>
                        {p.label}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {p.description}
                      </div>
                    </div>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: `2px solid ${isSelected ? '#a855f7' : 'var(--text-muted)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isSelected && (
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7' }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

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
              style={{ cursor: 'pointer', accentColor: '#a855f7' }}
            />
            <span>Auto-download PDF as soon as compression finishes</span>
          </label>

          {/* Live Progress Bar */}
          {loading && (
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: '600' }}>
                <span>Processing Pages...</span>
                <span style={{ color: '#c084fc' }}>
                  {progress.current} of {progress.total} ({progress.percent}%)
                </span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${progress.percent}%`,
                    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                  }}
                />
              </div>
            </div>
          )}

          {/* Compress Button */}
          <button
            className="btn-primary"
            onClick={handleCompress}
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.35)',
            }}
          >
            {loading ? (
              <>
                <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Compressing PDF...
              </>
            ) : (
              <>
                <Zap size={18} />
                Compress PDF Now
              </>
            )}
          </button>

          {/* Result Card */}
          {result && (
            <div
              className="result-card"
              ref={resultRef}
              style={{
                borderColor: 'rgba(168, 85, 247, 0.4)',
                animation: 'fadeIn 300ms ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div
                  className="saved-badge"
                  style={{
                    background: 'rgba(168, 85, 247, 0.16)',
                    borderColor: 'rgba(168, 85, 247, 0.4)',
                    color: '#c084fc',
                  }}
                >
                  <CheckCircle2 size={14} />
                  Saved {result.savingsPercent}% File Space!
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {result.pageCount} {result.pageCount === 1 ? 'Page' : 'Pages'} • {result.timeMs}ms
                </div>
              </div>

              {/* Stats Comparison */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  background: 'var(--bg-primary)',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Original File
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {formatBytes(result.originalSize)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#c084fc', textTransform: 'uppercase' }}>
                    Compressed
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#c084fc', marginTop: '2px' }}>
                    {formatBytes(result.size)}
                  </div>
                </div>
              </div>

              {/* Ready to Download Badge */}
              <div
                style={{
                  background: 'rgba(168, 85, 247, 0.12)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.82rem',
                }}
              >
                <span style={{ color: '#c084fc', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} />
                  {downloaded ? 'Downloaded Successfully!' : 'Ready to Download!'}
                </span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '800' }}>
                  {formatBytes(result.size)}
                </span>
              </div>

              {/* Primary Direct Download Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                <a
                  href={result.downloadUrl}
                  download={downloadFilename}
                  onClick={handleManualDownloadClick}
                  className="btn-primary"
                  style={{
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
                    padding: '15px 20px',
                    fontSize: '1rem',
                  }}
                >
                  {downloaded ? <Check size={20} /> : <Download size={20} />}
                  <span>{downloaded ? 'Downloaded!' : `Download PDF (${formatBytes(result.size)})`}</span>
                </a>

                {/* Secondary Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a
                    href={result.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ flex: 1, textDecoration: 'none', fontSize: '0.82rem', padding: '10px' }}
                    title="Open PDF in new tab"
                  >
                    <ExternalLink size={15} />
                    Open PDF
                  </a>

                  <button
                    className="btn-secondary"
                    onClick={handleShare}
                    style={{ flex: 1, fontSize: '0.82rem', padding: '10px' }}
                    title="Share PDF"
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
