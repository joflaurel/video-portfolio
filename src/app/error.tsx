'use client';

import { useEffect } from 'react';
import { CtaButton } from '@/components/ui/cta-link';
import { PageHeader } from '@/components/ui/page-header';

interface ErrorPageProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <PageHeader title="Something went wrong" subtitle="Please try again." />
      <CtaButton onClick={reset}>Try again</CtaButton>
    </>
  );
}
