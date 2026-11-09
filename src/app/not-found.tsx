import { CtaLink } from '@/components/ui/cta-link';
import { PageHeader } from '@/components/ui/page-header';

export default function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" subtitle="That page doesn't exist, or it has moved." />
      <CtaLink href="/">Back to my work</CtaLink>
    </>
  );
}
