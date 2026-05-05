import { useState } from 'react';
import type { ProductImage } from '../../types';
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton';

interface ImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

/**
 * Swipeable product photo gallery.
 * Shows front, ingredients, and nutrition label images with tab navigation.
 */
export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="w-full h-52 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <ImageWithSkeleton
        src={images[0].url}
        alt={productName}
        className="w-full h-52 rounded-2xl bg-gray-100 dark:bg-gray-800 p-4"
      />
    );
  }

  return (
    <div className="space-y-2">
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
        <ImageWithSkeleton
          src={images[active].url}
          alt={`${productName} - ${images[active].label}`}
          className="w-full h-52 p-4"
        />
      </div>

      {/* Thumbnail tabs */}
      <div className="flex gap-2 justify-center">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
              i === active
                ? 'bg-primary text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            aria-label={`View ${img.label} image`}
          >
            {img.label}
          </button>
        ))}
      </div>
    </div>
  );
}
