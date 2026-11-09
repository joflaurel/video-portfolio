import { SITE } from '@/content/site';
import { mailtoLink, whatsappLink } from '@/lib/contact';
import styles from './hire-buttons.module.css';

const WHATSAPP_MESSAGE = "Hi Jofrey, I found your portfolio and I'd like to talk about a video edit.";
const EMAIL_SUBJECT = 'Video editing project';

/** Two big buttons so a visitor can hire Jofrey without hunting for the Contact page. */
export function HireButtons() {
  const whatsapp = SITE.links.find((link) => link.label === 'WhatsApp');

  return (
    <div className={styles.actions}>
      {whatsapp ? (
        <a
          className={styles.primary}
          href={whatsappLink(whatsapp.url, WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Hire me on WhatsApp
        </a>
      ) : null}
      <a className={styles.secondary} href={mailtoLink(SITE.email, EMAIL_SUBJECT)}>
        Email me
      </a>
    </div>
  );
}
