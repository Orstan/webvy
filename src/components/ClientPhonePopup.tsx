'use client';

import dynamic from 'next/dynamic';

const PhonePopup = dynamic(() => import('./PhonePopup'), {
  ssr: false
});

export default function ClientPhonePopup() {
  return <PhonePopup />;
}
