'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OnboardMasjid() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    imamName: '',
    imamEmail: '',
    imamPhone: '',
    latitude: 0,
    longitude: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setFormData({
      ...formData,
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success and redirect
    setIsSubmitting(false);
    router.push('/onboard/success');
  };

  return (
    <div className="min-h-screen geometric-pattern">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-10 decorative-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-3 transition-colors hover:opacity-80"
            style={{ color: '#056839' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back</span>
          </Link>
          <h1 className="text-2xl font-kufi font-bold" style={{ color: '#1e3a5f' }}>
            Register Your Masjid
          </h1>
          <p className="text-sm mt-1" style={{ color: '#8b6f47' }}>
            Step {step} of 3
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 pb-24">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-kufi font-bold text-sm ${
                    s <= step ? 'text-white shadow-md' : 'text-gray-500'
                  }`}
                  style={
                    s <= step
                      ? { 
                          backgroundColor: '#056839',
                          border: '2px solid #034d2a'
                        }
                      : { 
                          backgroundColor: '#e5d4b8',
                          border: '2px solid #d4c4a8'
                        }
                  }
                >
                  {s < step ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s
                  )}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1.5 mx-2 rounded-full transition-all ${
                      s < step ? 'bg-[#056839]' : 'bg-[#e5d4b8]'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Masjid Information */}
          {step === 1 && (
            <div 
              className="bg-white rounded-3xl p-6 shadow-lg border-2 mb-6 relative overflow-hidden"
              style={{ 
                borderColor: '#e5d4b8',
                backgroundColor: 'white'
              }}
            >
              {/* Decorative corner accent */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-5"
                style={{
                  background: `radial-gradient(circle at top right, #056839, transparent)`
                }}
              ></div>
              
              <h2 className="text-xl font-kufi font-semibold mb-5 relative z-10" style={{ color: '#056839' }}>
                Masjid Information
              </h2>
              
              <div className="space-y-4 relative z-10">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1e3a5f' }}>
                    Masjid Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839] transition-all text-gray-900 placeholder-gray-400"
                    style={{ 
                      borderColor: '#e5d4b8',
                      backgroundColor: 'white'
                    }}
                    placeholder="e.g., Islamic Center of Downtown"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1e3a5f' }}>
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3.5 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839] transition-all resize-none text-gray-900 placeholder-gray-400"
                    style={{ 
                      borderColor: '#e5d4b8',
                      backgroundColor: 'white'
                    }}
                    placeholder="Full address of the masjid"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#1e3a5f' }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839] transition-all text-gray-900 placeholder-gray-400"
                      style={{ 
                        borderColor: '#e5d4b8',
                        backgroundColor: 'white'
                      }}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#1e3a5f' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839] transition-all text-gray-900 placeholder-gray-400"
                      style={{ 
                        borderColor: '#e5d4b8',
                        backgroundColor: 'white'
                      }}
                      placeholder="info@masjid.org"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.address}
                className="w-full mt-6 py-4 rounded-xl font-kufi font-bold text-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative z-10"
                style={{ 
                  background: 'linear-gradient(135deg, #056839 0%, #0d7a4d 100%)',
                  border: '2px solid #034d2a'
                }}
              >
                Next: Select Location
              </button>
            </div>
          )}

          {/* Step 2: Location Selection */}
          {step === 2 && (
            <div 
              className="bg-white rounded-3xl p-6 shadow-lg border-2 mb-6"
              style={{ borderColor: '#e5d4b8' }}
            >
              <h2 className="text-xl font-kufi font-semibold mb-5" style={{ color: '#056839' }}>
                Select Location
              </h2>
              
              {/* Map Placeholder */}
              <div 
                className="w-full h-64 rounded-xl mb-4 border-2 flex items-center justify-center relative overflow-hidden"
                style={{ 
                  backgroundColor: '#f0f9f4',
                  borderColor: '#c3e6d3'
                }}
              >
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-3" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm font-medium" style={{ color: '#056839' }}>Map Integration</p>
                  <p className="text-xs mt-1" style={{ color: '#8b6f47' }}>
                    {formData.latitude !== 0 
                      ? `Selected: ${formData.latitude.toFixed(4)}, ${formData.longitude.toFixed(4)}`
                      : 'Click to select location on map'
                    }
                  </p>
                </div>
                
                {/* Mock location picker */}
                <button
                  type="button"
                  onClick={() => {
                    // Mock location selection
                    const mockLocation = {
                      lat: 40.7128 + (Math.random() - 0.5) * 0.1,
                      lng: -74.0060 + (Math.random() - 0.5) * 0.1,
                    };
                    handleLocationSelect(mockLocation);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl font-semibold border-2 transition-all"
                  style={{ 
                    borderColor: '#e5d4b8',
                    color: '#1e3a5f',
                    backgroundColor: 'white'
                  }}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={formData.latitude === 0}
                  className="flex-1 py-3 rounded-xl font-kufi font-bold text-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    background: 'linear-gradient(135deg, #056839 0%, #0d7a4d 100%)',
                    border: '2px solid #034d2a'
                  }}
                >
                  Next: Imam Details
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Imam Information */}
          {step === 3 && (
            <div 
              className="bg-white rounded-3xl p-6 shadow-lg border-2 mb-6 relative overflow-hidden"
              style={{ 
                borderColor: '#e5d4b8',
                backgroundColor: 'white'
              }}
            >
              {/* Decorative corner accent */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-5"
                style={{
                  background: `radial-gradient(circle at top right, #056839, transparent)`
                }}
              ></div>
              
              <h2 className="text-xl font-kufi font-semibold mb-5 relative z-10" style={{ color: '#056839' }}>
                Imam Information
              </h2>
              
              <div className="space-y-4 relative z-10">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1e3a5f' }}>
                    Imam Name *
                  </label>
                  <input
                    type="text"
                    name="imamName"
                    value={formData.imamName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839] transition-all text-gray-900 placeholder-gray-400"
                    style={{ 
                      borderColor: '#e5d4b8',
                      backgroundColor: 'white'
                    }}
                    placeholder="Full name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#1e3a5f' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="imamEmail"
                      value={formData.imamEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839] transition-all text-gray-900 placeholder-gray-400"
                      style={{ 
                        borderColor: '#e5d4b8',
                        backgroundColor: 'white'
                      }}
                      placeholder="imam@masjid.org"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#1e3a5f' }}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="imamPhone"
                      value={formData.imamPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839] transition-all text-gray-900 placeholder-gray-400"
                      style={{ 
                        borderColor: '#e5d4b8',
                        backgroundColor: 'white'
                      }}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <p className="text-sm" style={{ color: '#1e3a5f' }}>
                    <strong>Note:</strong> You will receive login credentials via email after admin approval.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 rounded-xl font-semibold border-2 transition-all"
                  style={{ 
                    borderColor: '#e5d4b8',
                    color: '#1e3a5f',
                    backgroundColor: 'white'
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.imamName || !formData.imamEmail || !formData.imamPhone}
                  className="flex-1 py-3 rounded-xl font-kufi font-bold text-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    background: 'linear-gradient(135deg, #056839 0%, #0d7a4d 100%)',
                    border: '2px solid #034d2a'
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit for Approval'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
