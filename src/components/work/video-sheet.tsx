'use client';

import { useEffect, useRef, type PointerEvent } from 'react';
import { Chip } from '@/components/ui/chip';
import { CtaLink } from '@/components/ui/cta-link';
import { Icon } from '@/components/ui/icon';
import type { Orientation } from '@/content/types';
import { cssVars } from '@/lib/css';
import { shouldDismissSheet } from '@/lib/gestures';
import type { ResolvedProject } from '@/lib/projects';
import { VideoPlayer } from './video-player';
import styles from './video-sheet.module.css';

/** How long the sheet slides away after a swipe before it is actually closed. */
const SWIPE_CLOSE_DELAY_MS = 220;

interface VideoSheetProps {
  readonly project: ResolvedProject | null;
  readonly orientation: Orientation;
  readonly open: boolean;
  readonly onClose: () => void;
}

interface DragState {
  readonly startY: number;
  distance: number;
}

/**
 * Bottom sheet with the video player. Built on the native <dialog> element, which provides the
 * focus trap, the Escape key, and hiding the page behind it. Swipe the handle down to close.
 */
export function VideoSheet({ project, orientation, open, onClose }: VideoSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const closeTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

  const handleNativeClose = () => {
    const dialog = dialogRef.current;
    if (dialog) dialog.style.transform = '';
    onClose();
  };

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest('button')) return;
    dragRef.current = { startY: event.clientY, distance: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
    dialogRef.current?.setAttribute('data-dragging', 'true');
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const dialog = dialogRef.current;
    if (!drag || !dialog) return;
    drag.distance = Math.max(0, event.clientY - drag.startY);
    dialog.style.transform = `translate(-50%, ${drag.distance}px)`;
  };

  const endDrag = () => {
    const drag = dragRef.current;
    const dialog = dialogRef.current;
    if (!drag || !dialog) return;
    dragRef.current = null;
    dialog.removeAttribute('data-dragging');
    if (shouldDismissSheet(drag.distance)) {
      dialog.style.transform = 'translate(-50%, 105%)';
      closeTimerRef.current = window.setTimeout(onClose, SWIPE_CLOSE_DELAY_MS);
    } else {
      dialog.style.transform = '';
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.sheet}
      aria-label={project ? `Video: ${project.title}` : 'Video player'}
      onClose={handleNativeClose}
      onClick={(event) => {
        // A click on the dimmed backdrop lands on the <dialog> element itself.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={styles.head}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className={styles.grabber} />
        <button type="button" className={styles.close} aria-label="Close" onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>

      {project ? (
        <>
          <div
            className={styles.player}
            data-orientation={orientation}
            style={cssVars({ '--h': project.hue })}
          >
            {open ? (
              <VideoPlayer key={project.id} embed={project.embed} title={project.title} />
            ) : null}
          </div>

          <div className={styles.body}>
            <h2 className={styles.title}>{project.title}</h2>
            <div className={styles.chips}>
              <Chip tone="accent">{project.categoryLabel}</Chip>
              {project.client ? <Chip>{project.client}</Chip> : null}
              {project.tools.map((tool) => (
                <Chip key={tool}>{tool}</Chip>
              ))}
            </div>
            <p className={styles.description}>{project.description}</p>
            <CtaLink href="/contact">Work with me</CtaLink>
            {project.externalUrl ? (
              <CtaLink href={project.externalUrl} variant="secondary" external>
                Open in Google Drive
              </CtaLink>
            ) : null}
          </div>
        </>
      ) : null}
    </dialog>
  );
}
