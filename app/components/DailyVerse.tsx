'use client';

import { useState, useEffect } from 'react';

interface Verse {
  text: string;
  translation: string;
  source: string;
}

const verses: Verse[] = [
  {
    text: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا',
    translation: 'And whoever fears Allah - He will make for him a way out',
    source: 'Quran 65:2'
  },
  {
    text: 'وَاذْكُرُوا اللَّهَ كَثِيرًا لَّعَلَّكُمْ تُفْلِحُونَ',
    translation: 'And remember Allah often that you may succeed',
    source: 'Quran 8:45'
  },
  {
    text: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    translation: 'Indeed, with hardship comes ease',
    source: 'Quran 94:5'
  },
  {
    text: 'وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ',
    translation: 'And my success is not but through Allah',
    source: 'Quran 11:88'
  },
  {
    text: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً',
    translation: 'Our Lord, give us good in this world and good in the Hereafter',
    source: 'Quran 2:201'
  }
];

export default function DailyVerse() {
  const [todayVerse, setTodayVerse] = useState<Verse | null>(null);

  useEffect(() => {
    // Get verse based on day of year for consistency
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    const verseIndex = dayOfYear % verses.length;
    setTodayVerse(verses[verseIndex]);
  }, []);

  if (!todayVerse) return null;

  return (
    <div 
      className="rounded-3xl p-6 mb-6 premium-card relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2d4f7a 50%, #1e3a5f 100%)',
        borderColor: '#d4af37',
        borderWidth: '2px',
        boxShadow: '0 8px 32px rgba(30, 58, 95, 0.3), 0 2px 8px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Decorative corner elements */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-10"
        style={{
          background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)'
        }}
      ></div>
      <div 
        className="absolute bottom-0 left-0 w-24 h-24 opacity-10"
        style={{
          background: 'radial-gradient(circle, #056839 0%, transparent 70%)'
        }}
      ></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)`
        }}></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-xl font-kufi font-semibold text-white">Daily Verse</h2>
        </div>

        <div className="mb-4">
          <p className="text-2xl font-kufi font-bold text-white mb-3 text-right leading-relaxed" dir="rtl">
            {todayVerse.text}
          </p>
          <p className="text-white/90 text-sm leading-relaxed mb-2">
            {todayVerse.translation}
          </p>
          <p className="text-white/70 text-xs" style={{ color: '#d4af37' }}>
            {todayVerse.source}
          </p>
        </div>
      </div>
    </div>
  );
}
