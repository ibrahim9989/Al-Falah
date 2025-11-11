'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  isUrgent: boolean;
}

export default function AnnouncementsManagement() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Ramadan Iftar Program',
      message: 'Join us for daily iftar during Ramadan. Dinner will be served 30 minutes before Maghrib.',
      date: 'March 15, 2024',
      isUrgent: false,
    },
    {
      id: '2',
      title: 'Friday Khutbah Topic',
      message: 'This week\'s khutbah will focus on the importance of community and unity.',
      date: 'March 14, 2024',
      isUrgent: false,
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    isUrgent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: formData.title,
      message: formData.message,
      date: new Date().toLocaleDateString(),
      isUrgent: formData.isUrgent,
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setFormData({ title: '', message: '', isUrgent: false });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen geometric-pattern">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-10 decorative-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <Link
                href="/imam/dashboard"
                className="inline-flex items-center gap-2 mb-2 transition-colors hover:opacity-80"
                style={{ color: '#056839' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back</span>
              </Link>
              <h1 className="text-2xl font-kufi font-bold" style={{ color: '#1e3a5f' }}>
                Announcements
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 pb-24">
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full mb-6 py-4 rounded-xl font-kufi font-bold text-white transition-all shadow-lg"
          style={{ 
            background: 'linear-gradient(135deg, #056839 0%, #0d7a4d 100%)',
            border: '2px solid #034d2a'
          }}
        >
          {showForm ? 'Cancel' : '+ Create Announcement'}
        </button>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 shadow-lg border-2 mb-6"
            style={{ borderColor: '#e5d4b8' }}
          >
            <h2 className="text-xl font-kufi font-semibold mb-5" style={{ color: '#056839' }}>
              New Announcement
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3a5f' }}>
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839] transition-all"
                  style={{ borderColor: '#e5d4b8' }}
                  placeholder="Announcement title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3a5f' }}>
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#056839] transition-all resize-none"
                  style={{ borderColor: '#e5d4b8' }}
                  placeholder="Announcement message"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={formData.isUrgent}
                  onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                  className="w-5 h-5 rounded"
                  style={{ accentColor: '#056839' }}
                />
                <label htmlFor="urgent" className="text-sm font-medium" style={{ color: '#1e3a5f' }}>
                  Mark as urgent
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-kufi font-bold text-white transition-all shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #056839 0%, #0d7a4d 100%)',
                  border: '2px solid #034d2a'
                }}
              >
                Publish Announcement
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-kufi font-semibold" style={{ color: '#1e3a5f' }}>
            Recent Announcements ({announcements.length})
          </h2>

          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`bg-white rounded-2xl p-5 shadow-md border-2 ${
                announcement.isUrgent ? 'border-red-200 bg-red-50' : ''
              }`}
              style={!announcement.isUrgent ? { borderColor: '#e5d4b8' } : {}}
            >
              {announcement.isUrgent && (
                <div className="flex items-center gap-2 mb-3">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: '#dc2626' }}
                  >
                    Urgent
                  </span>
                </div>
              )}
              
              <h3 className="font-kufi font-semibold mb-2" style={{ color: '#1e3a5f', fontSize: '1.1rem' }}>
                {announcement.title}
              </h3>
              <p className="text-sm mb-3" style={{ color: '#8b6f47', lineHeight: '1.6' }}>
                {announcement.message}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs" style={{ color: '#a69b88' }}>{announcement.date}</p>
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className="text-xs px-3 py-1 rounded-lg font-medium transition-colors"
                  style={{ 
                    color: '#dc2626',
                    backgroundColor: '#fef2f2'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {announcements.length === 0 && (
            <div 
              className="bg-white rounded-2xl p-8 text-center border-2"
              style={{ borderColor: '#e5d4b8' }}
            >
              <p className="text-sm" style={{ color: '#8b6f47' }}>
                No announcements yet. Create your first one!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
