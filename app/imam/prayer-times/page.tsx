'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PrayerTime {
  name: string;
  time: string;
}

export default function PrayerTimesManagement() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([
    { name: 'Fajr', time: '5:30 AM' },
    { name: 'Dhuhr', time: '12:45 PM' },
    { name: 'Asr', time: '4:30 PM' },
    { name: 'Maghrib', time: '6:50 PM' },
    { name: 'Isha', time: '8:15 PM' },
  ]);
  const [jumaTime, setJumaTime] = useState('1:30 PM');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTimeChange = (index: number, newTime: string) => {
    const updated = [...prayerTimes];
    updated[index].time = newTime;
    setPrayerTimes(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen geometric-pattern">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-10 decorative-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <Link
                href="/imam/dashboard"
                className="inline-flex items-center gap-2 mb-2 transition-colors hover:opacity-80"
                style={{ color: '#056839' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back</span>
              </Link>
              <h1 className="text-2xl font-kufi font-bold" style={{ color: '#1e3a5f' }}>
                Prayer Times
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 pb-24">
        {showSuccess && (
          <div 
            className="mb-4 p-4 rounded-xl border-2"
            style={{ 
              backgroundColor: '#f0f9f4',
              borderColor: '#c3e6d3'
            }}
          >
            <p className="text-sm font-medium" style={{ color: '#056839' }}>
              ✓ Prayer times updated successfully!
            </p>
          </div>
        )}

        <div 
          className="bg-white rounded-3xl p-6 shadow-lg border-2 mb-6"
          style={{ borderColor: '#e5d4b8' }}
        >
          <h2 className="text-xl font-kufi font-semibold mb-5" style={{ color: '#056839' }}>
            Today&apos;s Prayer Times
          </h2>

          <div className="space-y-4 mb-6">
            {prayerTimes.map((prayer, index) => (
              <div
                key={prayer.name}
                className="flex items-center justify-between p-4 rounded-xl border-2"
                style={{ borderColor: '#e5d4b8', backgroundColor: '#faf8f3' }}
              >
                <span className="font-kufi font-semibold text-lg" style={{ color: '#1e3a5f' }}>
                  {prayer.name}
                </span>
                <input
                  type="time"
                  value={prayer.time}
                  onChange={(e) => {
                    const time24 = e.target.value;
                    const [hours, minutes] = time24.split(':');
                    const hour12 = parseInt(hours) % 12 || 12;
                    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
                    const time12 = `${hour12}:${minutes} ${ampm}`;
                    handleTimeChange(index, time12);
                  }}
                  className="px-4 py-2 rounded-lg border-2 font-kufi font-bold focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839] transition-all"
                  style={{ 
                    borderColor: '#d4e8dc',
                    color: '#056839',
                    width: '140px'
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" style={{ color: '#1e3a5f' }}>
              Juma Prayer Time
            </label>
            <input
              type="time"
              value={jumaTime}
              onChange={(e) => {
                const time24 = e.target.value;
                const [hours, minutes] = time24.split(':');
                const hour12 = parseInt(hours) % 12 || 12;
                const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
                setJumaTime(`${hour12}:${minutes} ${ampm}`);
              }}
              className="w-full px-4 py-3 rounded-xl border-2 font-kufi font-bold focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839] transition-all"
              style={{ 
                borderColor: '#d4e8dc',
                color: '#056839'
              }}
            />
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
            <p className="text-xs" style={{ color: '#1e3a5f' }}>
              <strong>Tip:</strong> You can update prayer times for specific dates or set monthly schedules. Changes will be reflected immediately for all subscribers.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 py-4 rounded-xl font-kufi font-bold text-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                background: 'linear-gradient(135deg, #056839 0%, #0d7a4d 100%)',
                border: '2px solid #034d2a'
              }}
            >
              {isSaving ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>

        {/* Bulk Update Option */}
        <div 
          className="bg-white rounded-3xl p-6 shadow-lg border-2"
          style={{ borderColor: '#e5d4b8' }}
        >
          <h3 className="text-lg font-kufi font-semibold mb-4" style={{ color: '#056839' }}>
            Bulk Update Options
          </h3>
          
          <div className="space-y-3">
            <button
              className="w-full p-4 rounded-xl border-2 text-left transition-all hover:shadow-md"
              style={{ 
                borderColor: '#e5d4b8',
                backgroundColor: '#faf8f3'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold" style={{ color: '#1e3a5f' }}>Update for Month</p>
                  <p className="text-xs" style={{ color: '#8b6f47' }}>Set prayer times for entire month</p>
                </div>
                <svg className="w-5 h-5" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            <button
              className="w-full p-4 rounded-xl border-2 text-left transition-all hover:shadow-md"
              style={{ 
                borderColor: '#e5d4b8',
                backgroundColor: '#faf8f3'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold" style={{ color: '#1e3a5f' }}>Import from CSV</p>
                  <p className="text-xs" style={{ color: '#8b6f47' }}>Upload prayer times from file</p>
                </div>
                <svg className="w-5 h-5" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
