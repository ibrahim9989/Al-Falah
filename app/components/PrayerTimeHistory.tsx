'use client';

import { useState, useEffect } from 'react';

interface PrayerTimeRecord {
  date: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export default function PrayerTimeHistory() {
  const [history, setHistory] = useState<PrayerTimeRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'chart'>('list');

  useEffect(() => {
    // Generate mock history data (last 30 days)
    const records: PrayerTimeRecord[] = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString();
      
      // Mock prayer times with slight variations
      const baseHour = 5 + (i % 2) * 0.5;
      records.push({
        date: dateStr,
        fajr: `${Math.floor(baseHour)}:${30 + (i % 2) * 5}`,
        dhuhr: `12:${45 + (i % 3)}`,
        asr: `4:${30 + (i % 2) * 5}`,
        maghrib: `6:${50 + (i % 3)}`,
        isha: `8:${15 + (i % 2) * 5}`,
      });
    }
    
    setHistory(records);
    setSelectedDate(records[records.length - 1].date);
  }, []);

  const selectedRecord = history.find(h => h.date === selectedDate);

  const getTimeVariation = (prayer: keyof PrayerTimeRecord) => {
    if (!selectedRecord) return { min: '', max: '', avg: '' };
    const times = history.map(h => h[prayer] as string);
    // Simplified - in production, parse and calculate properly
    return { min: times[0], max: times[times.length - 1], avg: selectedRecord[prayer] };
  };

  return (
    <div 
      className="premium-card rounded-3xl p-6 mb-6 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 249, 244, 0.98) 100%)',
        borderColor: '#d4af37',
        borderWidth: '2px',
        boxShadow: '0 8px 32px rgba(5, 104, 57, 0.08), 0 2px 8px rgba(212, 175, 55, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
      }}
    >
      {/* Decorative elements */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-5"
        style={{
          background: 'radial-gradient(circle, #056839 0%, transparent 70%)'
        }}
      ></div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-kufi font-semibold" style={{ color: '#056839' }}>
          Prayer Time History
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list' ? 'bg-[#056839] text-white' : 'bg-white text-[#056839]'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('chart')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'chart' ? 'bg-[#056839] text-white' : 'bg-white text-[#056839]'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {history.slice(-10).reverse().map((record, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(record.date)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                selectedDate === record.date ? 'shadow-md' : ''
              }`}
              style={
                selectedDate === record.date
                  ? {
                      backgroundColor: '#056839',
                      borderColor: '#034d2a',
                      color: 'white'
                    }
                  : {
                      backgroundColor: 'white',
                      borderColor: '#d4e8dc',
                      color: '#1e3a5f'
                    }
              }
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-kufi font-semibold mb-1">{record.date}</p>
                  <p className="text-xs opacity-75">
                    Fajr: {record.fajr} • Maghrib: {record.maghrib}
                  </p>
                </div>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Chart placeholder */}
          <div 
            className="bg-white rounded-xl p-6 border-2"
            style={{ borderColor: '#d4e8dc', minHeight: '200px' }}
          >
            <p className="text-center text-sm" style={{ color: '#8b6f47' }}>
              Prayer time trends chart
            </p>
            <div className="mt-4 flex items-end justify-center gap-2 h-32">
              {history.slice(-7).map((record, index) => {
                const height = 60 + (index % 3) * 10;
                return (
                  <div key={index} className="flex flex-col items-center gap-1">
                    <div
                      className="w-8 rounded-t"
                      style={{
                        height: `${height}px`,
                        backgroundColor: '#056839'
                      }}
                    ></div>
                    <span className="text-xs" style={{ color: '#8b6f47' }}>
                      {new Date(record.date).getDate()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {selectedRecord && (
        <div 
          className="mt-4 p-4 rounded-xl border-2"
          style={{ 
            backgroundColor: 'white',
            borderColor: '#d4e8dc'
          }}
        >
          <p className="text-sm font-semibold mb-3" style={{ color: '#1e3a5f' }}>
            {selectedDate} - Full Schedule
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-xs opacity-75">Fajr:</span>
              <span className="ml-2 font-kufi font-bold" style={{ color: '#056839' }}>
                {selectedRecord.fajr}
              </span>
            </div>
            <div>
              <span className="text-xs opacity-75">Dhuhr:</span>
              <span className="ml-2 font-kufi font-bold" style={{ color: '#056839' }}>
                {selectedRecord.dhuhr}
              </span>
            </div>
            <div>
              <span className="text-xs opacity-75">Asr:</span>
              <span className="ml-2 font-kufi font-bold" style={{ color: '#056839' }}>
                {selectedRecord.asr}
              </span>
            </div>
            <div>
              <span className="text-xs opacity-75">Maghrib:</span>
              <span className="ml-2 font-kufi font-bold" style={{ color: '#056839' }}>
                {selectedRecord.maghrib}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-xs opacity-75">Isha:</span>
              <span className="ml-2 font-kufi font-bold" style={{ color: '#056839' }}>
                {selectedRecord.isha}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <button
          className="flex-1 py-2 rounded-lg font-semibold text-sm border-2"
          style={{ 
            borderColor: '#d4e8dc',
            color: '#056839',
            backgroundColor: 'white'
          }}
        >
          Export CSV
        </button>
        <button
          className="flex-1 py-2 rounded-lg font-semibold text-sm text-white"
          style={{ backgroundColor: '#056839' }}
        >
          Share
        </button>
      </div>
    </div>
  );
}
