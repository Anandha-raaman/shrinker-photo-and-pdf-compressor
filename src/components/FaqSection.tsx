import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Shield, Zap, Lock } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How do I compress a photo to exact 20 KB or 50 KB?',
    answer:
      'Simply drop or select your photo, click the "20 KB" or "50 KB" preset chip (or enter any custom KB value), and click "Compress Image Now". Our intelligent binary-search algorithm automatically adjusts dimensions and quality to ensure the file fits strictly under your target size while preserving maximum sharpness.',
  },
  {
    question: 'What are the photo and signature size rules for SSC, UPSC, and IBPS?',
    answer:
      'For UPSC and SSC (CGL, CHSL, MTS), photos must be between 20 KB and 50 KB, and signatures between 10 KB and 20 KB. For Banking (IBPS, SBI), signatures and thumbprints must also fit under 20 KB, while handwritten declarations can be up to 100 KB. Shrinker presets (20 KB & 50 KB) are calibrated specifically to pass these portal validation checks on the first attempt.',
  },
  {
    question: 'How do I resize a passport photo to 50 KB without losing clarity?',
    answer:
      'Upload your photo, select the 50 KB preset chip, and click Compress. Shrinker proportionately optimizes resolution and JPEG quantization tables so facial features, eyes, and borders remain crisp and clear without blurry artifacts.',
  },
  {
    question: 'Can I compress marksheets and certificates in PDF below 100 KB or 200 KB?',
    answer:
      'Yes! Switch to the PDF tab and choose the Extreme or Balanced preset. Shrinker strips bloated metadata, unneeded font streams, and compresses raster pages to fit tight application portal caps.',
  },
  {
    question: 'Are my photos or PDFs uploaded to any server?',
    answer:
      'No! Unlike other online compressors, Shrinker runs 100% on your local device inside your web browser using HTML5 Canvas and WebAssembly. Your personal files, photos, ID cards, and PDF documents never leave your computer or phone.',
  },
  {
    question: 'Is Shrinker free to use? Are there daily limits?',
    answer:
      'Yes, Shrinker is 100% free with unlimited compressions. There are no subscriptions, no account sign-ups, and no watermarks added to your documents.',
  },
  {
    question: 'Which formats are supported?',
    answer:
      'Shrinker supports all standard image formats including JPEG, JPG, PNG, WebP, and standard PDF documents. You can also batch-compress multiple photos and download them together in a single ZIP file.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="card" style={{ marginTop: '8px' }}>
      <div className="card-title" style={{ fontSize: '0.95rem' }}>
        <HelpCircle size={18} color="#38bdf8" />
        Frequently Asked Questions & Guide
      </div>
      <p className="card-subtitle">
        Everything you need to know about 100% private offline file compression.
      </p>

      {/* Feature Highlights Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            padding: '10px 8px',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Lock size={16} color="#10b981" style={{ margin: '0 auto 4px' }} />
          <div style={{ fontSize: '0.74rem', fontWeight: '700' }}>100% Private</div>
          <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>Zero Cloud Uploads</div>
        </div>

        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            padding: '10px 8px',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Zap size={16} color="#38bdf8" style={{ margin: '0 auto 4px' }} />
          <div style={{ fontSize: '0.74rem', fontWeight: '700' }}>Exact KB Target</div>
          <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>20KB, 50KB, 100KB</div>
        </div>

        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            padding: '10px 8px',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Shield size={16} color="#a855f7" style={{ margin: '0 auto 4px' }} />
          <div style={{ fontSize: '0.74rem', fontWeight: '700' }}>No Watermark</div>
          <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>Free & Unlimited</div>
        </div>
      </div>

      {/* Exam & Portal Size Requirements Quick Sheet */}
      <div
        style={{
          background: 'rgba(56, 189, 248, 0.04)',
          border: '1px solid rgba(56, 189, 248, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          marginBottom: '16px',
        }}
      >
        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#38bdf8', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>📋 Popular Exam & Job Form Upload Limits</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', fontSize: '0.72rem' }}>
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '6px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>UPSC / Civil Services</div>
            <div style={{ color: 'var(--text-muted)' }}>Photo: 20–50 KB</div>
            <div style={{ color: 'var(--text-muted)' }}>Sign: 10–20 KB</div>
          </div>
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '6px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>SSC (CGL, CHSL, MTS)</div>
            <div style={{ color: 'var(--text-muted)' }}>Photo: 20–50 KB</div>
            <div style={{ color: 'var(--text-muted)' }}>Sign: 10–20 KB</div>
          </div>
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '6px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Banking (IBPS, SBI)</div>
            <div style={{ color: 'var(--text-muted)' }}>Photo: 20–50 KB</div>
            <div style={{ color: 'var(--text-muted)' }}>Thumb & Sign: &lt;20 KB</div>
          </div>
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '6px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>NTA NEET / JEE</div>
            <div style={{ color: 'var(--text-muted)' }}>Photo: 10–200 KB</div>
            <div style={{ color: 'var(--text-muted)' }}>Sign: 4–30 KB</div>
          </div>
        </div>
      </div>

      {/* Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              style={{
                background: 'var(--bg-surface-elevated)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                transition: 'all var(--trans-fast)',
              }}
            >
              <button
                onClick={() => toggleFaq(idx)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  fontWeight: '600',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{faq.question}</span>
                {isOpen ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '0 14px 12px 14px',
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '10px',
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
