import styles from './background-video.module.css';

/**
 * Full-screen looping video behind the whole site. It is decoration only: muted, hidden from
 * screen readers, and replaced by its still poster image when the visitor prefers reduced
 * motion or the browser blocks autoplay (e.g. iPhone Low Power Mode).
 */
export function BackgroundVideo() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <video
        className={styles.video}
        src="/videos/background.mp4"
        poster="/videos/background-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        tabIndex={-1}
      />
    </div>
  );
}
