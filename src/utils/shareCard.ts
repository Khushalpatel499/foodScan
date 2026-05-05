import type { Product, HealthScore } from '../types';

/**
 * Generates a shareable health card image using Canvas API.
 * Returns a Blob that can be shared via Web Share API or downloaded.
 * Pure utility — no React, no DOM dependencies beyond canvas.
 */
export async function generateShareCard(product: Product, healthScore: HealthScore): Promise<Blob> {
  const W = 600;
  const H = 800;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, 0, 0, W, H, 24);
  ctx.fill();

  // Top color band based on score
  const bandColor = { green: '#10b981', yellow: '#f59e0b', red: '#ef4444' }[healthScore.color];
  ctx.fillStyle = bandColor;
  roundRect(ctx, 0, 0, W, 180, 24, true);
  ctx.fill();

  // Score circle
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(W / 2, 130, 55, 0, Math.PI * 2);
  ctx.fill();

  // Score number
  ctx.fillStyle = bandColor;
  ctx.font = 'bold 40px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${healthScore.score}`, W / 2, 145);

  // Score label
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
  ctx.fillText(healthScore.label, W / 2, 50);

  // Product image (if available)
  if (product.image) {
    try {
      const img = await loadImage(product.image);
      const imgSize = 100;
      ctx.save();
      ctx.beginPath();
      ctx.arc(80, 130, 45, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, 35, 85, imgSize, imgSize);
      ctx.restore();
    } catch {
      // Skip image if it fails to load
    }
  }

  // Product name
  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  const name = truncateText(product.name, 30);
  ctx.fillText(name, W / 2, 230);

  // Brand
  ctx.fillStyle = '#6b7280';
  ctx.font = '16px system-ui, -apple-system, sans-serif';
  ctx.fillText(product.brand, W / 2, 260);

  // Divider
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, 285);
  ctx.lineTo(W - 40, 285);
  ctx.stroke();

  // Nutrition grid
  const nutrients = [
    { label: 'Calories', value: `${product.nutriments.energy.toFixed(0)} kcal` },
    { label: 'Fat', value: `${product.nutriments.fat.toFixed(1)}g` },
    { label: 'Sugars', value: `${product.nutriments.sugars.toFixed(1)}g` },
    { label: 'Salt', value: `${product.nutriments.salt.toFixed(1)}g` },
    { label: 'Protein', value: `${product.nutriments.proteins.toFixed(1)}g` },
    { label: 'Fiber', value: `${product.nutriments.fiber.toFixed(1)}g` },
  ];

  ctx.textAlign = 'center';
  const cols = 3;
  const cellW = (W - 80) / cols;
  const startY = 320;

  nutrients.forEach((n, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 40 + col * cellW + cellW / 2;
    const y = startY + row * 80;

    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
    ctx.fillText(n.value, x, y);

    ctx.fillStyle = '#9ca3af';
    ctx.font = '13px system-ui, -apple-system, sans-serif';
    ctx.fillText(n.label, x, y + 22);
  });

  // Insights
  if (healthScore.insights.length > 0) {
    const insightY = startY + 180;
    ctx.fillStyle = '#374151';
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    healthScore.insights.slice(0, 3).forEach((insight, i) => {
      ctx.fillText(insight, 50, insightY + i * 24);
    });
  }

  // Footer branding
  ctx.fillStyle = '#d1d5db';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Scanned with FoodScan 🍎', W / 2, H - 50);
  ctx.fillStyle = '#9ca3af';
  ctx.font = '11px system-ui, -apple-system, sans-serif';
  ctx.fillText('Free food scanner app • foodscan.app', W / 2, H - 30);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), 'image/png');
  });
}

/**
 * Shares the generated card via Web Share API (mobile) or downloads it (desktop).
 */
export async function shareProduct(product: Product, healthScore: HealthScore): Promise<void> {
  const blob = await generateShareCard(product, healthScore);
  const file = new File([blob], `foodscan-${product.name.slice(0, 20)}.png`, { type: 'image/png' });

  // Try native share (mobile)
  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      title: `${product.name} - Health Score: ${healthScore.score}/100`,
      text: `I scanned ${product.name} with FoodScan! Score: ${healthScore.score}/100 (${healthScore.label})`,
      files: [file],
    });
    return;
  }

  // Fallback: download the image
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  a.click();
  URL.revokeObjectURL(url);
}

// --- Helpers ---

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function truncateText(text: string, maxLen: number): string {
  return text.length > maxLen ? text.slice(0, maxLen - 1) + '…' : text;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, topOnly = false) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  if (topOnly) {
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
  } else {
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  }
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
