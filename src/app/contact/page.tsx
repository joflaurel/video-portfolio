import type { Metadata } from 'next';
import { Footnote, Group, Row } from '@/components/ui/grouped-list';
import { PageHeader } from '@/components/ui/page-header';
import { SITE } from '@/content/site';

export const metadata: Metadata = {
  title: 'Hire a Video Editor in the Philippines',
  description: `Hire ${SITE.name}, a video editor in ${SITE.location}. Message on WhatsApp or email to start your video editing project.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact" subtitle="Got footage that needs a great edit? Let's talk." />
      <Group>
        <Row
          icon="mail"
          color="#007aff"
          title="Email"
          subtitle={SITE.email}
          href={`mailto:${SITE.email}`}
          chevron
        />
        {SITE.links.map((link) => (
          <Row
            key={link.label}
            icon={link.icon}
            color={link.color}
            title={link.label}
            subtitle={link.handle}
            href={link.url}
            chevron
          />
        ))}
      </Group>
      <Footnote>
        Based in {SITE.location} ({SITE.timezone}).
      </Footnote>
    </>
  );
}
