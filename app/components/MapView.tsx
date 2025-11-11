'use client';

import { useState, useEffect } from 'react';

interface Masjid {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distance: string;
}

interface MapViewProps {
  masjids: Masjid[];
  userLocation?: { lat: number; lng: number };
}

export default function MapView({ masjids, userLocation }: MapViewProps) {
  const [selectedMasjid, setSelectedMasjid] = useState<Masjid | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Mock map view - In production, use Google Maps, Mapbox, or Leaflet
  const getMapUrl = () => {
    if (!userLocation) return null;
    const center = `${userLocation.lat},${userLocation.lng}`;
    const markers = masjids.map(m => `${m.lat},${m.lng}`).join('|');
    // Using a static map service (you'd use Google Maps API or similar in production)
    return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-mosque+056839(${markers})/${center},12/400x300@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`;
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>
        Map View
      </h2>

      {!userLocation ? (
        <div className="bg-white/80 rounded-2xl p-8 text-center border" style={{ borderColor: '#d4e8dc' }}>
          <svg className="w-12 h-12 mx-auto mb-3" style={{ color: '#d4af37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm mb-4" style={{ color: '#8b6f47' }}>Enable location to view map</p>
        </div>
      ) : (
        <>
          {/* Map Container */}
          <div className="bg-white rounded-2xl overflow-hidden mb-4 border-2" style={{ borderColor: '#d4e8dc', height: '300px' }}>
            <div className="w-full h-full flex items-center justify-center bg-gray-100 relative">
              {/* Mock Map - In production, integrate with Google Maps, Mapbox, or Leaflet */}
              <div className="text-center p-8">
                <svg className="w-16 h-16 mx-auto mb-4" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-sm" style={{ color: '#8b6f47' }}>Map integration ready</p>
                <p className="text-xs mt-2" style={{ color: '#a69b88' }}>
                  {masjids.length} masjids nearby
                </p>
              </div>
              
              {/* Map markers would be rendered here in production */}
              {masjids.map((masjid) => (
                <div
                  key={masjid.id}
                  className="absolute"
                  style={{
                    left: `${50 + (masjid.lng - userLocation.lng) * 1000}%`,
                    top: `${50 - (masjid.lat - userLocation.lat) * 1000}%`,
                  }}
                >
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer"
                    style={{ backgroundColor: '#056839' }}
                    onClick={() => setSelectedMasjid(masjid)}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Masjid List */}
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {masjids.map((masjid) => (
              <button
                key={masjid.id}
                onClick={() => setSelectedMasjid(masjid)}
                className={`w-full p-3 rounded-xl text-left transition-all ${
                  selectedMasjid?.id === masjid.id ? 'shadow-md' : ''
                }`}
                style={
                  selectedMasjid?.id === masjid.id
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
                <div className="flex items-center justify-between">
                  <span className="font-kufi font-semibold">{masjid.name}</span>
                  <span className="text-xs">{masjid.distance}</span>
                </div>
              </button>
            ))}
          </div>

          {selectedMasjid && (
            <div className="mt-4 p-4 rounded-xl bg-white/80 border" style={{ borderColor: '#d4e8dc' }}>
              <p className="font-kufi font-semibold mb-2" style={{ color: '#1e3a5f' }}>
                {selectedMasjid.name}
              </p>
              <button
                className="text-sm px-4 py-2 rounded-lg font-semibold text-white"
                style={{ backgroundColor: '#056839' }}
                onClick={() => {
                  // Open directions in production
                  window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedMasjid.lat},${selectedMasjid.lng}`, '_blank');
                }}
              >
                Get Directions
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
