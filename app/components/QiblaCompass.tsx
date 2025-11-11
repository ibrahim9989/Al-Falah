'use client';

import { useState, useEffect, useRef } from 'react';

export default function QiblaCompass() {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const compassRef = useRef<HTMLDivElement>(null);

  // Kaaba coordinates (Mecca)
  const KAABA_LAT = 21.4225;
  const KAABA_LNG = 39.8262;

  useEffect(() => {
    getLocation();
    requestDeviceOrientation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation({ lat, lng });
          calculateQiblaDirection(lat, lng);
        },
        () => {
          setError('Location access denied. Using default direction.');
          // Default to approximate direction (east for most places)
          setQiblaDirection(90);
        }
      );
    } else {
      setError('Geolocation not supported');
      setQiblaDirection(90);
    }
  };

  const calculateQiblaDirection = (lat: number, lng: number) => {
    // Calculate bearing from user location to Kaaba
    const lat1 = (lat * Math.PI) / 180;
    const lat2 = (KAABA_LAT * Math.PI) / 180;
    const deltaLng = ((KAABA_LNG - lng) * Math.PI) / 180;

    const y = Math.sin(deltaLng) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);

    let bearing = (Math.atan2(y, x) * 180) / Math.PI;
    bearing = (bearing + 360) % 360;

    setQiblaDirection(bearing);
  };

  const requestDeviceOrientation = () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          } else {
            setError('Device orientation permission denied');
          }
        })
        .catch(() => {
          setError('Device orientation not supported');
        });
    } else if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation);
    } else {
      setError('Device orientation not supported');
    }
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      setDeviceHeading(event.alpha);
    }
  };

  const getCompassRotation = () => {
    if (deviceHeading === null || qiblaDirection === null) return 0;
    return deviceHeading;
  };

  const getQiblaArrowRotation = () => {
    if (deviceHeading === null || qiblaDirection === null) return 0;
    return qiblaDirection - deviceHeading;
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
        Qibla Direction
      </h2>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-yellow-50 border border-yellow-200">
          <p className="text-xs" style={{ color: '#8b6f47' }}>{error}</p>
        </div>
      )}

      <div className="flex flex-col items-center">
        {/* Compass */}
        <div className="relative w-64 h-64 mb-4">
          <div
            ref={compassRef}
            className="absolute inset-0 rounded-full border-4 bg-white shadow-lg"
            style={{ 
              borderColor: '#056839',
              transform: `rotate(${getCompassRotation()}deg)`
            }}
          >
            {/* Compass Markings */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
              <span className="text-lg font-bold" style={{ color: '#056839' }}>N</span>
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <span className="text-lg font-bold" style={{ color: '#056839' }}>S</span>
            </div>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <span className="text-lg font-bold" style={{ color: '#056839' }}>W</span>
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <span className="text-lg font-bold" style={{ color: '#056839' }}>E</span>
            </div>

            {/* Qibla Arrow */}
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${getQiblaArrowRotation()}deg)`,
                transformOrigin: '50% 50%'
              }}
            >
              <div className="w-1 h-24" style={{ backgroundColor: '#d4af37' }}>
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: '16px solid #d4af37'
                  }}
                ></div>
              </div>
            </div>

            {/* Center Dot */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
              style={{ backgroundColor: '#056839' }}
            ></div>
          </div>
        </div>

        {/* Direction Info */}
        <div className="text-center">
          <p className="text-sm mb-2" style={{ color: '#8b6f47' }}>Direction to Kaaba</p>
          <p className="text-2xl font-kufi font-bold" style={{ color: '#056839' }}>
            {qiblaDirection !== null ? `${Math.round(qiblaDirection)}°` : '--'}
          </p>
          {deviceHeading !== null && (
            <p className="text-xs mt-2" style={{ color: '#8b6f47' }}>
              Device: {Math.round(deviceHeading)}°
            </p>
          )}
        </div>

        {!userLocation && (
          <button
            onClick={getLocation}
            className="mt-4 px-4 py-2 rounded-xl font-semibold text-white"
            style={{ backgroundColor: '#056839' }}
          >
            Enable Location
          </button>
        )}
      </div>
    </div>
  );
}
