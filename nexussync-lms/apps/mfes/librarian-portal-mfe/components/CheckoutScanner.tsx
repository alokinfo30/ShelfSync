// This component is EXPOSED to the Host MFE
'use client';

import React, { useState } from 'react';
import { CheckoutRequest } from 'types-shared-lms'; // Use shared types!

export default function CheckoutScanner() {
  const [assetId, setAssetId] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleCheckout = async () => {
    const requestBody: CheckoutRequest = { 
        assetId, 
        userId, 
        // Calculate due date logic here 
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() 
    };

    // CALL TO BFF API ROUTE
    const res = await fetch('/api/circulation/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (res.ok) {
      setMessage(`Checkout successful for Asset ${assetId}!`);
    } else {
      const error = await res.json();
      setMessage(`Error: ${error.message}`);
    }
  };

  // ... Minimal UI (replace with actual scanner logic) ...
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Quick Checkout</h2>
      {/* Solves: Inventory Efficiency (fast check-out UI) */}
      <input 
        type="text" 
        placeholder="Scan Asset ID" 
        value={assetId} 
        onChange={(e) => setAssetId(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Scan User ID" 
        value={userId} 
        onChange={(e) => setUserId(e.target.value)} 
      />
      <button onClick={handleCheckout}>Process Checkout</button>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  );
}