import Link from 'next/link';

interface Masjid {
  id: string;
  name: string;
  address: string;
  distance: string;
  nextPrayer: string;
  nextPrayerTime: string;
  isSubscribed?: boolean;
}

interface MasjidCardProps {
  masjid: Masjid;
}

export default function MasjidCard({ masjid }: MasjidCardProps) {
  return (
    <Link href={`/masjid/${masjid.id}`}>
      <div 
        className="premium-card rounded-3xl p-6 mb-4 active:scale-[0.98] transition-all hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden group"
        style={{ 
          borderColor: '#d4af37',
          borderWidth: '2px'
        }}
      >
        {/* Decorative corner accent */}
        <div 
          className="absolute top-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity"
          style={{
            background: `radial-gradient(circle at top right, #056839, transparent)`
          }}
        ></div>
        
        <div className="flex items-start justify-between mb-3 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#f0ede4' }}
              >
                <svg className="w-5 h-5" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-kufi font-semibold flex-1" style={{ color: '#1e3a5f' }}>
                {masjid.name}
              </h3>
            </div>
            <p className="text-sm mb-3 ml-11" style={{ color: '#8b6f47' }}>{masjid.address}</p>
            <div className="flex items-center gap-4 text-xs ml-11" style={{ color: '#8b6f47' }}>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {masjid.distance}
              </span>
            </div>
          </div>
          {masjid.isSubscribed && (
            <div 
              className="px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm"
              style={{ 
                backgroundColor: '#f0f9f4',
                color: '#056839',
                border: '1px solid #c3e6d3'
              }}
            >
              Subscribed
            </div>
          )}
        </div>
        <div 
          className="flex items-center justify-between pt-4 border-t-2"
          style={{ borderColor: '#f0ede4' }}
        >
          <div>
            <p className="text-xs mb-1" style={{ color: '#8b6f47' }}>Next Prayer</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-kufi font-bold" style={{ color: '#056839' }}>
                {masjid.nextPrayer}
              </p>
              <span className="text-sm font-semibold" style={{ color: '#1e3a5f' }}>
                • {masjid.nextPrayerTime}
              </span>
            </div>
          </div>
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: '#f0ede4' }}
          >
            <svg className="w-5 h-5" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}