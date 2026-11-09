'use client';

import { useEffect, useRef, useState } from 'react';
import { computeScaledFrame, type ScaledFrame } from '@/lib/frame';
import type { Embed } from '@/lib/projects';
import styles from './video-player.module.css';

/** Google Drive's player crops the video below roughly this frame width. */
const DRIVE_MIN_FRAME_WIDTH_PX = 360;

interface VideoPlayerProps {
  readonly embed: Embed;
  readonly title: string;
}

/** Plays the video inside its parent box, which decides the size and shape. */
export function VideoPlayer({ embed, title }: VideoPlayerProps) {
  if (embed.type === 'video') {
    return <video className={styles.fill} src={embed.src} controls autoPlay playsInline />;
  }
  if (embed.scaleToFit) {
    return <ScaledIframe src={embed.src} allow={embed.allow} title={title} />;
  }
  return <iframe className={styles.fill} src={embed.src} allow={embed.allow} title={title} />;
}

interface ScaledIframeProps {
  readonly src: string;
  readonly allow: string;
  readonly title: string;
}

/** An iframe given a normal-sized frame, then shrunk with a transform to fit the visible box. */
function ScaledIframe({ src, allow, title }: ScaledIframeProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<ScaledFrame | null>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new ResizeObserver((entries) => {
      const size = entries[0]?.contentRect;
      if (!size) return;
      setFrame(computeScaledFrame(size.width, size.height, DRIVE_MIN_FRAME_WIDTH_PX));
    });
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={boxRef} className={styles.fill}>
      {frame ? (
        <iframe
          className={styles.scaled}
          style={{
            width: frame.width,
            height: frame.height,
            transform: `scale(${frame.scale})`,
          }}
          src={src}
          allow={allow}
          title={title}
        />
      ) : null}
    </div>
  );
}
