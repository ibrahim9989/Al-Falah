'use client';

import { useState, useEffect } from 'react';

interface RamadanDay {
  date: string;
  day: number;
  suhoor: string;
  iftar: string;
  fajr: string;
  maghrib: string;
  isToday?: boolean;
}

export default function RamadanMode() {
  const [isRamadan, setIsRamadan] = useState(false);
  const [ramadanDays, setRamadanDays] = useState<RamadanDay[]>([]);
  const [currentDay, setCurrentDay] = useState(0);
  const [fastingStatus, setFastingStatus] = useState<'fasting' | 'not-fasting' | 'iftar-time'>('not-fasting');
  const [timeUntilIftar, setTimeUntilIftar] = useState('');

  useEffect(() => {
    // Check if it's Ramadan (simplified - in production, use proper Islamic calendar)
    const today = new Date();
    const month = today.getMonth() + 1;
    // Mock: Assume Ramadan is in March for demo
    const ramadanMonth = 3; // March
    setIsRamadan(month === ramadanMonth);

    // Generate Ramadan days
    const days: RamadanDay[] = [];
    for (let i = 1; i <= 30; i++) {
      const date = new Date(2024, ramadanMonth - 1, i);
      days.push({
        date: date.toLocaleDateString(),
        day: i,
        suhoor: '4:30 AM',
        iftar: '6:45 PM',
        fajr: '5:00 AM',
        maghrib: '6:50 PM',
        isToday: i === 15, // Mock today
      });
    }
    setRamadanDays(days);
    setCurrentDay(15); // Mock current day

    // Calculate time until iftar
    const updateIftarCountdown = () => {
      const now = new Date();
      const iftarTime = new Date();
      iftarTime.setHours(18, 45, 0, 0); // 6:45 PM

      if (now < iftarTime) {
        const diff = iftarTime.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeUntilIftar(`${hours}h ${minutes}m`);
        setFastingStatus('fasting');
      } else {
        setTimeUntilIftar('Iftar time!');
        setFastingStatus('iftar-time');
      }
    };

    updateIftarCountdown();
    const interval = setInterval(updateIftarCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!isRamadan) {
    return (
      <div 
        className="rounded-3xl p-6 mb-6 shadow-lg border-2 relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #f0f9f4 0%, #e8f5ee 100%)',
          borderColor: '#c3e6d3'
        }}
      >
        <div className="text-center">
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#056839' }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-kufi font-semibold mb-2" style={{ color: '#056839' }}>
            Ramadan Mode
          </h2>
          <p className="text-sm" style={{ color: '#8b6f47' }}>
            Ramadan mode will activate automatically during the holy month
          </p>
        </div>
      </div>
    );
  }

  const todayData = ramadanDays.find(d => d.isToday) || ramadanDays[0];

  return (
    <div 
      className="premium-card rounded-3xl p-6 mb-6 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2d4f7a 50%, #1e3a5f 100%)',
        borderColor: '#d4af37',
        borderWidth: '2px',
        boxShadow: '0 8px 32px rgba(30, 58, 95, 0.3), 0 2px 8px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)`
        }}></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-kufi font-semibold text-white">
            🌙 Ramadan {new Date().getFullYear()}
          </h2>
          <div 
            className="px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: '#d4af37' }}
          >
            Day {currentDay}/30
          </div>
        </div>

        {/* Fasting Status */}
        <div 
          className="rounded-2xl p-5 mb-5 text-white"
          style={{ 
            backgroundColor: fastingStatus === 'iftar-time' 
              ? 'rgba(212, 175, 55, 0.3)' 
              : 'rgba(255, 255, 255, 0.15)'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm opacity-90">Fasting Status</span>
            <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              {fastingStatus === 'fasting' ? 'Fasting' : fastingStatus === 'iftar-time' ? 'Iftar Time!' : 'Not Fasting'}
            </span>
          </div>
          {fastingStatus === 'fasting' && (
            <div>
              <p className="text-xs opacity-75 mb-1">Time until Iftar</p>
              <p className="text-2xl font-kufi font-bold">{timeUntilIftar}</p>
            </div>
          )}
        </div>

        {/* Today's Timings */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div 
            className="bg-white/20 rounded-xl p-4 text-white backdrop-blur-sm"
          >
            <p className="text-xs opacity-75 mb-1">Suhoor</p>
            <p className="text-lg font-kufi font-bold">{todayData.suhoor}</p>
          </div>
          <div 
            className="bg-white/20 rounded-xl p-4 text-white backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(212, 175, 55, 0.3)' }}
          >
            <p className="text-xs opacity-75 mb-1">Iftar</p>
            <p className="text-lg font-kufi font-bold">{todayData.iftar}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <button
            className="w-full p-3 rounded-xl text-left text-white transition-all hover:bg-white/10"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">View Full Calendar</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
          <button
            className="w-full p-3 rounded-xl text-left text-white transition-all hover:bg-white/10"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">Fasting Tracker</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
