interface PrayerTime {
  name: string;
  time: string;
  isNext?: boolean;
}

interface PrayerTimingsProps {
  timings: PrayerTime[];
  jumaTime?: string;
}

export default function PrayerTimings({ timings, jumaTime }: PrayerTimingsProps) {
  return (
    <div 
      className="rounded-3xl p-6 mb-6 shadow-lg border-2 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #f0f9f4 0%, #e8f5ee 100%)',
        borderColor: '#c3e6d3'
      }}
    >
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, #056839 15px, #056839 16px)`
        }}></div>
      </div>
      
      <h2 className="text-xl font-kufi font-semibold mb-5 flex items-center gap-3 relative z-10" style={{ color: '#056839' }}>
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: '#056839' }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        Prayer Timings
      </h2>
      <div className="space-y-3 relative z-10">
        {timings.map((prayer, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
              prayer.isNext
                ? 'shadow-md scale-[1.02]'
                : 'bg-white/60'
            }`}
            style={
              prayer.isNext
                ? {
                    background: 'linear-gradient(135deg, #056839 0%, #0d7a4d 100%)',
                    color: 'white',
                    border: '2px solid #034d2a'
                  }
                : {
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid #d4e8dc'
                  }
            }
          >
            <span className={`font-kufi font-semibold text-lg ${prayer.isNext ? 'text-white' : ''}`} style={!prayer.isNext ? { color: '#1e3a5f' } : {}}>
              {prayer.name}
            </span>
            <span className={`font-kufi font-bold text-lg ${prayer.isNext ? 'text-white' : ''}`} style={!prayer.isNext ? { color: '#056839' } : {}}>
              {prayer.time}
            </span>
          </div>
        ))}
      </div>
      {jumaTime && (
        <div 
          className="mt-5 pt-5 border-t-2 relative z-10"
          style={{ borderColor: '#c3e6d3' }}
        >
          <div 
            className="flex items-center justify-between p-4 rounded-xl bg-white/80"
            style={{ border: '2px solid #d4af37' }}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" style={{ color: '#d4af37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-kufi font-semibold" style={{ color: '#1e3a5f' }}>Juma Prayer</span>
            </div>
            <span className="font-kufi font-bold" style={{ color: '#d4af37' }}>{jumaTime}</span>
          </div>
        </div>
      )}
    </div>
  );
}