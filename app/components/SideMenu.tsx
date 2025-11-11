'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  label: string;
  icon: string;
  path: string;
  category?: string;
}

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { label: 'Home', icon: '🏠', path: '/', category: 'main' },
    { label: 'Ramadan Mode', icon: '🌙', path: '/?tab=ramadan', category: 'features' },
    { label: 'Prayer History', icon: '📅', path: '/?tab=history', category: 'features' },
    { label: 'Map View', icon: '🗺️', path: '/?tab=map', category: 'features' },
    { label: 'Register Masjid', icon: '➕', path: '/onboard', category: 'actions' },
  ];

  // Don't show on imam pages
  if (pathname?.startsWith('/imam')) {
    return null;
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg transition-colors hover:shadow-md"
        style={{ backgroundColor: '#f0ede4' }}
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ borderLeft: '2px solid #e5d4b8' }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div 
            className="p-6 border-b-2"
            style={{ borderColor: '#e5d4b8' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-kufi font-bold" style={{ color: '#056839' }}>
                Al Falah
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm" style={{ color: '#8b6f47' }}>
              Navigate to features
            </p>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-gray-50 active:scale-[0.98]"
                  style={{
                    backgroundColor: pathname === item.path ? '#f0f9f4' : 'transparent',
                    border: pathname === item.path ? '2px solid #c3e6d3' : 'none'
                  }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold flex-1" style={{ color: '#1e3a5f' }}>
                    {item.label}
                  </span>
                  <svg className="w-5 h-5" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="my-6 border-t-2" style={{ borderColor: '#e5d4b8' }}></div>

            {/* Additional Links */}
            <div className="space-y-1">
              <button className="w-full flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-gray-50 text-left">
                <span className="text-2xl">⚙️</span>
                <span className="font-semibold flex-1" style={{ color: '#1e3a5f' }}>
                  Settings
                </span>
              </button>
              <button className="w-full flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-gray-50 text-left">
                <span className="text-2xl">ℹ️</span>
                <span className="font-semibold flex-1" style={{ color: '#1e3a5f' }}>
                  About
                </span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div 
            className="p-4 border-t-2 text-center"
            style={{ borderColor: '#e5d4b8' }}
          >
            <p className="text-xs" style={{ color: '#8b6f47' }}>
              Al Falah v1.0
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
