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
 * CRITICAL FIX: Do NOT set crossOrigin = 'anonymous' for blob: or data: URLs,
 * because mobile Chrome and Safari block local blob URLs when crossOrigin is set,
 * throwing "Failed to load image: [object Event]".
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Only set crossOrigin for external http/https URLs. Never for blob: or data:
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
 * Helper to decode image dimensions and draw onto canvas safely on Mobile & Desktop.
 * Prefers createImageBitmap (hardware-accelerated & memory efficient on mobile phones).
 * Falls back to FileReader data URL + HTMLImageElement if createImageBitmap fails.
 */
async function getLoadedImageDrawable(fileOrBlob: File | Blob): Promise<{
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D, targetWidth: number, targetHeight: number) => void;
  cleanup: () => void;
}> {
  // Method 1: Try createImageBitmap (hardware accelerated, high performance on Mobile Chrome/Safari)
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(fileOrBlob);
      return {
        width: bitmap.width,
        height: bitmap.height,
        draw: (ctx, tw, th) => ctx.drawImage(bitmap, 0, 0, tw, th),
        cleanup: () => bitmap.close(),
      };
    } catch (e) {
      console.warn('createImageBitmap failed, falling back to FileReader', e);
    }
  }

  // Method 2: Fallback to FileReader readAsDataURL (Avoids blob CORS issues on mobile)
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read image file on this device.'));
    reader.readAsDataURL(fileOrBlob);
  });

  const img = await loadImage(dataUrl);
  return {
    width: img.naturalWidth || img.width,
    height: img.naturalHeight || img.height,
    draw: (ctx, tw, th) => ctx.drawImage(img, 0, 0, tw, th),
    cleanup: () => {},
  };
}

/**
 * Standard client-side canvas compressor
 */
export async function compressImage(
  file: File | Blob,
  options: CompressionOptions
): Promise<CompressionResult> {
  const startTime = performance.now();
  const format = options.format || 'image/jpeg';
  const quality = Math.max(0.05, Math.min(1.0, options.quality));

  const drawable = await getLoadedImageDrawable(file);

  try {
    let targetWidth = drawable.width;
    let targetHeight = drawable.height;

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
    drawable.draw(ctx, targetWidth, targetHeight);

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
    const savings = Math.max(0, Math.round(((file.size - blob.size) / file.size) * 100));

    return {
      blob,
      previewUrl,
      size: blob.size,
      originalSize: file.size,
      width: targetWidth,
      height: targetHeight,
      savingsPercent: savings,
      format: format.replace('image/', '').toUpperCase(),
      timeMs: Math.round(performance.now() - startTime),
    };
  } finally {
    drawable.cleanup();
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

  const drawable = await getLoadedImageDrawable(file);
  const origWidth = drawable.width;
  const origHeight = drawable.height;

  drawable.cleanup();

  try {
    // If file is already smaller than target, run light pass to optimize format
    if (file.size <= targetBytes) {
      return await compressImage(file, { quality: 0.92, format });
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
        const result = await compressImage(file, {
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
      bestResult = await compressImage(file, {
        quality: 0.1,
        maxWidth: Math.round(origWidth * scale),
        maxHeight: Math.round(origHeight * scale),
        format,
      });
    }

    bestResult.timeMs = Math.round(performance.now() - startTime);
    return bestResult;
  } catch (err: any) {
    throw new Error(err.message || 'Image compression failed on mobile browser.');
  }
}
