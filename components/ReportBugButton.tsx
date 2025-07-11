'use client';

import * as Sentry from '@sentry/nextjs';
import { usePathname } from 'next/navigation';

export default function ReportBugButton() {
  const pathname = usePathname();

  // Show only on homepage
  if (pathname !== '/') return null;

  const handleClick = () => {
    const eventId = Sentry.captureException(
      new Error('Test bug report from user')
    );
    Sentry.showReportDialog({ eventId });
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-5 right-5 px-4 py-2 bg-neutral-800 text-white rounded-lg shadow-lg z-50 cursor-pointer"
    >
      Report a Bug
    </button>
  );
}
