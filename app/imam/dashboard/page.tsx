'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function ImamDashboard() {
  const [masjid, setMasjid] = useState({
    id: '1',
    name: 'Islamic Center of Downtown',
    address: '123 Main Street, Downtown',
    status: 'approved',
    phone: '+1 (555) 123-4567',
    email: 'info@icdowntown.org',
  });
  const [stats, setStats] = useState({
    subscribers: 245,
    announcements: 3,
    upcomingPrayer: 'Asr',
    nextPrayerTime: '4:30 PM',
  });

  return (
    <div className="min-h-screen geometric-pattern">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-10 decorative-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-kufi font-bold" style={{ color: '#1e3a5f' }}>
                Imam Dashboard
              </h1>
              <p className="text-sm mt-1" style={{ color: '#8b6f47' }}>
                {masjid.name}
              </p>
            </div>
            <Link
              href="/"
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: '#f0ede4' }}
            >
              <svg className="w-5 h-5" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 pb-24">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div 
            className="bg-white rounded-2xl p-4 shadow-md border-2"
            style={{ borderColor: '#e5d4b8' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#f0f9f4' }}
              >
                <svg className="w-5 h-5" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <p className="text-xs" style={{ color: '#8b6f47' }}>Subscribers</p>
            </div>
            <p className="text-2xl font-kufi font-bold" style={{ color: '#056839' }}>
              {stats.subscribers}
            </p>
          </div>

          <div 
            className="bg-white rounded-2xl p-4 shadow-md border-2"
            style={{ borderColor: '#e5d4b8' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#f0f9f4' }}
              >
                <svg className="w-5 h-5" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <p className="text-xs" style={{ color: '#8b6f47' }}>Announcements</p>
            </div>
            <p className="text-2xl font-kufi font-bold" style={{ color: '#056839' }}>
              {stats.announcements}
            </p>
          </div>
        </div>

        {/* Next Prayer */}
        <div 
          className="bg-gradient-to-r from-[#056839] to-[#0d7a4d] rounded-2xl p-5 mb-6 text-white shadow-lg"
        >
          <p className="text-sm mb-2 opacity-90">Next Prayer</p>
          <p className="text-2xl font-kufi font-bold">
            {stats.upcomingPrayer} • {stats.nextPrayerTime}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3 mb-6">
          <h2 className="text-lg font-kufi font-semibold" style={{ color: '#1e3a5f' }}>
            Quick Actions
          </h2>

          <Link
            href="/imam/prayer-times"
            className="block bg-white rounded-2xl p-5 shadow-md border-2 active:scale-[0.98] transition-all"
            style={{ borderColor: '#e5d4b8' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: '#f0f9f4' }}
                >
                  <svg className="w-6 h-6" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-kufi font-semibold" style={{ color: '#1e3a5f' }}>
                    Prayer Times
                  </h3>
                  <p className="text-xs" style={{ color: '#8b6f47' }}>
                    Update daily prayer schedules
                  </p>
                </div>
              </div>
              <svg className="w-5 h-5" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/imam/announcements"
            className="block bg-white rounded-2xl p-5 shadow-md border-2 active:scale-[0.98] transition-all"
            style={{ borderColor: '#e5d4b8' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: '#f0f9f4' }}
                >
                  <svg className="w-6 h-6" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-kufi font-semibold" style={{ color: '#1e3a5f' }}>
                    Announcements
                  </h3>
                  <p className="text-xs" style={{ color: '#8b6f47' }}>
                    Manage masjid announcements
                  </p>
                </div>
              </div>
              <svg className="w-5 h-5" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/imam/profile"
            className="block bg-white rounded-2xl p-5 shadow-md border-2 active:scale-[0.98] transition-all"
            style={{ borderColor: '#e5d4b8' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: '#f0f9f4' }}
                >
                  <svg className="w-6 h-6" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-kufi font-semibold" style={{ color: '#1e3a5f' }}>
                    Masjid Profile
                  </h3>
                  <p className="text-xs" style={{ color: '#8b6f47' }}>
                    Edit masjid information
                  </p>
                </div>
              </div>
              <svg className="w-5 h-5" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
