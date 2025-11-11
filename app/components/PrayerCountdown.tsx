'use client';

import { useState, useEffect } from 'react';

interface PrayerTime {
  name: string;
  time: string;
  timestamp: number;
}

export default function PrayerCountdown() {
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isPrayerTime, setIsPrayerTime] = useState(false);

  useEffect(() => {
    // Get today's prayer times (mock data - in production, use real calculation)
    const now = new Date();
    const prayers: PrayerTime[] = [
      { name: 'Fajr', time: '5:30 AM', timestamp: getTimestamp(now, 5, 30) },
      { name: 'Dhuhr', time: '12:45 PM', timestamp: getTimestamp(now, 12, 45) },
      { name: 'Asr', time: '4:30 PM', timestamp: getTimestamp(now, 16, 30) },
      { name: 'Maghrib', time: '6:50 PM', timestamp: getTimestamp(now, 18, 50) },
      { name: 'Isha', time: '8:15 PM', timestamp: getTimestamp(now, 20, 15) },
    ];

    // Find next prayer
    const currentTime = now.getTime();
    const next = prayers.find(p => p.timestamp > currentTime) || prayers[0]; // If all passed, use first of next day
    setNextPrayer(next);

    // Update countdown
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = next.timestamp - now;

      if (diff <= 0) {
        setIsPrayerTime(true);
        setCountdown({ hours: 0, minutes: 0, seconds: 0 });
        // Find next prayer after this one
        const nextIndex = prayers.indexOf(next) + 1;
        if (nextIndex < prayers.length) {
          setNextPrayer(prayers[nextIndex]);
        }
      } else {
        setIsPrayerTime(false);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimestamp = (date: Date, hours: number, minutes: number): number => {
    const d = new Date(date);
    d.setHours(hours, minutes, 0, 0);
    // If time has passed today, set for tomorrow
    if (d.getTime() < date.getTime()) {
      d.setDate(d.getDate() + 1);
    }
    return d.getTime();
  };

  if (!nextPrayer) return null;

  return (
    <div 
      className="rounded-3xl p-6 mb-6 shadow-lg border-2 relative overflow-hidden"
      style={{ 
        background: isPrayerTime
          ? 'linear-gradient(135deg, #d4af37 0%, #e5c158 100%)'
          : 'linear-gradient(135deg, #056839 0%, #0d7a4d 100%)',
        borderColor: isPrayerTime ? '#c9a028' : '#034d2a'
      }}
    >
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)`
        }}></div>
      </div>

      <div className="relative z-10 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Next Prayer</p>
            <p className="text-2xl font-kufi font-bold">{nextPrayer.name}</p>
          </div>
          {isPrayerTime && (
            <div className="animate-pulse">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          )}
        </div>

        {isPrayerTime ? (
          <div className="text-center py-4">
            <p className="text-3xl font-kufi font-bold mb-2">It&apos;s Prayer Time!</p>
            <p className="text-sm opacity-90">{nextPrayer.time}</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-3xl font-kufi font-bold">{String(countdown.hours).padStart(2, '0')}</p>
                <p className="text-xs opacity-75 mt-1">Hours</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-3xl font-kufi font-bold">{String(countdown.minutes).padStart(2, '0')}</p>
                <p className="text-xs opacity-75 mt-1">Minutes</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-3xl font-kufi font-bold">{String(countdown.seconds).padStart(2, '0')}</p>
                <p className="text-xs opacity-75 mt-1">Seconds</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-white/20 text-center">
          <p className="text-sm opacity-75">Prayer time: {nextPrayer.time}</p>
        </div>
      </div>
    </div>
  );
}
