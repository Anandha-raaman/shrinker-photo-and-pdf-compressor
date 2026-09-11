import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { formatBytes } from './imageCompressor';

// Configure PDF.js worker for Vite & mobile WebView
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

export interface PdfCompressionOptions {
  level: 'extreme' | 'balanced' | 'high_quality';
  targetDpi?: number;
  imageQuality?: number;
  onProgress?: (progress: { current: number; total: number; percent: number }) => void;
}

export interface PdfCompressionResult {
  blob: Blob;
  downloadUrl: string;
  size: number;
  originalSize: number;
  savingsPercent: number;
  pageCount: number;
  timeMs: number;
}

export const PDF_PRESETS = {
  extreme: {
    label: 'Extreme Compression',
    description: 'Smallest size. Ideal for strict job/exam form limits (<200-500 KB).',
    dpi: 96,
    quality: 0.45,
  },
  balanced: {
    label: 'Balanced (Recommended)',
    description: 'Crisp readability and great file reduction. Ideal for email & applications.',
    dpi: 140,
    quality: 0.65,
  },
  high_quality: {
    label: 'High Quality',
    description: 'Retains maximum sharpness for official printing and certificates.',
    dpi: 190,
    quality: 0.82,
  },
};

/**
 * Renders a PDF page to an offscreen HTML5 canvas at the target DPI
 */
async function renderPageToCanvas(
  page: any,
  dpi: number
): Promise<{ canvas: HTMLCanvasElement; widthPt: number; heightPt: number }> {
  // 72 DPI is standard PDF point coordinate scale
  const scale = dpi / 72;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('Cannot get canvas 2d context');

  // Fill crisp white background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const renderContext = {
    canvasContext: ctx,
    viewport: viewport,
  };

  await page.render(renderContext).promise;

  return {
    canvas,
    widthPt: viewport.width / scale,
    heightPt: viewport.height / scale,
  };
}

/**
 * Compresses any PDF 100% on-device client side
 */
export async function compressPdf(
  file: File | Blob,
  options: PdfCompressionOptions
): Promise<PdfCompressionResult> {
  const startTime = performance.now();
  const arrayBuffer = await file.arrayBuffer();

  const preset = PDF_PRESETS[options.level] || PDF_PRESETS.balanced;
  const dpi = options.targetDpi || preset.dpi;
  const quality = options.imageQuality || preset.quality;

  // Load document in PDF.js for visual page rendering
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
  const pdfDoc = await loadingTask.promise;
  const totalPages = pdfDoc.numPages;

  // Create a brand new, clean, optimized PDF with pdf-lib
  const newPdf = await PDFDocument.create();

  for (let i = 1; i <= totalPages; i++) {
    if (options.onProgress) {
      options.onProgress({
        current: i,
        total: totalPages,
        percent: Math.round((i / totalPages) * 100),
      });
    }

    const page = await pdfDoc.getPage(i);
    const { canvas, widthPt, heightPt } = await renderPageToCanvas(page, dpi);

    // Convert canvas to optimized JPEG byte array
    const jpegBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('Canvas toBlob failed'))),
        'image/jpeg',
        quality
      );
    });

    const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());
    const embeddedImage = await newPdf.embedJpg(jpegBytes);

    // Add page with original point dimensions
    const newPage = newPdf.addPage([widthPt, heightPt]);
    newPage.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: widthPt,
      height: heightPt,
    });
  }

  // Save with pdf-lib object stream optimization
  const compressedBytes = await newPdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });

  const finalBlob = new Blob([compressedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
  const downloadUrl = URL.createObjectURL(finalBlob);

  const savings = Math.max(0, Math.round(((file.size - finalBlob.size) / file.size) * 100));

  return {
    blob: finalBlob,
    downloadUrl,
    size: finalBlob.size,
    originalSize: file.size,
    savingsPercent: savings,
    pageCount: totalPages,
    timeMs: Math.round(performance.now() - startTime),
  };
}
