'use client';

import { useState, useEffect } from 'react';

interface PrayerRecord {
  date: string;
  prayers: {
    Fajr: boolean;
    Dhuhr: boolean;
    Asr: boolean;
    Maghrib: boolean;
    Isha: boolean;
  };
}

const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export default function PrayerTracker() {
  const [today, setToday] = useState('');
  const [prayerData, setPrayerData] = useState<PrayerRecord | null>(null);
  const [stats, setStats] = useState({ today: 0, week: 0, month: 0, streak: 0 });

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    setToday(todayStr);
    loadPrayerData(todayStr);
    calculateStats();
  }, []);

  const loadPrayerData = (date: string) => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(`prayer_${date}`);
    if (stored) {
      setPrayerData(JSON.parse(stored));
    } else {
      setPrayerData({
        date,
        prayers: {
          Fajr: false,
          Dhuhr: false,
          Asr: false,
          Maghrib: false,
          Isha: false,
        },
      });
    }
  };

  const calculateStats = () => {
    if (typeof window === 'undefined') return;
    const todayStr = new Date().toISOString().split('T')[0];
    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;
    let streak = 0;

    // Today's count
    const todayData = localStorage.getItem(`prayer_${todayStr}`);
    if (todayData) {
      const data: PrayerRecord = JSON.parse(todayData);
      todayCount = Object.values(data.prayers).filter(Boolean).length;
    }

    // Week and month counts
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const data = localStorage.getItem(`prayer_${dateStr}`);
      if (data) {
        const record: PrayerRecord = JSON.parse(data);
        const count = Object.values(record.prayers).filter(Boolean).length;
        if (i < 7) weekCount += count;
        if (i < 30) monthCount += count;
        if (i === streak && count === 5) {
          streak++;
        } else if (i === streak && count < 5) {
          break;
        }
      } else if (i === 0) {
        break;
      }
    }

    setStats({ today: todayCount, week: weekCount, month: monthCount, streak });
  };

  const togglePrayer = (prayerName: string) => {
    if (!prayerData) return;
    const updated = {
      ...prayerData,
      prayers: {
        ...prayerData.prayers,
        [prayerName]: !prayerData.prayers[prayerName as keyof typeof prayerData.prayers],
      },
    };
    setPrayerData(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`prayer_${today}`, JSON.stringify(updated));
    }
    calculateStats();
  };

  const getCompletionPercentage = () => {
    if (!prayerData) return 0;
    const completed = Object.values(prayerData.prayers).filter(Boolean).length;
    return (completed / prayers.length) * 100;
  };

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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        Prayer Tracker
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <div className="bg-white/80 rounded-xl p-3 text-center border" style={{ borderColor: '#d4e8dc' }}>
          <p className="text-xs mb-1" style={{ color: '#8b6f47' }}>Today</p>
          <p className="text-lg font-kufi font-bold" style={{ color: '#056839' }}>{stats.today}/5</p>
        </div>
        <div className="bg-white/80 rounded-xl p-3 text-center border" style={{ borderColor: '#d4e8dc' }}>
          <p className="text-xs mb-1" style={{ color: '#8b6f47' }}>Week</p>
          <p className="text-lg font-kufi font-bold" style={{ color: '#056839' }}>{stats.week}</p>
        </div>
        <div className="bg-white/80 rounded-xl p-3 text-center border" style={{ borderColor: '#d4e8dc' }}>
          <p className="text-xs mb-1" style={{ color: '#8b6f47' }}>Month</p>
          <p className="text-lg font-kufi font-bold" style={{ color: '#056839' }}>{stats.month}</p>
        </div>
        <div className="bg-white/80 rounded-xl p-3 text-center border" style={{ borderColor: '#d4e8dc' }}>
          <p className="text-xs mb-1" style={{ color: '#8b6f47' }}>Streak</p>
          <p className="text-lg font-kufi font-bold" style={{ color: '#d4af37' }}>{stats.streak}🔥</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-5">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: '#1e3a5f' }}>Today&apos;s Progress</span>
          <span className="text-sm font-bold" style={{ color: '#056839' }}>{Math.round(getCompletionPercentage())}%</span>
        </div>
        <div className="h-3 bg-white/60 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${getCompletionPercentage()}%`,
              background: 'linear-gradient(90deg, #056839 0%, #0d7a4d 100%)'
            }}
          ></div>
        </div>
      </div>

      {/* Prayer Buttons */}
      <div className="space-y-2">
        {prayers.map((prayer) => {
          const isCompleted = prayerData?.prayers[prayer as keyof typeof prayerData.prayers] || false;
          return (
            <button
              key={prayer}
              onClick={() => togglePrayer(prayer)}
              className={`w-full p-4 rounded-xl transition-all flex items-center justify-between ${
                isCompleted ? 'shadow-md' : ''
              }`}
              style={
                isCompleted
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
              <span className="font-kufi font-semibold">{prayer}</span>
              {isCompleted ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <div className="w-6 h-6 rounded-full border-2" style={{ borderColor: '#056839' }}></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
