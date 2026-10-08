export interface CompressionOptions {
  quality: number; // 0.1 to 1.0
  maxWidth?: number;
  maxHeight?: number;
  format?: 'image/jpeg' | 'image/webp' | 'image/png';
}

export interface CompressionResult {
  blob: Blob;
  previewUrl: string;
  size: number;
  originalSize: number;
  width: number;
  height: number;
  savingsPercent: number;
  format: string;
  timeMs: number;
}

export interface LoadedSource {
  width: number;
  height: number;
  drawTo: (ctx: CanvasRenderingContext2D, targetWidth: number, targetHeight: number) => void;
  cleanup: () => void;
}

export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Loads an HTMLImageElement safely across Desktop and Mobile browsers.
 * CRITICAL RULE: NEVER set crossOrigin = 'anonymous' for blob: or data: URLs.
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Only set crossOrigin for external http/https URLs. NEVER for blob: or data:
    if (src.startsWith('http://') || src.startsWith('https://')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => resolve(img);
    img.onerror = () => {
      reject(
        new Error(
          'Failed to load image. The format may be unsupported by your phone browser or the file is corrupt.'
        )
      );
    };
    img.src = src;
  });
}

/**
 * Reads a File or Blob ONCE into an in-memory master canvas.
 * This guarantees that mobile browsers (Android content:// URIs & iOS gallery)
 * only read the file handle ONE time, completely preventing Android MediaProvider
 * permission timeouts and mid-loop FileReader crashes.
 */
export async function loadSourceImage(fileOrBlob: File | Blob): Promise<LoadedSource> {
  // Tier 1: URL.createObjectURL + HTMLImageElement (Fastest, zero base64 memory overhead)
  try {
    const objectUrl = URL.createObjectURL(fileOrBlob);
    try {
      const img = await loadImage(objectUrl);
      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;

      // Copy source to master canvas once and immediately revoke ObjectURL
      const masterCanvas = document.createElement('canvas');
      masterCanvas.width = width;
      masterCanvas.height = height;
      const mCtx = masterCanvas.getContext('2d');
      if (mCtx) {
        mCtx.drawImage(img, 0, 0);
        URL.revokeObjectURL(objectUrl); // Clean up immediately

        return {
          width,
          height,
          drawTo: (ctx, tw, th) => ctx.drawImage(masterCanvas, 0, 0, tw, th),
          cleanup: () => {
            masterCanvas.width = 1;
            masterCanvas.height = 1;
          },
        };
      }
    } catch (e) {
      URL.revokeObjectURL(objectUrl);
      console.warn('URL.createObjectURL tier failed, falling back to createImageBitmap', e);
    }
  } catch (e) {
    console.warn('URL.createObjectURL creation failed', e);
  }

  // Tier 2: createImageBitmap (Hardware accelerated GPU decode)
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(fileOrBlob);
      const width = bitmap.width;
      const height = bitmap.height;

      const masterCanvas = document.createElement('canvas');
      masterCanvas.width = width;
      masterCanvas.height = height;
      const mCtx = masterCanvas.getContext('2d');
      if (mCtx) {
        mCtx.drawImage(bitmap, 0, 0);
        bitmap.close(); // Clean up bitmap immediately

        return {
          width,
          height,
          drawTo: (ctx, tw, th) => ctx.drawImage(masterCanvas, 0, 0, tw, th),
          cleanup: () => {
            masterCanvas.width = 1;
            masterCanvas.height = 1;
          },
        };
      }
    } catch (e) {
      console.warn('createImageBitmap tier failed, falling back to FileReader', e);
    }
  }

  // Tier 3: FileReader readAsDataURL
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () =>
      reject(new Error('Unable to read photo. Please select the image again from your phone gallery.'));
    reader.readAsDataURL(fileOrBlob);
  });

  const img = await loadImage(dataUrl);
  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;

  const masterCanvas = document.createElement('canvas');
  masterCanvas.width = width;
  masterCanvas.height = height;
  const mCtx = masterCanvas.getContext('2d');
  if (mCtx) {
    mCtx.drawImage(img, 0, 0);
  }

  return {
    width,
    height,
    drawTo: (ctx, tw, th) => ctx.drawImage(masterCanvas, 0, 0, tw, th),
    cleanup: () => {
      masterCanvas.width = 1;
      masterCanvas.height = 1;
    },
  };
}

/**
 * Internal canvas compression engine working from an in-memory LoadedSource
 */
export async function compressLoadedSource(
  source: LoadedSource,
  originalFileSize: number,
  options: CompressionOptions
): Promise<CompressionResult> {
  const startTime = performance.now();
  const format = options.format || 'image/jpeg';
  const quality = Math.max(0.05, Math.min(1.0, options.quality));

  let targetWidth = source.width;
  let targetHeight = source.height;

  // Scale dimensions if requested
  if (options.maxWidth && targetWidth > options.maxWidth) {
    const ratio = options.maxWidth / targetWidth;
    targetWidth = Math.round(options.maxWidth);
    targetHeight = Math.round(targetHeight * ratio);
  }

  if (options.maxHeight && targetHeight > options.maxHeight) {
    const ratio = options.maxHeight / targetHeight;
    targetHeight = Math.round(options.maxHeight);
    targetWidth = Math.round(targetWidth * ratio);
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Unable to create canvas context on this device');

  // Fill white background for transparent PNG to JPEG conversion
  if (format === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  source.drawTo(ctx, targetWidth, targetHeight);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Canvas toBlob compression failed'));
      },
      format,
      quality
    );
  });

  const previewUrl = URL.createObjectURL(blob);
  const savings = Math.max(0, Math.round(((originalFileSize - blob.size) / originalFileSize) * 100));

  return {
    blob,
    previewUrl,
    size: blob.size,
    originalSize: originalFileSize,
    width: targetWidth,
    height: targetHeight,
    savingsPercent: savings,
    format: format.replace('image/', '').toUpperCase(),
    timeMs: Math.round(performance.now() - startTime),
  };
}

/**
 * Standard client-side canvas compressor
 */
export async function compressImage(
  file: File | Blob,
  options: CompressionOptions
): Promise<CompressionResult> {
  const source = await loadSourceImage(file);
  try {
    return await compressLoadedSource(source, file.size, options);
  } finally {
    source.cleanup();
  }
}

/**
 * Intelligent Binary-Search compressor to hit an exact Target KB
 * Perfect for exam portals, passport uploads, visa forms (20KB, 50KB, 100KB)
 */
export async function compressToExactKB(
  file: File | Blob,
  targetKB: number,
  format: 'image/jpeg' | 'image/webp' = 'image/jpeg'
): Promise<CompressionResult> {
  const targetBytes = targetKB * 1024;
  const startTime = performance.now();

  // READ THE FILE ONCE into RAM!
  const source = await loadSourceImage(file);

  try {
    const origWidth = source.width;
    const origHeight = source.height;

    // If file is already smaller than target, run light pass
    if (file.size <= targetBytes) {
      const res = await compressLoadedSource(source, file.size, { quality: 0.92, format });
      res.timeMs = Math.round(performance.now() - startTime);
      return res;
    }

    let minQ = 0.05;
    let maxQ = 0.95;
    let bestResult: CompressionResult | null = null;
    let scale = 1.0;

    // Up to 5 dimension downscale attempts if high resolution prevents hitting target
    for (let scaleAttempt = 0; scaleAttempt < 5; scaleAttempt++) {
      const curWidth = Math.max(64, Math.round(origWidth * scale));
      const curHeight = Math.max(64, Math.round(origHeight * scale));

      minQ = 0.05;
      maxQ = 0.95;

      for (let iter = 0; iter < 7; iter++) {
        const midQ = (minQ + maxQ) / 2;
        const result = await compressLoadedSource(source, file.size, {
          quality: midQ,
          maxWidth: curWidth,
          maxHeight: curHeight,
          format,
        });

        if (result.size <= targetBytes) {
          bestResult = result;
          minQ = midQ; // Try higher quality
        } else {
          maxQ = midQ; // Reduce quality
        }

        // Within 5% of target is a sweet spot!
        if (result.size <= targetBytes && result.size >= targetBytes * 0.95) {
          bestResult = result;
          break;
        }
      }

      if (bestResult && bestResult.size <= targetBytes) {
        break; // Successfully found an image under target
      }

      // If still too large at minimum quality, downscale dimensions
      scale *= 0.72;
    }

    // Fallback if bestResult not found
    if (!bestResult) {
      bestResult = await compressLoadedSource(source, file.size, {
        quality: 0.1,
        maxWidth: Math.round(origWidth * scale),
        maxHeight: Math.round(origHeight * scale),
        format,
      });
    }

    bestResult.timeMs = Math.round(performance.now() - startTime);
    return bestResult;
  } finally {
    source.cleanup();
  }
}
