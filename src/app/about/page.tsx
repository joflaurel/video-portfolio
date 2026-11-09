import type { Metadata } from 'next';
import { ProfileCard } from '@/components/about/profile-card';
import { Widgets } from '@/components/about/widgets';
import { Group, GroupTitle, Row } from '@/components/ui/grouped-list';
import { PageHeader } from '@/components/ui/page-header';
import { SITE } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${SITE.name}, a video editor in ${SITE.location} with 1.5+ years editing short-form and long-form content for YouTube, Reels and TikTok.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About" />
      <ProfileCard />
      <GroupTitle>At a glance</GroupTitle>
      <Widgets />
      <Group title="Details">
        <Row icon="film" color="#ff9500" title="Specialty" value={SITE.specialty} />
        <Row
          icon="scissors"
          color="#007aff"
          title="Software"
          value={`${SITE.primarySoftware} & ${SITE.secondarySoftware}`}
        />
        <Row icon="pin" color="#34c759" title="Location" value={SITE.location} />
        <Row icon="globe" color="#5856d6" title="Languages" value={SITE.languages} />
      </Group>
    </>
  );
}
