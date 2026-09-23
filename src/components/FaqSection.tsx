import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Shield, Zap, Lock, BookOpen, AlertCircle, CheckCircle2, FileText } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How do I compress a photo or signature to exact 20 KB or 50 KB?',
    answer:
      'Simply drop or select your photo or signature document, click the "20 KB" or "50 KB" preset chip (or enter any custom KB target in the input field), and click "Compress Image Now". Our intelligent binary-search algorithm performs real-time quantization and iterative dimensional scaling to guarantee the resulting file sits strictly under your target size while preserving maximum sharpness and border contrast.',
  },
  {
    question: 'What are the photo and signature size rules for SSC, UPSC, and IBPS?',
    answer:
      'For UPSC and SSC (CGL, CHSL, MTS, GD), photos must strictly be between 20 KB and 50 KB, and signatures between 10 KB and 20 KB. For Banking examinations (IBPS PO, Clerk, SBI), passport photos must be 20 KB – 50 KB, while signatures and left-thumb impressions must be between 10 KB and 20 KB. Handwritten declarations are accepted between 50 KB and 100 KB. Shrinker presets (20 KB & 50 KB) are calibrated to ensure 100% portal upload acceptance on your initial submission.',
  },
  {
    question: 'How do I resize a passport photo to 50 KB without losing facial clarity?',
    answer:
      'Upload your passport photo, select the 50 KB preset chip, and click Compress. Shrinker calculates the exact mathematical balance between bicubic downsampling and JPEG DCT quantization tables. This ensures eyes, borders, facial contours, and stamps remain razor-sharp without blurry artifacts or pixelated noise.',
  },
  {
    question: 'Can I compress marksheets, degree certificates, and affidavits in PDF below 100 KB or 200 KB?',
    answer:
      'Yes! Switch to the PDF tab and select your PDF file. Choose the Extreme (under 100 KB) or Balanced (under 200 KB) preset, or set a custom quality slider. Shrinker strips redundant embedded metadata, flattens unused font subsets, and compresses multi-page raster streams to meet strict job and college admission portal caps without rendering text unreadable.',
  },
  {
    question: 'Are my personal photos, ID proofs, or PDF documents uploaded to any remote server?',
    answer:
      'No! Unlike conventional cloud-based compression websites that transmit your sensitive documents across the internet to third-party servers, Shrinker runs 100% locally on your own machine. All compression algorithms execute inside your web browser’s memory using modern HTML5 Canvas, typed arrays, and WebAssembly. Your photos, signatures, Aadhaar cards, and certificates never leave your device.',
  },
  {
    question: 'Is Shrinker completely free to use? Are there daily compression limits?',
    answer:
      'Shrinker is 100% free with unlimited compressions. There are no subscriptions, no credit card requirements, no account sign-ups, and no intrusive watermarks stamped onto your output documents.',
  },
  {
    question: 'Which image and document formats are supported?',
    answer:
      'Shrinker supports all major web and document formats including JPEG, JPG, PNG, and WebP, as well as multi-page PDF documents. In addition, you can batch-compress up to 30 photos simultaneously in the Batch tab and download all compressed files packaged into a single ZIP archive.',
  },
  {
    question: 'Why do government portals reject photos even when the file size is under 50 KB?',
    answer:
      'Portals frequently reject images due to dimensional mismatches (e.g. demanding 3.5cm x 4.5cm or specific pixel aspect ratios), non-white backgrounds, excessive blurriness from aggressive compression, or incorrect file extensions (such as uploading PNG or WebP when only standard .jpg / .jpeg is allowed). Shrinker allows you to dial in dimensions and automatically outputs compliant JPEG files.',
  },
  {
    question: 'What is the recommended signature size and background for online job forms?',
    answer:
      'Most testing authorities require signatures written with black or dark blue ink on clean, unruled white paper. The scanned signature should be cropped closely to eliminate wide blank margins, then compressed to strictly between 10 KB and 20 KB. Shrinker ensures the stroke lines remain solid and dark against the white background.',
  },
  {
    question: 'Can I compress photos and PDFs on mobile phones (Android & iPhone)?',
    answer:
      'Yes. Shrinker is built with a responsive, mobile-first design. It functions seamlessly in mobile Chrome, Safari, Firefox, and Edge. On Android, you can also use our native offline app packaged with Capacitor.',
  },
  {
    question: 'How does the exact KB targeting algorithm work?',
    answer:
      'Instead of guessing arbitrary quality numbers (like 50% or 70%), Shrinker employs a binary-search optimization engine. It tests multiple compression iterations in browser memory within milliseconds, finding the highest possible visual quality level and resolution that stays strictly beneath your specified byte limit.',
  },
  {
    question: 'What DPI / PPI should I use for government exam uploads?',
    answer:
      'Most online portals specify 200 DPI or 300 DPI for scanned documents and 100 to 200 DPI for photographs. In digital form uploads, the primary validation rules enforced by portal code are file size (KB) and pixel dimensions (e.g., 200x230 px or 350x350 px). Shrinker maintains the optimal pixel ratio for flawless acceptance.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
      {/* Feature Highlights Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
        }}
      >
        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            padding: '12px 8px',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Lock size={18} color="#10b981" style={{ margin: '0 auto 4px' }} />
          <div style={{ fontSize: '0.78rem', fontWeight: '700' }}>100% Private</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Zero Cloud Uploads</div>
        </div>

        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            padding: '12px 8px',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Zap size={18} color="#38bdf8" style={{ margin: '0 auto 4px' }} />
          <div style={{ fontSize: '0.78rem', fontWeight: '700' }}>Exact KB Target</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>20KB, 50KB, 100KB</div>
        </div>

        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            padding: '12px 8px',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Shield size={18} color="#a855f7" style={{ margin: '0 auto 4px' }} />
          <div style={{ fontSize: '0.78rem', fontWeight: '700' }}>No Watermark</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Free & Unlimited</div>
        </div>
      </div>

      {/* Guide Section 1: Exam & Portal Upload Specifications Table */}
      <div className="card">
        <div className="card-title" style={{ fontSize: '0.95rem' }}>
          <BookOpen size={18} color="#38bdf8" />
          Official Examination & Government Portal Upload Limits (2026)
        </div>
        <p className="card-subtitle" style={{ marginBottom: '14px' }}>
          Reference specifications calibrated for Indian and international competitive exam portals, visa applications, and identity registries.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: '700', color: '#38bdf8', fontSize: '0.82rem', marginBottom: '4px' }}>
              UPSC (Civil Services, NDA, CDS)
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              • <strong>Photo:</strong> 20 KB to 50 KB (Min: 350x350 px)<br />
              • <strong>Signature:</strong> 10 KB to 20 KB (Min: 350x350 px)<br />
              • <strong>Format:</strong> Strictly JPG / JPEG format
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: '700', color: '#38bdf8', fontSize: '0.82rem', marginBottom: '4px' }}>
              SSC (CGL, CHSL, MTS, CPO, GD)
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              • <strong>Photo:</strong> 20 KB to 50 KB (3.5 cm × 4.5 cm)<br />
              • <strong>Signature:</strong> 10 KB to 20 KB (4.0 cm × 2.0 cm)<br />
              • <strong>Requirement:</strong> Plain white background
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: '700', color: '#38bdf8', fontSize: '0.82rem', marginBottom: '4px' }}>
              Banking (IBPS PO, Clerk, SBI, RBI)
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              • <strong>Photo:</strong> 20 KB to 50 KB (200 × 230 px)<br />
              • <strong>Signature & Thumb:</strong> 10 KB to 20 KB (140 × 60 px)<br />
              • <strong>Handwritten Declaration:</strong> 50 KB to 100 KB
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: '700', color: '#38bdf8', fontSize: '0.82rem', marginBottom: '4px' }}>
              NTA (NEET-UG, JEE Main, CUET)
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              • <strong>Passport Photo:</strong> 10 KB to 200 KB<br />
              • <strong>Postcard Photo (4"×6"):</strong> 10 KB to 200 KB<br />
              • <strong>Signature:</strong> 4 KB to 30 KB
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: '700', color: '#38bdf8', fontSize: '0.82rem', marginBottom: '4px' }}>
              State PSCs & Police Recruitment
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              • <strong>Photo:</strong> 20 KB to 50 KB<br />
              • <strong>Signature:</strong> 10 KB to 20 KB<br />
              • <strong>Documents (PDF):</strong> 100 KB to 300 KB
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: '700', color: '#38bdf8', fontSize: '0.82rem', marginBottom: '4px' }}>
              International Visa & Passport
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              • <strong>US DS-160 / Visa:</strong> Min 600×600 px, ≤ 240 KB<br />
              • <strong>Schengen Visa:</strong> 35 mm × 45 mm, ≤ 200 KB<br />
              • <strong>Passport Sewa:</strong> 20 KB to 50 KB
            </div>
          </div>
        </div>
      </div>

      {/* Guide Section 2: Step-by-Step Instructions */}
      <div className="card">
        <div className="card-title" style={{ fontSize: '0.95rem' }}>
          <FileText size={18} color="#10b981" />
          Step-by-Step Guide: How to Compress to Exact KB
        </div>
        <p className="card-subtitle" style={{ marginBottom: '14px' }}>
          Follow these simple steps to prepare compliant files for any online application form.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontWeight: '800', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem' }}>1</div>
            <div><strong>Select or Drop File:</strong> Tap the upload zone to choose your photo, scanned signature, or PDF from your gallery or file manager.</div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontWeight: '800', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem' }}>2</div>
            <div><strong>Pick Your Target Size:</strong> Tap a quick-preset chip like <strong>20 KB</strong> (for signatures) or <strong>50 KB</strong> (for passport photos), or type an exact custom limit in the target box.</div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontWeight: '800', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem' }}>3</div>
            <div><strong>Execute Precision Compression:</strong> Click "Compress Image Now". Shrinker's binary-search optimizer runs multiple quality passes in milliseconds to ensure the final file fits strictly within your limit.</div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontWeight: '800', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem' }}>4</div>
            <div><strong>Review & Download:</strong> Inspect the live preview and exact before/after file weight. Tap Download to save your ready-to-upload file instantly.</div>
          </div>
        </div>
      </div>

      {/* Guide Section 3: Technical Privacy Architecture */}
      <div className="card">
        <div className="card-title" style={{ fontSize: '0.95rem' }}>
          <Shield size={18} color="#a855f7" />
          Why In-Browser Client-Side Processing Protects You
        </div>
        <p className="card-subtitle" style={{ marginBottom: '12px' }}>
          Understanding the security difference between Shrinker and traditional online converters.
        </p>

        <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <p style={{ margin: '0 0 10px 0' }}>
            Most online image and PDF compressors upload your uploaded files to remote cloud servers for server-side processing. When uploading government ID cards, biometric signatures, caste certificates, or passport photos, this creates serious identity theft and data breach liabilities.
          </p>
          <p style={{ margin: '0' }}>
            <strong>Shrinker is fundamentally different:</strong> It utilizes modern WebAssembly and HTML5 Canvas APIs to execute 100% of mathematical compression operations directly inside your device's browser memory. Zero bytes leave your device, meaning your sensitive documents remain completely private and confidential.
          </p>
        </div>
      </div>

      {/* Guide Section 4: Common Rejection Pitfalls */}
      <div className="card">
        <div className="card-title" style={{ fontSize: '0.95rem' }}>
          <AlertCircle size={18} color="#f59e0b" />
          5 Common Form Rejection Mistakes to Avoid
        </div>
        <p className="card-subtitle" style={{ marginBottom: '12px' }}>
          Avoid these frequent candidate mistakes during competitive exam application submissions.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <CheckCircle2 size={15} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div><strong>Distorted Aspect Ratio:</strong> Never stretch or squash photos manually. Shrinker maintains proportional aspect ratios so facial proportions are not altered.</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <CheckCircle2 size={15} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div><strong>Faint or Shadowed Signatures:</strong> Always sign on clean white paper with black or dark blue ink. Avoid casting phone camera shadows over the paper when photographing.</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <CheckCircle2 size={15} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div><strong>Busy or Coloured Backgrounds:</strong> Passport photos require clean, solid white or light-grey backgrounds. Avoid outdoor selfies or patterned wallpapers.</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <CheckCircle2 size={15} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div><strong>Incorrect Extension Format:</strong> Even if a file is an image, some portals reject `.png` or `.webp`. Shrinker exports strictly standard `.jpg` files for universal acceptance.</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <CheckCircle2 size={15} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div><strong>Oversized Margins on Signatures:</strong> Crop away excess empty white paper around the signature before compressing to maximize clarity at 10–20 KB.</div>
          </div>
        </div>
      </div>

      {/* Accordion FAQ List */}
      <div className="card">
        <div className="card-title" style={{ fontSize: '0.95rem' }}>
          <HelpCircle size={18} color="#38bdf8" />
          Frequently Asked Questions (FAQ)
        </div>
        <p className="card-subtitle" style={{ marginBottom: '14px' }}>
          Everything you need to know about high-fidelity file compression, limits, and compatibility.
        </p>

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
    </div>
  );
};

