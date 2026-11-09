'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { legacyHashToPath } from '@/lib/routes';

/**
 * The first version of the site was one page with `/#about`, `/#contact`, … links.
 * Anyone opening an old link is sent to the matching page.
 */
export function LegacyHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const target = legacyHashToPath(window.location.hash);
    if (target) router.replace(target);
  }, [router]);

  return null;
}
