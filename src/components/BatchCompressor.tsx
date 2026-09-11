import React, { useState, useRef } from 'react';
import { Layers, Upload, Download, RefreshCw, CheckCircle2, Archive, Trash2, Zap } from 'lucide-react';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import { compressToExactKB, formatBytes, CompressionResult } from '../services/imageCompressor';

interface BatchItem {
  id: string;
  file: File;
  previewUrl: string;
  status: 'pending' | 'compressing' | 'done' | 'error';
  result?: CompressionResult;
}

export const BatchCompressor: React.FC = () => {
  const [items, setItems] = useState<BatchItem[]>([]);
  const [targetKb, setTargetKb] = useState<number>(100);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList) => {
    const newItems: BatchItem[] = Array.from(fileList)
      .filter((f) => f.type.startsWith('image/'))
      .map((f) => ({
        id: Math.random().toString(36).substring(2, 9),
        file: f,
        previewUrl: URL.createObjectURL(f),
        status: 'pending',
      }));

    if (newItems.length === 0) {
      alert('Please select valid image files');
      return;
    }

    setItems((prev) => [...prev, ...newItems]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      const found = prev.find((item) => item.id === id);
      if (found?.previewUrl) URL.revokeObjectURL(found.previewUrl);
      return filtered;
    });
  };

  const handleCompressAll = async () => {
    if (items.length === 0 || loading) return;
    setLoading(true);

    const updatedItems = [...items];

    for (let i = 0; i < updatedItems.length; i++) {
      const item = updatedItems[i];
      if (item.status === 'done') continue;

      item.status = 'compressing';
      setItems([...updatedItems]);

      try {
        const res = await compressToExactKB(item.file, targetKb, 'image/jpeg');
        item.result = res;
        item.status = 'done';
      } catch (err) {
        console.error(err);
        item.status = 'error';
      }

      setItems([...updatedItems]);
    }

    setLoading(false);
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.8 },
      colors: ['#06b6d4', '#3b82f6', '#10b981'],
    });
  };

  const handleDownloadZip = async () => {
    const doneItems = items.filter((i) => i.status === 'done' && i.result);
    if (doneItems.length === 0) return;

    const zip = new JSZip();
    doneItems.forEach((item, index) => {
      const ext = item.result?.format.toLowerCase() === 'jpeg' ? 'jpg' : item.result?.format.toLowerCase();
      const baseName = item.file.name.replace(/\.[^/.]+$/, '');
      zip.file(`${baseName}_compressed_${index + 1}.${ext}`, item.result!.blob);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = `Shrinkr_Batch_${targetKb}KB.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const totalOriginal = items.reduce((acc, curr) => acc + curr.file.size, 0);
  const totalCompressed = items.reduce((acc, curr) => acc + (curr.result ? curr.result.size : curr.file.size), 0);
  const totalDone = items.filter((i) => i.status === 'done').length;

  return (
    <div className="card">
      <div className="card-title">
        <Layers size={18} color="#06b6d4" />
        Batch Photo Compressor
      </div>
      <p className="card-subtitle">
        Select multiple photos and compress them all at once. Download as a single ZIP.
      </p>

      {/* Upload Zone */}
      <div
        className="dropzone"
        onClick={() => fileInputRef.current?.click()}
        style={{ padding: '20px 16px' }}
      >
        <input
          type="file"
          ref={fileInputRef}
          multiple
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          accept="image/jpeg,image/png,image/webp"
          style={{ display: 'none' }}
        />
        <div
          className="dropzone-icon-box"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
            borderColor: 'rgba(6, 182, 212, 0.3)',
            color: '#06b6d4',
          }}
        >
          <Upload size={24} />
        </div>
        <h3 style={{ fontSize: '0.92rem' }}>Add Multiple Photos</h3>
        <p style={{ fontSize: '0.76rem' }}>Select 5, 10, 20+ images to compress in bulk</p>
      </div>

      {items.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '14px' }}>
          {/* Target KB Selector */}
          <div
            style={{
              background: 'var(--bg-surface-elevated)',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: '0.84rem', fontWeight: '600' }}>Target Size for all:</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[50, 100, 200, 500].map((kb) => (
                <button
                  key={kb}
                  onClick={() => setTargetKb(kb)}
                  className="icon-btn"
                  style={{
                    width: 'auto',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    background: targetKb === kb ? '#06b6d4' : 'var(--bg-surface)',
                    color: targetKb === kb ? '#fff' : 'var(--text-secondary)',
                    borderColor: targetKb === kb ? '#06b6d4' : 'var(--border-subtle)',
                  }}
                >
                  {kb} KB
                </button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn-primary"
              onClick={handleCompressAll}
              disabled={loading || items.every((i) => i.status === 'done')}
              style={{
                flex: 2,
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
              }}
            >
              {loading ? (
                <>
                  <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  Compressing {totalDone}/{items.length}...
                </>
              ) : (
                <>
                  <Zap size={16} />
                  Compress All ({items.length})
                </>
              )}
            </button>

            {totalDone > 0 && (
              <button
                className="btn-secondary"
                onClick={handleDownloadZip}
                style={{ flex: 1, borderColor: '#06b6d4', color: '#06b6d4' }}
                title="Download all as ZIP"
              >
                <Archive size={16} />
                ZIP ({totalDone})
              </button>
            )}
          </div>

          {/* Overall Stats Banner */}
          {totalDone > 0 && (
            <div
              style={{
                padding: '10px 14px',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.82rem',
              }}
            >
              <span style={{ color: 'var(--text-secondary)' }}>Total Space Reduced:</span>
              <span style={{ fontWeight: '800', color: '#06b6d4' }}>
                {formatBytes(totalOriginal)} ➔ {formatBytes(totalCompressed)} (-
                {Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 100)}%)
              </span>
            </div>
          )}

          {/* Files List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                  <img
                    src={item.previewUrl}
                    alt=""
                    style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <div
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '160px',
                      }}
                    >
                      {item.file.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {formatBytes(item.file.size)}
                      {item.result && (
                        <span style={{ color: '#06b6d4', fontWeight: '700', marginLeft: '6px' }}>
                          ➔ {formatBytes(item.result.size)} (-{item.result.savingsPercent}%)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {item.status === 'done' && <CheckCircle2 size={16} color="#10b981" />}
                  {item.status === 'compressing' && (
                    <RefreshCw size={14} color="#06b6d4" style={{ animation: 'spin 1s linear infinite' }} />
                  )}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="icon-btn"
                    style={{ width: '28px', height: '28px' }}
                    title="Remove item"
                  >
                    <Trash2 size={13} color="var(--text-muted)" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
