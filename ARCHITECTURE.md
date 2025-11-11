# Al Falah - Architecture & Implementation Plan

## Current State (Prototype)
- ✅ Frontend UI with Next.js 15
- ✅ Mock data for masjids
- ✅ LocalStorage for subscriptions and prayer tracking
- ❌ No backend/database
- ❌ No authentication
- ❌ No real-time updates

## Making It Functional

### 1. Backend Infrastructure

#### Option A: Next.js API Routes (Recommended for MVP)
```
app/
  api/
    masjids/
      route.ts          # GET all masjids, POST create masjid
      [id]/
        route.ts        # GET, PUT, DELETE masjid
    auth/
      route.ts          # Login, register
    imam/
      masjids/
        route.ts        # Imam's masjid management
    subscriptions/
      route.ts          # User subscriptions
    prayer-times/
      route.ts          # Get prayer times
```

#### Option B: Separate Backend (Scalable)
- Node.js/Express or Python/FastAPI
- REST API or GraphQL
- Separate deployment

### 2. Database Schema

```sql
-- Users Table
users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  password_hash VARCHAR,
  name VARCHAR,
  role ENUM('user', 'imam', 'admin'),
  created_at TIMESTAMP
)

-- Masjids Table
masjids (
  id UUID PRIMARY KEY,
  name VARCHAR,
  address TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  phone VARCHAR,
  email VARCHAR,
  imam_id UUID REFERENCES users(id),
  status ENUM('pending', 'approved', 'rejected'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Prayer Timings Table
prayer_timings (
  id UUID PRIMARY KEY,
  masjid_id UUID REFERENCES masjids(id),
  date DATE,
  fajr TIME,
  dhuhr TIME,
  asr TIME,
  maghrib TIME,
  isha TIME,
  juma TIME,
  calculation_method VARCHAR,
  created_at TIMESTAMP
)

-- Announcements Table
announcements (
  id UUID PRIMARY KEY,
  masjid_id UUID REFERENCES masjids(id),
  title VARCHAR,
  message TEXT,
  is_urgent BOOLEAN,
  created_at TIMESTAMP
)

-- Subscriptions Table
subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  masjid_id UUID REFERENCES masjids(id),
  notification_preferences JSON,
  created_at TIMESTAMP,
  UNIQUE(user_id, masjid_id)
)
```

### 3. Technology Stack Recommendations

**Database:**
- PostgreSQL (production) or SQLite (development)
- Prisma ORM (type-safe database client)
- Or Supabase (PostgreSQL + Auth + Storage)

**Authentication:**
- NextAuth.js (Next.js authentication)
- JWT tokens
- Role-based access control (RBAC)

**Real-time:**
- WebSockets (Socket.io) for live updates
- Server-Sent Events (SSE) for notifications
- Push notifications (Web Push API)

**Location Services:**
- Google Maps API or Mapbox
- Geocoding for address → coordinates
- Reverse geocoding for coordinates → address

**Prayer Times:**
- Aladhan API (free Islamic prayer times)
- Or calculate using libraries (adhan.js)

## Masjid Dashboard (Imam Portal)

### Features Needed:
1. **Authentication & Authorization**
   - Imam login/register
   - Role verification (only imam can access their masjid dashboard)
   - Session management

2. **Dashboard Pages:**
   ```
   /imam/dashboard          # Overview
   /imam/masjid/edit        # Edit masjid info
   /imam/prayer-times       # Update prayer timings
   /imam/announcements      # Manage announcements
   /imam/analytics          # View stats (optional)
   ```

3. **Prayer Times Management:**
   - Bulk update (monthly/yearly)
   - Import from CSV/Excel
   - Set calculation method
   - Override specific dates (Ramadan, etc.)

4. **Announcements Management:**
   - Create/edit/delete announcements
   - Mark as urgent
   - Schedule announcements

## Masjid Onboarding

### Flow:
1. **Registration Form:**
   - Masjid name
   - Address (with map picker)
   - Contact info (phone, email)
   - Imam details
   - Upload documents (optional)

2. **Location Selection:**
   - Interactive map (Google Maps/Mapbox)
   - Search address
   - Drag marker to adjust
   - Verify coordinates

3. **Admin Approval:**
   - Admin reviews submission
   - Approve/reject
   - Email notification to imam

4. **Post-Approval:**
   - Imam gets access to dashboard
   - Can update timings and announcements

## Implementation Steps

### Phase 1: Backend Setup
1. Set up database (PostgreSQL/Supabase)
2. Create Prisma schema
3. Set up NextAuth.js
4. Create API routes

### Phase 2: Masjid Onboarding
1. Create onboarding form
2. Integrate map picker
3. Add admin approval system
4. Email notifications

### Phase 3: Imam Dashboard
1. Create dashboard layout
2. Prayer times management
3. Announcements management
4. Masjid profile editing

### Phase 4: Real-time Features
1. WebSocket integration
2. Push notifications
3. Live prayer time updates

## Quick Start Options

### Option 1: Supabase (Fastest)
- Built-in PostgreSQL
- Authentication included
- Real-time subscriptions
- Storage for images
- Free tier available

### Option 2: Next.js + Prisma + PostgreSQL
- Full control
- Type-safe
- Scalable
- More setup required

### Option 3: Firebase
- NoSQL database
- Authentication
- Real-time database
- Easy to start

## Recommended: Supabase Setup

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

Benefits:
- ✅ Quick setup
- ✅ Built-in auth
- ✅ Real-time subscriptions
- ✅ Row-level security
- ✅ Free tier

