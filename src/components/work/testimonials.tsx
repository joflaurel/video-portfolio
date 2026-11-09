import { GroupTitle } from '@/components/ui/grouped-list';
import { TESTIMONIALS } from '@/content/testimonials';
import styles from './testimonials.module.css';

/** What current clients have said, shown under the showreel. */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="testimonials-title">
      <div id="testimonials-title">
        <GroupTitle>What clients say</GroupTitle>
      </div>
      <div className={styles.grid}>
        {TESTIMONIALS.map((testimonial) => (
          <figure key={testimonial.author} className={styles.card}>
            <blockquote className={styles.quote}>{testimonial.quote}</blockquote>
            <figcaption className={styles.author}>
              <span className={styles.name}>{testimonial.author}</span>
              <span className={styles.role}>{testimonial.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
