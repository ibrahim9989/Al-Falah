'use client';

import { useState, useEffect } from 'react';

interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  isCurrent?: boolean;
}

export default function MultipleLocations({ onLocationChange }: { onLocationChange?: (location: Location) => void }) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', address: '' });

  useEffect(() => {
    // Load saved locations
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('savedLocations');
      if (saved) {
        const locs = JSON.parse(saved);
        setLocations(locs);
        const current = locs.find((l: Location) => l.isCurrent) || locs[0];
        setCurrentLocation(current);
      } else {
        // Default: Current location
        const defaultLoc: Location = {
          id: 'current',
          name: 'Current Location',
          address: 'Using device location',
          lat: 0,
          lng: 0,
          isCurrent: true,
        };
        setLocations([defaultLoc]);
        setCurrentLocation(defaultLoc);
      }
    }
  }, []);

  const handleAddLocation = () => {
    if (!formData.name) return;

    const newLocation: Location = {
      id: Date.now().toString(),
      name: formData.name,
      address: formData.address,
      lat: 40.7128, // Mock coordinates
      lng: -74.0060,
      isCurrent: false,
    };

    const updated = [...locations, newLocation];
    setLocations(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('savedLocations', JSON.stringify(updated));
    }
    setFormData({ name: '', address: '' });
    setShowAddForm(false);
  };

  const handleSelectLocation = (location: Location) => {
    const updated = locations.map(l => ({
      ...l,
      isCurrent: l.id === location.id,
    }));
    setLocations(updated);
    setCurrentLocation(location);
    if (typeof window !== 'undefined') {
      localStorage.setItem('savedLocations', JSON.stringify(updated));
    }
    if (onLocationChange) {
      onLocationChange(location);
    }
  };

  const handleDeleteLocation = (id: string) => {
    const updated = locations.filter(l => l.id !== id);
    setLocations(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('savedLocations', JSON.stringify(updated));
    }
    if (currentLocation?.id === id && updated.length > 0) {
      handleSelectLocation(updated[0]);
    }
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
          Locations
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-2 rounded-lg transition-colors"
          style={{ backgroundColor: '#056839', color: 'white' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {showAddForm && (
        <div className="mb-4 p-4 rounded-xl border-2" style={{ borderColor: '#c3e6d3', backgroundColor: 'white' }}>
          <input
            type="text"
            placeholder="Location name (e.g., Home, Work)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839]"
            style={{ borderColor: '#e5d4b8' }}
          />
          <input
            type="text"
            placeholder="Address (optional)"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839]"
            style={{ borderColor: '#e5d4b8' }}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddLocation}
              disabled={!formData.name}
              className="flex-1 py-2 rounded-lg font-semibold text-white disabled:opacity-50"
              style={{ backgroundColor: '#056839' }}
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setFormData({ name: '', address: '' });
              }}
              className="flex-1 py-2 rounded-lg font-semibold border-2"
              style={{ borderColor: '#e5d4b8', color: '#1e3a5f' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {locations.map((location) => (
          <div
            key={location.id}
            onClick={() => handleSelectLocation(location)}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
              location.isCurrent ? 'shadow-md' : ''
            }`}
            style={
              location.isCurrent
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
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-kufi font-semibold">{location.name}</span>
                  {location.isCurrent && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs opacity-75">{location.address}</p>
              </div>
              {!location.isCurrent && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteLocation(location.id);
                  }}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
