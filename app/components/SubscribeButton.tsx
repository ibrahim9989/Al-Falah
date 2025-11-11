'use client';

import { useState, useEffect } from 'react';

interface SubscribeButtonProps {
  masjidId: string;
  initialSubscribed?: boolean;
  onSubscriptionChange?: (masjidId: string, isSubscribed: boolean) => void;
}

export default function SubscribeButton({ masjidId, initialSubscribed = false, onSubscriptionChange }: SubscribeButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load subscription status from localStorage
    if (typeof window !== 'undefined') {
      const subscriptions = JSON.parse(localStorage.getItem('subscribedMasjids') || '[]');
      setIsSubscribed(subscriptions.includes(masjidId));
    }
  }, [masjidId]);

  const handleSubscribe = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newSubscriptionStatus = !isSubscribed;
    setIsSubscribed(newSubscriptionStatus);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const subscriptions = JSON.parse(localStorage.getItem('subscribedMasjids') || '[]');
      if (newSubscriptionStatus) {
        if (!subscriptions.includes(masjidId)) {
          subscriptions.push(masjidId);
        }
      } else {
        const index = subscriptions.indexOf(masjidId);
        if (index > -1) {
          subscriptions.splice(index, 1);
        }
      }
      localStorage.setItem('subscribedMasjids', JSON.stringify(subscriptions));
      
      // Notify parent component
      if (onSubscriptionChange) {
        onSubscriptionChange(masjidId, newSubscriptionStatus);
      }
      
      // Dispatch custom event for cross-component updates
      window.dispatchEvent(new CustomEvent('subscriptionChanged', {
        detail: { masjidId, isSubscribed: newSubscriptionStatus }
      }));
    }
    
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={isLoading}
      className={`w-full py-4 rounded-2xl font-kufi font-bold text-white transition-all duration-200 shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden ${
        isSubscribed ? 'hover:shadow-xl' : 'hover:shadow-xl'
      }`}
      style={
        isSubscribed
          ? {
              background: 'linear-gradient(135deg, #056839 0%, #0d7a4d 100%)',
              border: '2px solid #034d2a'
            }
          : {
              background: 'linear-gradient(135deg, #1e3a5f 0%, #2d4f7a 100%)',
              border: '2px solid #1a2f4a'
            }
      }
    >
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
        }}></div>
      </div>
      
      {isLoading ? (
        <span className="flex items-center justify-center gap-2 relative z-10">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {isSubscribed ? 'Unsubscribing...' : 'Subscribing...'}
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2 relative z-10">
          {isSubscribed ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Subscribed
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Subscribe for Updates
            </>
          )}
        </span>
      )}
    </button>
  );
}