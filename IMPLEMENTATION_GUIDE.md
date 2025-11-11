# Implementation Guide - Making Al Falah Functional

## Step-by-Step Implementation

### 1. Database Setup (Supabase Recommended)

#### Create Tables:
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (Supabase handles auth.users, this is for profiles)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'imam', 'admin')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Masjids table
CREATE TABLE masjids (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  phone TEXT,
  email TEXT,
  imam_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Prayer timings table
CREATE TABLE prayer_timings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  masjid_id UUID REFERENCES masjids(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  fajr TIME NOT NULL,
  dhuhr TIME NOT NULL,
  asr TIME NOT NULL,
  maghrib TIME NOT NULL,
  isha TIME NOT NULL,
  juma TIME,
  calculation_method TEXT DEFAULT 'ISNA',
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(masjid_id, date)
);

-- Announcements table
CREATE TABLE announcements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  masjid_id UUID REFERENCES masjids(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_urgent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  masjid_id UUID REFERENCES masjids(id) ON DELETE CASCADE,
  notification_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, masjid_id)
);

-- Indexes for performance
CREATE INDEX idx_masjids_location ON masjids(latitude, longitude);
CREATE INDEX idx_masjids_status ON masjids(status);
CREATE INDEX idx_prayer_timings_masjid_date ON prayer_timings(masjid_id, date);
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
```

### 2. Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install prisma @prisma/client  # If using Prisma
npm install zod                    # For validation
npm install react-hook-form        # For forms
npm install @tanstack/react-query  # For data fetching
```

### 3. Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### 4. API Routes Structure

```
app/api/
  masjids/
    route.ts              # GET all, POST create
    [id]/
      route.ts            # GET, PUT, DELETE specific
      prayer-times/
        route.ts          # GET, POST prayer times
      announcements/
        route.ts          # GET, POST announcements
  auth/
    register/
      route.ts            # POST register
    login/
      route.ts            # POST login
  imam/
    dashboard/
      route.ts            # GET imam's masjid
    prayer-times/
      route.ts            # PUT update prayer times
    announcements/
      route.ts            # POST, PUT, DELETE
  subscriptions/
    route.ts              # GET user's subscriptions
    [masjidId]/
      route.ts            # POST subscribe, DELETE unsubscribe
```

### 5. Masjid Onboarding Form

```typescript
// app/onboard/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const masjidSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(10),
  latitude: z.number(),
  longitude: z.number(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
});

export default function OnboardMasjid() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(masjidSchema)
  });

  const onSubmit = async (data: any) => {
    // Submit to API
    const response = await fetch('/api/masjids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        latitude: location.lat,
        longitude: location.lng,
        status: 'pending'
      })
    });
    
    if (response.ok) {
      // Show success message
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
      {/* Map picker component */}
    </form>
  );
}
```

### 6. Imam Dashboard

```typescript
// app/imam/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ImamDashboard() {
  const { data: session } = useSession();
  const [masjid, setMasjid] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState([]);

  useEffect(() => {
    // Fetch imam's masjid
    fetch('/api/imam/dashboard')
      .then(res => res.json())
      .then(data => {
        setMasjid(data.masjid);
        setPrayerTimes(data.prayerTimes);
      });
  }, []);

  const updatePrayerTimes = async (times: any) => {
    await fetch(`/api/imam/prayer-times`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(times)
    });
  };

  return (
    <div>
      <h1>Masjid Dashboard</h1>
      {/* Prayer times editor */}
      {/* Announcements manager */}
    </div>
  );
}
```

### 7. Location Picker Component

```typescript
// app/components/LocationPicker.tsx
'use client';

import { useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

export default function LocationPicker({ onLocationSelect }: any) {
  const [selectedLocation, setSelectedLocation] = useState({ lat: 0, lng: 0 });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries as any
  });

  const onMapClick = useCallback((e: any) => {
    const location = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    setSelectedLocation(location);
    onLocationSelect(location);
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={selectedLocation}
      zoom={13}
      onClick={onMapClick}
    >
      {selectedLocation.lat !== 0 && (
        <Marker position={selectedLocation} />
      )}
    </GoogleMap>
  );
}
```

## Authentication Flow

### Using NextAuth.js:

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Verify credentials with database
        // Return user object
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    }
  }
};

export default NextAuth(authOptions);
```

## Prayer Times Integration

### Using Aladhan API:

```typescript
// lib/prayer-times.ts
export async function getPrayerTimes(lat: number, lng: number, date: Date) {
  const response = await fetch(
    `http://api.aladhan.com/v1/timings/${date.getTime()/1000}?latitude=${lat}&longitude=${lng}&method=2`
  );
  const data = await response.json();
  return data.data.timings;
}
```

## Next Steps

1. **Choose your backend solution** (Supabase recommended for speed)
2. **Set up database schema**
3. **Create API routes**
4. **Implement authentication**
5. **Build onboarding form**
6. **Create imam dashboard**
7. **Add real-time features**

Would you like me to start implementing any of these features?

