'use client';

import dynamic from 'next/dynamic';

const GoogleAnalytics = dynamic(() => import('./GoogleAnalytics'), {
  ssr: false
});

export default function ClientGoogleAnalytics({ id }: { id: string }) {
  return <GoogleAnalytics id={id} />;
}
