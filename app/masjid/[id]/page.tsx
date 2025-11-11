'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PrayerTimings from '../../components/PrayerTimings';
import Announcements from '../../components/Announcements';
import SubscribeButton from '../../components/SubscribeButton';

// Mock data - in a real app, this would come from an API
const getMasjidData = (id: string) => {
  const masjids: Record<string, any> = {
    '1': {
      id: '1',
      name: 'Islamic Center of Downtown',
      address: '123 Main Street, Downtown',
      distance: '0.5 km away',
      phone: '+1 (555) 123-4567',
      email: 'info@icdowntown.org',
      timings: [
        { name: 'Fajr', time: '5:30 AM' },
        { name: 'Dhuhr', time: '12:45 PM' },
        { name: 'Asr', time: '4:30 PM', isNext: true },
        { name: 'Maghrib', time: '6:50 PM' },
        { name: 'Isha', time: '8:15 PM' },
      ],
      jumaTime: '1:30 PM',
      announcements: [
        {
          id: '1',
          title: 'Ramadan Iftar Program',
          message: 'Join us for daily iftar during Ramadan. Dinner will be served 30 minutes before Maghrib.',
          date: 'March 15, 2024',
          isUrgent: false,
        },
        {
          id: '2',
          title: 'Friday Khutbah Topic',
          message: 'This week\'s khutbah will focus on the importance of community and unity.',
          date: 'March 14, 2024',
          isUrgent: false,
        },
        {
          id: '3',
          title: 'Emergency: Parking Update',
          message: 'Due to construction, please use the parking lot on 5th Street this week.',
          date: 'March 13, 2024',
          isUrgent: true,
        },
      ],
      isSubscribed: false,
    },
    '2': {
      id: '2',
      name: 'Al-Madinah Masjid',
      address: '456 Oak Avenue, Midtown',
      distance: '1.2 km away',
      phone: '+1 (555) 234-5678',
      email: 'contact@almadinah.org',
      timings: [
        { name: 'Fajr', time: '5:28 AM' },
        { name: 'Dhuhr', time: '12:43 PM' },
        { name: 'Asr', time: '4:28 PM' },
        { name: 'Maghrib', time: '6:45 PM', isNext: true },
        { name: 'Isha', time: '8:10 PM' },
      ],
      jumaTime: '1:25 PM',
      announcements: [
        {
          id: '1',
          title: 'New Quran Classes',
          message: 'Registration is now open for adult Quran classes. Classes start next week.',
          date: 'March 16, 2024',
          isUrgent: false,
        },
      ],
      isSubscribed: true,
    },
    '3': {
      id: '3',
      name: 'Central Mosque',
      address: '789 Elm Street, Uptown',
      distance: '2.1 km away',
      phone: '+1 (555) 345-6789',
      email: 'info@centralmosque.org',
      timings: [
        { name: 'Fajr', time: '5:32 AM' },
        { name: 'Dhuhr', time: '12:47 PM' },
        { name: 'Asr', time: '4:35 PM', isNext: true },
        { name: 'Maghrib', time: '6:52 PM' },
        { name: 'Isha', time: '8:17 PM' },
      ],
      jumaTime: '1:35 PM',
      announcements: [],
      isSubscribed: false,
    },
    '4': {
      id: '4',
      name: 'Masjid Al-Noor',
      address: '321 Pine Road, Eastside',
      distance: '3.5 km away',
      phone: '+1 (555) 456-7890',
      email: 'contact@masjidalnoor.org',
      timings: [
        { name: 'Fajr', time: '5:25 AM' },
        { name: 'Dhuhr', time: '12:40 PM' },
        { name: 'Asr', time: '4:28 PM', isNext: true },
        { name: 'Maghrib', time: '6:48 PM' },
        { name: 'Isha', time: '8:13 PM' },
      ],
      jumaTime: '1:20 PM',
      announcements: [
        {
          id: '1',
          title: 'Community Cleanup Day',
          message: 'We need volunteers for our monthly community cleanup. Join us this Saturday at 9 AM.',
          date: 'March 17, 2024',
          isUrgent: false,
        },
      ],
      isSubscribed: false,
    },
  };

  return masjids[id] || masjids['1'];
};

export default function MasjidDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [masjid, setMasjid] = useState(getMasjidData(id));
  
  useEffect(() => {
    // Load subscription status from localStorage
    if (typeof window !== 'undefined') {
      const subscriptions = JSON.parse(localStorage.getItem('subscribedMasjids') || '[]');
      setMasjid((prev: any) => ({
        ...prev,
        isSubscribed: subscriptions.includes(id)
      }));
    }

    // Listen for subscription changes
    const handleSubscriptionChange = () => {
      if (typeof window !== 'undefined') {
        const subscriptions = JSON.parse(localStorage.getItem('subscribedMasjids') || '[]');
        setMasjid((prev: any) => ({
          ...prev,
          isSubscribed: subscriptions.includes(id)
        }));
      }
    };

    window.addEventListener('subscriptionChanged', handleSubscriptionChange);
    return () => {
      window.removeEventListener('subscriptionChanged', handleSubscriptionChange);
    };
  }, [id]);

  return (
    <div className="min-h-screen geometric-pattern">
      {/* Header with Back Button */}
      <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-10 decorative-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-3 transition-colors hover:opacity-80"
            style={{ color: '#056839' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back</span>
          </Link>
          <h1 className="text-2xl font-kufi font-bold" style={{ color: '#1e3a5f' }}>{masjid.name}</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 pb-6">
        {/* Masjid Info Card */}
        <div 
          className="rounded-3xl p-6 mb-6 shadow-lg border-2 relative overflow-hidden"
          style={{ 
            backgroundColor: 'white',
            borderColor: '#e5d4b8'
          }}
        >
          {/* Decorative corner pattern */}
          <div 
            className="absolute top-0 right-0 w-32 h-32 opacity-5"
            style={{
              background: `radial-gradient(circle at top right, #056839, transparent)`
            }}
          ></div>
          
          <div className="flex items-start gap-4 mb-5 relative z-10">
            <div 
              className="p-4 rounded-2xl shadow-md"
              style={{ 
                background: 'linear-gradient(135deg, #056839 0%, #0d7a4d 100%)'
              }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-kufi font-semibold mb-2" style={{ color: '#1e3a5f' }}>{masjid.name}</h2>
              <p className="text-sm mb-3" style={{ color: '#8b6f47' }}>{masjid.address}</p>
              <div className="flex items-center gap-2 text-xs mb-2" style={{ color: '#8b6f47' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {masjid.distance}
              </div>
            </div>
          </div>

          <div 
            className="space-y-4 pt-5 border-t-2 relative z-10"
            style={{ borderColor: '#f0ede4' }}
          >
            <div className="flex items-center gap-3 text-sm">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#f0ede4' }}
              >
                <svg className="w-5 h-5" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span style={{ color: '#1e3a5f' }} className="font-medium">{masjid.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#f0ede4' }}
              >
                <svg className="w-5 h-5" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span style={{ color: '#1e3a5f' }} className="font-medium">{masjid.email}</span>
            </div>
          </div>
        </div>

        {/* Prayer Timings */}
        <PrayerTimings timings={masjid.timings} jumaTime={masjid.jumaTime} />

        {/* Announcements */}
        <Announcements announcements={masjid.announcements} />

        {/* Subscribe Button - Fixed at bottom */}
        <div 
          className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 py-4 bg-white/95 backdrop-blur-sm border-t-2 shadow-2xl"
          style={{ borderColor: '#e5d4b8' }}
        >
          <SubscribeButton 
            masjidId={masjid.id} 
            initialSubscribed={masjid.isSubscribed}
          />
        </div>
      </main>
    </div>
  );
}
