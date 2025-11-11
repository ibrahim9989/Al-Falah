'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MasjidCard from './components/MasjidCard';
import PrayerTracker from './components/PrayerTracker';
import QiblaCompass from './components/QiblaCompass';
import DarkModeToggle from './components/DarkModeToggle';
import DailyVerse from './components/DailyVerse';
import MapView from './components/MapView';
import SubscribedMasjids from './components/SubscribedMasjids';
import PrayerCountdown from './components/PrayerCountdown';
import RamadanMode from './components/RamadanMode';
import MultipleLocations from './components/MultipleLocations';
import PrayerTimeHistory from './components/PrayerTimeHistory';
import SideMenu from './components/SideMenu';

// Mock data for demonstration
const mockMasjids = [
  {
    id: '1',
    name: 'Islamic Center of Downtown',
    address: '123 Main Street, Downtown',
    distance: '0.5 km away',
    nextPrayer: 'Asr',
    nextPrayerTime: '4:30 PM',
    isSubscribed: false,
  },
  {
    id: '2',
    name: 'Al-Madinah Masjid',
    address: '456 Oak Avenue, Midtown',
    distance: '1.2 km away',
    nextPrayer: 'Maghrib',
    nextPrayerTime: '6:45 PM',
    isSubscribed: true,
  },
  {
    id: '3',
    name: 'Central Mosque',
    address: '789 Elm Street, Uptown',
    distance: '2.1 km away',
    nextPrayer: 'Asr',
    nextPrayerTime: '4:35 PM',
    isSubscribed: false,
  },
  {
    id: '4',
    name: 'Masjid Al-Noor',
    address: '321 Pine Road, Eastside',
    distance: '3.5 km away',
    nextPrayer: 'Asr',
    nextPrayerTime: '4:28 PM',
    isSubscribed: false,
  },
];

function HomeContent() {
  const searchParams = useSearchParams();
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'masjids' | 'tracker' | 'qibla' | 'map' | 'subscribed' | 'ramadan' | 'history'>('masjids');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [masjids, setMasjids] = useState(mockMasjids);
  const [selectedLocation, setSelectedLocation] = useState<{ id: string; name: string; lat: number; lng: number } | null>(null);

  // Sync activeTab with URL params
  useEffect(() => {
    const tab = searchParams?.get('tab');
    if (tab && ['masjids', 'tracker', 'qibla', 'map', 'subscribed', 'ramadan', 'history'].includes(tab)) {
      setActiveTab(tab as any);
    } else if (!tab) {
      setActiveTab('masjids');
    }
  }, [searchParams]);

  const handleEnableLocation = async () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationEnabled(true);
          setIsLoadingLocation(false);
        },
        () => {
          // Fallback to mock location
          setUserLocation({ lat: 40.7128, lng: -74.0060 });
          setLocationEnabled(true);
          setIsLoadingLocation(false);
        }
      );
    } else {
      setUserLocation({ lat: 40.7128, lng: -74.0060 });
      setLocationEnabled(true);
      setIsLoadingLocation(false);
    }
  };

  useEffect(() => {
    // Load subscription status from localStorage
    if (typeof window !== 'undefined') {
      const subscriptions = JSON.parse(localStorage.getItem('subscribedMasjids') || '[]');
      setMasjids(prevMasjids => 
        prevMasjids.map(m => ({
          ...m,
          isSubscribed: subscriptions.includes(m.id)
        }))
      );
    }

    // Listen for subscription changes
    const handleSubscriptionChange = () => {
      if (typeof window !== 'undefined') {
        const subscriptions = JSON.parse(localStorage.getItem('subscribedMasjids') || '[]');
        setMasjids(prevMasjids => 
          prevMasjids.map(m => ({
            ...m,
            isSubscribed: subscriptions.includes(m.id)
          }))
        );
      }
    };

    window.addEventListener('subscriptionChanged', handleSubscriptionChange);
    return () => {
      window.removeEventListener('subscriptionChanged', handleSubscriptionChange);
    };
  }, []);

  const filteredMasjids = masjids.filter(masjid =>
    masjid.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    masjid.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen geometric-pattern">
      {/* Header - Premium Arabic style */}
      <header className="bg-white/98 backdrop-blur-md shadow-lg sticky top-0 z-40 decorative-border">
        <div className="max-w-md mx-auto px-4 py-5">
          <div className="flex items-center justify-between mb-2">
            <div className="relative">
              <h1 className="text-4xl font-kufi font-bold mb-1 relative" style={{ 
                color: '#056839',
                textShadow: '0 2px 4px rgba(5, 104, 57, 0.1)',
                letterSpacing: '0.02em'
              }}>
                Al Falah
                <span 
                  className="absolute -top-1 -right-6 text-xl opacity-30"
                  style={{ color: '#d4af37' }}
                >
                  ◊
                </span>
              </h1>
              <p className="text-sm font-semibold" style={{ color: '#8b6f47' }}>Find masjids near you</p>
              <div 
                className="absolute -bottom-1 left-0 h-0.5 w-20 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #d4af37 0%, #056839 100%)'
                }}
              ></div>
            </div>
            <div className="flex items-center gap-2">
              <SideMenu />
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 pb-20">
        {/* Daily Verse */}
        <DailyVerse />

        {/* Prayer Countdown - Always visible */}
        <PrayerCountdown />

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { id: 'masjids', label: 'Masjids', icon: '🕌' },
              { id: 'subscribed', label: 'Subscribed', icon: '🔔' },
              { id: 'tracker', label: 'Tracker', icon: '📿' },
              { id: 'ramadan', label: 'Ramadan', icon: '🌙' },
              { id: 'qibla', label: 'Qibla', icon: '🧭' },
              { id: 'map', label: 'Map', icon: '🗺️' },
              { id: 'history', label: 'History', icon: '📅' },
            ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'shadow-md' : ''
              }`}
              style={
                activeTab === tab.id
                  ? {
                      background: 'linear-gradient(135deg, #056839 0%, #0d7a4d 100%)',
                      color: 'white',
                      border: '2px solid #034d2a'
                    }
                  : {
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      border: '1px solid #d4e8dc',
                      color: '#1e3a5f'
                    }
              }
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>


        {/* Tab Content */}
        {activeTab === 'masjids' && locationEnabled && (
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: '#8b6f47' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search masjids..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839] transition-all"
                  style={{ 
                    borderColor: '#d4af37',
                    backgroundColor: 'white',
                    borderWidth: '2px',
                    boxShadow: '0 2px 8px rgba(212, 175, 55, 0.1)'
                  }}
                />
              </div>
            </div>

            {/* Masjid Cards */}
            {filteredMasjids.length > 0 ? (
              <div>
                {filteredMasjids.map((masjid) => (
                  <MasjidCard key={masjid.id} masjid={masjid} />
                ))}
              </div>
            ) : (
              <div 
                className="rounded-3xl p-8 text-center premium-card"
                style={{ borderColor: '#d4af37' }}
              >
                <p className="text-gray-500">No masjids found</p>
              </div>
            )}
          </>
        )}
        {activeTab === 'subscribed' && <SubscribedMasjids allMasjids={masjids} />}
        {activeTab === 'tracker' && <PrayerTracker />}
        {activeTab === 'ramadan' && <RamadanMode />}
        {activeTab === 'qibla' && <QiblaCompass />}
        {activeTab === 'history' && <PrayerTimeHistory />}
        {activeTab === 'map' && (
          <>
            <MultipleLocations 
              onLocationChange={(location) => {
                setSelectedLocation(location);
                setUserLocation({ lat: location.lat, lng: location.lng });
              }}
            />
            <MapView 
              masjids={masjids.map(m => ({
                id: m.id,
                name: m.name,
                lat: (selectedLocation || userLocation)?.lat || 40.7128,
                lng: (selectedLocation || userLocation)?.lng || -74.0060,
                distance: m.distance,
              }))}
              userLocation={selectedLocation || userLocation || undefined}
            />
          </>
        )}

        {/* Location Button - Only show when location not enabled and on masjids tab */}
        {!locationEnabled && activeTab === 'masjids' && (
          <div 
            className="rounded-3xl p-6 mb-6 text-white shadow-2xl relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, #056839 0%, #0d7a4d 50%, #1e3a5f 100%)',
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)`
              }}></div>
            </div>
            <div className="flex items-start gap-4 relative z-10">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-kufi font-semibold mb-2">Enable Location</h2>
                <p className="text-white/90 text-sm mb-4">
                  Allow location access to find masjids near you
                </p>
                <button
                  onClick={handleEnableLocation}
                  disabled={isLoadingLocation}
                  className="bg-white text-[#056839] px-6 py-3.5 rounded-xl font-semibold w-full hover:bg-[#f5f1e8] active:scale-[0.98] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingLocation ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Finding location...
                    </span>
                  ) : (
                    'Enable Location'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen geometric-pattern flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#056839] mx-auto mb-4"></div>
          <p className="text-[#056839] font-semibold">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}