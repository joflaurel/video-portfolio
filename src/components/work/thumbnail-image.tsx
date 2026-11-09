'use client';

import { useEffect, useRef, useState } from 'react';
import type { Orientation } from '@/content/types';
import { classifyOrientation } from '@/lib/orientation';

interface ThumbnailImageProps {
  readonly src: string | null;
  readonly className?: string;
  readonly lazy?: boolean;
  /** Called with the real shape of the image once it has loaded. */
  readonly onOrientation?: (orientation: Orientation) => void;
}

/**
 * Cover image for a video. Drive's preview images are loaded straight from Google, so a plain
 * <img> is used on purpose (no image optimiser in between). If the image fails to load it
 * disappears and the coloured gradient behind it shows instead.
 */
export function ThumbnailImage({
  src,
  className,
  lazy = true,
  onOrientation,
}: ThumbnailImageProps) {
  const [failed, setFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Images that finished loading before React took over the page never fire `onLoad`.
  useEffect(() => {
    const image = imageRef.current;
    if (!image?.complete || image.naturalWidth === 0) return;
    const orientation = classifyOrientation(image.naturalWidth, image.naturalHeight);
    if (orientation) onOrientation?.(orientation);
  }, [onOrientation, src]);

  if (!src || failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- external Drive image, see comment above
    <img
      ref={imageRef}
      className={className}
      src={src}
      alt=""
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
      referrerPolicy="no-referrer"
      onLoad={(event) => {
        const { naturalWidth, naturalHeight } = event.currentTarget;
        const orientation = classifyOrientation(naturalWidth, naturalHeight);
        if (orientation) onOrientation?.(orientation);
      }}
      onError={() => setFailed(true)}
    />
  );
}
