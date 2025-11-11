'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Masjid {
  id: string;
  name: string;
  address: string;
  distance: string;
  nextPrayer: string;
  nextPrayerTime: string;
  isSubscribed?: boolean;
}

interface SubscribedMasjidsProps {
  allMasjids: Masjid[];
}

export default function SubscribedMasjids({ allMasjids }: SubscribedMasjidsProps) {
  const [subscribedIds, setSubscribedIds] = useState<string[]>([]);
  const [subscribedMasjids, setSubscribedMasjids] = useState<Masjid[]>([]);

  useEffect(() => {
    loadSubscriptions();
    
    // Listen for subscription changes
    const handleSubscriptionChange = () => {
      loadSubscriptions();
    };
    
    window.addEventListener('subscriptionChanged', handleSubscriptionChange);
    return () => {
      window.removeEventListener('subscriptionChanged', handleSubscriptionChange);
    };
  }, [allMasjids]);

  const loadSubscriptions = () => {
    if (typeof window === 'undefined') return;
    const subscriptions = JSON.parse(localStorage.getItem('subscribedMasjids') || '[]');
    setSubscribedIds(subscriptions);
    
    const subscribed = allMasjids.filter(m => subscriptions.includes(m.id));
    setSubscribedMasjids(subscribed);
  };

  if (subscribedMasjids.length === 0) {
    return (
      <div 
        className="rounded-3xl p-8 mb-6 shadow-lg border-2 text-center"
        style={{ 
          background: 'linear-gradient(135deg, #f0f9f4 0%, #e8f5ee 100%)',
          borderColor: '#c3e6d3'
        }}
      >
        <div 
          className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#056839' }}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <h2 className="text-xl font-kufi font-semibold mb-2" style={{ color: '#056839' }}>
          No Subscriptions Yet
        </h2>
        <p className="text-sm mb-4" style={{ color: '#8b6f47' }}>
          Subscribe to masjids to receive prayer time alerts and announcements
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl font-semibold text-white"
          style={{ backgroundColor: '#056839' }}
        >
          Browse Masjids
        </Link>
      </div>
    );
  }

  return (
    <div 
      className="rounded-3xl p-6 mb-6 shadow-lg border-2 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #f0f9f4 0%, #e8f5ee 100%)',
        borderColor: '#c3e6d3'
      }}
    >
      <h2 className="text-xl font-kufi font-semibold mb-5 flex items-center gap-3" style={{ color: '#056839' }}>
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: '#056839' }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        Subscribed Masjids ({subscribedMasjids.length})
      </h2>

      <div className="space-y-3">
        {subscribedMasjids.map((masjid) => (
          <Link
            key={masjid.id}
            href={`/masjid/${masjid.id}`}
          >
            <div 
              className="bg-white rounded-2xl p-4 shadow-md border-2 active:scale-[0.98] transition-all hover:shadow-lg relative overflow-hidden group"
              style={{ borderColor: '#c3e6d3' }}
            >
              {/* Decorative accent */}
              <div 
                className="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity"
                style={{
                  background: `radial-gradient(circle at top right, #056839, transparent)`
                }}
              ></div>
              
              <div className="flex items-start justify-between relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: '#f0ede4' }}
                    >
                      <svg className="w-4 h-4" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-kufi font-semibold flex-1" style={{ color: '#1e3a5f' }}>
                      {masjid.name}
                    </h3>
                  </div>
                  <p className="text-sm mb-2 ml-10" style={{ color: '#8b6f47' }}>{masjid.address}</p>
                  <div className="flex items-center gap-4 text-xs ml-10" style={{ color: '#8b6f47' }}>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {masjid.distance}
                    </span>
                  </div>
                </div>
                <div 
                  className="px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm"
                  style={{ 
                    backgroundColor: '#f0f9f4',
                    color: '#056839',
                    border: '1px solid #c3e6d3'
                  }}
                >
                  Subscribed
                </div>
              </div>
              <div 
                className="flex items-center justify-between pt-3 mt-3 border-t-2"
                style={{ borderColor: '#f0ede4' }}
              >
                <div>
                  <p className="text-xs mb-1" style={{ color: '#8b6f47' }}>Next Prayer</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-kufi font-bold" style={{ color: '#056839' }}>
                      {masjid.nextPrayer}
                    </p>
                    <span className="text-sm font-semibold" style={{ color: '#1e3a5f' }}>
                      • {masjid.nextPrayerTime}
                    </span>
                  </div>
                </div>
                <svg className="w-5 h-5" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
