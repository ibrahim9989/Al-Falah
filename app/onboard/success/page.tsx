'use client';

import Link from 'next/link';

export default function OnboardSuccess() {
  return (
    <div className="min-h-screen geometric-pattern flex items-center justify-center">
      <div className="max-w-md mx-auto px-4">
        <div 
          className="bg-white rounded-3xl p-8 shadow-lg border-2 text-center"
          style={{ borderColor: '#e5d4b8' }}
        >
          <div 
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#f0f9f4' }}
          >
            <svg className="w-12 h-12" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-kufi font-bold mb-3" style={{ color: '#056839' }}>
            Submission Successful!
          </h1>
          
          <p className="text-sm mb-6" style={{ color: '#8b6f47' }}>
            Your masjid registration has been submitted for review. Our admin team will review your application and you will receive an email notification once approved.
          </p>

          <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
            <p className="text-xs" style={{ color: '#1e3a5f' }}>
              <strong>What&apos;s next?</strong><br />
              You will receive login credentials via email after approval. This usually takes 1-2 business days.
            </p>
          </div>

          <Link
            href="/"
            className="block w-full py-4 rounded-xl font-kufi font-bold text-white transition-all shadow-lg"
            style={{ 
              background: 'linear-gradient(135deg, #056839 0%, #0d7a4d 100%)',
              border: '2px solid #034d2a'
            }}
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
