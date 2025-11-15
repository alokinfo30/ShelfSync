'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// 1. Dynamically import the remote component (Next.js Module Federation hook)
const CheckoutScanner = dynamic(() => import('librarianPortal/CheckoutScanner'), {
  ssr: false, // Must be client-side rendered for browser APIs (like actual scanners)
  loading: () => <p>Loading Checkout UI...</p>
});

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">LMS Admin Dashboard</h1>
      {/* 2. RENDER THE REMOTE COMPONENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
            {/* The CheckoutScanner is a part of the LibrarianPortal MFE */}
            <CheckoutScanner /> 
        </div>
        {/* Other components from other MFEs can go here (e.g., SeatMap) */}
        <div className="col-span-2 bg-gray-50 p-4 rounded">
            {/* Other local components or other remotes */}
            <h2>Quick Actions</h2>
            <p>Seat reservation monitor goes here...</p>
        </div>
      </div>
    </div>
  );
}