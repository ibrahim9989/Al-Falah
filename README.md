# Al Falah - Masjid Finder App

A beautiful, mobile-first web application for finding masjids (mosques) near you, viewing prayer timings, and managing masjid subscriptions. Built with Next.js 15 and featuring an elegant Arabic/Kufic design.

![Al Falah](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## 🌟 Features

### For Users
- 🕌 **Masjid Discovery** - Find masjids near your location
- 📿 **Prayer Tracker** - Track daily prayers with stats and streak counter
- 🧭 **Qibla Compass** - Find direction to Kaaba using device orientation
- ⏱️ **Prayer Countdown** - Live countdown to next prayer time
- 🌙 **Ramadan Mode** - Special features during Ramadan (Iftar/Suhoor timers)
- 📍 **Multiple Locations** - Save and switch between home, work, and other locations
- 📅 **Prayer Time History** - View past prayer times and trends
- 🔔 **Subscriptions** - Subscribe to masjids for updates and announcements
- 🗺️ **Map View** - Visual map of nearby masjids
- 📖 **Daily Verse** - Inspirational Quran verse/hadith
- 🌓 **Dark Mode** - Beautiful dark theme support

### For Imams
- 📊 **Dashboard** - Overview of masjid statistics
- ⏰ **Prayer Times Management** - Update daily prayer schedules
- 📢 **Announcements** - Create and manage masjid announcements
- ✏️ **Profile Management** - Edit masjid information

### Masjid Onboarding
- 📝 **3-Step Registration** - Easy masjid registration process
- 🗺️ **Location Picker** - Interactive map for selecting masjid location
- ✅ **Admin Approval** - Submission workflow with approval system

## 🎨 Design

- **Arabic/Kufic Typography** - Noto Kufi Arabic and Cairo fonts
- **Islamic Color Scheme** - Arabic Green, Gold, and Deep Blue
- **Geometric Patterns** - Traditional Islamic design elements
- **Mobile-First** - Optimized for mobile devices
- **Responsive** - Works beautifully on all screen sizes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ibrahim9989/Al-Falah.git
cd Al-Falah
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deploy to Vercel

The easiest way to deploy Al Falah is using [Vercel](https://vercel.com):

1. Push your code to GitHub (already done ✅)
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build
4. Click "Deploy" and your app will be live!

### Vercel Deployment Settings
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

The app will be automatically deployed on every push to the main branch.

## 📁 Project Structure

```
Al-Falah/
├── app/
│   ├── components/          # Reusable components
│   │   ├── PrayerTracker.tsx
│   │   ├── QiblaCompass.tsx
│   │   ├── RamadanMode.tsx
│   │   ├── PrayerCountdown.tsx
│   │   └── ...
│   ├── imam/                # Imam dashboard pages
│   │   ├── dashboard/
│   │   ├── prayer-times/
│   │   ├── announcements/
│   │   └── profile/
│   ├── masjid/              # Masjid detail pages
│   ├── onboard/             # Masjid registration
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/                   # Static assets
├── package.json
└── README.md
```

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Fonts:** Noto Kufi Arabic, Cairo (Google Fonts)
- **Deployment:** Vercel (recommended)

## 📱 Features in Detail

### Prayer Tracker
- Track all 5 daily prayers
- Weekly and monthly statistics
- Streak counter
- Progress visualization

### Qibla Compass
- Real-time direction to Kaaba
- Device orientation support
- Location-based calculation

### Ramadan Mode
- Automatic activation during Ramadan
- Iftar/Suhoor timers
- Fasting status indicator
- Day counter

### Multiple Locations
- Save favorite locations
- Quick switching
- Location-based prayer times

## 🔮 Future Enhancements

- Backend integration (Supabase/PostgreSQL)
- Real-time notifications
- User authentication
- Payment integration for donations
- Advanced analytics
- Multi-language support

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a private repository. For questions or suggestions, please contact the repository owner.

## 🙏 Acknowledgments

- Islamic design inspiration from traditional Arabic calligraphy
- Prayer time calculations based on standard Islamic methods
- Built with love for the Muslim community

---

**Al Falah** - Success through faith and community 🌙
