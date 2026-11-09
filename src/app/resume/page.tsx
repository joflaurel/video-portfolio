import type { Metadata } from 'next';
import { ResumeEntry } from '@/components/resume/resume-entry';
import { SkillTags } from '@/components/resume/skill-tags';
import { CtaLink } from '@/components/ui/cta-link';
import { Group } from '@/components/ui/grouped-list';
import { PageHeader } from '@/components/ui/page-header';
import { RESUME } from '@/content/resume';

export const metadata: Metadata = {
  title: 'Resume',
  description: RESUME.summary,
  alternates: { canonical: '/resume' },
};

export default function ResumePage() {
  return (
    <>
      <PageHeader title="Resume" subtitle={RESUME.summary} />
      <Group title="Experience">
        {RESUME.experience.map((entry) => (
          <ResumeEntry key={`${entry.title}-${entry.period}`} entry={entry} />
        ))}
      </Group>
      <Group title="Education">
        {RESUME.education.map((entry) => (
          <ResumeEntry key={entry.title} entry={entry} />
        ))}
      </Group>
      <Group title="Skills & tools">
        <SkillTags skills={RESUME.skills} />
      </Group>
      <CtaLink href={RESUME.file} external>
        Download resume (PDF)
      </CtaLink>
    </>
  );
}
