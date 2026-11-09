import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/page-header';
import { HireButtons } from '@/components/work/hire-buttons';
import { Testimonials } from '@/components/work/testimonials';
import { WorkGallery } from '@/components/work/work-gallery';
import { PROJECTS } from '@/content/projects';
import { SITE } from '@/content/site';
import { buildPersonJsonLd, serializeJsonLd } from '@/lib/seo';
import { resolveProjects } from '@/lib/projects';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function WorkPage() {
  const projects = resolveProjects(PROJECTS);

  return (
    <>
      <PageHeader title="Work" subtitle={SITE.intro} />
      <HireButtons />
      <WorkGallery projects={projects} afterFeatured={<Testimonials />} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildPersonJsonLd()) }}
      />
    </>
  );
}
