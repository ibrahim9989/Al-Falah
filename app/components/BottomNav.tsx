'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const navItems: NavItem[] = [
  { id: 'masjids', label: 'Masjids', icon: '🕌', path: '/' },
  { id: 'subscribed', label: 'Subscribed', icon: '🔔', path: '/?tab=subscribed' },
  { id: 'tracker', label: 'Tracker', icon: '📿', path: '/?tab=tracker' },
  { id: 'qibla', label: 'Qibla', icon: '🧭', path: '/?tab=qibla' },
];

function BottomNavContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get('tab') || 'masjids';
  
  // Don't show on imam pages or onboard pages or masjid detail pages
  if (pathname?.startsWith('/imam') || pathname?.startsWith('/onboard') || pathname?.startsWith('/masjid/')) {
    return null;
  }

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-sm border-t-2 shadow-2xl z-50 safe-area-inset-bottom"
      style={{ borderColor: '#e5d4b8' }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = (pathname === '/' && item.id === 'masjids' && !currentTab) || 
                          (pathname === '/' && currentTab === item.id);
          
          return (
            <Link
              key={item.id}
              href={item.path}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all min-w-[60px] relative ${
                isActive ? 'scale-105' : ''
              }`}
              style={
                isActive
                  ? {
                      backgroundColor: '#f0f9f4',
                      color: '#056839'
                    }
                  : {
                      color: '#8b6f47'
                    }
              }
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs font-semibold">{item.label}</span>
              {isActive && (
                <div 
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full"
                  style={{ backgroundColor: '#056839' }}
                ></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  
  // Don't show on imam pages or onboard pages or masjid detail pages
  if (pathname?.startsWith('/imam') || pathname?.startsWith('/onboard') || pathname?.startsWith('/masjid/')) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <BottomNavContent />
    </Suspense>
  );
}
