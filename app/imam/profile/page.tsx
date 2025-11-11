'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';

export default function MasjidProfile() {
  const [formData, setFormData] = useState({
    name: 'Islamic Center of Downtown',
    address: '123 Main Street, Downtown',
    phone: '+1 (555) 123-4567',
    email: 'info@icdowntown.org',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
                Masjid Profile
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
              ✓ Profile updated successfully!
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div 
            className="bg-white rounded-3xl p-6 shadow-lg border-2 mb-6"
            style={{ borderColor: '#e5d4b8' }}
          >
            <h2 className="text-xl font-kufi font-semibold mb-5" style={{ color: '#056839' }}>
              Masjid Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3a5f' }}>
                  Masjid Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839] transition-all"
                  style={{ borderColor: '#e5d4b8' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3a5f' }}>
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839] transition-all resize-none"
                  style={{ borderColor: '#e5d4b8' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3a5f' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839] transition-all"
                    style={{ borderColor: '#e5d4b8' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3a5f' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839] transition-all"
                    style={{ borderColor: '#e5d4b8' }}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full mt-6 py-4 rounded-xl font-kufi font-bold text-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
        </form>
      </main>
    </div>
  );
}
