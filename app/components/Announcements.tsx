interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  isUrgent?: boolean;
}

interface AnnouncementsProps {
  announcements: Announcement[];
}

export default function Announcements({ announcements }: AnnouncementsProps) {
  if (announcements.length === 0) {
    return (
      <div 
        className="rounded-2xl p-8 text-center border-2 shadow-sm"
        style={{ 
          backgroundColor: '#faf8f3',
          borderColor: '#e5d4b8'
        }}
      >
        <div 
          className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#f0ede4' }}
        >
          <svg className="w-8 h-8" style={{ color: '#d4af37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <p className="text-sm font-medium" style={{ color: '#8b6f47' }}>No announcements at this time</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-kufi font-semibold mb-5 flex items-center gap-3" style={{ color: '#1e3a5f' }}>
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: '#f0ede4' }}
        >
          <svg className="w-5 h-5" style={{ color: '#056839' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        Announcements
      </h2>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`rounded-2xl p-5 border-2 shadow-md relative overflow-hidden ${
              announcement.isUrgent ? 'animate-pulse' : ''
            }`}
            style={
              announcement.isUrgent
                ? {
                    backgroundColor: '#fef2f2',
                    borderColor: '#fca5a5',
                    borderWidth: '2px'
                  }
                : {
                    backgroundColor: 'white',
                    borderColor: '#e5d4b8'
                  }
            }
          >
            {announcement.isUrgent && (
              <div 
                className="absolute top-0 right-0 w-24 h-24 opacity-10"
                style={{
                  background: `radial-gradient(circle, #dc2626, transparent)`
                }}
              ></div>
            )}
            
            {announcement.isUrgent && (
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: '#dc2626' }}
                >
                  Urgent
                </span>
              </div>
            )}
            <h3 className="font-kufi font-semibold mb-2 relative z-10" style={{ color: '#1e3a5f', fontSize: '1.1rem' }}>
              {announcement.title}
            </h3>
            <p className="text-sm mb-3 relative z-10" style={{ color: '#8b6f47', lineHeight: '1.6' }}>
              {announcement.message}
            </p>
            <p className="text-xs relative z-10" style={{ color: '#a69b88' }}>{announcement.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}