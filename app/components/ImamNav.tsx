'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ImamNavItem {
  label: string;
  icon: string;
  path: string;
}

const imamNavItems: ImamNavItem[] = [
  { label: 'Dashboard', icon: '📊', path: '/imam/dashboard' },
  { label: 'Prayer Times', icon: '⏰', path: '/imam/prayer-times' },
  { label: 'Announcements', icon: '📢', path: '/imam/announcements' },
  { label: 'Profile', icon: '✏️', path: '/imam/profile' },
];

export default function ImamNav() {
  const pathname = usePathname();

  // Only show on imam pages
  if (!pathname?.startsWith('/imam')) {
    return null;
  }

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-sm border-t-2 shadow-2xl z-50"
      style={{ borderColor: '#e5d4b8' }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {imamNavItems.map((item) => {
          const isActive = pathname === item.path;
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all min-w-[70px] ${
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
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-semibold text-center leading-tight">{item.label}</span>
              {isActive && (
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
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
