import type { Metadata } from 'next';
import { CtaLink } from '@/components/ui/cta-link';
import { Footnote, Group, Row } from '@/components/ui/grouped-list';
import { PageHeader } from '@/components/ui/page-header';
import { SERVICE_GROUPS } from '@/content/services';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Short-form edits, UGC-style ads, long-form edits, captions, sound and color.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="Services" subtitle="What I can take off your plate." />
      {SERVICE_GROUPS.map((group) => (
        <Group key={group.title} title={group.title}>
          {group.services.map((service) => (
            <Row
              key={service.title}
              icon={service.icon}
              color={service.color}
              title={service.title}
              subtitle={service.description}
            />
          ))}
        </Group>
      ))}
      <Footnote>
        Rates and turnaround depend on length and complexity — message me with your project and
        I&apos;ll reply with a quote.
      </Footnote>
      <CtaLink href="/contact">Start a project</CtaLink>
    </>
  );
}
